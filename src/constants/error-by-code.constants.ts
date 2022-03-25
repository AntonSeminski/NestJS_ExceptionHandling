import {HttpStatus} from "./http-status.constants";
import {CODES} from "./codes.constants";

export const ERROR_BY_CODE = new Map([
        [CODES.USER.DUPLICATE, {
            code: CODES.USER.DUPLICATE,
            status: HttpStatus.BAD_REQUEST,
            message: 'Duplicate user!'
        }],
        [CODES.USER.NOT_FOUND, {
            code: CODES.USER.NOT_FOUND,
            status: HttpStatus.BAD_REQUEST,
            message: 'User not found!!! !!!ъуъ'
        }],
        [CODES.USER.INACTIVE, {
            code: CODES.USER.INACTIVE,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Inactive user! Please check your email to activate!'
        }],
        [CODES.USER.EDIT_ONLY_YOURSELF, {
            code: CODES.USER.EDIT_ONLY_YOURSELF,
            status: HttpStatus.FORBIDDEN,
            message: 'You can edit you user ONLY!'
        }],
        [CODES.USER.WRONG_PASSWORD, {
            code: CODES.USER.WRONG_PASSWORD,
            status: HttpStatus.BAD_REQUEST,
            message: 'Wrong password!'
        }],
        [CODES.USER.NOT_LOGGED_IN, {
            code: CODES.USER.NOT_LOGGED_IN,
            status: HttpStatus.BAD_REQUEST,
            message: 'Not Logged IN!'
        }],


        [CODES.AUTH.INVALID_SPECIAL_CODE, {
            code: CODES.AUTH.INVALID_SPECIAL_CODE,
            status: HttpStatus.UNAUTHORIZED,
            message: 'No special code found!'
        }],
        [CODES.AUTH.NO_AUTH_HEADER, {
            code: CODES.AUTH.NO_AUTH_HEADER,
            status: HttpStatus.UNAUTHORIZED,
            message: 'No Authorization Data (Header)!!'
        }],
        [CODES.AUTH.WRONG_AUTH_TYPE, {
            code: CODES.AUTH.WRONG_AUTH_TYPE,
            status: HttpStatus.UNAUTHORIZED,
            message: 'Wrong Auth Type!'
        }],
        [CODES.AUTH.NO_TOKEN, {
            code: CODES.AUTH.NO_TOKEN,
            status: HttpStatus.UNAUTHORIZED,
            message: 'No Token found!'
        }],
        [CODES.AUTH.NO_TOKEN_PAYLOAD, {
            code: CODES.AUTH.NO_TOKEN_PAYLOAD,
            status: HttpStatus.UNAUTHORIZED,
            message: 'No token payload found!'
        }],


        [CODES.SESSION.EMPTY, {
            code: CODES.SESSION.EMPTY,
            status: HttpStatus.UNAUTHORIZED,
            message: 'No session found!'
        }],
        [CODES.SESSION.EXPIRED, {
            code: CODES.SESSION.EXPIRED,
            status: HttpStatus.UNAUTHORIZED,
            message: 'Session has expired!'
        }],
        [CODES.SESSION.WRONG_DEVICE, {
            code: CODES.SESSION.EMPTY,
            status: HttpStatus.UNAUTHORIZED,
            message: 'False dragon!'
        }],


        [CODES.COMMON.UNKNOWN, {
            code: CODES.COMMON.UNKNOWN,
            status: HttpStatus.BAD_REQUEST,
            message: 'Wooopsy, Unknown error! Please contact administrator!'
        }],
        [CODES.COMMON.HTTP, {
            code: CODES.COMMON.HTTP,
        }],
        [CODES.COMMON.EMPTY_EMAIL, {
            code: CODES.COMMON.EMPTY_EMAIL,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Empty email!'
        }],
        [CODES.COMMON.EMPTY_PARAM, {
            code: CODES.COMMON.EMPTY_PARAM,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: `Empty param!`
        }],


        [CODES.CODE.INVALID, {
            code: CODES.CODE.INVALID,
            status: HttpStatus.UNAUTHORIZED,
            message: `Grogu knows this cookie, but it is bad cookie! Grogu don't eat it!`
        }],
        [CODES.CODE.UNKNOWN, {
            code: CODES.CODE.UNKNOWN,
            status: HttpStatus.UNAUTHORIZED,
            message: `Grogu doesn't know this cookie! Grogu won't eat it!`
        }],
        [CODES.CODE.EXPIRED, {
            code: CODES.CODE.EXPIRED,
            status: HttpStatus.UNAUTHORIZED,
            message: `Grogu knows this cookie is stale! Grogu won't eat it!`
        }],
        [CODES.CODE.WRONG_RELATED_TO, {
            code: CODES.CODE.WRONG_RELATED_TO,
            status: HttpStatus.UNAUTHORIZED,
            message: `Grogu won't eat stolen cookie!`
        }],


        [CODES.DATABASE.DUPLICATE, {
            code: CODES.DATABASE.DUPLICATE,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: `Duplicate record!`
        }],


        [CODES.VALIDATION, {
            code: CODES.VALIDATION,
            status: HttpStatus.BAD_REQUEST,
            message: `Validation error! Please refer body for details!`
        }],


        [CODES.HTTP["400"], {
            code: CODES.HTTP["400"],
            status: HttpStatus.BAD_REQUEST,
            message: 'Bad Request!'
        }],
        [CODES.HTTP["401"], {
            code: CODES.HTTP["401"],
            status: HttpStatus.UNAUTHORIZED,
            message: 'Unauthorized!'
        }],
        [CODES.HTTP["403"], {
            code: CODES.HTTP["403"],
            status: HttpStatus.FORBIDDEN,
            message: 'Forbidden Resource!'
        }],
        [CODES.HTTP["404"], {
            code: CODES.HTTP["404"],
            status: HttpStatus.NOT_FOUND,
            message: 'Not found!'
        }],


        [CODES.LICENSE.NOT_FOUND, {
            code: CODES.LICENSE.NOT_FOUND,
            status: HttpStatus.BAD_REQUEST,
            message: `No such license found!`
        }],


        [CODES.WORKSPACE.NO_ACCESS, {
            code: CODES.WORKSPACE.NO_ACCESS,
            status: HttpStatus.UNAUTHORIZED,
            message: `User does not have access to this workspace!`
        }],
        [CODES.WORKSPACE.NOT_FOUND, {
            code: CODES.WORKSPACE.NOT_FOUND,
            status: HttpStatus.BAD_REQUEST,
            message: `No such Workspace found!`
        }],


        [CODES.FEATURE.NOT_AVAILABLE, {
            code: CODES.FEATURE.NOT_AVAILABLE,
            status: HttpStatus.FORBIDDEN,
            message: `This Feature is not available for you license!`
        }],


        [CODES.PERMISSION.NOT_FOUND, {
            code: CODES.PERMISSION.NOT_FOUND,
            status: HttpStatus.FORBIDDEN,
            message: `You don't have necessery permissions to enter!`
        }],
        [CODES.PERMISSION.NONE_AVAILABLE, {
            code: CODES.PERMISSION.NONE_AVAILABLE,
            status: HttpStatus.FORBIDDEN,
            message: `You don't have any permissions!`
        }],
    ]
)