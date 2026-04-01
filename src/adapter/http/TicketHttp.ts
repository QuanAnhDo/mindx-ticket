import  { Router } from "express";
import type  {Response, Request } from "express";
import type { ICreateTicket } from "../../application/usecases/ICreateTicket.port.js";
import type { IGetTicket } from "../../application/usecases/IGetTicket.port.js";
import type { IUpdateTicketStatus } from "../../application/usecases/IUpdateTicketStatus.port.js";
import { error } from "node:console";
import type { TicketStatus } from "../../domain/Ticket.js";
import { TicketTitle } from "../../domain/value-objects/TicketTitle.js";
import type { IDeleteTicket } from "../../application/usecases/IDeleteTicket.port.js";

export class TicketHttp{
    public readonly router = Router();
    constructor(
        private readonly createTicket: ICreateTicket,
        private readonly getTicket: IGetTicket,
        private readonly updateTicketStatus: IUpdateTicketStatus,
        private readonly deleteTicket: IDeleteTicket
    ){
        this.router.post('/tickets',(req, res)=>{
            this.handleCreate(req, res);
        })

        this.router.get('/tickets/:id',(req, res)=>{
            this.handleGetById(req,res);
        })

        this.router.patch('/tickets/:id/status', (req, res)=>{
            this.handleUpdateStatus(req, res);
        })

        this.router.delete('/tickets/:id', (req, res)=>{
            this.handleDelete(req,res);
        })
    }

    //handle
    private async handleCreate(req: Request, res: Response ){
        try{
            const {title, description, customerEmail} = req.body;
            const ticketTitle = new TicketTitle(title);
            const ticket = await this.createTicket.execute({title:ticketTitle, description, customerEmail});
            res.status(201).json({data: {
                id: ticket.id,
                title: ticket.Title,
                description: ticket.Description,
                customerEmail: ticket.CustomerEmail,
                tags: ticket.Tags,
                status: ticket.Status,
                createdAt: ticket.createdAt
            }
            });
        }catch(error: any){
            res.status(400).json({error: error.message});
        }
    }


    private async handleGetById(req:Request, res: Response):Promise<void>{
        try{
            const {id} = req.params;

            if(typeof id !== "string"){
                res.status(400).json({error:"Invalid id"});
                return;
            }

            const ticket = await this.getTicket.execute(id);
            res.status(200).json({data: ticket});
        }catch(error: any){
            res.status(400).json({error: error.message});
        }
    }

    private async handleUpdateStatus(req: Request, res: Response):Promise<void>{
        try{
            const {id} = req.params;

            if(typeof id !== "string"){
                res.status(400).json({error: "Invalid id"});
                return;
            }

            const {status} = req.body;
            if(typeof status !== "string"){
                res.status(400).json({error: " Invalid status"});
                return;
            }

            const allowedStatuses: TicketStatus[] = [
                'OPEN',
                'IN_PROGRESS',
                'RESOLVED',
                'CLOSED'
            ];

            if(!allowedStatuses.includes(status as TicketStatus)){
                res.status(400).json({error: "Invalid status value"});
                return;
            }

            const ticket = await this.updateTicketStatus.execute({id: id!, newStatus: status as TicketStatus});
            res.status(200).json({message: 'Update status success', data: ticket});
        }catch(error: any){
            res.status(400).json({error: error.message});
        }
    }

    private async handleDelete(req: Request, res: Response):Promise<void>{
        try{
            const {id} = req.params;
            if(typeof id !== "string"){
                res.status(400).json({error: "Invalid id"});
                return;
            }
            await this.deleteTicket.execute(id!);
             res.status(200).json({ message: "Xóa ticket thành công" });
        }catch(error: any){
            res.status(400).json({error: error.message});
        }
    }

}