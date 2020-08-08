import { customizedException } from '@app/core/shared';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, classToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { ConsumerService } from '../../consumer/service/consumer.service';
import { ProductService } from '../../product/service/product.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entity/order.entity';
import { OrderDetail } from '../entity/orderDetail.entity';
import { orderStateEnum } from '../enum/enum';
import { OrderDetailService } from './orderDetail.service';
import { OrderResultDto } from '../dto/order-result.dto';
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
        let consumer = await this.consumerService.getByUserId(userId);
        const { deliveryTime, orderDetail, usePoints } = input;

        if (usePoints > consumer.point) {
            throw new customizedException("點數不足！！", 400);
        }

        if (new Date(deliveryTime) <= new Date()) {
            throw new customizedException("時間錯誤！！", 400);
        }

        let order = plainToClass(Order, input, { excludeExtraneousValues: true })
        order.orderDetail = [];
        order.consumer = consumer;
        order.total = 0;
        order.state = orderStateEnum.準備中

        for (let i = 0; i < orderDetail.length; i++) {
            let product = await this.ProductService.get(orderDetail[i].productId);
            let od = new OrderDetail();
            od.product = {
                name: product.name,
                productImage: product.productImage,
                price: product.price
            };
            od.count = orderDetail[i].count;
            let odEntity = await this.orderDetailService.save(od);
            order.total += orderDetail[i].count * product.price;
            order.orderDetail.push(odEntity);
        }
        order.total += 100;
        await this.repository.save(order);
    }

    async getAll() {

        var data = await this.repository.createQueryBuilder("o")
            .leftJoinAndSelect("o.orderDetail", "orderDetail")
            .leftJoinAndSelect("o.consumer", "c")
            .innerJoinAndMapOne("c.userId", "user", "u", "c.userId = u.id")
            .leftJoinAndSelect("u.userinfo", "userInfo")
            .getMany()

        let dto = plainToClass(OrderResultDto, <any[]>data, { excludeExtraneousValues: true });
        let result = classToPlain(dto, { version: 1 });
        return result;
    }

    async deleteOrder(id: number, userId: string) {
        let order = await this.repository.findOne(id, { relations: ["consumer"] });
        if (order.consumer.userId != userId) {
            throw new UnauthorizedException("這不是你的訂單！");
        }
        let detailIds = order.orderDetail.map(x => x.id);
        await this.orderDetailService.deleteByIds(detailIds);
        await this.repository.delete(id);
    }

    async getOrdersByUserId(user: string) {
        let consumer = await this.consumerService.getByUserId(user);
        let orders = await this.repository.createQueryBuilder("o")
            .leftJoinAndSelect("o.orderDetail", "orderDetail")
            .where("o.consumer.id=:consumer")
            .setParameters({ consumer: consumer.id })
            .getMany();
        // console.log(temp);
        return orders;
    }

    async testgetOrdersByUserId(user: string, start: Date, end: Date) {
        let consumer = await this.consumerService.getByUserId(user);
        let orders = await this.repository.createQueryBuilder("o")
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

    async updateState(orderId: number, changeState: orderStateEnum) {
        let order = await this.repository.findOne({ id: orderId });
        order.state = changeState;
        return this.repository.save(order);
    }

    async delete() {

    }
}