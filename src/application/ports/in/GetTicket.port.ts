import type { Ticket } from "../../../domain/Ticket.js";

export interface GetTicket{
    execute(id: string):Promise<Ticket | null>;
}