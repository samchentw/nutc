import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req, UseGuards } from '@nestjs/common';
import { ValidationPipe, RolesGuard, Roles } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderDto } from '../dto/create-order.dto';
import { User } from '@app/core/shared/decorator/user.decorator';
import { OrderService } from '../service/order.service';
import { GetOrdersByDateDto } from '../dto/get-orders-by-date.dto';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
@ApiTags("Order")
@Controller("order")
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) { }

    @Get("user")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    getOrders(@User("id") userId) {
        return this.orderService.getOrdersByUserId(userId);
    }

    @Post("user")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    getOrdersByDate(@Body() body: GetOrdersByDateDto, @User('id') userId) {
        return this.orderService.testgetOrdersByUserId(userId, body.startDate, body.endDate);
    }

    @Post("create")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    create(@Body() body: CreateOrderDto, @User("id") userId) {
        return this.orderService.createOrder(body, userId);
    }

    @Put("update")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    update(@Body() Body, @User("id") userId) {

    }

    @Delete(":id")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id' })
    delete(@Param('id') id, @User("id") userId) {

    }
}