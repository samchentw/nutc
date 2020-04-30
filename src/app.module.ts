import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import {AppController} from './app.controller';
import { AppService } from './app.service';

import { IdentityModule } from '@app/identity';
import { CoreModule } from '@app/core';

import { ArticleModule } from './article/article.module';
import { CmsModule } from './cms/cms.module';
import { TreeModule } from './tree/tree.module';
import { ChatModule } from './chat/chat.module';
import { FileModule } from './file/file.module';
import { PracticeModule } from './practice/practice.module';
import { ShopModule } from './shop/shop.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "",
      "database": "nest",
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "autoLoadEntities":true,
      "synchronize": true,
    }),   
    // ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: 'development.env',
    }),
    CoreModule,
    IdentityModule,
    
    // ArticleModule,FileModule,
    // PracticeModule,
    // ChatModule,

    // TreeModule,
    ShopModule,
    
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
