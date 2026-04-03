import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ITicketClassifier, TicketClassifierRespone } from "../../application/ports/ITicketClassifier.js";


export class GeminiTicketClassifier implements ITicketClassifier{
    private genAI: GoogleGenerativeAI;

    constructor(apiKey: string){
        this.genAI = new GoogleGenerativeAI(apiKey);

    }
    async classify(ticketClassiferResponse: TicketClassifierRespone): Promise<string[]> {
        try{
            const { title, description } = ticketClassiferResponse;
            const model = this.genAI.getGenerativeModel({model: "gemini-1.5-flash"});

            const prompt = `
            Bạn là một chuyên gia phân loại yêu cầu hỗ trợ (Support Ticket).
            Nhiệm vụ: Phân tích tiêu đề và mô tả dưới đây để trả về các nhãn phù hợp.    
            Các nhãn có thể là: 'easy','hard', 'urgent', 'bug', 'feature_request', 'payment'.
            Quy tắc:
            - Chỉ trả về một mảng JSON các chuỗi (strings). Ví dụ: ["bug", "urgent"]
            - Không giải thích gì thêm.   
                Tiêu đề: "${title}"
                Mô tả: "${description}"  
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text().trim();
            
            // Clean the response to ensure it's valid JSON
            const jsonMatch = text.match(/\[.*\]/s);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            
            return [];
        }catch(error: any){
            console.error("[Gemini Classifier Error]: ", error.message);
            return [];
        }
    }
}
