import { LoadProfile } from '../../config/dto/load-config.dto';
import { TestType } from '../../lib/test-types';
export declare class RunTestDto {
    service: string;
    testType: TestType;
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    headers?: Record<string, string>;
    body?: unknown;
    load?: LoadProfile;
}
