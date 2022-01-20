import {HttpStatus, ValidationError} from "@nestjs/common";
import {CustomException} from "../../custom.exception";

export class ValidationException extends CustomException {
    constructor(validationErrors: ValidationError[]) {
        super({}, HttpStatus.BAD_REQUEST, {});

        this.body = {
            errors: this.getErrorMessages(validationErrors)
        };
    }

    getErrorMessages(validationErrors: ValidationError[]) {
        if (!validationErrors)
            return [];

        let errorMessages: string[] = [];

        validationErrors.forEach(error => {
            for (const [key, value] of Object.entries(error.constraints))
            {
                errorMessages.push(value)
            }
        });

        return errorMessages;
    }
}