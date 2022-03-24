import {CustomException} from "../exceptions/custom.exception";
import {CODES} from "../constants/codes.constants";
import {ERROR_BY_CODE} from "../constants/error-by-code.constants";
import {ErrorDto} from "../dto/error.dto";
import {getArguments, zip} from "./utils";

const getException = (code: string): ErrorDto =>
    JSON.stringify(CODES).includes(code)
        ? ERROR_BY_CODE.get(code)
        : ERROR_BY_CODE.get(CODES.COMMON.UNKNOWN)

const throwException = (code: string, body: any = {}) => {
    if (!code) throwException(CODES.COMMON.EMPTY_PARAM)

    throw new CustomException(code, body);
}

const throwEmptyParam = (func: Function) => {
    const argumentNames = getArguments(func);
    const argumentValues = func.arguments;

    const valueByField = zip(argumentNames, argumentValues);
    const functionName = func.name;

    throwException(CODES.COMMON.EMPTY_PARAM, {functionName, valueByField});
}

export {getException, throwException, throwEmptyParam}