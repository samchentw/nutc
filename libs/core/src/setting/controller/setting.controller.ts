import { Roles, RolesGuard } from '@app/core/shared';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { PostGetKeysDto } from '../dto/post-getKeys.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';
import { SettingService } from '../service/setting.service';

@ApiTags('Setting')
@Controller('setting')
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
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("setByKey")
    setByKey(@Body() body: UpdateSettingDto) {
        return this.settingService.setByKey(body);
    }

    @ApiBearerAuth()
    @ApiBody({ type: UpdateSettingDto, isArray: true })
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("setByKeys")
    setByKeys(@Body() body: UpdateSettingDto[]) {
        return this.settingService.setBykeys(body);
    }

    @Get("seed")
    seed() {
        this.settingService.seed();
    }

}
