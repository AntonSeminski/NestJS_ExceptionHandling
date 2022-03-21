export class HandledExceptionDto {
    code: string;
    status: number;
    message: string;
    body: any;

    constructor(exception: any) {
        this.code = exception?.code;
        this.status = exception?.status;
        this.message = exception?.message;
        this.body = exception?.body;
    }
}