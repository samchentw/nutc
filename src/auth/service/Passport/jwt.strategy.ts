import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {  Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
@Injectable()
export class JwtStrategy extends Strategy {
    constructor(        
        private readonly configService:ConfigService,
        private readonly authService:AuthService
        ) {            
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: configService.get<string>('donttalk'),
        },
            async (req, payload, next) => await this.verify(req, payload, next)
            
        );      
        passport.use(this);
    }

    public async verify(req, payload, done) {
        const isValid =  await this.authService.validateLogin(payload);
        if (!isValid) {
            return done('驗證失敗', false);
        }
        done(null, payload);
    }
}