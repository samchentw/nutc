import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Entity } from 'typeorm';
import * as _ from 'lodash';
import { ExcelService, BaseService, PageDto, customizedException } from '@app/core/shared';
import { FileService } from '@app/core/file/service/file.service';
import { plainToClass, classToPlain, classToClass, plainToClassFromExist } from 'class-transformer';
import { Order } from '../entity/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ConsumerService } from '../../consumer/service/consumer.service';
import { orderStateEnum } from '../enum/enum';
import { ProductService } from '../../product/service/product.service';
import { OrderDetail } from '../entity/orderDetail.entity';
import { OrderDetailService } from './orderDetail.service';
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        public repository: Repository<Order>,
        private readonly consumerService: ConsumerService,
        private readonly ProductService: ProductService,
        private readonly orderDetailService: OrderDetailService,
    ) { }

    async createOrder(input: CreateOrderDto, userId: string) {
        var consumer = await this.consumerService.getByUserId(userId);
        const { deliveryTime, orderDetail, usePoints } = input;

        if (usePoints > consumer.point) {
            throw new customizedException("點數不足！！", 400);
        }

        if (new Date(deliveryTime) <= new Date()) {
            throw new customizedException("時間錯誤！！", 400);
        }

        var order = plainToClass(Order, input, { excludeExtraneousValues: true })
        order.orderDetail = [];
        order.consumer = consumer;
        order.total = 0;
        order.state = orderStateEnum.準備中

        for (var i = 0; i < orderDetail.length; i++) {
            var product = await this.ProductService.get(orderDetail[i].productId);
            var od = new OrderDetail();
            od.product = product;
            od.count = orderDetail[i].count;
            var odEntity = await this.orderDetailService.save(od);
            order.total += orderDetail[i].count * product.price;
            order.orderDetail.push(odEntity);
        }
        await this.repository.save(order);
    }

    async getOrdersByUserId(user: string) {
        var consumer = await this.consumerService.getByUserId(user);
        var orders = this.repository.find({ consumer });
        return orders;
    }

    async update() {

    }

    async delete() {

    }
}