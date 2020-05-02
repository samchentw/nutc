import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import {AppController} from './app.controller';
import { AppService } from './app.service';

import { IdentityModule } from '@app/identity';
import { CoreModule } from '@app/core';

import { ShopModule } from './shop/shop.module';
import { ConsumerModule } from './consumer/consumer.module';
// import { ElseModule } from '@app/else';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
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
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: 'development.env',
    }),
    CoreModule,
    IdentityModule,

    ShopModule,
    ConsumerModule,
    ProductModule,
    OrderModule,
    
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
