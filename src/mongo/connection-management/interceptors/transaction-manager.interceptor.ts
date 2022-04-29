import {CallHandler, ExecutionContext, Inject, mixin, NestInterceptor} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {InjectConnection} from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import {catchError, Observable, tap} from 'rxjs';
import {DatabaseConnectionTypeEnum} from '../constants/database-connection-type.constants';
import {SessionManagerProvider} from '../../session-management';

export const TransactionManagerInterceptor: any = (connectionName: DatabaseConnectionTypeEnum) => {

    class TransactionManager implements NestInterceptor {
        constructor(
            @InjectConnection(connectionName) private mongoConnection: mongoose.Connection,
            private sessionManager: SessionManagerProvider,
            @Inject(REQUEST) private request
        ) {}

        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            if (!this.mongoConnection) return next.handle();

            const mongoConnectionName = this.mongoConnection.name;
            const uniqConnectionName = connectionName + this.request.id;

            const session = await this.mongoConnection.startSession();

            session.startTransaction({});
            this.sessionManager.setSession(uniqConnectionName, session);

            console.log(`session id: ${connectionName + this.request.id}`)
            console.log(`connections: ${mongoose.connections.length}`)
            console.log(`opened connections: ${mongoose.connections.filter(conn => conn.readyState !== 0).length}`)

            return next.handle().pipe(
                tap(async () => {
                    await session.commitTransaction();

                    await this.endSession(session, mongoConnectionName, uniqConnectionName);
                }),
                catchError(async (error) => {
                    await session.abortTransaction();

                    await this.endSession(session, mongoConnectionName, uniqConnectionName);

                    throw error;
                }));
        }

        async endSession(session, mongoConnectionName, uniqConnectionName) {
            await session.endSession();

            this.sessionManager.removeSession(uniqConnectionName);

            if (connectionName === DatabaseConnectionTypeEnum.SHARED)
                return;

            await this.mongoConnection.close();
            // @ts-ignore
            mongoose.connections = mongoose.connections.filter(conn => conn.name !== mongoConnectionName);
        }
    }

    return mixin(TransactionManager);
}