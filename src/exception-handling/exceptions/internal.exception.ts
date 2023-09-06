import {HttpException} from "@nestjs/common";
import {HandledExceptionDto} from "../dto/handled-exception.dto";

export class InternalException extends HttpException {
    code: string;
    body: any;
    title: string;

    constructor(internalException: HandledExceptionDto) {
        if (!InternalException.isInternalException(internalException)) {
            super('Internal error', 500);

            return;
        }

        const {message, code, title, status, body} = internalException;

        super(message, status)

        this.code = code;
        this.body = body;
        this.title = title;
    }

    static isInternalException = (ex) => ex.message && ex.code && ex.title && ex.status && ex.body;
}

