import {JwtService} from "@nestjs/jwt";
import {API_ERROR_CODES} from '@jira-killer/constants'
import {JwtTokenService} from "../jwt";
import {isHasEmpty, throwException} from "../exception-handling";

const validateAuthInfo = async (request, authType, jwtService: JwtTokenService) => {
    if (isHasEmpty(request, authType, jwtService))
        throwException(API_ERROR_CODES.COMMON.EMPTY_PARAM, {
            method: 'checkAuthorizationInfo',
            fields: {authType, jwtService}
        });

    const authHeader = request.headers?.authorization;

    if (!authHeader)
        throwException(API_ERROR_CODES.AUTH.NO_AUTH_HEADER);

    const [type, token] = authHeader.split(' ');

    if (type !== authType)
        throwException(API_ERROR_CODES.AUTH.WRONG_AUTH_TYPE);

    if (!token)
        throwException(API_ERROR_CODES.AUTH.NO_TOKEN);

    const payload = await jwtService.verify(token)
        .catch(error => throwException(API_ERROR_CODES.AUTH.INVALID_TOKEN, {reason: error.message}));

    if (!payload)
        throwException(API_ERROR_CODES.AUTH.NO_TOKEN_PAYLOAD);

    return payload;
}

const getAuthInfo = async (authHeader: string): Promise<any> => {
    if (isHasEmpty(authHeader)) throwException(API_ERROR_CODES.AUTH.NO_AUTH_HEADER);

    const [type, token] = authHeader.split(' ');

    return new JwtService({}).decode(token);
}

const getAuthInfoByName = async (request, fieldName: string) => {
    if (request.user) return request.user[fieldName];

    return getAuthInfo(request.headers.authorization).then(payload => payload[fieldName]);
}

const getAuthInfoByNames = async (request, fieldNames: string[]) => {
    if (request.user) return fieldNames.map(fieldName => request.user[fieldName]);

    const authPayload = await getAuthInfo(request.headers.authorization);

    return fieldNames.map(fieldName => authPayload[fieldName]);
}

const getUserId = async (request) => getAuthInfoByName(request, '_id');

const getUserRole = async (request) => getAuthInfoByName(request, 'role');

export {
    validateAuthInfo, getAuthInfo,
    getAuthInfoByName, getAuthInfoByNames, getUserId, getUserRole
}
