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
exports.ServiceConfig = exports.TestDefaults = exports.RequestDefaults = exports.LoadProfile = exports.K6Stage = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class K6Stage {
}
exports.K6Stage = K6Stage;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], K6Stage.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], K6Stage.prototype, "target", void 0);
class LoadProfile {
}
exports.LoadProfile = LoadProfile;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LoadProfile.prototype, "vus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d+[smh]$/),
    __metadata("design:type", String)
], LoadProfile.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => K6Stage),
    __metadata("design:type", Array)
], LoadProfile.prototype, "stages", void 0);
class RequestDefaults {
}
exports.RequestDefaults = RequestDefaults;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestDefaults.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RequestDefaults.prototype, "headers", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], RequestDefaults.prototype, "body", void 0);
class TestDefaults {
}
exports.TestDefaults = TestDefaults;
__decorate([
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], TestDefaults.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RequestDefaults),
    __metadata("design:type", RequestDefaults)
], TestDefaults.prototype, "request", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LoadProfile),
    __metadata("design:type", LoadProfile)
], TestDefaults.prototype, "load", void 0);
class ServiceConfig {
}
exports.ServiceConfig = ServiceConfig;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TestDefaults),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", TestDefaults)
], ServiceConfig.prototype, "smoke", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TestDefaults),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", TestDefaults)
], ServiceConfig.prototype, "spike", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TestDefaults),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", TestDefaults)
], ServiceConfig.prototype, "soak", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TestDefaults),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", TestDefaults)
], ServiceConfig.prototype, "stress", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TestDefaults),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", TestDefaults)
], ServiceConfig.prototype, "load", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TestDefaults),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", TestDefaults)
], ServiceConfig.prototype, "breakpoint", void 0);
//# sourceMappingURL=load-config.dto.js.map