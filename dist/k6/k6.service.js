"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var K6Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.K6Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const test_run_schema_1 = require("./schemas/test-run.schema");
const child_process_1 = require("child_process");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
let K6Service = K6Service_1 = class K6Service {
    constructor(testRunModel, configService) {
        this.testRunModel = testRunModel;
        this.configService = configService;
        this.logger = new common_1.Logger(K6Service_1.name);
        this.isProcessing = false;
    }
    async runTest(serviceName, testType) {
        const k6Configs = this.configService.get('k6');
        const testLoad = k6Configs?.[serviceName]?.[testType];
        const newTest = await this.testRunModel.create({
            serviceName,
            testType,
            loadConfig: testLoad,
            status: 'PENDING',
        });
        this.logger.log(`Test queued: ${newTest.id}`);
        this.processQueue();
        return { message: 'Test added to queue', testId: newTest.id };
    }
    async processQueue() {
        if (this.isProcessing)
            return;
        const activeTest = await this.testRunModel.findOne({ status: 'RUNNING' });
        if (activeTest) {
            this.isProcessing = true;
            return;
        }
        const nextTest = await this.testRunModel.findOne({ status: 'PENDING' }).sort({ createdAt: 1 });
        if (!nextTest) {
            this.isProcessing = false;
            this.logger.log('Queue empty.');
            return;
        }
        this.isProcessing = true;
        await this.executeK6(nextTest);
    }
    async executeK6(testDoc) {
        const scriptPath = (0, path_1.resolve)(process.cwd(), 'scripts', testDoc.serviceName, `${testDoc.testType}.js`);
        testDoc.status = 'RUNNING';
        await testDoc.save();
        const isWindows = process.platform === 'win32';
        const k6Env = {
            ...process.env,
            LOAD_CONFIG: JSON.stringify(testDoc.loadConfig),
        };
        const k6 = (0, child_process_1.spawn)('k6', ['run', scriptPath], {
            shell: isWindows,
            env: k6Env,
        });
        let output = '';
        k6.stdout.on('data', (data) => (output += data.toString()));
        k6.stderr.on('data', (data) => this.logger.warn(data.toString()));
        k6.on('close', async (code) => {
            testDoc.status = code === 0 ? 'COMPLETED' : 'FAILED';
            testDoc.output = output;
            testDoc.finishedAt = new Date();
            await testDoc.save();
            this.isProcessing = false;
            this.processQueue();
        });
    }
    async onModuleInit() {
        await this.testRunModel.updateMany({ status: 'RUNNING' }, { status: 'PENDING' });
        this.processQueue();
    }
    async getAllTests() {
        return this.testRunModel.find().sort({ createdAt: -1 }).limit(20);
    }
};
exports.K6Service = K6Service;
exports.K6Service = K6Service = K6Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(test_run_schema_1.TestRun.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], K6Service);
//# sourceMappingURL=k6.service.js.map