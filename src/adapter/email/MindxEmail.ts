import { PublicClientApplication, type DeviceCodeRequest } from "@azure/msal-node";
import type { ICreateTicket } from "../../application/usecases/ICreateTicket.port.js";

export class MindxEmail{
    private pca: PublicClientApplication | undefined;

    constructor(private createTicket: ICreateTicket){
        // Initialize with minimal required config or keep it undefined if not ready
        // this.pca = new PublicClientApplication({
        //     auth: {
        //         clientId: "placeholder",
        //         authority: "https://login.microsoftonline.com/common"
        //     }
        // })
    }
}
