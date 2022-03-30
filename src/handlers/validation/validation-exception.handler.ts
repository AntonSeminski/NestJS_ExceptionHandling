import {HandledExceptionDto} from "../../dto/handled-exception.dto";
import {ExceptionHandler} from "../abstract/exception.handler";
import {ValidationException} from "./validation.exception";
import {getException} from "../../services/exception.service";
import {API_ERROR_CODES} from "@jira-killer/constants";

class ValidationExceptionHandler extends ExceptionHandler{
    handle(exception: any): HandledExceptionDto {
        if ( !(exception instanceof ValidationException) )
            return this.next?.handle(exception);

        const {code, message, status} = getException(API_ERROR_CODES.VALIDATION);
        const body = exception.body;

        return new HandledExceptionDto({code, status, message, body});
    }
}

export {ValidationExceptionHandler}