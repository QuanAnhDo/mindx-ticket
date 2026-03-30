import cors from 'cors';
import express from 'express';
import { InMemoryTicketRepository } from './repositories/InMemoryTicketRepository.js';
import { GetTicketService } from '../application/services/GetTicket.service.js';
import { UpdateTicketStatusService } from '../application/services/UpdateTicketStatus.service.js';
import { TicketController } from '../adapter/http/controllers/TicketController.js';
import { setTicketRoutes } from '../adapter/http/routes/TicketRoutes.js';
import { CreateTicketService } from '../application/services/CreateTicket.service.js';


const app = express();
app.use(express.json()); 
app.use(cors());


const repo = new InMemoryTicketRepository(); 
const createUseCase = new CreateTicketService(repo);
const getUseCase = new GetTicketService(repo);
const updateUseCase = new UpdateTicketStatusService(repo);
const controller = new TicketController(createUseCase, getUseCase, updateUseCase);


app.use('/api', setTicketRoutes(controller));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Server đang chạy tại: http://localhost:${PORT}`);

});