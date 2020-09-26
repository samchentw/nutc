import { News } from '@app/cms/news/dto/news/news.dto';
import { Roles, RolesGuard } from '@app/core/shared';
import { User } from '@app/core/shared/decorator/user.decorator';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import { CreateUserDto } from '@app/identity/users/dto';
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags, ApiProperty, ApiDefaultResponse } from '@nestjs/swagger';
import { ConsumerService } from '../service/consumer.service';
import { addOrUpdateNewsDto } from '../dto/add-or-update-news.dto';
import { ConsumerNewsDto } from '../dto/consumer-news.dto';


@ApiTags("Consumer(消費者)")
@Controller("consumer")
export class ConsumerController {
  constructor(
    private readonly consumerService: ConsumerService,
  ) { }


  // @Get("news")
  // @ApiBearerAuth()
  // @Roles("user")
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // getNewsByUser(@User("id") userId){

  // }

  @Post("addOrUpdateNews")
  @ApiBearerAuth()
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  addOrUpdateNews(@User("id") userId, @Body() body: addOrUpdateNewsDto) {
    return this.consumerService.addorUpdateNews(userId, body.newsId, body.isComplete);
  }

  @Delete("news/:id")
  @ApiBearerAuth()
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id' })
  deleteNews(@User("id") userId, @Param('id') id) {
    return this.consumerService.removeNews(userId, id);
  }

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


  @Get("newsByUser")
  @ApiBearerAuth()
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiDefaultResponse({ type: ConsumerNewsDto, isArray: true })
  getNewsByUser(@User("id") userId) {
    return this.consumerService.getConsumerWithDetil(userId);
  }


  @Get("newsByUserByAdmin/:userId")
  @ApiBearerAuth()
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiDefaultResponse({ type: ConsumerNewsDto, isArray: true })
  @ApiParam({ name: 'userId' })
  getNewsByUserByAdmin(@Param('userId') userId) {
    return this.consumerService.getConsumerWithDetil(userId);
  }
}