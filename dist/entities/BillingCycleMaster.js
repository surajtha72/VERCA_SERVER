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
exports.BillingCycleMaster = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const FinancialYear_1 = require("./FinancialYear");
let BillingCycleMaster = exports.BillingCycleMaster = class BillingCycleMaster {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], BillingCycleMaster.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FinancialYear_1.FinancialYear, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "financial_year_id" }),
    __metadata("design:type", FinancialYear_1.FinancialYear)
], BillingCycleMaster.prototype, "FinancialYearId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cycle_no", default: null }),
    __metadata("design:type", Number)
], BillingCycleMaster.prototype, "CycleNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "start_date", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], BillingCycleMaster.prototype, "StartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "end_date", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], BillingCycleMaster.prototype, "EndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], BillingCycleMaster.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_frozen", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], BillingCycleMaster.prototype, "IsFrozen", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], BillingCycleMaster.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], BillingCycleMaster.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], BillingCycleMaster.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], BillingCycleMaster.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], BillingCycleMaster.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], BillingCycleMaster.prototype, "DeletedBy", void 0);
exports.BillingCycleMaster = BillingCycleMaster = __decorate([
    (0, typeorm_1.Entity)()
], BillingCycleMaster);
