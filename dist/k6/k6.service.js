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
var K6Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.K6Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const k6_mongo_service_1 = require("./k6.mongo.service");
const k6_activation_service_1 = require("./k6-activation.service");
let K6Service = K6Service_1 = class K6Service {
    constructor(configService, k6MongoService, k6ActivationService) {
        this.configService = configService;
        this.k6MongoService = k6MongoService;
        this.k6ActivationService = k6ActivationService;
        this.logger = new common_1.Logger(K6Service_1.name);
        this.isProcessing = false;
    }
    async runTest(runTestDto) {
        const k6Configs = this.configService.get('k6');
        const testDefaults = k6Configs?.[runTestDto.service]?.[runTestDto.testType];
        if (!testDefaults) {
            throw new common_1.BadRequestException(`No test defaults found for service "${runTestDto.service}" and test type "${runTestDto.testType}"`);
        }
        const testLoad = { ...testDefaults.load, ...(runTestDto.load ?? {}) };
        const targetUrl = runTestDto.url ?? testDefaults.url;
        if (!targetUrl) {
            throw new common_1.BadRequestException('URL is required either in request payload or load-config.json defaults');
        }
        const requestConfig = {
            method: runTestDto.method ?? testDefaults.request?.method ?? 'GET',
            headers: { ...(testDefaults.request?.headers ?? {}), ...(runTestDto.headers ?? {}) },
            body: runTestDto.body ?? testDefaults.request?.body,
        };
        const newTest = await this.k6MongoService.createPendingTest(runTestDto.service, runTestDto.testType, testLoad, targetUrl, requestConfig);
        this.logger.log(`Test queued: ${newTest.id}`);
        this.processQueue();
        return { message: 'Test added to queue', testId: newTest.id };
    }
    async processQueue() {
        if (this.isProcessing)
            return;
        const activeTest = await this.k6MongoService.findRunningTest();
        if (activeTest) {
            this.isProcessing = true;
            return;
        }
        const nextTest = await this.k6MongoService.findNextPendingTest();
        if (!nextTest) {
            this.isProcessing = false;
            this.logger.log('Queue empty.');
            return;
        }
        this.isProcessing = true;
        await this.executeK6(nextTest);
    }
    async executeK6(testDoc) {
        await this.k6MongoService.updateStatus(testDoc, 'RUNNING');
        const result = await this.k6ActivationService.executeTest(testDoc);
        const finalStatus = result.exitCode === 0 ? 'COMPLETED' : 'FAILED';
        await this.k6MongoService.completeTest(testDoc, finalStatus, result.output);
        this.isProcessing = false;
        await this.processQueue();
    }
    async onModuleInit() {
        await this.k6MongoService.resetRunningTestsToPending();
        await this.processQueue();
    }
    async getAllTests() {
        return this.k6MongoService.getRecentTests();
    }
};
exports.K6Service = K6Service;
exports.K6Service = K6Service = K6Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        k6_mongo_service_1.K6MongoService,
        k6_activation_service_1.K6ActivationService])
], K6Service);
//# sourceMappingURL=k6.service.js.map