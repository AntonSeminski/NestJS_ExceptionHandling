export class HandledExceptionDto {
    code: string;
    status: number;
    title: string;
    message: string;
    body: any;
    stack?: any;

    constructor(exception: any) {
        this.code = exception?.code;
        this.status = exception?.status;
        this.title = exception?.title;
        this.message = exception?.message;
        this.body = exception?.body;
        this.stack = exception?.stack;
    }
}