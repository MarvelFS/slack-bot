/* eslint-disable import/no-extraneous-dependencies */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    // eslint-disable-next-line no-console
    console.log('Request...');
    next();
  }
}
