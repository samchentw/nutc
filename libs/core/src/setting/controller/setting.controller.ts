import { Controller, Get, UsePipes, UseGuards, Post, Body, Param, Put, Delete, Query, Req, ValidationPipe } from '@nestjs/common';

import { ApiTags, ApiBearerAuth, ApiParam, ApiDefaultResponse, ApiBody } from '@nestjs/swagger';
import { RolesGuard, Roles, RoleCheck } from '@app/core/shared';
import { SettingService } from '../service/setting.service';
import { UpdateSettingDto } from '../dto/update-setting.dto';
import { PostGetKeysDto } from '../dto/post-getKeys.dto';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
@ApiTags('Setting')
@Controller('setting')
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
    get(@Param('key') key: string) {
        return this.settingService.getBykey(key);
    }

    @Post('getKeys')
    getKeys(@Body() body: PostGetKeysDto) {
        return this.settingService.getByKeys(body);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put("setByKey")
    setByKey(@Body() body: UpdateSettingDto, @RoleCheck(["admin"]) admin) {
        return this.settingService.setByKey(body);
    }

    @ApiBearerAuth()
    @ApiBody({ type: UpdateSettingDto, isArray: true })
    @UseGuards(JwtAuthGuard)
    @Put("setByKeys")
    setByKeys(@Body() body: UpdateSettingDto[], @RoleCheck(["admin"]) admin) {
        return this.settingService.setBykeys(body);
    }

    @Get("seed")
    seed() {
        this.settingService.seed();
    }

}
