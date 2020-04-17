import { Controller, Get, Post, Body, Put, Param, Query, Delete } from '@nestjs/common';
import { NewsService,CmsJob } from '../service';
import { CreateNewsDto, UpdateNewsDto } from '../dto';
import { News } from '../dto/news.dto';
import {ApiTags, ApiDefaultResponse, ApiParam} from '@nestjs/swagger';
@ApiTags("News")
@Controller("news")
export class NewsController {
  constructor(
    private readonly newsService:NewsService,
    private readonly cmsJob:CmsJob,
    ) {}

    @Get("getAll")
    @ApiDefaultResponse({type:News.NewsDto,isArray:true})
    getAll(){      
      return this.newsService.getAll();
    }

    @Post()
    create(@Body() input:CreateNewsDto){
      return this.newsService.create(input);
    }

    @Get("page")
    page(@Query() query){        
        return this.newsService.page({skip:query.skip,take:query.take});
    }

    @Put(':id')
    @ApiParam({name:'id'})
    update(@Param('id') id, @Body() input:UpdateNewsDto){
        return this.newsService.update(id,input);
    }

    @Delete(':id')
    @ApiParam({name:'id'})
    delete(@Param('id') id){
        return this.newsService.delete(id);
    }
  
}
