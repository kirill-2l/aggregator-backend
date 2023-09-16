import { UserId } from 'src/users/user.entity';

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type JwtPayload = {
  sub: UserId;
  email: string;
};
