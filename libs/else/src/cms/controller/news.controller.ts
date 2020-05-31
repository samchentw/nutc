import { Controller, Get, Post, Body, Put, Param, Query, Delete } from '@nestjs/common';
import { NewsService,CmsJob } from '../service';
import { CreateNewsDto, UpdateNewsDto, News } from '../dto';
import {ApiTags, ApiDefaultResponse, ApiParam, ApiQuery} from '@nestjs/swagger';
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
    @ApiQuery({ name: "skip", required: false })
    @ApiQuery({ name: "take", required: false })
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
