import {SetMetaIf, SkipIfMeta} from "../guards";
import {applyDecorators, UseGuards} from "@nestjs/common";
import {RequestBooleanFunction} from "../types";

/**
 * @description Skips guard execution if condition is true.
 * @param condition Function that accepts request and returns boolean;
 * @param guard Nestjs Guard implementation.
 * @return MethodDecorator | ClassDecorator
 */
export const SkipGuardIf = (condition: RequestBooleanFunction, guard: any) => {
    const randomMetadataName = 'SkipIf' + Math.random().toFixed(3);

    return applyDecorators(
        UseGuards(
            SetMetaIf(randomMetadataName, condition),
            SkipIfMeta(randomMetadataName, guard)
        )
    )
}