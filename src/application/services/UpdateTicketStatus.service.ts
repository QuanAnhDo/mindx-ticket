import type { Ticket, TicketStatus } from "../../domain/Ticket.js";
import type { UpdateTicketStatus } from "../ports/in/UpdateTicketStatus.port.js";
import type { ITicketRepository } from "../ports/out/ITicketRepository.js";


export class UpdateTicketStatusService implements UpdateTicketStatus {
    constructor(private readonly ticketRepository: ITicketRepository){}

    public async execute(id: string, newStatus: TicketStatus):Promise<Ticket>{
        const ticket = await this.ticketRepository.findById(id);
        if(!ticket){
            throw new Error('Cannot find ticket');
        }

        ticket.changeStatus(newStatus);

        await this.ticketRepository.save(ticket);

        return ticket;
    }
}