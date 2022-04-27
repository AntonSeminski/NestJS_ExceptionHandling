import {MongoExceptionHandler} from "../handlers/mongo/mongo-exception.handler";
import {ValidationExceptionHandler} from "../handlers/validation/validation-exception.handler";
import {CustomExceptionHandler} from "../handlers/custom/custom-exception.handler";
import {HttpExceptionHandler} from "../handlers/http/http-exception.handler";

export const handlersChain = [
    new MongoExceptionHandler(),
    new ValidationExceptionHandler(),
    new CustomExceptionHandler(),
    new HttpExceptionHandler()
];