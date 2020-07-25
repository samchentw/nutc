import { customizedException } from '@app/core/shared';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { ConsumerService } from '../../consumer/service/consumer.service';
import { ProductService } from '../../product/service/product.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entity/order.entity';
import { OrderDetail } from '../entity/orderDetail.entity';
import { orderStateEnum } from '../enum/enum';
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
            od.product = {
                name: product.name,
                productImage: product.productImage,
                price: product.price
            };
            od.count = orderDetail[i].count;
            var odEntity = await this.orderDetailService.save(od);
            order.total += orderDetail[i].count * product.price;
            order.orderDetail.push(odEntity);
        }
        order.total += 100;
        await this.repository.save(order);
    }

    async getAll(): Promise<Order[]> {
        return this.repository.find();
    }

    async deleteOrder(id: number, userId: string) {
        var order = await this.repository.findOne(id, { relations: ["consumer"] });
        if (order.consumer.userId != userId) {
            throw new UnauthorizedException("這不是你的訂單！");
        }
        var detailIds = order.orderDetail.map(x => x.id);
        await this.orderDetailService.deleteByIds(detailIds);
        await this.repository.delete(id);
    }

    async getOrdersByUserId(user: string) {
        var consumer = await this.consumerService.getByUserId(user);
        var orders = await this.repository.createQueryBuilder("o")
            .leftJoinAndSelect("o.orderDetail", "orderDetail")
            .where("o.consumer.id=:consumer")
            .setParameters({ consumer: consumer.id })
            .getMany();
        // console.log(temp);
        return orders;
    }

    async testgetOrdersByUserId(user: string, start: Date, end: Date) {
        var consumer = await this.consumerService.getByUserId(user);
        var orders = await this.repository.createQueryBuilder("o")
            .leftJoinAndSelect("o.orderDetail", "orderDetail")
            .where("o.consumer.id=:consumer")
            .andWhere("o.createTime < :before")
            .andWhere("o.createTime >= :after")
            .setParameters(
                {
                    consumer: consumer.id,
                    before: end.toISOString(),
                    after: start.toISOString()
                })
            .getMany();
        // console.log(temp);
        return orders;
    }

    async update() {

    }

    async delete() {

    }
}