import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const Header = createParamDecorator((data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        return data ? request.headers?.[data] : request.headers;
    });