import {HttpException} from "@nestjs/common";
import {getException} from "../services/exception.service";

export class CustomException extends HttpException {
    code: string;
    body: any;
    title: string;

    constructor(code: string, body: any = {}) {
        const {status, message, title} = getException(code);

        super(message, status)

        this.title = title;
        this.code = code;
        this.body = body;
    }
}

