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
exports.ProcurementCenterCharacteristics = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const ProcurementCenterType_1 = require("./ProcurementCenterType");
const PayrollTypes_1 = require("./PayrollTypes");
const DefaultCollectionType_1 = require("./DefaultCollectionType");
const RouteType_1 = require("./RouteType");
let ProcurementCenterCharacteristics = exports.ProcurementCenterCharacteristics = class ProcurementCenterCharacteristics {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], ProcurementCenterCharacteristics.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProcurementCenterType_1.ProcurementCenterType, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "proc_type" }),
    __metadata("design:type", ProcurementCenterType_1.ProcurementCenterType)
], ProcurementCenterCharacteristics.prototype, "ProcurementTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "morning_shift_start_time", type: "time", default: null }),
    __metadata("design:type", String)
], ProcurementCenterCharacteristics.prototype, "MorningShiftStartTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "morning_shift_end_time", type: "time", default: null }),
    __metadata("design:type", String)
], ProcurementCenterCharacteristics.prototype, "MorningShiftEndTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "evening_shift_start_time", type: "time", default: null }),
    __metadata("design:type", String)
], ProcurementCenterCharacteristics.prototype, "EveningShiftStartTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "evening_shift_end_time", type: "time", default: null }),
    __metadata("design:type", String)
], ProcurementCenterCharacteristics.prototype, "EveningShiftEndTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DefaultCollectionType_1.DefaultCollectionType, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "default_collection_type" }),
    __metadata("design:type", DefaultCollectionType_1.DefaultCollectionType)
], ProcurementCenterCharacteristics.prototype, "DefaultCollectionType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PayrollTypes_1.PayrollTypes, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "payroll_type" }),
    __metadata("design:type", PayrollTypes_1.PayrollTypes)
], ProcurementCenterCharacteristics.prototype, "PayrollTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "enforce_strict_timing", nullable: true }),
    __metadata("design:type", Boolean)
], ProcurementCenterCharacteristics.prototype, "EnforceStrictTiming", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "enforce_no_due_collection", nullable: true }),
    __metadata("design:type", Boolean)
], ProcurementCenterCharacteristics.prototype, "EnforceNoDueCollection", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RouteType_1.RouteType, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "route_type" }),
    __metadata("design:type", RouteType_1.RouteType)
], ProcurementCenterCharacteristics.prototype, "RouteType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], ProcurementCenterCharacteristics.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ProcurementCenterCharacteristics.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", Object)
], ProcurementCenterCharacteristics.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], ProcurementCenterCharacteristics.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], ProcurementCenterCharacteristics.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], ProcurementCenterCharacteristics.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], ProcurementCenterCharacteristics.prototype, "DeletedBy", void 0);
exports.ProcurementCenterCharacteristics = ProcurementCenterCharacteristics = __decorate([
    (0, typeorm_1.Entity)()
], ProcurementCenterCharacteristics);
