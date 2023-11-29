import { JwtService } from "@nestjs/jwt";
import { CODES } from "@buildery/error-codes";
import { isHasEmpty, JwtTokenService, throwException } from "../../services";

export class AuthInfo {
    static validate = async (request, authType, jwtService: JwtTokenService) => {
        if (isHasEmpty(request, authType, jwtService))
            throwException(CODES.COMMON.EMPTY_PARAM, {
                method: 'checkAuthorizationInfo',
                fields: {authType, jwtService}
            });

        const authHeader = request.headers?.authorization;
        if (!authHeader) throwException(CODES.AUTH.NO_AUTH_HEADER);

        const [type, token] = authHeader.split(' ');
        if (type !== authType) throwException(CODES.AUTH.WRONG_AUTH_TYPE);
        if (!token) throwException(CODES.AUTH.NO_TOKEN);

        const payload = await jwtService
            .verify(token)
            .catch(error => throwException(
                CODES.AUTH.WRONG_CREDENTIALS,
                {reason: error.message, tokenType: this.getByName(request, 'tokenType')})
            );

        if (!payload) throwException(CODES.AUTH.NO_TOKEN_PAYLOAD);

        return payload;
    }

    static getAll = async (request): Promise<any> => {
        if (!request) throwException(CODES.COMMON.EMPTY_PARAM, {
            method: 'getAll',
            params: {request: request}
        });

        const authHeader = request.headers.authorization;
        if (!authHeader) throwException(CODES.AUTH.NO_AUTH_HEADER);

        const token = authHeader.split(' ')?.[1];
        if (!token) throwException(CODES.AUTH.NO_TOKEN);

        return new JwtService({}).decode(token);
    }

    static getAllFromHeader = async (authHeader: string): Promise<any> => {
        if (isHasEmpty(authHeader)) throwException(CODES.AUTH.NO_AUTH_HEADER);

        const token = authHeader.split(' ')?.[1];
        if (!token) throwException(CODES.AUTH.NO_TOKEN);

        return new JwtService({}).decode(token);
    }

    static getByName = async (request, fieldName: string) => {
        if (request.user) return request.user[fieldName];

        return this.getAllFromHeader(request.headers.authorization).then(payload => payload[fieldName]);
    }

    static getByNames = async (request, fieldNames: string[]) => {
        if (request.user) return fieldNames.map(fieldName => request.user[fieldName]);

        const authPayload = await this.getAllFromHeader(request.headers.authorization);

        return fieldNames.map(fieldName => authPayload[fieldName]);
    }

    static getAllPermissionSets = async (request) => {
        return [
            ...(await this.getByName(request, 'permissionsSets') ?? []),
            await this.getByName(request, 'profile')]
        ;
    }

    static getPermissionSets = async (request) => this.getByName(request, 'permissionsSets');

    static getProfile = async (request) => this.getByName(request, 'profile');

    static getUserId = async (request) => this.getByName(request, '_id');

    static getUserRole = async (request) => this.getByName(request, 'role');
}
