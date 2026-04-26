// src/k6/k6.service.ts
import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestRun } from './schemas/test-run.schema';
import { spawn } from 'child_process';
import { resolve } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class K6Service implements OnModuleInit{
  private readonly logger = new Logger(K6Service.name);
  private isProcessing = false; // Internal lock

  constructor(
    @InjectModel(TestRun.name) private testRunModel: Model<TestRun>,
    private configService: ConfigService,
  ) {}

  async runTest(serviceName: string, testType: string) {
    const k6Configs = this.configService.get('k6');
    const testLoad = k6Configs?.[serviceName]?.[testType];

    // 1. Always create as PENDING
    const newTest = await this.testRunModel.create({
      serviceName,
      testType,
      loadConfig: testLoad,
      status: 'PENDING',
    });

    this.logger.log(`Test queued: ${newTest.id}`);

    // 2. Trigger queue processing (Fire and forget)
    this.processQueue();

    return { message: 'Test added to queue', testId: newTest.id };
  }

  private async processQueue() {
    // If a test is already running, stop here.
    if (this.isProcessing) return;

    // Check if any test is currently marked as RUNNING in DB (safety check)
    const activeTest = await this.testRunModel.findOne({ status: 'RUNNING' });
    if (activeTest) {
      this.isProcessing = true;
      return;
    }

    // Find the oldest PENDING test
    const nextTest = await this.testRunModel.findOne({ status: 'PENDING' }).sort({ createdAt: 1 });

    if (!nextTest) {
      this.isProcessing = false;
      this.logger.log('Queue empty.');
      return;
    }

    // Start the test
    this.isProcessing = true;
    await this.executeK6(nextTest);
  }

private async executeK6(testDoc: TestRun) {
  const scriptPath = resolve(process.cwd(), 'scripts', testDoc.serviceName, `${testDoc.testType}.js`);
  
  testDoc.status = 'RUNNING';
  await testDoc.save();

  // 1. Detect if we are on Windows
  const isWindows = process.platform === 'win32';

  // 2. Spread the existing process environment and add our custom variable
  // This avoids the "Shell Quote Escaping" nightmare on Windows
  const k6Env = {
    ...process.env,
    LOAD_CONFIG: JSON.stringify(testDoc.loadConfig),
  };

  const k6 = spawn('k6', ['run', scriptPath], {
    shell: isWindows, // Windows needs shell: true to find the k6.exe
    env: k6Env,       // Pass the config safely via the environment object
  });

  let output = '';
  k6.stdout.on('data', (data) => (output += data.toString()));
  k6.stderr.on('data', (data) => this.logger.warn(data.toString()));

  k6.on('close', async (code) => {
    testDoc.status = code === 0 ? 'COMPLETED' : 'FAILED';
    testDoc.output = output;
    testDoc.finishedAt = new Date();
    await testDoc.save();

    this.isProcessing = false;
    this.processQueue();
    });
 }
  async onModuleInit() {
    await this.testRunModel.updateMany({ status: 'RUNNING' }, { status: 'PENDING' });
    this.processQueue();
  }
  async getAllTests() {
    return this.testRunModel.find().sort({ createdAt: -1 }).limit(20);
  }
}