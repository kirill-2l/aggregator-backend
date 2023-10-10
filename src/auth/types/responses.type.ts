import { User } from 'src/user/types';
import { Tokens } from './tokens.type';

export interface SignInResponse {
  user: Omit<User, 'password'>;
  tokens: Tokens;
}

export interface SignUpResponse {
  user: User;
  tokens: Tokens;
}
