import { Controller, Get, UsePipes, UseGuards, Post, Body,Param, Put, Delete, Query, Req } from '@nestjs/common';

import {ApiTags, ApiBearerAuth, ApiParam, ApiDefaultResponse} from '@nestjs/swagger';
import {RolesGuard,Roles} from '../../shared';
import { SettingService } from '../service/setting.service';
import { CreateSettingDto } from '../dto/create-setting.dto';

@ApiTags('Setting')
@UseGuards(RolesGuard)
@Controller('setting')
export class SettingController {
    constructor(
        private settingService:SettingService
    ){}

    @Get('getAll')
    // @ApiDefaultResponse({type:CreateSettingDto,isArray:true})
    getAll(){
        return this.settingService.getAll();
    }
      
}
