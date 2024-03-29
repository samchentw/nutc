import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req, UseGuards } from '@nestjs/common';
import { RolesGuard, Roles } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderDto } from '../dto/create-order.dto';
import { User } from '@app/core/shared/decorator/user.decorator';
import { OrderService } from '../service/order.service';
import { GetOrdersByDateDto } from '../dto/get-orders-by-date.dto';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import { OrderResultDto } from '../dto/order-result.dto';
@ApiTags("Order")
@Controller("order")
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) { }

    @Get("getAll")
    @ApiBearerAuth()
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiDefaultResponse({ type: OrderResultDto, isArray: true })
    getAll() {
        return this.orderService.getAll();
    }

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

    @Put("updateState/:orderId/:state")
    @ApiBearerAuth()
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    update(@Param("orderId") orderId: number, @Param("state") state) {
        // console.log(orderId, state);
        return this.orderService.updateState(orderId, +state);
    }

    @Delete(":id")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id' })
    delete(@Param('id') id, @User("id") userId: string) {
        return this.orderService.deleteOrder(id, userId);
    }
}