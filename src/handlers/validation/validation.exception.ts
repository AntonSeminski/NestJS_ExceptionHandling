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
            return []

        let errorMessages = []

        validationErrors.forEach(error => {
            if (error.constraints)
                Object.entries(error.constraints).forEach( ([key, value]) => errorMessages.push(value))

            if (error.children && error.property){
                const errors = [...this.getErrorMessages(error.children)]

                if (errors.length > 0) errorMessages.push({property: error.property, errors: errors})
            }
        })

        return errorMessages;
    }
}