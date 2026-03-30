#MindX Ticket Management System

Hệ thống quản lý Ticket  được xây dựng bằng **Node.js** và **TypeScript**,  kiến trúc **Hexagonal Architecture** (Kiến trúc lục giác - Ports & Adapters).

---

## Cấu trúc thư mục (Hexagonal Design)

```text
src/
├── domain/                 # Lớp lõi (Core) - Chứa Business Logic 
│   ├── entities/           # Các thực thể nghiệp vụ (Ví dụ: Ticket.ts)
│   └── value-objects/      # Các đối tượng giá trị (Ví dụ: TicketTitle.ts)
│
├── application/            # Lớp ứng dụng - Điều phối Use Cases
│   ├── services/           # Triển khai logic (Create, Get, Update)
│   └── ports/              # Định nghĩa các Interfaces
│       ├── in/             # Input Ports: Giao diện cho các Use Cases
│       └── out/            # Output Ports: Giao diện cho Repositories (Database)
│
├── infrastructure/         # Lớp hạ tầng - Triển khai chi tiết kỹ thuật (Adapters)
│   └── repositories/       # Các bộ lưu trữ cụ thể (InMemory, JsonTicketRepository)
│
├── presentation/           # Lớp hiển thị - Điểm vào của ứng dụng (Primary Adapters)
│   ├── http/               # Adapter cho Web API (Express Controllers, Routes)
│   └── cli/                # Adapter cho dòng lệnh (Commander.js)
│
├── server.ts               # Web Server
└── cli.ts                  # CLI