import {HttpException} from "@nestjs/common";
import {getException} from "../services/exception.service";

export class CustomException extends HttpException {
    code: string;
    body: any;

    constructor(code: string, body: any = {}) {
        const {status, message} = getException(code);

        super(message, status)

        this.code = code;
        this.body = body;
    }
}

