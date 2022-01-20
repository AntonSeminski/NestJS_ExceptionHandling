import {HandledExceptionDto} from "../../handled-exception.dto";
import {HttpException, HttpStatus} from "@nestjs/common";
import {ExceptionHandler} from "../abstract/exception.handler";
import {HttpConstants} from "../../constants";

export class HttpExceptionHandler extends ExceptionHandler{
    handle(exception: any): HandledExceptionDto {
        if ( !(exception instanceof HttpException) )
            return this.next?.handle(exception);

        const status = exception.getStatus() ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message= exception.message ? exception.message : HttpConstants.errorMessages.UNKNOWN;

        return new HandledExceptionDto(status, message);
    }
}