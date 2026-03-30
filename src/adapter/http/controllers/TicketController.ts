import type { CreateTicket } from "../../../application/ports/in/CreateTicket.port.js";
import type { GetTicket } from "../../../application/ports/in/GetTicket.port.js";
import type { UpdateTicketStatus } from "../../../application/ports/in/UpdateTicketStatus.port.js";
import type { TicketStatus } from "../../../domain/Ticket.js";
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

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            // SỬA DÒNG NÀY:
            const { id } = req.params; 

            if (typeof id !== "string") {
                res.status(400).json({ error: "Invalid id" });
                return;
            }
            
            const ticket = await this.getTicket.execute(id);
            res.status(200).json({ data: ticket });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async updateStatus(req: Request, res: Response):Promise<void>{
        try{
            const {id} = req.params;

            if (typeof id !== "string") {
                res.status(400).json({ error: "Invalid id" });
                return;
            }

            const {status} = req.body;
            if (typeof status !== "string") {
                res.status(400).json({ error: "Invalid status" });
                return;
            }

            const allowedStatuses: TicketStatus[] = [
                'OPEN',
                'IN_PROGRESS',
                'RESOLVED',
                'CLOSED',
            ];

            if (!allowedStatuses.includes(status as TicketStatus)) {
                res.status(400).json({ error: "Invalid status value" });
                return;
            }

            const ticket = await this.updateTicketStatus.execute(id, status as TicketStatus);
            res.status(200).json({message: 'Update status success', data:ticket});
        }catch(error: any){
            res.status(400).json({error:error.message});
        }
    }
}