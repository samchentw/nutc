import {HttpException,HttpStatus} from '@nestjs/common';

export class dataDuplicationException extends HttpException {
    constructor() {
      super('Input data validation failed', HttpStatus.BAD_REQUEST);
    }
  }