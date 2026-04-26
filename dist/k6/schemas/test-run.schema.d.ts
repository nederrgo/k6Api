import { Document } from 'mongoose';
export declare class TestRun extends Document {
    serviceName: string;
    testType: string;
    status: string;
    loadConfig: any;
    output: string;
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
    serviceName?: import("mongoose").SchemaDefinitionProperty<string, TestRun, Document<unknown, {}, TestRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, TestRun, Document<unknown, {}, TestRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    testType?: import("mongoose").SchemaDefinitionProperty<string, TestRun, Document<unknown, {}, TestRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TestRun & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, TestRun, Document<unknown, {}, TestRun, {
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
    output?: import("mongoose").SchemaDefinitionProperty<string, TestRun, Document<unknown, {}, TestRun, {
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
