export declare class K6Stage {
    duration: string;
    target: number;
}
export declare class LoadProfile {
    vus?: number;
    duration?: string;
    stages?: K6Stage[];
}
export declare class ServiceConfig {
    smoke: LoadProfile;
    spike: LoadProfile;
}
