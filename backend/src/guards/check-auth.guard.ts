import {
  BadRequestException,
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import {
  JsonWebTokenError,
  JwtService,
  NotBeforeError,
  TokenExpiredError,
} from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Protected } from '@decorators';
import { UserRoles } from '@modules';

export declare interface RequestInterface extends Request {
  userId: number | undefined;
  role: string | undefined;
}

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<RequestInterface>();

    const isProtected = this.reflector.get<boolean>(
      Protected,
      context.getHandler(),
    );

    if (!isProtected) {
      request.role = UserRoles.user;
      return true;
    }

    const bearerToken = request.headers['authorization'];

    if (
      !(
        bearerToken &&
        bearerToken.startsWith('Bearer') &&
        bearerToken.split('Bearer ')[1]?.length
      )
    ) {
      throw new BadRequestException('Please provide valid bearer token');
    }

    const token = bearerToken.split('Bearer ')[1];

    try {
      this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Token already expired');
      }

      if (error instanceof NotBeforeError) {
        throw new ConflictException('Token not before error');
      }

      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException(error.message);
      }

      return false;
    }

    const userDecodedData = this.jwtService.decode(token);

    request.userId = userDecodedData?.id;
    request.role = userDecodedData?.role;

    return true;
  }
}