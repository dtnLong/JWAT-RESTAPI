import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseInterface } from './response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionMsg = exception.getResponse();
    
    // Compose custom response for http error
    const responseJSON: ResponseInterface = {
        status: status,
        data: null,
        error: {
            code: exceptionMsg["statusCode"],
            path: request.url,
            message: exceptionMsg["message"]
        }
    };

    response
      .status(status)
      .json(responseJSON);
  }
}