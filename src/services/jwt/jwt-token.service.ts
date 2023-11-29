import { JwtService } from "@nestjs/jwt";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export abstract class JwtTokenService {
    @Inject(JwtService) private readonly jwtService;

    secret: string;
    expiresIn: string;

    protected constructor(
        secret: string,
        expiresIn: string,
    ) {
        this.secret = secret ? secret : 'Please_I_Have_Family';
        this.expiresIn = expiresIn ? expiresIn : '1m';
    }

    async generate(payload: any,): Promise<string> {
        return this.jwtService.sign(payload, {secret: this.secret, expiresIn: this.expiresIn});
    }

    async decode(token: string): Promise<any> {
        return this.jwtService.decode(token);
    }

    async verify(token: string): Promise<any> {
        return this.jwtService.verify(token, {secret: this.secret});
    }

    async generateFromToken(token) {
        const payload = await this.jwtService.decode(token);

        delete payload.exp;
        delete payload.iat;

        return this.jwtService.sign(payload, { secret: this.secret, expiresIn: this.expiresIn });
    }
}