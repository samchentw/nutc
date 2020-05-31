import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { NewsTypeService, CmsJob } from '../service';
import { CreateNewsTypeDto, UpdateNewsTypeDto } from '../dto';
import { ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
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
  create(@Body() input: CreateNewsTypeDto) {
    return this.newsTypeService.create(input);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  update(@Param('id') id, @Body() input: UpdateNewsTypeDto) {
    return this.newsTypeService.update(id, input);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  delete(@Param('id') id) {
    return this.newsTypeService.delete(id);
  }

}
