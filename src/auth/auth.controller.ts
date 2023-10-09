import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { SignInResponse, SignUpResponse, Tokens } from './types';
import { UserId } from 'src/user/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUpLocal(@Body() dto: SignUpDto): Promise<SignUpResponse> {
    return this.authService.signUpLocal(dto);
  }

  @Public()
  @Post('local/sign-in')
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() dto: SignInDto): Promise<SignInResponse> {
    return this.authService.signInLocal(dto);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  signOut(@GetCurrentUserId() userId: UserId) {
    return this.authService.signOut(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refresh(userId, refreshToken);
  }
}
