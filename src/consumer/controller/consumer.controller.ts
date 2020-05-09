import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req, UseGuards } from '@nestjs/common';
import { ValidationPipe, RolesGuard, Roles } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ConsumerService } from '../service/consumer.service';
import { CreateUserDto } from '@app/identity/users/dto';
import { User } from '@app/core/shared/decorator/user.decorator';
// import { fs } from 'memfs';
@ApiTags("Consumer")
@UseGuards(RolesGuard) 
@Controller("consumer")
export class ConsumerController {
  constructor(
    private readonly consumerService: ConsumerService,
  ) { }

  @Post("register")
  register(@Body() body:CreateUserDto){
    return this.consumerService.register(body);
  }

  @Get("info")
  @Roles("user")
  @ApiBearerAuth()
  info(@User("id") userId){
      return this.consumerService.getByUserId(userId);
  }
}