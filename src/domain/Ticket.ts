import type { TicketTitle } from "./value-objects/TicketTitle.js";

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export class Ticket{
    public readonly id: string;
    public readonly createdAt: Date;

    private title: TicketTitle;
    private description: string;
    private status: TicketStatus;

    constructor(
        id: string,
        title: TicketTitle,
        description: string,
        status: TicketStatus = 'OPEN',
        createdAt: Date = new Date()
    ){
        this.id = id,
        this.title = title,
        this.description = description,
        this.status = status,
        this.createdAt = createdAt;
    }

    public get Title():string{
        return this.title.getValue();
    }
    
    public get Description(): string{
        return this.description;
    }

    public get Status(): TicketStatus{
        return this.status;
    }


    //status
    public changeStatus(newStatus: TicketStatus): void{
        if(this.status === 'CLOSED'){
            throw new Error('Cannot change status');
        }

        this.status = newStatus;
    }

    public updateDetail(newTitle: TicketTitle, newDescription: string): void{
        this.title = newTitle;
        this.description = newDescription;
        
    }

}