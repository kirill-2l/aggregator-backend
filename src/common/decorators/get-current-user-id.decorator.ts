import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types';
import { UserId } from 'src/user/types';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): UserId => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user.sub;
  },
);
