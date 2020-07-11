import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from '../role/role.module';
import { UserController } from './controller/users.controller';
import { User, Userinfo } from './entity';
import { UsersService } from './service/users.service';
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

