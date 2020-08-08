import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.checkUser({ account: username, password: pass });
    if (user) {
      var roles = await this.usersService.getRole(user.userinfo.id);
      const { password, ...result } = user;
      var data = { "roles": roles, ...result };
      return data;
    }
    return null;
  }

  async login(user: any) {
    const payload = user;

    return {
      access_token: this.jwtService.sign(payload),
      expiresIn: this.configService.get<string>("expiresIn")
    };
  }
}