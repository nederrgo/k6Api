"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var K6ActivationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.K6ActivationService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const path_1 = require("path");
let K6ActivationService = K6ActivationService_1 = class K6ActivationService {
    constructor() {
        this.logger = new common_1.Logger(K6ActivationService_1.name);
    }
    async executeTest(testRun) {
        const scriptPath = (0, path_1.resolve)(process.cwd(), 'scripts', 'generic.js');
        const isWindows = process.platform === 'win32';
        const k6Env = {
            ...process.env,
            LOAD_CONFIG: JSON.stringify(testRun.loadConfig),
            TARGET_URL: testRun.url,
            REQUEST_CONFIG: JSON.stringify(testRun.requestConfig || { method: 'GET' }),
        };
        return new Promise((resolveExecution) => {
            const k6 = (0, child_process_1.spawn)('k6', ['run', scriptPath], {
                shell: isWindows,
                env: k6Env,
            });
            let output = '';
            k6.stdout.on('data', (data) => {
                output += data.toString();
            });
            k6.stderr.on('data', (data) => this.logger.warn(data.toString()));
            k6.on('close', (code) => {
                resolveExecution({ exitCode: code, output });
            });
        });
    }
};
exports.K6ActivationService = K6ActivationService;
exports.K6ActivationService = K6ActivationService = K6ActivationService_1 = __decorate([
    (0, common_1.Injectable)()
], K6ActivationService);
//# sourceMappingURL=k6-activation.service.js.map