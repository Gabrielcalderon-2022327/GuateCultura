export class clienteException extends Error{
    constructor(message: string){
        super(message);
        this.name = "notFoundException";
    }
}