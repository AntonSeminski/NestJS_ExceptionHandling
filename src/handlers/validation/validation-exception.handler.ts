import {HandledExceptionDto} from "../../dto/handled-exception.dto";
import {ExceptionHandler} from "../abstract/exception.handler";
import {ValidationException} from "./validation.exception";
import {getException} from "../../services/exception.service";
import {CODES} from "../../constants/codes.constants";

export class ValidationExceptionHandler extends ExceptionHandler{
    handle(exception: any): HandledExceptionDto {
        if ( !(exception instanceof ValidationException) )
            return this.next?.handle(exception);

        const {code, message, status} = getException(CODES.VALIDATION);
        const body = exception.body;

        return new HandledExceptionDto({code, status, message, body});
    }
}