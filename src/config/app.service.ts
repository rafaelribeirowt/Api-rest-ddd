import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // eslint-disable-next-line quotes
    return `<h1>Hello World in html <h1/>`;
  }
}
