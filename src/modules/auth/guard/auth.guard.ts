import {
  Inject,
  Injectable,
  HttpStatus,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RESPONSE } from 'src/core/constants';
import { ConfigService } from '@nestjs/config';

const exception = new UnauthorizedException({
  data: {},
  status: HttpStatus.UNAUTHORIZED,
  message: RESPONSE.NOT_LOGGED_IN,
  timestamp: new Date().toISOString(),
});

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly JWT_SECRET = this.config.getOrThrow('JWT_SECRET');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);

    if (!accessToken) throw exception;

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.JWT_SECRET,
      });

      request['user'] = payload;
    } catch {
      throw exception;
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, accessToken] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? accessToken : undefined;
  }
}
