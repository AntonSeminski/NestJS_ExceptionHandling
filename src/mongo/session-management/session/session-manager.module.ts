import {Global, Module} from "@nestjs/common";
import {SessionManagerProvider} from "./session-manager.provider";

@Global()
@Module({
    providers: [SessionManagerProvider],
    exports: [SessionManagerProvider]
})
export class SessionManagerModule {}