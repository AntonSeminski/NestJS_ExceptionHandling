import {HttpStatus} from "../constants/http-status.constants";

export class ErrorDto {
    code: string;
    status?: number | HttpStatus;
    message?: string;
    body?: any;
}
