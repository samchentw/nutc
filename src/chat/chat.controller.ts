import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res,Header, Req } from '@nestjs/common';
import {ApiTags, ApiQuery, ApiParam,ApiDefaultResponse} from '@nestjs/swagger';
import { ChatService } from './service/chat.service';
import { MessageDto } from '../shared';
@ApiTags("Chat")
@Controller("chat")
export class ChatController {
  constructor(
    private chatService:ChatService
  ){}


  @ApiDefaultResponse({type:MessageDto,isArray:true})
  @Get()
  getAll(){
    return this.chatService.getList();
  }
}