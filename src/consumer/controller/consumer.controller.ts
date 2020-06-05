import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, UseGuards } from '@nestjs/common';
import { RolesGuard, Roles } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ConsumerService } from '../service/consumer.service';
import { CreateUserDto } from '@app/identity/users/dto';
import { User, RoleCheck } from '@app/core/shared/decorator/user.decorator';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
// import { fs } from 'memfs';
@ApiTags("Consumer")
@Controller("consumer")
export class ConsumerController {
  constructor(
    private readonly consumerService: ConsumerService,
  ) { }

  @Post("register")
  register(@Body() body: CreateUserDto) {
    return this.consumerService.register(body);
  }

  @Get("info")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  info(@User("id") userId, @RoleCheck(["user"]) check) {
    return this.consumerService.getByUserId(userId);
  }
}