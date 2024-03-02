import { MongoError } from "mongodb";
import { CODES } from "@buildery/error-codes";
import { ExceptionHandler } from "../abstract/exception.handler";
import { HandledExceptionDto } from "../../dto/handled-exception.dto";
import { getDefaultException } from "../../services/exception.service";

export class MongoExceptionHandler extends ExceptionHandler{
    handle(exception: any): HandledExceptionDto {
        if ( !(exception instanceof MongoError) )
            return this.next?.handle(exception);

        console.log(`MONGO EXCEPTION: ${JSON.stringify(exception)}`);

        switch (exception.code) {
            case 11000:
                const {code, status, message, title} = getDefaultException(CODES.DATABASE.DUPLICATE);

                return new HandledExceptionDto({code, status, title, message});
        }

        return null;
    }
}