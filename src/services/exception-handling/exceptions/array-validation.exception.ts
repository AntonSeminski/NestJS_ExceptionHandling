import {CODES} from "@buildery/error-codes";
import {CustomException} from "./custom.exception";
import {ArrayValidation} from "../types";

export class ArrayUpsertValidationException extends CustomException {
    constructor(arrayValidationExceptions: Array<ArrayValidation>) {
        super(CODES.VALIDATION);

        this.body = {
            errors: arrayValidationExceptions
        }
    }
}