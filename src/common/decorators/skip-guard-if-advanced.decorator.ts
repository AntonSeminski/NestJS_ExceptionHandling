import {SetMetaIfAdvanced, SkipIfMeta} from "../guards";
import {applyDecorators, UseGuards} from "@nestjs/common";

/**
 * @description Skips guard execution if condition is true.
 * @param condition Injectable class that implements IIs interface (has is(request):boolean method)
 * @param guard Nestjs Guard implementation.
 * @return MethodDecorator | ClassDecorator
 */
export const SkipGuardIfAdvanced = (condition: any, guard: any) => {
    const randomMetadataName = 'SkipIf' + Math.random().toFixed(3);

    return applyDecorators(
        UseGuards(
            SetMetaIfAdvanced(randomMetadataName, condition),
            SkipIfMeta(randomMetadataName, guard)
        )
    )
}