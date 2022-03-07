import {ArgumentsHost, Catch, HttpStatus} from '@nestjs/common';
import {HandledExceptionDto} from './handled-exception.dto';
import {HttpConstants} from './constants'
import {ExceptionHandler} from "./handlers/abstract/exception.handler";
import { FastifyReply } from 'fastify'

@Catch()
export class ExceptionFilter{
    handler: ExceptionHandler;

    constructor(handler: ExceptionHandler) {
        this.handler = handler;
    }

    catch(exception: any, host: ArgumentsHost): any {
        const context = host.switchToHttp();
        const response = context.getResponse<FastifyReply>();
        
        const handledException: HandledExceptionDto = this.handler?.handle(exception);
        const internalErrorException: HandledExceptionDto = {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message:
                exception.message
                    ? exception.message
                    : HttpConstants.errorMessages.UNKNOWN,
            body: {}
        }

        const responseException = handledException ? handledException : internalErrorException;

        console.log(`Exception : Reason : ${responseException.message}`)
        console.log(`Exception : Body : ${responseException.body}`)
        console.log(`Exception : ALL : ${JSON.stringify(responseException)}`)

        response
            .code(responseException.status)
            .send(responseException)
    }
}