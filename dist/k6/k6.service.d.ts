import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { TestRun } from './schemas/test-run.schema';
import { ConfigService } from '@nestjs/config';
export declare class K6Service implements OnModuleInit {
    private testRunModel;
    private configService;
    private readonly logger;
    private isProcessing;
    constructor(testRunModel: Model<TestRun>, configService: ConfigService);
    runTest(serviceName: string, testType: string): Promise<{
        message: string;
        testId: string;
    }>;
    private processQueue;
    private executeK6;
    onModuleInit(): Promise<void>;
    getAllTests(): Promise<(import("mongoose").Document<unknown, {}, TestRun, {}, import("mongoose").DefaultSchemaOptions> & TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
