import { ValidationError } from "@nestjs/common";
import { ValidationException } from "../../exceptions/validation.exception";

export const validationExceptionFactory = (validationErrors: ValidationError[] = []) => {
    return new ValidationException(validationErrors)
}