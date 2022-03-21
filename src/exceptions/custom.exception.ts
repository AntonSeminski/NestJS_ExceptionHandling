import {HttpException} from "@nestjs/common";
import {getException} from "../services/exception.service";

export class CustomException extends HttpException {
    body: any;

    constructor(code: string, body: any = {}) {
        const {status, message} = getException(code);

        super(message, status)

        this.body = body;
    }
}

