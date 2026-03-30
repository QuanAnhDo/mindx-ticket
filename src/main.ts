import { CreateTicketService } from "./application/services/CreateTicket.service.js";
import { GetTicketService } from "./application/services/GetTicket.service.js";
import { InMemoryTicketRepository } from "./infrastructure/repositories/InMemoryTicketRepository.js";
import { TicketTitle } from "./domain/value-objects/TicketTitle.js";


async function bootstrap() {

  const ticketRepository = new InMemoryTicketRepository();


  const createTicketUseCase = new CreateTicketService(ticketRepository);
  const getTicketUseCase = new GetTicketService(ticketRepository);

  console.log("--- KHỞI ĐỘNG MINDX TICKET CLI ---");

  try {
   
    console.log("\n1. Người dùng gõ lệnh tạo Ticket...");
    const newTicket = await createTicketUseCase.execute(
      new TicketTitle("không add được payment"),
      "Học viên không add được payment"
    );

    
    console.log("\n2. Người dùng gõ lệnh lấy chi tiết Ticket...");
    const fetchedTicket = await getTicketUseCase.execute(newTicket.id);
    
    console.log("\n[KẾT QUẢ TRẢ VỀ CHO CLI]:");
    if (!fetchedTicket) {
      throw new Error("Cannot find ticket");
    }
    console.log(`- Tiêu đề: ${fetchedTicket.Title}`);
    console.log(`- Trạng thái: ${fetchedTicket.Status}`);

  } catch (error: any) {
    console.error(`\n[LỖI CLI]: ${error.message}`);
  }
}

bootstrap();