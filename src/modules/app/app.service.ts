import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): string {
    return 'Hello Ayo 🔥🔥🔥!';
  }
}
