import {Injectable} from "@nestjs/common";
import {EDatabaseConnectionType} from "../../connection-management";

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

    static createUniqConnectionName = (connectionName: EDatabaseConnectionType, request) => connectionName + request?.id;
}