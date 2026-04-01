import { Command } from "commander";
import { InMemoryTicketRepository } from "../adapter/persistence/InMemoryTicketRepository.js";
import { CreateTicketService } from "../application/usecases/CreateTicket.service.js";
import { GetTicketService } from "../application/usecases/GetTicket.service.js";
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { MongoTicketRepository } from "../adapter/persistence/MongoTicketRepository.js";
dotenv.config();

const program = new Command();

async function run(){

  const client = new MongoClient(process.env.MONGO_URL || 'mongodb://localhost:27017');
await client.connect();
const db = client.db('mindx-ticket')
// const repo = new InMemoryTicketRepository();
const repo = new MongoTicketRepository(db);
const create = new CreateTicketService(repo);
const get = new GetTicketService(repo);


program
  .name('mindx-ticket')
  .description('Công cụ quản lý Ticket(CLI)')
  .version('1.0.0');

// Lệnh: mindx-ticket create <title> <description>
program.command('create')
  .description('Tạo một ticket mới')
  .argument('<title>', 'Tiêu đề của ticket')
  .argument('<description>', 'Mô tả chi tiết')
  .action(async (title, description, customerEmail) => {
    try {
      const ticket = await create.execute({title, description, customerEmail});
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
      const ticket = await get.execute(id);
      if (!ticket) {
                 console.log(`Không tìm thấy Ticket với ID: ${id}`);
               return;
        }
      console.log('--- CHI TIẾT TICKET ---');
      console.log(`ID: ${ticket.id}`);
      console.log(`Tiêu đề: ${ticket.Title}`);
      console.log(`Trạng thái: ${ticket.Status}`);
     
    } catch (error: any) {
      console.error(`Lỗi: ${error.message}`);
    }
  });

program.command('stats')
  .description('Báo cáo thống kê Ticket hằng ngày')
  .action(async() => {
    try{
      console.log("\n MINDX TICKET REPORT");
      const stats = await repo.getStats();
      console.table([
                 { "Hạng mục": "Tổng số Ticket", "Số lượng": stats.total },
                 { "Hạng mục": "Đang chờ xử lý (OPEN)", "Số lượng":        
           stats.open },
                 { "Hạng mục": "Ticket Khó (Hard)", "Số lượng": stats.hard 
           },
                 { "Hạng mục": "Ticket Dễ (Easy)", "Số lượng": stats.easy }
               ]);
      
               if (stats.hard > 5) {
                 console.log("\n CẢNH BÁO: Số lượng Ticket KHÓ đang tăng cao, cần tập trung xử lý!");
               }

    }catch(error: any){
      console.log(`Error: ${error.message}`);
    }
  })

program.parse(process.argv);

}

run().catch(err => {
  console.error("Error CLI: ", err);
  process.exit(1);
});

