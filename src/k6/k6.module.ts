import { Module } from '@nestjs/common';
import { K6Service } from './k6.service';
import { K6Controller } from './k6.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestRun, TestRunSchema } from './schemas/test-run.schema';
import { K6MongoService } from './k6.mongo.service';
import { K6ActivationService } from './k6-activation.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TestRun.name, schema: TestRunSchema }])],
  providers: [K6Service, K6MongoService, K6ActivationService],
  controllers: [K6Controller],
})
export class K6Module {}