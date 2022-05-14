import {CanActivate, ExecutionContext, Inject, Injectable, mixin} from "@nestjs/common";

/**
 * @description Sets true to metadata if why.is returns true;
 * @param metadataName - metadata name. Example: 'Skip Guards'.
 * @param why - Injectable class that implements IIs interface (has is(request):boolean method)
 * @return Guard.
 */
export const SetMetaIfAdvanced = (metadataName: string, why: any): any => {

    @Injectable()
    class SetMetaIfAdvanced implements CanActivate {
        @Inject(why) private why;

        async canActivate(context: ExecutionContext): Promise<boolean> {
            const request = context.switchToHttp().getRequest();

            if (await this.why.is(request))
                Reflect.defineMetadata(metadataName, true, context.getHandler());

            return true;
        }
    }

    return mixin(SetMetaIfAdvanced);
}
