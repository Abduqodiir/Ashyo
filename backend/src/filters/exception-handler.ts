import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import sequelize from 'sequelize';

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const requestTime = new Date().toISOString();

        if (exception instanceof HttpException) {
            console.log(exception, "*")
            return response.status(exception.getStatus()).json({
                message: exception.message,
                requestTime,
                url: request.url,
                errorName: exception.name,
                statusCode: exception.getStatus(),
            });
        }
        if (exception instanceof sequelize.UniqueConstraintError) {
           return response.status(400).json({
            message: exception.message,
            requestTime,
            url: request.url,
            error: 'Duplicate value',
            errorName: exception.name,
            });
          } 

        return response.status(500).json({
            message: exception?.message || 'Internal server error',
            requestTime,
            url: request.url,
            errorName: exception?.name,
            statusCode: 500,
        });
    }
}