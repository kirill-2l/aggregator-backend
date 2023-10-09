import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
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
    maxLength: 50,
  })
  password: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    maxLength: 30,
    minLength: 4,
  })
  name: string;
}
