import { Model } from 'mongoose';
import { TestRun } from './schemas/test-run.schema';
import { TestStatus } from 'src/lib/test-status';
export declare class K6MongoService {
    private testRunModel;
    constructor(testRunModel: Model<TestRun>);
    createPendingTest(serviceName: string, testType: string, loadConfig: any, url: string, requestConfig: {
        method: string;
        headers?: Record<string, string>;
        body?: unknown;
    }): Promise<import("mongoose").Document<unknown, {}, TestRun, {}, import("mongoose").DefaultSchemaOptions> & TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findRunningTest(): Promise<import("mongoose").Document<unknown, {}, TestRun, {}, import("mongoose").DefaultSchemaOptions> & TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findNextPendingTest(): Promise<import("mongoose").Document<unknown, {}, TestRun, {}, import("mongoose").DefaultSchemaOptions> & TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateStatus(testRun: TestRun, status: TestStatus): Promise<void>;
    completeTest(testRun: TestRun, status: TestStatus, output: string): Promise<void>;
    resetRunningTestsToPending(): Promise<void>;
    getRecentTests(limit?: number): Promise<(import("mongoose").Document<unknown, {}, TestRun, {}, import("mongoose").DefaultSchemaOptions> & TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
