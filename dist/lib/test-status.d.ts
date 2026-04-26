export declare const testStatuses: readonly ["PENDING", "RUNNING", "COMPLETED", "FAILED"];
export type TestStatus = typeof testStatuses[number];
export declare const testStatusValues: {
    PENDING: string;
    RUNNING: string;
    COMPLETED: string;
    FAILED: string;
};
