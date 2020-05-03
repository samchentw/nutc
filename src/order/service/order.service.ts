import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Entity } from 'typeorm';
import * as _ from 'lodash';
import { ExcelService, BaseService, PageDto, customizedException } from '@app/core/shared';
import { FileService } from '@app/core/file/service/file.service';
import { plainToClass, classToPlain, classToClass, plainToClassFromExist } from 'class-transformer';
import { OrderEntity } from '../entity/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ConsumerService } from '../../consumer/service/consumer.service';
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        public repository: Repository<OrderEntity>,
        private readonly consumerService: ConsumerService
    ) { }

    // todo
    async createOrder(input: CreateOrderDto, userId: string) {
        var consumer = await this.consumerService.getByUserId(userId);
        const { delivery, deliveryTime, payment, orderDetail, address, usePoints } = input;

        if (usePoints > consumer.point) {
            throw new customizedException("點數不足！！", 400);
        }

        // const orderDetail = input.orderDetail;
        for (var i = 0; i < orderDetail.length; i++) {

        }
    }
}