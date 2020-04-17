import { Injectable, NestMiddleware, } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    res.header('Access-Control-Allow-Origin', '*');
      // list of methods (e.g GET,HEAD,PUT,PATCH,POST,DELETE)
      res.header('Access-Control-Allow-Headers', '*');
      res.header('Access-Control-Allow-Methods', '*');
      next();
  }
}

