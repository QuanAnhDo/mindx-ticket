import type { Ticket } from "../../../domain/Ticket.js";
import type { TicketTitle } from "../../../domain/value-objects/TicketTitle.js";

export interface CreateTicket{
    execute(title: TicketTitle, description: string): Promise<Ticket>;
}