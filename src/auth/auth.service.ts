import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginRequestBody } from './dto/loginRequestBody.dto';
import { UserPayload } from './types/UserPayload';
import { UserToken } from './types/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginRequestBody: LoginRequestBody): Promise<UserToken> {
    const user = await this.validateUser(loginRequestBody.email, loginRequestBody.password);

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }

    const payload: UserPayload = { sub: user.id, email: user.email };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN') ?? '1d',
    });

    return { access_token };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const { password_hash: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  }
}