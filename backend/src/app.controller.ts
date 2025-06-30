import { Controller, Get, Post } from '@nestjs/common';
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

    console.info('⚙️ Instance:', instanceId, 'Request:', this.countRequest);

    return {
      instance: instanceId,
      requestCount: this.countRequest,
    };
  }

  @Post('/user/create')
  async create() {
    const instanceId = process.env.K_REVISION || this.instanceId; // K_REVISION là unique per container

    const newUser = await this.appService.createUser();

    return {
      instance: instanceId,
      data: newUser,
    };
  }

  @Get('/user/list')
  async list() {
    const instanceId = process.env.K_REVISION || this.instanceId; // K_REVISION là unique per container

    const users = await this.appService.getUsers();

    return {
      instance: instanceId,
      data: users,
    };
  }
}
