export class HandledExceptionDto {
    status: number;
    message: string;
    body: any;

    constructor(status, message, body = {}) {
        this.status = status;
        this.message = message;
        this.body = body;
    }
}