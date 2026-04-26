import { Controller, Post, Body, Get } from '@nestjs/common';
import { K6Service } from './k6.service';
import { RunTestDto } from './dto/run-test.dto';

@Controller('tests')
export class K6Controller {
  constructor(private readonly k6Service: K6Service) {}

  @Post('run')
  async trigger(@Body() body: RunTestDto) {
    return this.k6Service.runTest(body);
  }
  @Get('history') 
  async getHistory() {
    return this.k6Service.getAllTests();
  }
}
