"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.K6Module = void 0;
const common_1 = require("@nestjs/common");
const k6_service_1 = require("./k6.service");
const k6_controller_1 = require("./k6.controller");
const mongoose_1 = require("@nestjs/mongoose");
const test_run_schema_1 = require("./schemas/test-run.schema");
let K6Module = class K6Module {
};
exports.K6Module = K6Module;
exports.K6Module = K6Module = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: test_run_schema_1.TestRun.name, schema: test_run_schema_1.TestRunSchema }])],
        providers: [k6_service_1.K6Service],
        controllers: [k6_controller_1.K6Controller],
    })
], K6Module);
//# sourceMappingURL=k6.module.js.map