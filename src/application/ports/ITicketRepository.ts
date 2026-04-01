import type { Ticket } from "../../domain/Ticket.js";

export interface ITicketRepository{
    save(ticket: Ticket):Promise<void>;
    findById(id: string): Promise<Ticket | null>
    findAll():Promise<Ticket[]>
    update(ticket: Ticket):Promise<void>;
    delete(id: string):Promise<void>;


    getStats():Promise<{total: number; open: number; hard: number; easy: number}>
     
}