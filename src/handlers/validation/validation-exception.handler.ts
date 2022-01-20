import {HandledExceptionDto} from "../../handled-exception.dto";
import {ExceptionHandler} from "../abstract/exception.handler";
import {ValidationException} from "./validation.exception";
import {HttpConstants} from "../../constants";
import {HttpStatus} from "@nestjs/common";

export class ValidationExceptionHandler extends ExceptionHandler{
    handle(exception: any): HandledExceptionDto {
        if ( !(exception instanceof ValidationException) )
            return this.next?.handle(exception);

        const status = exception.getStatus() ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message= exception.message ? exception.message : HttpConstants.errorMessages.UNKNOWN;
        const body = exception.body;

        return new HandledExceptionDto(status, message, body);
    }
}