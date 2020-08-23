import { Roles, RolesGuard } from '@app/core/shared';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/log.dto';


@ApiTags('Auth(認證)')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: '登入', description: "內部登入" })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // @ApiBearerAuth()
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  @ApiBearerAuth()
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: '角色確認(是否為admin)', description: "無" })
  @Get('admin/permission')
  async admin() {
    return true;
  }
}
