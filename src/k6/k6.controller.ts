import { Controller, Post, Body, Get } from '@nestjs/common';
import { K6Service } from './k6.service';

@Controller('tests')
export class K6Controller {
  constructor(private readonly k6Service: K6Service) {}

  @Post('run')
  async trigger(@Body() body: { service: string; type: 'smoke' | 'spike' }) {
    return this.k6Service.runTest(body.service, body.type);
  }
  @Get('history') // This defines the path
  async getHistory() {
    return this.k6Service.getAllTests();
  }
}
