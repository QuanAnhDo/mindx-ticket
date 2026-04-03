import cors from 'cors';
import express from 'express';
import { InMemoryTicketRepository } from '../adapter/persistence/InMemoryTicketRepository.js';
import { GetTicketService } from '../application/usecases/GetTicket.service.js';
import { UpdateTicketStatusService } from '../application/usecases/UpdateTicketStatus.service.js';

import { CreateTicketService } from '../application/usecases/CreateTicket.service.js';
import { TicketHttp } from '../adapter/http/TicketHttp.js';
import { MongoTicketRepository } from '../adapter/persistence/MongoTicketRepository.js';
import { MongoClient } from 'mongodb';
import { DeleteTicketService } from '../application/usecases/DeleteTicket.service.js';
import { OutlookEmail } from '../adapter/email/OutlookEmail.js';
import { GeminiTicketClassifier } from '../adapter/persistence/GeminiTicketClassifier.js';
import dotenv from 'dotenv';

const app = express();
app.use(express.json()); 
app.use(cors());

async function bootstrap(){

  dotenv.config();
  const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017');
  await client.connect();
  const db = client.db('mindx-ticket');
  console.log(`Connect success to Mongo`)
  //const repo = new InMemoryTicketRepository(); 
  const repo = new MongoTicketRepository(db);

  const classifier = process.env.GEMINI_API_KEY 
    ? new GeminiTicketClassifier(process.env.GEMINI_API_KEY)
    : undefined;

  const createUseCase = new CreateTicketService(repo, classifier);
  const getUseCase = new GetTicketService(repo);
  const updateUseCase = new UpdateTicketStatusService(repo);
  const deleteUseCase = new DeleteTicketService(repo);
  const controller = new TicketHttp(createUseCase, getUseCase, updateUseCase, deleteUseCase );



  //mail
  const emailTool = new OutlookEmail(
    createUseCase,
    process.env.OUTLOOK_USER!,
    process.env.OUTLOOK_PASS!
  );

  console.log("Email Tool is running...");

  emailTool.sync().catch(err => console.error("[Outlook Error]: ", err));

  setInterval(() =>{
    emailTool.sync().catch(err => console.error("[Gmail]: ", err));

  }, 30 * 1000)

  app.use('/api',  controller.router);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`API Server đang chạy tại: http://localhost:${PORT}`);

  });
}


bootstrap();