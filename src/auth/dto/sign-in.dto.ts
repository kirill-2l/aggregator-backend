import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'mail@google.com',
    uniqueItems: true,
  })
  email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    maxLength: 20,
  })
  password: string;
}
