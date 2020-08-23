import { Roles, RolesGuard, UnauthorizedException } from '@app/core/shared';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiDefaultResponse, ApiParam, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserInfoDto, UpdateUserPwd, User } from '../dto';
import { UsersService } from '../service/users.service';

@ApiTags('Users(會員)')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UsersService
  ) { }

  @Post('register')
  @ApiOperation({ summary: "會員註冊" })
  create(@Body() body: CreateUserDto) {
    return this.userService.register(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "取得個人資料", description: "會員取得個人資料" })
  @Get('info')
  @ApiDefaultResponse({ type: User.UserDto })
  async userInfo(@Req() req) {
    return await this.userService.get(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "更改個人資料" })
  @Put('info')
  async update(@Req() req, @Body() body: UpdateUserInfoDto) {
    return await this.userService.update(req.user.id, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "修改個人密碼"})
  @Put('password')
  async updatePwd(@Req() req, @Body() body: UpdateUserPwd) {
    const check = await this.userService.userPwdcheck(req.user.id, body);
    if (check) return await this.userService.updatePwd(req.user.id, body);
    else throw new UnauthorizedException();
  }



  @ApiBearerAuth()
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: "管理員取得所有會員"})
  @Get("admin/getAllUser")
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @ApiBearerAuth()
  @ApiParam({ name: "userinfoId" })
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: "刪除某個會員",description:"只有角色為admint的使用者才有權限"})
  @Delete(":userinfoId")
  async deleteUser(@Param('userinfoId') id: number) {
    return this.userService.delete(id);
  }

  @Get("seed")
  @ApiOperation({ summary: "資料匯入"})
  seed() {
    this.userService.seed();
  }

}
