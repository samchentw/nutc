import { Controller, Get, Post, Body, Put, Param, Query, Delete, UseGuards } from '@nestjs/common';
import { NewsService } from '../service/news.service';
import { CreateNewsDto, UpdateNewsDto, News } from '../dto';
import { ApiTags, ApiDefaultResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
@ApiTags("News(活動)")
@Controller("news")
export class NewsController {
  constructor(
    private readonly newsService: NewsService
  ) { }

  @Get("getAll")
  @ApiDefaultResponse({ type: News.NewsDto, isArray: true })
  getAll() {
    return this.newsService.getAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() input: CreateNewsDto) {
    // console.log(input)
    return this.newsService.create(input);
  }

  @Get("page")
  @ApiQuery({ name: "skip", required: false })
  @ApiQuery({ name: "take", required: false })
  page(@Query() query) {
    return this.newsService.page({ skip: query.skip, take: query.take });
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id, @Body() input: UpdateNewsDto) {
    return this.newsService.update(id, input);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id) {
    return this.newsService.delete(id);
  }

  @Get('newsType/:id')
  @ApiParam({ name: 'id' })
  getNewsBynewTypeId(@Param('id') id) {
    return this.newsService.getAllByNewsTypeId(id);
  }

  @Get(":id")
  @ApiParam({ name: 'id' })
  get(@Param('id') id) {
    return this.newsService.getById(id);
  }

}
