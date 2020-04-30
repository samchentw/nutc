import { Module } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule } from '@app/core'

import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';

@Module({
  imports:[
    // TypeOrmModule.forRoot(
    //   {
    //     "type": "mysql",
    //     "host": "localhost",
    //     "port": 3306,
    //     "username": "root",
    //     "password": "",
    //     "database": "nest",
    //     "entities": ["dist/libs/identity/**/*.entity{.ts,.js}"],
    //     "synchronize": true,
    //     "autoLoadEntities": true,    
    //   },
    // ), 
    ConfigModule.forRoot({
      envFilePath: 'development.env',
    }),
    CoreModule,
    AuthModule,
    RoleModule,
    UsersModule
  ],
  providers: [IdentityService],
  exports: [IdentityService],
})
export class IdentityModule {}