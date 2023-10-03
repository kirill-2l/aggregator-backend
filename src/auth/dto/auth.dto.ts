import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'mail@google.com',
    uniqueItems: true,
  })
  username: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    maxLength: 20,
  })
  password: string;
}
