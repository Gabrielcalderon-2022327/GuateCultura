export class emptyDataException extends Error{
    constructor(message: string){
        super(message);
        this.name = "notFoundException";
    }
}