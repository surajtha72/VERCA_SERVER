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
exports.IncentiveMaster = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const BillingCycleMaster_1 = require("./BillingCycleMaster");
let IncentiveMaster = exports.IncentiveMaster = class IncentiveMaster {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], IncentiveMaster.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "incentive_type" }),
    __metadata("design:type", Number)
], IncentiveMaster.prototype, "IncentiveType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "incentive_name" }),
    __metadata("design:type", String)
], IncentiveMaster.prototype, "IncentiveName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "effective_from", type: "datetime" }),
    __metadata("design:type", Date)
], IncentiveMaster.prototype, "EffectiveFrom", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BillingCycleMaster_1.BillingCycleMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "billing_cycle_ref" }),
    __metadata("design:type", BillingCycleMaster_1.BillingCycleMaster)
], IncentiveMaster.prototype, "BillingCycleRef", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "min_fat_limit", type: "float" }),
    __metadata("design:type", Number)
], IncentiveMaster.prototype, "MinFatLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "min_snf_limit", type: "float" }),
    __metadata("design:type", Number)
], IncentiveMaster.prototype, "MinSnfLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "shifts_applicable" }),
    __metadata("design:type", Number)
], IncentiveMaster.prototype, "ShiftsApplicable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active" }),
    __metadata("design:type", Boolean)
], IncentiveMaster.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], IncentiveMaster.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], IncentiveMaster.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], IncentiveMaster.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], IncentiveMaster.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], IncentiveMaster.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], IncentiveMaster.prototype, "DeletedBy", void 0);
exports.IncentiveMaster = IncentiveMaster = __decorate([
    (0, typeorm_1.Entity)()
], IncentiveMaster);
