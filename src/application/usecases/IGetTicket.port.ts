import type { Ticket } from "../../domain/Ticket.js";

export interface IGetTicket{
    execute(id: string):Promise<Ticket | null>;
}