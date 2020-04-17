import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/service/users.service';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService:ConfigService
    ) {}

    validateLogin(data):boolean{        
        const existedUser = this.usersService.checkUser(data);
        if(existedUser) return true;
        else false;
    }

    //取得token
    async createToken(uuid,userinfoId) {
        const roles=await this.usersService.getRole(userinfoId);        
        const expiresIn = '3h';
        const secret = this.configService.get<string>('donttalk');
        const token = jwt.sign({id:uuid,roles}, secret, { expiresIn });
        return {
            expires_in:expiresIn,
            token: token
        };
    }
}
