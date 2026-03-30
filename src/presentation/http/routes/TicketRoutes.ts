import { Router } from 'express';
import type { TicketController } from '../controllers/TicketController.js';


export function setTicketRoutes(controller: TicketController): Router {
  const router = Router();

  router.post('/tickets', (req, res) => controller.create(req, res));
  router.get('/tickets/:id', (req, res) => controller.getById(req, res));
  router.patch('/tickets/:id/status', (req, res) => controller.updateStatus(req, res));

  return router;
}