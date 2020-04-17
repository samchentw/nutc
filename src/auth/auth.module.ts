import * as passport from 'passport';
import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controller/auth.controller';
import { AuthService, JwtStrategy} from './service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AuthController],
  imports:[
    UsersModule,    
    ConfigModule.forRoot({
        envFilePath: 'development.env',
      }),  
  ],
  providers:[
    AuthService,
    JwtStrategy
  ]
})
export class AuthModule implements NestModule{
     //全域middleware
     public configure(consumber: MiddlewareConsumer) {
        //apply、forRoute方法允許傳入多個參數
        consumber
        .apply(passport.authenticate('jwt', { session: false }))
        .forRoutes(
          
              //user              
              { path: '/users/info', method: RequestMethod.GET },
              { path: '/users/admin/getAllUser', method: RequestMethod.GET },
              { path: '/users/info', method: RequestMethod.PUT},              
              { path: '/users/password', method:RequestMethod.PUT},

              // role
              { path: '/role/create', method:RequestMethod.POST},
              { path: '/role/:id', method:RequestMethod.PUT},
              { path: '/role/:id', method:RequestMethod.DELETE},

                                    
        ); 
    }
}
