import {ValidationError} from "@nestjs/common";
import {ValidationException} from "./validation.exception";

export const validationExceptionFactory = (validationErrors: ValidationError[] = []) => {
    return new ValidationException(validationErrors)
}