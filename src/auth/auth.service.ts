import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as bcrypt from 'bcrypt';
import { SignInResponse, SignUpResponse, Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { UserId } from 'src/user/types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signUpLocal(dto: SignUpDto): Promise<SignUpResponse> {
    const hash = await bcrypt.hash(dto.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        hash,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    await this.updateRtHash(newUser.id, tokens.refresh_token);
    console.log(newUser);
    return {
      user: {
        email: newUser.email,
        id: newUser.id,
        name: newUser.name,
        password: dto.password,
      },
      tokens,
    };
  }

  async signInLocal(dto: SignInDto): Promise<SignInResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return {
      user: {
        email: user.email,
        id: user.id,
        name: user.name,
      },
      tokens,
    };
  }

  async signOut(userId: UserId) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refresh(userId: UserId, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: UserId, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: UserId, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
