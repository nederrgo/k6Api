import { Module } from '@nestjs/common';
import { K6Service } from './k6.service';
import { K6Controller } from './k6.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestRun, TestRunSchema } from './schemas/test-run.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TestRun.name, schema: TestRunSchema }])],
  providers: [K6Service],
  controllers: [K6Controller],
})
export class K6Module {}