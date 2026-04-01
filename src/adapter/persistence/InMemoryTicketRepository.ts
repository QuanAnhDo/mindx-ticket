import type { ITicketRepository } from "../../application/ports/ITicketRepository.js";
import type { Ticket } from "../../domain/Ticket.js";


export class InMemoryTicketRepository implements ITicketRepository{
    private readonly tickets: Map<string, Ticket> = new Map();

    public async save(ticket: Ticket): Promise<void> {
        this.tickets.set(ticket.id, ticket);
        console.log(`Save success ticket ${ticket.id}`);
    }

    public async findById(id: string): Promise<Ticket | null> {
        const ticket = this.tickets.get(id);
        return ticket || null;
    }

    public async findAll(): Promise<Ticket[]> {
        return Array.from(this.tickets.values());
    }

    public async update(ticket: Ticket): Promise<void> {
        if(!this.tickets.has(ticket.id)){
            throw new Error(`Can not update ticket ${ticket.id}. Ticket does not exist`)
        }
        this.tickets.set(ticket.id, ticket);
        console.log(`Update success ticket ${ticket.id}`)
    }

    public async delete(id: string): Promise<void> {
        if(!this.tickets.has(id)){
            throw new Error(`Can not to delete`);
        }
        this.tickets.delete(id);
        console.log(`Delete success ticket ${id}`);
    }

    public async getStats(): Promise<{ total: number; open: number; hard: number; easy: number; }> {
        const allTicket = Array.from(this.tickets.values());
        return{
            total: allTicket.length,
            open: allTicket.filter(t=> t.Status === 'OPEN').length,
            hard: allTicket.filter(t=> t.Tags.includes('hard')).length,
            easy: allTicket.filter(t => t.Tags.includes('easy')).length
        }
    }
}