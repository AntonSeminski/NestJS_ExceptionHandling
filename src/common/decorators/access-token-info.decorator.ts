import {createParamDecorator} from "@nestjs/common";
import {getAuthInfo} from "../../utils";

export const AccessTokenInfo = createParamDecorator(
    async (data: string, context) => {
        const request = context.switchToHttp().getRequest();

        const info = await getAuthInfo(request.headers.authorization);

        if (data) return info[data]

        return info;
    })