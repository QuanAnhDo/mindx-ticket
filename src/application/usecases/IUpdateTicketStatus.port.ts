import type { Ticket, TicketStatus } from "../../domain/Ticket.js";
export interface UpdateTicketStatusRequest {
         id: string;
         newStatus: TicketStatus;
}
export interface IUpdateTicketStatus{
    execute(request:UpdateTicketStatusRequest):Promise<Ticket>
}