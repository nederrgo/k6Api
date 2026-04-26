import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { K6MongoService } from './k6.mongo.service';
import { K6ActivationService } from './k6-activation.service';
import { TestRun } from './schemas/test-run.schema';
import { RunTestDto } from './dto/run-test.dto';
export declare class K6Service implements OnModuleInit {
    private configService;
    private readonly k6MongoService;
    private readonly k6ActivationService;
    private readonly logger;
    private isProcessing;
    constructor(configService: ConfigService, k6MongoService: K6MongoService, k6ActivationService: K6ActivationService);
    runTest(runTestDto: RunTestDto): Promise<{
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
