import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const UserAgentInfo = createParamDecorator((data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        return request.headers?.['user-agent'];
    }
);