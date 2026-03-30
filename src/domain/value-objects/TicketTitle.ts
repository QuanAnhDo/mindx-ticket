export class TicketTitle{
    private readonly value: string;

    constructor(value: string){
        const trimmedValue = value.trim();

        if(!trimmedValue){
            throw new Error('Title can not be empty');
        }

        if(trimmedValue.length < 5 || trimmedValue.length > 100){
            throw new Error('The ticket title must be between 5 and 100 characters long. ')
        }

        this.value = trimmedValue;
    }

    public getValue(): string {
        return this.value;
      }
      public equals(other: TicketTitle): boolean {
        if (other === null || other === undefined) {
          return false;
        }
        return this.value === other.getValue();
      }
}