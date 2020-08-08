import { CoreModule } from '@app/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdentityService } from './identity.service';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
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
export class IdentityModule { }
