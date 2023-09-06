import {ExceptionHandler} from "../abstract/exception.handler";
import {HandledExceptionDto} from "../../dto/handled-exception.dto";
import {InternalException} from "../../exceptions/internal.exception";

export class InternalExceptionHandler extends ExceptionHandler {
    handle(exception: any): HandledExceptionDto {
        if ( !(exception instanceof InternalException) )
            return this.next?.handle(exception)

        console.log(`Internal exception`)
        console.log(`Internal exception: ${JSON.stringify(exception)}`)

        return new HandledExceptionDto(exception);
    }
}