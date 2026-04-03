# PROJECT PROPOSAL: MINDX SMARTOPS (KNOWLEDGE MANAGEMENT & AUTOMATION)

## 1. VẤN ĐỀ CẦN CẢI TIẾN (THE PROBLEM)

- **Knowledge Fragmentation:** Tri thức nghiệp vụ bị phân mảnh, phụ thuộc vào cá nhân (Tribal Knowledge).
- **Mentor Overload:** Mentor dành 70% thời gian giải đáp các câu hỏi lặp lại cho Intern/Fresher.
- **Slow Onboarding:** Nhân sự mới mất trung bình 4-6 tuần để có thể xử lý Ticket độc lập do thiếu công cụ tra cứu quy trình (SOP).

## 2. GIẢI PHÁP ĐỀ XUẤT (PROPOSED SOLUTION)

Xây dựng hệ thống **SmartOps** dựa trên kiến trúc Hexagonal để tự động hóa luồng tiếp nhận Ticket và số hóa kho tri thức. Hệ thống tích hợp **AI (Gemini)** để phân loại và **Notion API** để cung cấp giải pháp (SOP) tức thời cho nhân sự qua CLI.

## 3. CHI TIẾT GIẢI PHÁP (SOLUTION BREAKDOWN - MoSCoW)

### 3.1. Must Have (Giai đoạn MVP - Hoàn thành Tuần 1-2)

- **Automated Intake (POC):** Tự động đồng bộ yêu cầu từ Email/Gmail vào hệ thống.
- **AI Classifier:** Tích hợp Gemini AI để tự động gắn nhãn (`Hard/Easy`) và phân loại nghiệp vụ.
- **Core Management:** Quản lý vòng đời Ticket (Open, In-Progress, Resolved) trên MongoDB.

### 3.2. Should Have (Giai đoạn MVP+ - Hoàn thành Tuần 3)

- **Notion KB Integration:** Kết nối kho tri thức SOP trên Notion.
- **CLI Knowledge Query:** Lệnh tra cứu nhanh giải pháp từ Notion trực tiếp trên Terminal dựa trên nhãn AI.
- **Knowledge Capture:** Cơ chế cập nhật ngược các ca xử lý khó vào lại kho tri thức.

### 3.3. Could Have (Future Plan)

- **Auto-Reply Drafting:** Tự động soạn thảo bản thảo email phản hồi khách hàng dựa trên SOP.
- **Slack/Telegram Alerts:** Cảnh báo thời gian thực khi có Ticket mức độ `Hard` hoặc `Urgent`.

### 3.4. Won't Have (Out of Scope)

- **Advanced Web Dashboard:** Tập trung tối ưu CLI cho kỹ thuật viên.

## 4. LỘ TRÌNH THỰC HIỆN (TIMELINE)


| Giai đoạn            | Tên gọi & Mục tiêu                                                                          | Kết quả cụ thể (Output)                                   | Thời gian | Trạng thái      |
| -------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------- | --------------- |
| **GĐ 1: Khởi tạo**   | **Nền tảng & Kết nối (Foundation)** Mục tiêu: Thấy Mail tự động bay vào Database.           | - Cấu trúc dự án Hexagonal - Kết nối MongoDB & Email Sync | Tuần 1    | **Done**        |
| **GĐ 2: Thông minh** | **Trí tuệ & Phân loại (Intelligence)** Mục tiêu: Hệ thống tự "đọc hiểu" và gắn nhãn Ticket. | - Tích hợp Gemini AI - Phân loại Hard/Easy & Tags         | Tuần 2    | **In-Progress** |
| **GĐ 3: Tri thức**   | **Kho tri thức & Tra cứu (Knowledge)** Mục tiêu: Gõ lệnh là thấy hướng dẫn (SOP) từ Notion. | - Kết nối Notion API - Lệnh tra cứu giải pháp (Query)     | Tuần 3    | **Planned**     |
| **GĐ 4: Hoàn thiện** | **Tối ưu & Chuyển giao (Finalization)** Mục tiêu: Hệ thống chạy mượt, tài liệu đầy đủ.      | - Refactor code, Testing - Video Demo & Document          | Tuần 4    | **Planned**     |


## 5. KẾ HOẠCH TƯƠNG LAI (FUTURE PLAN - HƯỚNG PHÁT TRIỂN NÂNG CAO)

- **AI Feedback Loop:** Thiết lập cơ chế cho phép Mentor sửa lại nhãn AI bị sai để mô hình học hỏi từ dữ liệu thực tế.
- **Real-time Alerts:** Tích hợp cảnh báo qua Slack/Telegram khi có Ticket mức độ cao .
- **Impact Analytics:** Thống kê tỷ lệ Ticket xử lý nhờ SOP mà không cần hỏi Mentor để đo lường giá trị thực tế của hệ thống.
- **Engineering Excellence:** Viết Unit Tests và thiết lập CI/CD cơ bản để đảm bảo hệ thống luôn ổn định khi mở rộng.

