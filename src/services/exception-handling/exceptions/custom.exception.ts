import { HttpException } from "@nestjs/common";
import { getDefaultException } from "../services/exception.service";
import {ErrorDto} from "../dto/error.dto";

export class CustomException extends HttpException {
    code: string;
    body: any;
    title: string;

    constructor(code: string, options?:  { message?: string, title?: string, body?: any }) {
        const defaultException: ErrorDto = getDefaultException(code);

        const message = (options?.message)
            ? options.message
            : defaultException.message;
        const title = (options?.title)
            ? options.title
            : defaultException.title;

        super(message, defaultException.status);

        this.title = title;
        this.code = code;
        this.body = options?.body;
    }
}

