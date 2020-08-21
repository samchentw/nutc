import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderDetail } from './entity/orderDetail.entity';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { OrderDetailService } from './service/orderDetail.service';
import { ConsumerModule } from '../consumer/consumer.module';
import { ProductModule } from '../product/product.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order, OrderDetail
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
