import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res,Header, Req } from '@nestjs/common';
import { TagService } from '../service/tag.service';
import { CreateTagDto,TagDto } from '../dto';
import {ApiTags, ApiQuery, ApiParam,ApiDefaultResponse} from '@nestjs/swagger';

@ApiTags("Tag")
@Controller("tag")
export class TagController {
  constructor(
      private tagService:TagService
  ){}

  @Get("getAll")
  @ApiDefaultResponse({type:TagDto,isArray:true})
  getAll(){       
    return this.tagService.getAll();
  }
  
  @Get("get/:id")
  @ApiParam({name:"id"})
  @ApiDefaultResponse({type:TagDto})
  get(@Param('id') id){
    return this.tagService.get(id);
  }

  @Post()    
  @ApiDefaultResponse({type:TagDto})
  create(@Body() input:CreateTagDto){
    return this.tagService.create(input);
  }

  @Put(':id')
  @ApiDefaultResponse({type:TagDto})
  @ApiParam({name:'id'})
  update(@Param('id') id, @Body() input:CreateTagDto){
      return this.tagService.update(id,input);
  }

  @Delete(':id')    
  @ApiParam({name:'id'})
  delete(@Param('id') id){
      return this.tagService.delete(id);
  }
}