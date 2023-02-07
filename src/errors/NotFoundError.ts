import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError{
    constructor(
        message: string = "Requisição não encontrdada"
    ){
        super(404, message)
    }
}