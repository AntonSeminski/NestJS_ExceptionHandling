import {ExceptionHandler} from "../abstract/exception.handler";
import {HandledExceptionDto} from "../../dto/handled-exception.dto";
import {CustomException} from "../../exceptions/custom.exception";
import {getException} from "../../services/exception.service";
import {CODES} from "../../constants/codes.constants";


export class CustomExceptionHandler extends ExceptionHandler {
    handle(exception: any): HandledExceptionDto {
        if ( !(exception instanceof CustomException) )
            return this.next?.handle(exception)

        const  {code, message: codeMessage, status: codeStatus} = getException(CODES.COMMON.HTTP);

        const status = exception.getStatus() ? exception.getStatus() : codeStatus;
        const message= exception.message ? exception.message : codeMessage;

        return new HandledExceptionDto({code, status, message});
    }

}