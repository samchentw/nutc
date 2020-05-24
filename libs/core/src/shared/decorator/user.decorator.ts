import { createParamDecorator } from '@nestjs/common';
import { UnauthorizedException } from '../exception/unauthorized.exception';

export const User = createParamDecorator((data: string, req) => {
  return data ? req.user && req.user[data] : req.user;
});


export const RoleCheck = createParamDecorator((data: string[], req) => {
  var user = req.user;
  if (!user) throw new UnauthorizedException();
  var roles: string[] = req.user["roles"];
  var check = roles.some(role => data.find(y => y == role));

  if (!check) throw new UnauthorizedException();
  return check;
});