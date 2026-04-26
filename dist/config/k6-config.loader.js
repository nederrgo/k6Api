"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadK6Config = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const load_config_dto_1 = require("./dto/load-config.dto");
const fs = require("fs");
const path_1 = require("path");
const loadK6Config = () => {
    const filePath = process.env.K6_CONFIG_PATH || (0, path_1.join)(process.cwd(), 'load-config.json');
    if (!fs.existsSync(filePath)) {
        throw new Error(`Critical Error: Config file not found at ${filePath}`);
    }
    const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const validatedConfig = {};
    for (const [serviceName, serviceData] of Object.entries(rawData)) {
        const serviceInstance = (0, class_transformer_1.plainToInstance)(load_config_dto_1.ServiceConfig, serviceData);
        const errors = (0, class_validator_1.validateSync)(serviceInstance);
        if (errors.length > 0) {
            throw new Error(`Validation failed for ${serviceName}: ${errors.toString()}`);
        }
        validatedConfig[serviceName] = serviceInstance;
    }
    return { k6: validatedConfig };
};
exports.loadK6Config = loadK6Config;
//# sourceMappingURL=k6-config.loader.js.map