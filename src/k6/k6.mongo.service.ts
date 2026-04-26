import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestRun } from './schemas/test-run.schema';
import { TestStatus, testStatusValues } from 'src/lib/test-status';
@Injectable()
export class K6MongoService {
  constructor(@InjectModel(TestRun.name) private testRunModel: Model<TestRun>) { }

  async createPendingTest(
    serviceName: string,
    testType: string,
    loadConfig: any,
    url: string,
    requestConfig: { method: string; headers?: Record<string, string>; body?: unknown },
  ) {
    return this.testRunModel.create({
      serviceName,
      testType,
      loadConfig,
      url,
      requestConfig,
      status: testStatusValues.PENDING,
    });
  }

  async findRunningTest() {
    return this.testRunModel.findOne({ status: testStatusValues.RUNNING });
  }

  async findNextPendingTest() {
    return this.testRunModel.findOne({ status: testStatusValues.PENDING }).sort({ createdAt: 1 });
  }

  async updateStatus(testRun: TestRun, status: TestStatus) {
    testRun.status = status;
    await testRun.save();
  }

  async completeTest(testRun: TestRun, status: TestStatus, output: string) {
    testRun.status = status;
    testRun.output = output;
    testRun.finishedAt = new Date();
    await testRun.save();
  }

  async resetRunningTestsToPending() {
    await this.testRunModel.updateMany({ status: testStatusValues.RUNNING }, { status: testStatusValues.PENDING });
  }

  async getRecentTests(limit = 20) {
    return this.testRunModel.find().sort({ createdAt: -1 }).limit(limit);
  }
}
