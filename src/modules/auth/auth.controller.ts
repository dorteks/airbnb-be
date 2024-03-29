import {
  Get,
  Body,
  Post,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RESPONSE } from 'src/core/constants';
import { Auth as CustomAuthGuard } from './decorators/auth.decorator';
import { TCreateAccountBody, TLoginBody, TVerifyEmailBody } from './dto/body';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/create')
  async createUser(@Body() body: TCreateAccountBody) {
    const data = await this.authService.handleCreateUser(body);
    return { message: RESPONSE.SUCCESS, data };
  }

  @Post('/login')
  async login(@Body() body: TLoginBody) {
    const data = await this.authService.handleLogin(body);
    return { message: RESPONSE.SUCCESS, data };
  }

  @CustomAuthGuard()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/verify/email')
  async verifyEmail(@Body() body: TVerifyEmailBody) {
    const data = await this.authService.handleVerifyEmail(body);
    return { message: RESPONSE.SUCCESS, data };
  }
}
