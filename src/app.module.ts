import { CmsModule } from '@app/cms/cms.module';
import { CoreModule } from '@app/core';
import { IdentityModule } from '@app/identity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumerModule } from './consumer/consumer.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "",
      "database": "nutc",
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "autoLoadEntities": true,
      "synchronize": true,
    }),
    ConfigModule.forRoot({
      envFilePath: 'development.env',
    }),
    CoreModule,
    IdentityModule,
    CmsModule,

    ShopModule,
    ConsumerModule,
    ProductModule,
    OrderModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
