import {CanActivate, ExecutionContext, Injectable, mixin} from "@nestjs/common";
import {RequestBooleanFunction} from "../types";

/**
 * @description Sets true to metadata if `why` returns true;
 * @param metadataName - metadata name. Example: 'Skip Guards'.
 * @param why - Function that accepts request and returns boolean;
 */
export const SetMetaIf = (metadataName: string, why: RequestBooleanFunction): any => {

    @Injectable()
    class SetMetaIf implements CanActivate {
        async canActivate(context: ExecutionContext): Promise<boolean> {
            const request = context.switchToHttp().getRequest();

            if (why(request))
                Reflect.defineMetadata(metadataName, true, context.getHandler());

            return true;
        }
    }

    return mixin(SetMetaIf);
}
