import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { RegisterUserDto } from './register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // constructor(private userRepository: Repository<User>) {}
  // async create(registerUserDto: RegisterUserDto): Promise<User> {
  //   const { username, password } = registerUserDto;
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   const user = new User();
  //   user.username = username;
  //   user.password = hashedPassword;
  //   return this.userRepository.save(user);
  // }
}
