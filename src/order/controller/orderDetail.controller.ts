import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req, UseGuards } from '@nestjs/common';
import { ValidationPipe, RolesGuard, Roles } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse, ApiBearerAuth } from '@nestjs/swagger';
// import { fs } from 'memfs';
@ApiTags("OrderDetail")
@UseGuards(RolesGuard) 
@Controller("orderDetail")
export class OrderDetailController {
  constructor(
  ) { }
}