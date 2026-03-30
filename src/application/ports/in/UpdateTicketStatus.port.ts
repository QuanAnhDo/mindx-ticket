import type { Ticket, TicketStatus } from "../../../domain/Ticket.js";

export interface UpdateTicketStatus{
    execute(id: string, newStatus: TicketStatus):Promise<Ticket>
}