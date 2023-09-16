import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyName } from 'src/auth/types';

@Injectable()
export class RtGuard extends AuthGuard(StrategyName.JWT_REFRESH) {
  constructor() {
    super();
  }
}
