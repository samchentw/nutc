import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PserssionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('perssion', context.getHandler());    
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;  
    // console.log(user);
    const hasRole = () =>
      user.perssion.some(role => roles.find(item => item === role));
      return user && user.roles && hasRole();
  }
}