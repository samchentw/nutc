import {HttpException,HttpStatus} from '@nestjs/common';

export class customizedException extends HttpException {
    constructor(message:string,status:number) {
      super(message, status);
    }
  }