import * as passport from 'passport';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controller/auth.controller';
import { AuthService, JwtStrategy } from './service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: 'development.env',
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy
  ]
})
export class AuthModule implements NestModule {
  //全域middleware
  public configure(consumber: MiddlewareConsumer) {
    //apply、forRoute方法允許傳入多個參數
    consumber
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(

        //auth
        { path: '/auth/admin/permission', method: RequestMethod.GET },

        //user              
        { path: '/users/info', method: RequestMethod.GET },
        { path: '/users/admin/getAllUser', method: RequestMethod.GET },
        { path: '/users/info', method: RequestMethod.PUT },
        { path: '/users/password', method: RequestMethod.PUT },

        // role
        { path: '/role/create', method: RequestMethod.POST },
        { path: '/role/:id', method: RequestMethod.PUT },
        { path: '/role/:id', method: RequestMethod.DELETE },

        // setting
        { path: '/setting/setByKey/:key', method: RequestMethod.PUT },

        // file
        { path: '/file/upload', method: RequestMethod.POST },

        //shop
        { path: '/shop/create', method: RequestMethod.POST },
        { path: '/shop/:id', method: RequestMethod.PUT },
        { path: '/shop/:id', method: RequestMethod.DELETE },

        // order
        { path: '/order/create', method: RequestMethod.POST },
        { path: '/order/update', method: RequestMethod.PUT },
        { path: '/order/:id', method: RequestMethod.DELETE },

        // consumer
        { path: '/consumer/info', method: RequestMethod.GET },
      );
  }
}
