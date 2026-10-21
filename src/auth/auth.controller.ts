import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginRequestBody } from './dto/loginRequestBody.dto';
import { Public } from './decorators/isPublic.decorator';
import { CurrentUser } from './decorators/currentUser.decorator';
import { UserPayload } from './types/UserPayload';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginRequestBody: LoginRequestBody) {
    return this.authService.login(loginRequestBody);
  }

  @Get('me')
  me(@CurrentUser() currentUser: UserPayload) {
    return this.usersService.findOne(currentUser.sub);
  }
}