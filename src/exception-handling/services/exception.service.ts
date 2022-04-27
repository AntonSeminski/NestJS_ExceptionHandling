import {CustomException} from "../exceptions/custom.exception";
import {API_ERROR_CODES, ERROR_BY_CODE} from "@jira-killer/constants";
import {ErrorDto} from "../dto/error.dto";
import {getArguments, zip} from "./utils";

const getException = (code: string): ErrorDto =>
    JSON.stringify(API_ERROR_CODES).includes(code)
        ? ERROR_BY_CODE.get(code)
        : ERROR_BY_CODE.get(API_ERROR_CODES.COMMON.UNKNOWN)

const throwException = (code: string, body: any = {}) => {
    if (!code) throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM)

    throw new CustomException(code, body);
}

const throwEmptyParam = (func: Function) => {
    const argumentNames = getArguments(func);
    const argumentValues = func.arguments;

    const valueByField = zip(argumentNames, argumentValues);
    const functionName = func.name;

    throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {functionName, valueByField});
}

export {getException, throwException, throwEmptyParam}