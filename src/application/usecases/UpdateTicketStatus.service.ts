import type { Ticket, TicketStatus } from "../../domain/Ticket.js";
import type { IUpdateTicketStatus, UpdateTicketStatusRequest } from "./IUpdateTicketStatus.port.js";
import type { ITicketRepository } from "../ports/ITicketRepository.js";


export class UpdateTicketStatusService implements IUpdateTicketStatus {
    constructor(private readonly ticketRepository: ITicketRepository){}


    // public async execute(updateTicketStatusResponse: UpdateTicketStatusResponse): Promise<Ticket> {
    //     const { id, newStatus } = updateTicketStatusResponse;
    //     const ticket = await this.ticketRepository.findById(id);
    //     if(!ticket){
    //         throw new Error('Cannot find ticket');
    //     }

    //     ticket.changeStatus(newStatus);

    //     await this.ticketRepository.save(ticket);

    //     return ticket;
    // }

    public async execute(request: UpdateTicketStatusRequest): Promise<Ticket> {
        const { id, newStatus } = request;
        if(!id || !newStatus){
            throw new Error("Missing required fields");
        }
        const ticket = await this.ticketRepository.findById(id);
        if(!ticket){
            throw new Error('Cannot find ticket');
        }
        ticket.changeStatus(newStatus);
        await this.ticketRepository.save(ticket);
        return ticket;
    }
}