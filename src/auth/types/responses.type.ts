import { User } from 'src/users/user.entity';
import { Tokens } from './tokens.type';

export interface SignInResponse {
  user: Pick<User, 'email' | 'id'>;
  tokens: Tokens;
}

export interface SignUpResponse {
  email: string;
  name: string;
  password: string;
  tokens: Tokens;
}
