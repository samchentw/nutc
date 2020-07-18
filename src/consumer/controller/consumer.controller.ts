import { Roles, RolesGuard } from '@app/core/shared';
import { User } from '@app/core/shared/decorator/user.decorator';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import { CreateUserDto } from '@app/identity/users/dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConsumerService } from '../service/consumer.service';
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
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  info(@User("id") userId) {
    return this.consumerService.getByUserId(userId);
  }
}