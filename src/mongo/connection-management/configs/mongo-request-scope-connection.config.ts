import {Inject, Injectable, mixin, Scope} from "@nestjs/common";
import {REQUEST} from "@nestjs/core";
import {MongooseOptionsFactory} from "@nestjs/mongoose";
import {JwtTokenService} from "../../../jwt";

export const MongooseConfigService = (jwtService: JwtTokenService): any => {
    @Injectable({scope: Scope.REQUEST})
    class ConfigService implements MongooseOptionsFactory {
        @Inject(jwtService) private jwtService;
        @Inject(REQUEST) private request;

        async createMongooseOptions() {
            let database;

            database = await this.getDatabaseFromAccessToken(this.request);

            if (!database)
                database = this.getDatabaseFromBody(this.request);

            if (!database)
                database = 'test';

            console.log(`database: ${database}`)

            return {
                uri: `${process.env.MONGO_CHOOSE_URL}/${database}`,
                keepAlive: false,
                autoIndex: true
            };
        }

        getDatabaseFromAccessToken = async (request): Promise<string> => {
            const authHeader = request.headers.authorization;

            if (!authHeader) return null;

            const [tokenType, token] = authHeader?.split(' ');

            const tokenPayload = await this.jwtService.decode(token);

            return tokenPayload?.database;
        }

        getDatabaseFromBody = (request): string => request.body?.database;
    }

    return mixin(ConfigService)
}