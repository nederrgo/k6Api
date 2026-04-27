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
Object.defineProperty(exports, "__esModule", { value: true });
exports.K6MongoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const test_run_schema_1 = require("./schemas/test-run.schema");
const test_status_1 = require("../lib/test-status");
let K6MongoService = class K6MongoService {
    constructor(testRunModel) {
        this.testRunModel = testRunModel;
    }
    async createPendingTest(serviceName, testType, loadConfig, url, requestConfig) {
        return this.testRunModel.create({
            serviceName,
            testType,
            loadConfig,
            url,
            requestConfig,
            status: test_status_1.testStatusValues.PENDING,
        });
    }
    async findRunningTest() {
        return this.testRunModel.findOne({ status: test_status_1.testStatusValues.RUNNING });
    }
    async findNextPendingTest() {
        return this.testRunModel.findOne({ status: test_status_1.testStatusValues.PENDING }).sort({ createdAt: 1 });
    }
    async updateStatus(testRun, status) {
        testRun.status = status;
        await testRun.save();
    }
    async completeTest(testRun, status, output) {
        testRun.status = status;
        testRun.output = JSON.parse(output);
        testRun.finishedAt = new Date();
        await testRun.save();
    }
    async resetRunningTestsToPending() {
        await this.testRunModel.updateMany({ status: test_status_1.testStatusValues.RUNNING }, { status: test_status_1.testStatusValues.PENDING });
    }
    async getRecentTests(limit = 20) {
        return this.testRunModel.find().sort({ createdAt: -1 }).limit(limit);
    }
};
exports.K6MongoService = K6MongoService;
exports.K6MongoService = K6MongoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(test_run_schema_1.TestRun.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], K6MongoService);
//# sourceMappingURL=k6.mongo.service.js.map