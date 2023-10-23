import {HandledExceptionDto} from "../../dto/handled-exception.dto";
import {HttpException} from "@nestjs/common";
import {ExceptionHandler} from "../abstract/exception.handler";
import {getException} from "../../services/exception.service";
import {CODES} from "@buildery/error-codes";

export class HttpExceptionHandler extends ExceptionHandler {
    handle(exception: any): HandledExceptionDto {
        if (!(exception instanceof HttpException))
            return this.next?.handle(exception);

        console.log(`Http exception`)
        console.log(`Http exception: ${JSON.stringify(exception)}`)

        const status = exception.getStatus();

        const error = getException(CODES.HTTP[status]);

        error.message = exception.message ? exception.message : error.message;

        return new HandledExceptionDto(error);
    }
}