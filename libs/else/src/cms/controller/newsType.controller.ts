import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { NewsTypeService, CmsJob } from '../service';
import { CreateNewsTypeDto, UpdateNewsTypeDto } from '../dto';
import { ApiTags, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
@ApiTags("NewsType")
@Controller("newsType")
export class NewsTypeController {
  constructor(
    private readonly newsTypeService: NewsTypeService,
    // private readonly cmsJob: CmsJob,
  ) { }

  @Get("getAll")
  getAll() {
    return this.newsTypeService.getAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() input: CreateNewsTypeDto) {
    return this.newsTypeService.create(input);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id, @Body() input: UpdateNewsTypeDto) {
    return this.newsTypeService.update(id, input);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id) {
    return this.newsTypeService.delete(id);
  }

  @Get("seed")
  seed() {
    return this.newsTypeService.seed();
  }

}
