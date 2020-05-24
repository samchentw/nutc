import { Controller, Get, UsePipes, UseGuards, Post, Body, Param, Put, Delete, Request, Req, ValidationPipe } from '@nestjs/common';
import { UpdateUserPwd, CreateUserDto, LoginUserDto, UpdateUserInfoDto, User } from '../dto';
import { UsersService } from '../service/users.service';
import { UnauthorizedException, RolesGuard, Roles, RoleCheck } from '@app/core/shared';
import { ApiTags, ApiBearerAuth, ApiDefaultResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/identity/auth/guard/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
@UsePipes(new ValidationPipe())
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
  @UseGuards(JwtAuthGuard)
  @Get("admin/getAllUser")
  async getAllUser(@RoleCheck(["admin"]) admin) {
    return await this.userService.getAllUser();
  }

  @Get("seed")
  seed() {
    this.userService.seed();
  }

}
