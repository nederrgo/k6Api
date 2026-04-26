import { TestRun } from './schemas/test-run.schema';
export declare class K6ActivationService {
    private readonly logger;
    executeTest(testRun: TestRun): Promise<{
        exitCode: number | null;
        output: string;
    }>;
}
