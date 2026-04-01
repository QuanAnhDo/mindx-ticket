import type { ITicketRepository } from "../../application/ports/ITicketRepository.js";
import { Collection, Db, ObjectId, UUID } from 'mongodb'; 
import { Ticket, type TicketStatus } from "../../domain/Ticket.js";
import { TicketTitle } from "../../domain/value-objects/TicketTitle.js";
import { v4 as uuid } from "uuid";
interface TicketDocument{
    _id: string;
    title: string;
    description: string,
    status: string,
    customerEmail: string,
    tags: string[],
    createdAt: Date
}

export class MongoTicketRepository implements ITicketRepository{
    private collection: Collection<TicketDocument>

    constructor(db: Db){
        this.collection = db.collection('tickets');
    }

    async save(ticket: Ticket): Promise<void> {
        const doc ={
            _id: ticket.id,
            title: ticket.Title,
            description: ticket.Description,
            customerEmail: ticket.CustomerEmail, 
            tags: ticket.Tags,
            status: ticket.Status,
            createdAt: ticket.createdAt
        };
        await this.collection.insertOne(doc as any);

        console.log(`[Mongo]: Đã lưu ticket ${ticket.id}`);
    }

    async findById(id: string): Promise<Ticket | null> {
        const doc = await this.collection.findOne({_id: id});
        if(!doc) return null;

        return new Ticket(
            doc._id as string,
            new TicketTitle(doc.title),
            doc.description,
            doc.customerEmail,
            doc.tags || [],
            doc.status as TicketStatus,
            doc.createdAt,
            
        )
    }

    async findAll(): Promise<Ticket[]> {
        const docs = await this.collection.find().toArray();
        return docs.map(doc =>  new Ticket(
            doc._id as string,
            new TicketTitle(doc.title),
            doc.description,
            doc.customerEmail,
            doc.tags || [],
            doc.status as TicketStatus,
            doc.createdAt
        ));
    }

    async update(ticket: Ticket): Promise<void> {
        await this.collection.updateOne(
            {_id: ticket.id},
            {
                $set:{
                    title: ticket.Title,
                    description: ticket.Description,
                    status: ticket.Status
                }
            }
        );
        console.log(`[Mongo]: Đã cập nhật ticket ${ticket.id}`)
    }

    async delete(id: string): Promise<void> {
        const result = await this.collection.deleteOne({_id: id} as any);
        if(result.deletedCount === 0){
            throw new Error(`Error to delete ${id}`);
        }
        console.log(`[Mongo]: Đã xóa ticket ${id}`);
    }

    async getStats(): Promise<{ total: number; open: number; hard: number; easy: number; }> {
        const total = await this.collection.countDocuments();
        const open = await this.collection.countDocuments({
            status: 'open'
        })

        const hard = await this.collection.countDocuments({
            tags:'hard'
        });

        const easy = await this.collection.countDocuments({
            tags:'easy'
        });

        return {total, open, hard, easy}
    }

}