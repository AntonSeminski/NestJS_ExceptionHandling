import {HandledExceptionDto} from "../../dto/handled-exception.dto";

export abstract class ExceptionHandler {
    next: ExceptionHandler;

    abstract handle(exception: any): HandledExceptionDto;

    setNext(next: ExceptionHandler) {
        this.next = next;
    }
}