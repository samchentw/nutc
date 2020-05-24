import * as passport from 'passport';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './service/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './service/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [
    AuthController
  ],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    // UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    // UsersService
  ]
})
export class AuthModule {

}
