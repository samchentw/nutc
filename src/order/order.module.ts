import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { OrderDetailEntity } from './entity/orderDetail.entity';
import { OrderController } from './controller/order.controller';
import { OrderDetailController } from './controller/orderDetail.controller';
import { OrderService } from './service/order.service';
import { OrderDetailService } from './service/orderDetail.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity, OrderDetailEntity
        ])
    ],
    controllers:[
        OrderController,
        OrderDetailController
    ],
    providers:[
        OrderService,
        OrderDetailService
    ]
})
export class OrderModule { }
