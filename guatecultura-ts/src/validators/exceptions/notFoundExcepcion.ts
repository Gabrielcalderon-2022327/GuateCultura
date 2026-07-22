export class notFoundException extends Error{
    constructor(message: string){
        super(message);
        this.name = "notFoundException";
    }
}