import {Inject} from "@nestjs/common";
import {SessionManager} from "./session-manager.service";
import {EDatabaseConnectionType} from "../../connection-management";
import {REQUEST} from "@nestjs/core";

export abstract class MongoManager {
    @Inject(SessionManager) private sessionManager;
    @Inject(REQUEST) private request;

    private readonly connectionType: string;

    protected constructor(connectionType: EDatabaseConnectionType) {
        this.connectionType = this.sessionManager.createUniqConnectionName(connectionType, this.request);
    }

    protected getSession = () => this.sessionManager.getSession(this.connectionType);
}