import { Roles, RolesGuard, UnauthorizedException } from '@app/core/shared';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiDefaultResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserInfoDto, UpdateUserPwd, User } from '../dto';
import { UsersService } from '../service/users.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UsersService
  ) { }

  @Post('register')
  create(@Body() body: CreateUserDto) {
    return this.userService.register(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('info')
  @ApiDefaultResponse({ type: User.UserDto })
  async userInfo(@Req() req) {
    return await this.userService.get(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('info')
  async update(@Req() req, @Body() body: UpdateUserInfoDto) {
    return await this.userService.update(req.user.id, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('password')
  async updatePwd(@Req() req, @Body() body: UpdateUserPwd) {
    const check = await this.userService.userPwdcheck(req.user.id, body);
    if (check) return await this.userService.updatePwd(req.user.id, body);
    else throw new UnauthorizedException();
  }



  @ApiBearerAuth()
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("admin/getAllUser")
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @ApiBearerAuth()
  @ApiParam({ name: "userinfoId" })
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":userinfoId")
  async deleteUser(@Param('userinfoId') id: number) {
    return this.userService.delete(id);
  }

  @Get("seed")
  seed() {
    this.userService.seed();
  }

}
