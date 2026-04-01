import type { IDeleteTicket } from "./IDeleteTicket.port.js";
import type { ITicketRepository } from "../ports/ITicketRepository.js";

export class DeleteTicketService implements IDeleteTicket{
    constructor(private readonly ticketRepo: ITicketRepository){}
    public async execute(id: string): Promise<void> {
        const ticket = await this.ticketRepo.findById(id);
        if(!ticket){
            throw new Error(`Can not find ticket to delete`);
        }
        await this.ticketRepo.delete(id);
    }
}