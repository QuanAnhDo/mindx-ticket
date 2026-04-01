export interface TicketClassifierRespone{
    title: string,
    description: string
}

export interface ITicketClassifier{
    classify(ticketClassiferResponse: TicketClassifierRespone):Promise<string[]>
}