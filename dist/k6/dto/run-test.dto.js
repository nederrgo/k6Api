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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunTestDto = void 0;
const class_validator_1 = require("class-validator");
const load_config_dto_1 = require("../../config/dto/load-config.dto");
const test_types_1 = require("../../lib/test-types");
class RunTestDto {
}
exports.RunTestDto = RunTestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RunTestDto.prototype, "service", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(test_types_1.testTypes),
    __metadata("design:type", String)
], RunTestDto.prototype, "testType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], RunTestDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
    __metadata("design:type", String)
], RunTestDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RunTestDto.prototype, "headers", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], RunTestDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", load_config_dto_1.LoadProfile)
], RunTestDto.prototype, "load", void 0);
//# sourceMappingURL=run-test.dto.js.map