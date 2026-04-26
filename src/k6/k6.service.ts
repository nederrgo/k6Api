// src/k6/k6.service.ts
import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { K6MongoService } from './k6.mongo.service';
import { K6ActivationService } from './k6-activation.service';
import { TestRun } from './schemas/test-run.schema';
import { RunTestDto } from './dto/run-test.dto';

@Injectable()
export class K6Service implements OnModuleInit {
  private readonly logger = new Logger(K6Service.name);
  private isProcessing = false;

  constructor(
    private configService: ConfigService,
    private readonly k6MongoService: K6MongoService,
    private readonly k6ActivationService: K6ActivationService,
  ) {}

  async runTest(runTestDto: RunTestDto) {
    const k6Configs = this.configService.get('k6');
    const testDefaults = k6Configs?.[runTestDto.service]?.[runTestDto.testType];
    if (!testDefaults) {
      throw new BadRequestException(
        `No test defaults found for service "${runTestDto.service}" and test type "${runTestDto.testType}"`,
      );
    }
    const testLoad = { ...testDefaults.load, ...(runTestDto.load ?? {}) };
    const targetUrl = runTestDto.url ?? testDefaults.url;
    if (!targetUrl) {
      throw new BadRequestException('URL is required either in request payload or load-config.json defaults');
    }
    const requestConfig = {
      method: runTestDto.method ?? testDefaults.request?.method ?? 'GET',
      headers: { ...(testDefaults.request?.headers ?? {}), ...(runTestDto.headers ?? {}) },
      body: runTestDto.body ?? testDefaults.request?.body,
    };

    const newTest = await this.k6MongoService.createPendingTest(
      runTestDto.service,
      runTestDto.testType,
      testLoad,
      targetUrl,
      requestConfig,
    );

    this.logger.log(`Test queued: ${newTest.id}`);

    this.processQueue();

    return { message: 'Test added to queue', testId: newTest.id };
  }

  private async processQueue() {
    if (this.isProcessing) return;

    const activeTest = await this.k6MongoService.findRunningTest();
    if (activeTest) {
      this.isProcessing = true;
      return;
    }

    const nextTest = await this.k6MongoService.findNextPendingTest();

    if (!nextTest) {
      this.isProcessing = false;
      this.logger.log('Queue empty.');
      return;
    }

    this.isProcessing = true;
    await this.executeK6(nextTest);
  }

  private async executeK6(testDoc: TestRun) {
    await this.k6MongoService.updateStatus(testDoc, 'RUNNING');
    const result = await this.k6ActivationService.executeTest(testDoc);
    const finalStatus = result.exitCode === 0 ? 'COMPLETED' : 'FAILED';
    await this.k6MongoService.completeTest(testDoc, finalStatus, result.output);
    this.isProcessing = false;
    await this.processQueue();
  }

  async onModuleInit() {
    await this.k6MongoService.resetRunningTestsToPending();
    await this.processQueue();
  }

  async getAllTests() {
    return this.k6MongoService.getRecentTests();
  }
}