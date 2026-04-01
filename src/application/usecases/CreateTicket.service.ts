import { Ticket } from "../../domain/Ticket.js";
import type { TicketTitle } from "../../domain/value-objects/TicketTitle.js";
import type { CreateTicketRequest, ICreateTicket } from "./ICreateTicket.port.js";
import type { ITicketRepository } from "../ports/ITicketRepository.js";
import { v4 as uuid } from "uuid";

export class CreateTicketService implements ICreateTicket{
    constructor(private readonly ticketRepository: ITicketRepository){}

    public async execute(createTicketRequest: CreateTicketRequest): Promise<Ticket> {
        const {title, description, customerEmail} = createTicketRequest;
        if(!title || !description || !customerEmail){
            throw new Error("Missing required fields");
        }

        const newDescription = description.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim()

        const tags: string[] = [];

        const content = (title.getValue() + "" + description).toLowerCase();
        if (content.includes("thanh toán") || content.includes("bug") || content.includes("error")) {
                tags.push("hard");
         } else {
               tags.push("easy");
        }


        const ticket = new Ticket(uuid(), title, newDescription, customerEmail, tags);
        await this.ticketRepository.save(ticket);
        return ticket;
    }
}
