import { Command } from "commander";
import { InMemoryTicketRepository } from "./infrastructure/repositories/InMemoryTicketRepository.js";
import { InMemoryActivityLogRepository } from "./infrastructure/repositories/InMemoryActivityLogRepository.js";
import { CreateTicketService } from "./application/services/CreateTicket.service.js";
import { GetTicketService } from "./application/services/GetTicket.service.js";


const program = new Command();

const repo = new InMemoryTicketRepository();
const activityLogRepo = new InMemoryActivityLogRepository();
const create = new CreateTicketService(repo);
const get = new GetTicketService(repo, activityLogRepo);


program
  .name('mindx-ticket')
  .description('Công cụ quản lý Ticket(CLI)')
  .version('1.0.0');

// Lệnh: mindx-ticket create <title> <description>
program.command('create')
  .description('Tạo một ticket mới')
  .argument('<title>', 'Tiêu đề của ticket')
  .argument('<description>', 'Mô tả chi tiết')
  .action(async (title, description) => {
    try {
      const ticket = await create.execute(title, description);
      console.log('Đã tạo Ticket thành công!');
      console.log(`ID: ${ticket.id} | Trạng thái: ${ticket.Status}`);
    } catch (error: any) {
      console.error(`Lỗi: ${error.message}`);
    }
  });

// Lệnh: mindx-ticket get <id>
program.command('get')
  .description('Xem chi tiết một ticket')
  .argument('<id>', 'ID của ticket cần xem')
  .action(async (id) => {
    try {
      const result = await get.execute(id);
      const ticket = result.ticket;
      console.log('--- CHI TIẾT TICKET ---');
      console.log(`ID: ${ticket.id}`);
      console.log(`Tiêu đề: ${ticket.Title}`);
      console.log(`Trạng thái: ${ticket.Status}`);
      console.log(`Chatter count: ${result.chatter.length}`);
    } catch (error: any) {
      console.error(`Lỗi: ${error.message}`);
    }
  });

program.parse(process.argv);