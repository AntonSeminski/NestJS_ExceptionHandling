import {Inject} from "@nestjs/common";
import {SessionManagerProvider} from "./session-manager.provider";
import {DatabaseConnectionTypeEnum} from "../../connection-management";

export abstract class MongoManager {
    @Inject(SessionManagerProvider) private sessionManager;
    private readonly connectionType: string;

    protected constructor(connectionType: DatabaseConnectionTypeEnum | string) {
        this.connectionType = connectionType;
    }

    protected getSession = () => this.sessionManager.getSession(this.connectionType);
}