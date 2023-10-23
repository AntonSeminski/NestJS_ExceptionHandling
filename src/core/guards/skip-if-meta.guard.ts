import {CanActivate, ExecutionContext, Inject, Injectable, mixin} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";

/**
 * @description Skips guard execution if metadata is set to true;
 * @param metadataName - metadata name. Example: 'Skip Guards'.
 * @param guard - Nestjs Guard implementation.
 * @return Guard
 */
export const SkipIfMeta = (metadataName: string, guard: any): any => {

    @Injectable()
    class SkipIf extends guard implements CanActivate {
        @Inject(Reflector) private reflector;

        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            const meta: any = this.reflector.get(metadataName, context.getHandler());

            if (meta) return true;

            return super.canActivate(context);
        }
    }

    return mixin(SkipIf);
}