import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('usuarios')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  setHello(): string {
    return 'Hello World! post';
  }
}
