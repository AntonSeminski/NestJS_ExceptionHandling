import {ExceptionHandler} from "../abstract/exception.handler";
import {HandledExceptionDto} from "../../dto/handled-exception.dto";
import {CustomException} from "../../exceptions/custom.exception";
import {CODES} from "../../constants/codes.constants";


export class CustomExceptionHandler extends ExceptionHandler {
    handle(exception: any): HandledExceptionDto {
        if ( !(exception instanceof CustomException) )
            return this.next?.handle(exception)

        const code = exception.code ? exception.code : CODES.COMMON.HTTP;
        const status = exception.getStatus();
        const message= exception.message;

        return new HandledExceptionDto({code, status, message});
    }

}