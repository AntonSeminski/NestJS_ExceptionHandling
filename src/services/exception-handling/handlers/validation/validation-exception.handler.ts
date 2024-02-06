import { HandledExceptionDto } from "../../dto/handled-exception.dto";
import { ExceptionHandler } from "../abstract/exception.handler";
import { ValidationException } from "../../exceptions/validation.exception";

class ValidationExceptionHandler extends ExceptionHandler{
    handle(exception: any): HandledExceptionDto {
        if ( !(exception instanceof ValidationException) )
            return this.next?.handle(exception);

        console.log(`Validation exception`)
        console.log(`Validation exception: ${JSON.stringify(exception)}`)

        return new HandledExceptionDto(exception);
    }
}

export {ValidationExceptionHandler}