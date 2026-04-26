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
exports.K6Controller = void 0;
const common_1 = require("@nestjs/common");
const k6_service_1 = require("./k6.service");
let K6Controller = class K6Controller {
    constructor(k6Service) {
        this.k6Service = k6Service;
    }
    async trigger(body) {
        return this.k6Service.runTest(body.service, body.type);
    }
    async getHistory() {
        return this.k6Service.getAllTests();
    }
};
exports.K6Controller = K6Controller;
__decorate([
    (0, common_1.Post)('run'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], K6Controller.prototype, "trigger", null);
__decorate([
    (0, common_1.Get)('history'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], K6Controller.prototype, "getHistory", null);
exports.K6Controller = K6Controller = __decorate([
    (0, common_1.Controller)('tests'),
    __metadata("design:paramtypes", [k6_service_1.K6Service])
], K6Controller);
//# sourceMappingURL=k6.controller.js.map