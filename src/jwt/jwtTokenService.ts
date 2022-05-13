import {JwtService} from "@nestjs/jwt";
import {Inject, Injectable} from "@nestjs/common";
import {ETokenType} from "@jira-killer/constants";

@Injectable()
export abstract class JwtTokenService {
    @Inject(JwtService) private readonly jwtService;

    secret: string;
    expiresIn: string;
    type: ETokenType;

    protected constructor(
        secret: string,
        expiresIn: string,
        type?: ETokenType
    ) {
        this.secret = secret ? secret : 'Please_I_Have_Family';
        this.expiresIn = expiresIn ? expiresIn : '1m';
        this.type = type;
    }

    async generate(payload: any,): Promise<string> {
        if (this.type) payload.tokenType = this.type;

        return this.jwtService.sign(payload, {secret: this.secret, expiresIn: this.expiresIn});
    }

    async decode(token: string): Promise<any> {
        return this.jwtService.decode(token);
    }

    async verify(token: string): Promise<any> {
        return this.jwtService.verify(token, {secret: this.secret});
    }

    async generateFromToken(token: string) {
        const payload = await this.jwtService.decode(token);

        delete payload.exp;
        if (this.type) payload.tokenType = this.type;

        return this.jwtService.sign(payload, {secret: this.secret, expiresIn: this.expiresIn});
    }
}