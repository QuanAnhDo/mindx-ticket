import type { CreateTicket } from "../../../application/ports/in/CreateTicket.port.js";
import type { GetTicket } from "../../../application/ports/in/GetTicket.port.js";
import type { UpdateTicketStatus } from "../../../application/ports/in/UpdateTicketStatus.port.js";
import type { Request, Response } from 'express';

export class TicketController {
    constructor(
        private readonly createTicket: CreateTicket,
        private readonly getTicket: GetTicket,
        private readonly updateTicketStatus: UpdateTicketStatus,
    ){}

    public async create(req: Request, res: Response):Promise<void>{
        try{
            const {title, description} = req.body;
            const ticket = await this.createTicket.execute(title, description);
            res.status(201).json({message: `Create ticket success`, data: ticket});
        }catch(error: any){
            res.status(400).json({error: error.message});
        }
    }

    public async getById(req: Request, res: Response):Promise<void>{
        try{
            const {id} = req.body;
            const ticket = await this.getTicket.execute(id);
            res.status(200).json({data: ticket});
        }catch(error: any){
            res.status(400).json({error: error.message});
        }
    }

    public async updateStatus(req: Request, res: Response):Promise<void>{
        try{
            const {id} = req.body;
            const {status} = req.body;
            const ticket = await this.updateTicketStatus.execute(id, status);
            res.status(200).json({message: 'Update status success', data:ticket});
        }catch(error: any){
            res.status(400).json({error:error.message});
        }
    }
}