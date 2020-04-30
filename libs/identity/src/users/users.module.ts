import * as passport from 'passport';
import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod
} from '@nestjs/common';
import { UserController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Userinfo } from './entity';
import { RoleModule } from '../role/role.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports:[    
    TypeOrmModule.forFeature([User, Userinfo]),
    RoleModule,
    ConfigModule.forRoot({
      envFilePath: 'development.env',
    }),   
  ],
  controllers: [
    UserController
  ],
  providers: [
    UsersService,    
  ],
  exports:[
    UsersService
  ]
})
export class UsersModule {
} 

