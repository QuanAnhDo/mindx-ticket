import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import type { ICreateTicket } from '../../application/usecases/ICreateTicket.port.js';
import { TicketTitle } from '../../domain/value-objects/TicketTitle.js';


export class OutlookEmail {
    constructor(
        private createTicket: ICreateTicket,
        private user: string,
        private pass: string,
    ){}

    public async sync(){
        console.log("[Outlook/Gmail]: Scanning.. ");

        const client = new ImapFlow({
            host: 'imap.gmail.com', // Keep for Gmail fallback or update to outlook.office365.com
            port: 993,
            secure: true,
            auth: {user: this.user, pass: this.pass},
            logger: false
        });

        try{
            console.log("[1]: Đang kết nối tới hòm thư...");
            await client.connect();
            console.log("[2]: Đang mở hòm thư INBOX...");
            let lock = await client.getMailboxLock('Inbox');

            try{
                console.log("[3]: Đang tìm mail chưa đọc...");

                const oneHourAgo = new Date();
                oneHourAgo.setHours(oneHourAgo.getHours() - 1);
                let uids = await client.search({ seen: false, since: oneHourAgo });
                if(uids && uids.length > 0){
                    const sortedUids = (uids as any).sort((a: number, b: number) => (b as any) - (a as any));
                    for (const uid of sortedUids){
                        console.log(`[4]: Tìm thấy ${uids.length} mail mới.`);
                        console.log(`[5]: Đang xử lý mail số ${uid}...`);
                        let {content} = await client.download(uid as any);
                        let mail = await simpleParser(content);

                        const mailDate = mail.date ? new Date(mail.date) : new Date(0);
                        if (mailDate < oneHourAgo) {
                            console.log(`[Skip]: Mail UID ${uid} gửi lúc ${mailDate.toLocaleString()} (quá 1 tiếng), bỏ qua.`);
                            continue;
                        }

                        console.log(`[6]: Tiêu đề mail là: "${mail.subject}"`);
                        
                        if(mail.subject?.toLowerCase().includes('[mindx]')){
                            console.log(`[Found]: ${mail.subject}`)
                            await this.createTicket.execute({
                                title: new TicketTitle(mail.subject), 
                                description: mail.text || "Empty", 
                                customerEmail: mail.from?.value[0]?.address || "unknown"
                            });
                            await client.messageFlagsAdd(uid as any, ['\\Seen']);
                            console.log(`[Success]: Created ticket from email`)
                        }
                    }
                }else{
                    console.log(`[Email]: Không có mail mới.`)
                }
            }finally{
                lock.release();
            }
            await client.logout();
        }catch(error: any){
            console.error("[Email Sync Error]: ", error.message);
        }
    }
}
