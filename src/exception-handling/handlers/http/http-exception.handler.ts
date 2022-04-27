import {HandledExceptionDto} from "../../dto/handled-exception.dto";
import {HttpException} from "@nestjs/common";
import {ExceptionHandler} from "../abstract/exception.handler";
import {getException} from "../../services/exception.service";
import {API_ERROR_CODES} from "@jira-killer/constants";

export class HttpExceptionHandler extends ExceptionHandler {
    handle(exception: any): HandledExceptionDto {
        if (!(exception instanceof HttpException))
            return this.next?.handle(exception);

        console.log(`Http exception`)
        console.log(`Http exception: ${JSON.stringify(exception)}`)

        const status = exception.getStatus();

        const error = getException(API_ERROR_CODES.HTTP[status]);

        error.message = exception.message ? exception.message : error.message;

        return new HandledExceptionDto(error);
    }
}