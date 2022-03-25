import {ExceptionHandler} from "../abstract/exception.handler";
import {HandledExceptionDto} from "../../dto/handled-exception.dto";
import {CustomException} from "../../exceptions/custom.exception";

export class CustomExceptionHandler extends ExceptionHandler {
    handle(exception: any): HandledExceptionDto {
        if ( !(exception instanceof CustomException) )
            return this.next?.handle(exception)

        return new HandledExceptionDto(exception);
    }
}