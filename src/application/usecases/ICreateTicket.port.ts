import type { Ticket } from "../../domain/Ticket.js";
import type { TicketTitle } from "../../domain/value-objects/TicketTitle.js";
export interface CreateTicketRequest{
    title?:TicketTitle,
    description?:string,
    customerEmail?:string
}
export interface ICreateTicket{
    execute(createTicketRequest: CreateTicketRequest ): Promise<Ticket>;
}