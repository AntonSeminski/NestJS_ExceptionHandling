import {Global, Module} from "@nestjs/common";
import {SessionManager} from "./session-manager.service";

@Global()
@Module({
    providers: [SessionManager],
    exports: [SessionManager]
})
export class SessionManagerModule {}