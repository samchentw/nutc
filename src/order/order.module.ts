import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { OrderDetailEntity } from './entity/orderDetail.entity';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { OrderDetailService } from './service/orderDetail.service';
import { ConsumerModule } from '../consumer/consumer.module';
import { ProductModule } from 'src/product/product.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity, OrderDetailEntity
        ]),
        ConsumerModule,
        ProductModule,
    ],
    controllers:[
        OrderController,
    ],
    providers:[
        OrderService,
        OrderDetailService
    ]
})
export class OrderModule { }
