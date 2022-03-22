import {ArgumentsHost, Catch} from '@nestjs/common';
import {HandledExceptionDto} from '../dto/handled-exception.dto';
import {ExceptionHandler} from "../handlers/abstract/exception.handler";
import {FastifyReply} from 'fastify'
import {getException} from "../services/exception.service";
import {CODES} from "../constants/codes.constants";

@Catch()
export class ExceptionFilter {
    handler: ExceptionHandler;

    constructor(handler: ExceptionHandler) {
        this.handler = handler;
    }

    catch(exception: any, host: ArgumentsHost): any {
        const context = host.switchToHttp();
        const response = context.getResponse<FastifyReply>();

        const handledException: HandledExceptionDto = this.handler?.handle(exception);
        const internalErrorException: HandledExceptionDto = new HandledExceptionDto(getException(CODES.COMMON.UNKNOWN));

        const responseException = handledException ? handledException : internalErrorException;

        console.log(`Exception : ${JSON.stringify(responseException)}`)

        response
            .code(responseException.status)
            .send(responseException)
    }
}