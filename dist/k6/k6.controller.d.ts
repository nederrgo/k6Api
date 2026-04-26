import { K6Service } from './k6.service';
export declare class K6Controller {
    private readonly k6Service;
    constructor(k6Service: K6Service);
    trigger(body: {
        service: string;
        type: 'smoke' | 'spike';
    }): Promise<{
        message: string;
        testId: string;
    }>;
    getHistory(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/test-run.schema").TestRun, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/test-run.schema").TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
