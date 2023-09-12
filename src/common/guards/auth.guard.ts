import {CanActivate, ExecutionContext, Inject, Injectable, mixin} from '@nestjs/common';
import {JwtTokenService} from "../../jwt";
import {throwException} from "../../exception-handling";
import {HttpConstants} from "../../constants";
import {CODES} from "@buildery/error-codes";

export const AuthGuard: any = (tokenServiceType: JwtTokenService) => {
    @Injectable()
    class Auth implements CanActivate {
        @Inject(tokenServiceType) private tokenService;

        async canActivate(context: ExecutionContext,): Promise<boolean> {
            const request = context.switchToHttp().getRequest();

            try {
                let accessToken: string;

                const [domain, app, base] = request.headers['origin']
                    ?.substring(`${process.env.PROTOCOL_NAME}://`.length) //skip http://
                    ?.split('.') ?? [];

                if (domain) {
                    accessToken = request.cookies[`${domain}.${HttpConstants.COOKIE_NAMES.ACCESS_TOKEN}`];
                }

                if (!accessToken && request.headers.authorization) {
                    const [type, token] = request.headers.authorization?.split(' ') ?? [];

                    if (type !== 'Bearer') throwException(CODES.USER.NOT_LOGGED_IN);

                    accessToken = token;
                }

                if (!accessToken) throwException(CODES.USER.NOT_LOGGED_IN);

                request.user = await this.tokenService.verify(accessToken);

                return true;
            } catch (e) {
                throwException(e.message);
            }
        }
    }

    return mixin(Auth);
}
