import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';
import {AppController} from './app.controller';
import { AppService } from './app.service';


import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { ArticleModule } from './article/article.module';
import { CmsModule } from './cms/cms.module';
import { TreeModule } from './tree/tree.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { FileModule } from './file/file.module';
import { SettingModule } from './setting/setting.module';
import { PracticeModule } from './practice/practice.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),   
    // ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: 'development.env',
    }),

    
    PracticeModule,
    // TreeModule,
    ArticleModule,
    AuthModule,
    UsersModule,
    RoleModule,
    // FileModule,
    // ChatModule,
    // SettingModule,
    // CmsModule,
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
