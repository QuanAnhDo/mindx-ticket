import { Ticket } from "../../domain/Ticket.js";
import type { TicketTitle } from "../../domain/value-objects/TicketTitle.js";
import type { CreateTicketRequest, ICreateTicket } from "./ICreateTicket.port.js";
import type { ITicketRepository } from "../ports/ITicketRepository.js";
import type { ITicketClassifier } from "../ports/ITicketClassifier.js";
import { v4 as uuid } from "uuid";

export class CreateTicketService implements ICreateTicket{
    constructor(
        private readonly ticketRepository: ITicketRepository,
        private readonly ticketClassifier?: ITicketClassifier
    ){}

    public async execute(createTicketRequest: CreateTicketRequest): Promise<Ticket> {
        const {title, description, customerEmail} = createTicketRequest;
        if(!title || !description || !customerEmail){
            throw new Error("Missing required fields");
        }

        const newDescription = description.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim()

        let tags: string[] = [];

        if (this.ticketClassifier) {
            tags = await this.ticketClassifier.classify({
                title: title.getValue(),
                description: newDescription
            });
        }

        // Fallback or additional logic if needed
        if (tags.length === 0) {
            const content = (title.getValue() + " " + newDescription).toLowerCase();
            if (content.includes("thanh toán") || content.includes("bug") || content.includes("error")) {
                tags.push("hard");
            } else {
                tags.push("easy");
            }
        }


        const ticket = new Ticket(uuid(), title, newDescription, customerEmail, tags);
        await this.ticketRepository.save(ticket);
        return ticket;
    }
}
