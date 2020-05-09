import { Controller, Get, UsePipes, UseGuards, Post, Body, Param, Put, Delete, Query, Req, ValidationPipe } from '@nestjs/common';

import { ApiTags, ApiBearerAuth, ApiParam, ApiDefaultResponse } from '@nestjs/swagger';
import { RolesGuard, Roles } from '@app/core/shared';
import { SettingService } from '../service/setting.service';
import { UpdateSettingDto } from '../dto/update-setting.dto';
import { PostGetKeysDto } from '../dto/post-getKeys.dto';
@ApiTags('Setting')
@Controller('setting')
@UseGuards(RolesGuard)
@UsePipes(new ValidationPipe())
export class SettingController {
    constructor(
        private settingService: SettingService
    ) { }

    @Get('getAll')
    // @ApiDefaultResponse({type:CreateSettingDto,isArray:true})
    getAll() {
        return this.settingService.getAll();
    }

    @Get('getByKey/:key')
    @ApiParam({ name: 'key' })
    get(@Param('key') key:string){
        return this.settingService.getBykey(key);
    }

    @Post('getKeys')
    getKeys(@Body() body:PostGetKeysDto){
        return this.settingService.getByKeys(body);
    }

    @ApiBearerAuth()
    @Roles("admin")
    @Put("setByKey/:key")
    @ApiParam({ name: 'key' })
    setByKey(@Param('key') key: string,@Body() body: UpdateSettingDto) {
        return this.settingService.setByKey(key, body);
    }

    @Get("seed")
    seed(){
        this.settingService.seed();
    }

}
