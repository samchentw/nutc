import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req, UseGuards } from '@nestjs/common';
import { ValidationPipe, RolesGuard, Roles } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderDto } from '../dto/create-order.dto';
import { User } from '@app/core/shared/decorator/user.decorator';
import { OrderService } from '../service/order.service';
@ApiTags("Order")
@UseGuards(RolesGuard)
@Controller("order")
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) { }

    @Post("create")
    @ApiBearerAuth()
    create(@Body() body: CreateOrderDto, @User("id") userId) {
        this.orderService.createOrder(body, userId);
    }
}