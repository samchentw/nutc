import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req } from '@nestjs/common';
import { ValidationPipe } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse } from '@nestjs/swagger';
import { ShopService } from '../service/shop.service';
// import { fs } from 'memfs';
@ApiTags("Shop")
@Controller("shop")
export class ShopController {
  constructor(
    private readonly ShopService: ShopService,
  ) { }

  @Get()
  getAll(){
      return this.ShopService.getAll();
  }
}