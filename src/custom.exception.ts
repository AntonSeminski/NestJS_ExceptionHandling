import {HttpException} from "@nestjs/common";

export class CustomException extends HttpException {
    body: any;

    constructor(response: string | Record<string, any> = {}, status: number, body: any = {}) {
        super(response, status);

        this.body = body;
    }
}