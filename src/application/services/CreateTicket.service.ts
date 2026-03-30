import { Ticket } from "../../domain/Ticket.js";
import type { TicketTitle } from "../../domain/value-objects/TicketTitle.js";
import type { CreateTicket } from "../ports/in/CreateTicket.port.js";
import type { ITicketRepository } from "../ports/out/ITicketRepository.js";
import { v4 as uuid } from "uuid";

export class CreateTicketService implements CreateTicket{
    constructor(private readonly ticketRepository: ITicketRepository){}
    public async execute(title: TicketTitle, description: string):Promise<Ticket>{
        if(!title || !description){
            throw new Error('Title and description can not be empty');
        }

        const newId = uuid();

        const newTicket = new Ticket(newId, title, description);
        await this.ticketRepository.save(newTicket);
        return newTicket;
    }
}
