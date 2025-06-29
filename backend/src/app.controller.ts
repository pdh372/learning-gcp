import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { randomUUID } from 'crypto'; // built-in module

@Controller()
export class AppController {
  private countRequest = 0;
  private readonly instanceId = randomUUID();

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/huy')
  huy() {
    this.countRequest++;
    const instanceId = process.env.K_REVISION || this.instanceId; // K_REVISION là unique per container

    console.log('⚙️ Instance:', instanceId, 'Request:', this.countRequest);

    return {
      instance: instanceId,
      requestCount: this.countRequest,
    };
  }
}
