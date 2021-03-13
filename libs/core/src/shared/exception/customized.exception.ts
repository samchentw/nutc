import {HttpException,HttpStatus} from '@nestjs/common';

export class CustomizedException extends HttpException {
    constructor(message:string,status:number) {
      super(message, status);
    }
  }