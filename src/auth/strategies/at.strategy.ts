import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/auth/types/tokens.type';
import { StrategyName } from 'src/auth/types';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, StrategyName.JWT) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'at-secret',
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
