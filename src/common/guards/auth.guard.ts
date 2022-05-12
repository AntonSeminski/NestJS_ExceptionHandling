import {CanActivate, ExecutionContext, Inject, Injectable, mixin} from '@nestjs/common';
import {JwtTokenService} from "../../jwt";
import {AuthInfo} from "../../utils/request.utils";

export const AuthGuard: any = (tokenServiceType: JwtTokenService) => {
    @Injectable()
    class Auth implements CanActivate {
        constructor(@Inject(tokenServiceType) private tokenService) {}

        async canActivate(context: ExecutionContext,): Promise<boolean> {
            const request = context.switchToHttp().getRequest();
            const authTokenType = process.env.AUTH_TOKEN_TYPE ?? 'Bearer';

            request.user = await AuthInfo.validate(request, authTokenType, this.tokenService);

            return true;
        }
    }

    return mixin(Auth);
}
