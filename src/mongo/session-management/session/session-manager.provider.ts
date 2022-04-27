import {Injectable} from "@nestjs/common";

@Injectable()
export class SessionManagerProvider {
    session: Map<string, any>

    setSession(connectionName, session) {
        if (!this.session) this.session = new Map<string, any>();

        this.session.set(connectionName, session);
    }

    getSession(connectionName) {
        return this.session?.get(connectionName);
    }

    removeSession(connectionName: string) {
        this.session.delete(connectionName);
    }
}