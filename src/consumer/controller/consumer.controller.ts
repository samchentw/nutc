import { News } from '@app/cms/news/dto/news/news.dto';
import { Roles, RolesGuard } from '@app/core/shared';
import { User } from '@app/core/shared/decorator/user.decorator';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import { CreateUserDto } from '@app/identity/users/dto';
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags, ApiProperty, ApiDefaultResponse } from '@nestjs/swagger';
import { ConsumerService } from '../service/consumer.service';


export class addOrUpdateNewsDto {
  @ApiProperty()
  newsId: number;
  @ApiProperty()
  isComplete: boolean;
}

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
  @UseGuards(JwtAuthGuard)
  @ApiDefaultResponse({ type: News.NewsDto, isArray: true })
  getNewsByUser(@User("id") userId,@Req() req) {
    return this.consumerService.getConsumerWithDetil(userId);
  }
}