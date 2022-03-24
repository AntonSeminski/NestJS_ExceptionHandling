import {HandledExceptionDto} from "../../dto/handled-exception.dto";
import {HttpException} from "@nestjs/common";
import {ExceptionHandler} from "../abstract/exception.handler";
import {getException} from "../../services/exception.service";
import {CODES} from "../../constants/codes.constants";

export class HttpExceptionHandler extends ExceptionHandler {
    handle(exception: any): HandledExceptionDto {
        if (!(exception instanceof HttpException))
            return this.next?.handle(exception);

        const status = exception.getStatus();

        const {code, message: codeMessage} = getException(CODES.HTTP[status]);

        const message = exception.message ? exception.message : codeMessage;

        return new HandledExceptionDto({code, status, message});
    }
}