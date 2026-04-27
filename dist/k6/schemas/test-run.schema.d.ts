import { Document } from 'mongoose';
import { TestStatus } from 'src/lib/test-status';
import { TestType } from 'src/lib/test-types';
export declare class TestRun extends Document {
    serviceName: string;
    testType: TestType;
    status: TestStatus;
    loadConfig: any;
    url: string;
    requestConfig: any;
    output: any;
    error: string;
    finishedAt: Date;
}
export declare const TestRunSchema: import("mongoose").Schema<TestRun, import("mongoose").Model<TestRun, any, any, any, any, any, TestRun>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TestRun, Document<unknown, {}, TestRun, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, TestRun, Document<unknown, {}, TestRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    serviceName?: import("mongoose").SchemaDefinitionProperty<string, TestRun, Document<unknown, {}, TestRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    testType?: import("mongoose").SchemaDefinitionProperty<"smoke" | "spike" | "soak" | "stress" | "load" | "breakpoint", TestRun, Document<unknown, {}, TestRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<"PENDING" | "RUNNING" | "COMPLETED" | "FAILED", TestRun, Document<unknown, {}, TestRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    loadConfig?: import("mongoose").SchemaDefinitionProperty<any, TestRun, Document<unknown, {}, TestRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    url?: import("mongoose").SchemaDefinitionProperty<string, TestRun, Document<unknown, {}, TestRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    requestConfig?: import("mongoose").SchemaDefinitionProperty<any, TestRun, Document<unknown, {}, TestRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    output?: import("mongoose").SchemaDefinitionProperty<any, TestRun, Document<unknown, {}, TestRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    error?: import("mongoose").SchemaDefinitionProperty<string, TestRun, Document<unknown, {}, TestRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    finishedAt?: import("mongoose").SchemaDefinitionProperty<Date, TestRun, Document<unknown, {}, TestRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, TestRun>;
