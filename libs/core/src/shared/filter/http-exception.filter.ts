// src/filters/http-exception.filter.ts
import {Catch, ExceptionFilter, ArgumentsHost} from "@nestjs/common";
import {HttpException} from "@nestjs/common";


export class HttpExceptionFilter implements ExceptionFilter {
    public catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status = exception.getStatus();
  
      if (status === 404) {
        response
          .status(status)
          .send(
            'Go to home page <a href="https://my.url/">https://my.url/</a>',
          );
      } else {
        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      }
    }
  }
  