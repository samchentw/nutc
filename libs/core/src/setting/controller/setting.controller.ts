import { Roles, RolesGuard } from '@app/core/shared';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags, ApiOperation } from '@nestjs/swagger';
import { PostGetKeysDto } from '../dto/post-getKeys.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';
import { SettingService } from '../service/setting.service';

@ApiTags('Setting(設定)')
@Controller('setting')
export class SettingController {
    constructor(
        private settingService: SettingService
    ) { }

    @Get('getAll')
    @ApiOperation({ summary: "取得所有設定" })
    // @ApiDefaultResponse({type:CreateSettingDto,isArray:true})
    getAll() {
        return this.settingService.getAll();
    }

    @Get('getByKey/:key')
    @ApiOperation({ summary: "取得某筆設定" })
    @ApiParam({ name: 'key' })
    get(@Param('key') key: string) {
        return this.settingService.getBykey(key);
    }

    @Post('getKeys')
    @ApiOperation({ summary: "取得多筆設定" })
    getKeys(@Body() body: PostGetKeysDto) {
        return this.settingService.getByKeys(body);
    }

    @ApiBearerAuth()
    @Roles("admin")
    @ApiOperation({ summary: "修改某筆設定" })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("setByKey")
    setByKey(@Body() body: UpdateSettingDto) {
        return this.settingService.setByKey(body);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: "修改多筆設定" })
    @ApiBody({ type: UpdateSettingDto, isArray: true })
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("setByKeys")
    setByKeys(@Body() body: UpdateSettingDto[]) {
        return this.settingService.setBykeys(body);
    }

    @Get("seed")
    @ApiOperation({ summary: "匯入資料" })
    seed() {
        this.settingService.seed();
    }

}
