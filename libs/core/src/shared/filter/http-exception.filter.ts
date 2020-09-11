// src/filters/http-exception.filter.ts
import { Catch, ExceptionFilter, ArgumentsHost, Logger } from "@nestjs/common";
import { HttpException } from "@nestjs/common";


export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (!exception) {
      const errorResponse = {
        code: 500,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message: exception.message || null,
      }
      Logger.error(errorResponse);
      response.status(exception.getStatus()).json(errorResponse);
      return;
    }

    const status = exception.getStatus();
    const url: string = request.url;

    if (url.startsWith("/api/")) {
      const errorResponse = {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message: exception.message || null,
      }

      Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(errorResponse),
        'ExceptionFilter',
      );

      response.status(404).json({ errorResponse });
      return;
    }

    if (status === 404) {
      response.redirect("./nutc")
      // .status(status)
      // .send(
      //   'Go to home page <a href="https://my.url/">https://my.url/</a>',
      // );
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: url,
      });
    }
  }
}
