import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class MongoExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (
      exception.message.includes('duplicate key error collection') &&
      'code' in exception &&
      'keyValue' in exception &&
      exception.code === 11000
    ) {
      return response.status(status).json({
        statusCode: 400,
        message: `${Object.keys(exception.keyValue).join(', ')} already exists`,
      });
    }

    return response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
