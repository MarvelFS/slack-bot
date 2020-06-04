import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SLACK_HOOK } from '../../environments';

@Injectable()
export class SlackService {
  constructor(private httpService: HttpService) {}

  sendMessage(text: string) {
    return this.httpService.post(SLACK_HOOK, { text });
  }
}
