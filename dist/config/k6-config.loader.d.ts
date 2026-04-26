import { ServiceConfig } from './dto/load-config.dto';
export declare const loadK6Config: () => {
    k6: Record<string, ServiceConfig>;
};
