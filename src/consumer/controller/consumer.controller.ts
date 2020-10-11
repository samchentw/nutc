import { News } from '@app/cms/news/dto/news/news.dto';
import { Roles, RolesGuard } from '@app/core/shared';
import { User } from '@app/core/shared/decorator/user.decorator';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import { CreateUserDto } from '@app/identity/users/dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags, ApiProperty, ApiDefaultResponse, ApiQuery } from '@nestjs/swagger';
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
    return this.consumerService.addorUpdateNews(userId, body.newsId, body.isComplete, body.newsDetailId, body.date);
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
  @ApiQuery({ name: 'date' })
  getNewsByUser(@User("id") userId, @Query('date') date) {
    return this.consumerService.getConsumerWithDetil(userId, date);
  }


  @Get("oneNewsByUser/:id")
  @ApiBearerAuth()
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id' })
  @ApiDefaultResponse({ type: ConsumerNewsDto, isArray: true })
  @ApiQuery({ name: 'date' })
  getOneNewsByUser(@User("id") userId, @Param('id') newsId,@Query('date') date) {
    return this.consumerService.getConsumerWithDetilByOneNews(userId, newsId,date);
  }

  @Put('selectDate')
  @ApiBearerAuth()
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiQuery({ name: 'date' })
  updateDate(@User("id") userId, @Query('date') date) {
    return this.consumerService.updateDate(userId, date);
  }

  @Delete("news/:newsDetailId")
  @ApiBearerAuth()
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'newsDetailId' })
  @ApiQuery({ name: 'date' })
  deleteNews(@User("id") userId, @Param('newsDetailId') newsDetailId,@Query('date') date) {
    return this.consumerService.removeNewsDetail(userId, newsDetailId,date);
  }


  // @Get("newsByUserByAdmin/:userId")
  // @ApiBearerAuth()
  // @Roles("admin")
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @ApiDefaultResponse({ type: ConsumerNewsDto, isArray: true })
  // @ApiParam({ name: 'userId' })
  // getNewsByUserByAdmin(@Param('userId') userId) {
  //   return this.consumerService.getConsumerWithDetil(userId);
  // }
}