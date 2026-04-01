import type { Ticket } from "../../domain/Ticket.js";
import type { IGetTicket } from "./IGetTicket.port.js";
import type { ITicketRepository } from "../ports/ITicketRepository.js";

export class GetTicketService implements IGetTicket{
    constructor(private readonly ticketRepository: ITicketRepository){}

    public async execute(id: string):Promise<Ticket | null> {
      const ticket = await this.ticketRepository.findById(id);
      if(!ticket){
        throw new Error('Cannot find ticket');
      }

      return ticket;
    }
}