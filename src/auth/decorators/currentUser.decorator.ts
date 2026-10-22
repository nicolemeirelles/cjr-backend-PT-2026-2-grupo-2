import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserPayload } from '../types/UserPayload';

export const CurrentUser = createParamDecorator(
  (data: keyof UserPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request & { user: UserPayload }>();
    return data ? request.user[data] : request.user;
  },
);