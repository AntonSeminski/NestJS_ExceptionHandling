import {Injectable} from "@nestjs/common";
import {DatabaseConnectionTypeEnum} from "../../connection-management";

@Injectable()
export class SessionManager {
    sessions: Map<string, any>;

    setSession(connectionName, session) {
        if (!this.sessions) this.sessions = new Map<string, any>();

        this.sessions.set(connectionName, session);
    }

    getSession(connectionName) {
        return this.sessions?.get(connectionName);
    }

    removeSession(connectionName: string) {
        this.sessions?.delete(connectionName);
    }

    createUniqConnectionName = (connectionName: DatabaseConnectionTypeEnum, request) => connectionName + request?.id;
}