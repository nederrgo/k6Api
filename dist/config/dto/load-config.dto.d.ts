export declare class K6Stage {
    duration: string;
    target: number;
}
export declare class LoadProfile {
    vus?: number;
    duration?: string;
    stages?: K6Stage[];
}
export declare class RequestDefaults {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    headers?: Record<string, string>;
    body?: unknown;
}
export declare class TestDefaults {
    url: string;
    request: RequestDefaults;
    load: LoadProfile;
}
export declare class ServiceConfig {
    smoke?: TestDefaults;
    spike?: TestDefaults;
    soak?: TestDefaults;
    stress?: TestDefaults;
    load?: TestDefaults;
    breakpoint?: TestDefaults;
}
