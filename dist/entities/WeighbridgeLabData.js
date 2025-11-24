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
exports.WeighbridgeLabData = void 0;
const typeorm_1 = require("typeorm");
let WeighbridgeLabData = exports.WeighbridgeLabData = class WeighbridgeLabData {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], WeighbridgeLabData.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "fat", type: "float", default: null }),
    __metadata("design:type", Number)
], WeighbridgeLabData.prototype, "Fat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "snf", type: "float", default: 0 }),
    __metadata("design:type", Number)
], WeighbridgeLabData.prototype, "Snf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "clr", type: "float", default: 0 }),
    __metadata("design:type", Number)
], WeighbridgeLabData.prototype, "Clr", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "protein", type: "float", default: null }),
    __metadata("design:type", Number)
], WeighbridgeLabData.prototype, "Protein", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "lactose", type: "float", default: null }),
    __metadata("design:type", Number)
], WeighbridgeLabData.prototype, "Lactose", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "salt", type: "float", default: null }),
    __metadata("design:type", Number)
], WeighbridgeLabData.prototype, "Salt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "water", type: "float", default: null }),
    __metadata("design:type", Number)
], WeighbridgeLabData.prototype, "Water", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "temperature", type: "float", default: null }),
    __metadata("design:type", Number)
], WeighbridgeLabData.prototype, "Temperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], WeighbridgeLabData.prototype, "ModifiedAt", void 0);
exports.WeighbridgeLabData = WeighbridgeLabData = __decorate([
    (0, typeorm_1.Entity)()
], WeighbridgeLabData);
