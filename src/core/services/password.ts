import * as argon2 from 'argon2/argon2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordService {
  constructor(private readonly config: ConfigService) {}

  // async hash(plain: string): Promise<string> {
  //   const options: any = this.config.get('argon2')!;
  //   return (await argon2.hash(plain, options)).toString();
  // }

  // async verify(plain: string, hash: string): Promise<boolean> {
  //   if (!plain || !hash) return false;

  //   const options: any = this.config.get('argon2')!;
  //   return await argon2.verify(hash, plain, options);
  // }
}
