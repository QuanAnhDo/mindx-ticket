
export interface IDeleteTicket{
    execute(id: string):Promise<void>;
}