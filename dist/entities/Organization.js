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
var Organization_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const OrganizationUnitType_1 = require("./OrganizationUnitType");
const DefaultCollectionType_1 = require("./DefaultCollectionType");
const PayrollTypes_1 = require("./PayrollTypes");
const RouteType_1 = require("./RouteType");
const States_1 = require("./States");
const Districts_1 = require("./Districts");
const Vct_1 = require("./Vct");
let Organization = exports.Organization = Organization_1 = class Organization {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], Organization.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OrganizationUnitType_1.OrganizationUnitType, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "organization_type" }),
    __metadata("design:type", OrganizationUnitType_1.OrganizationUnitType)
], Organization.prototype, "OrganizationType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "parent_id" }),
    __metadata("design:type", Object)
], Organization.prototype, "ParentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", length: 200, default: null }),
    __metadata("design:type", String)
], Organization.prototype, "Name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "business_regn_no", length: 100, default: null }),
    __metadata("design:type", String)
], Organization.prototype, "BusinessRegnNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ou_code", length: 100, default: null }) // <--- add this
    ,
    __metadata("design:type", String)
], Organization.prototype, "OUCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "allow_can", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Organization.prototype, "AllowCan", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "milk_collection_uom", length: 10, nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "MilkCollectionUom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "milk_dispatch_uom", length: 10, nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "MilkDispatchUom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "gst_no", length: 100, default: null }),
    __metadata("design:type", String)
], Organization.prototype, "GstNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address_line_1", length: 250, default: null }),
    __metadata("design:type", String)
], Organization.prototype, "AddressLine1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address_line_2", length: 250, default: null }),
    __metadata("design:type", String)
], Organization.prototype, "AddressLine2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => States_1.States, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "state" }),
    __metadata("design:type", States_1.States)
], Organization.prototype, "State", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Districts_1.Districts, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "district" }),
    __metadata("design:type", Districts_1.Districts)
], Organization.prototype, "District", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vct_1.Vct, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "vct_id" }),
    __metadata("design:type", Vct_1.Vct)
], Organization.prototype, "VctId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "geocode", length: 250, default: null }),
    __metadata("design:type", String)
], Organization.prototype, "Geocode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "admin_user_id", default: null }),
    __metadata("design:type", Number)
], Organization.prototype, "AdminUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "bank_details_id", default: null }),
    __metadata("design:type", Number)
], Organization.prototype, "BankDetailsId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "account_number", default: null }),
    __metadata("design:type", String)
], Organization.prototype, "AccountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(({ name: "acc_holder_name", default: null, length: 100 })),
    __metadata("design:type", String)
], Organization.prototype, "AccHolderName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "phone_number", default: null, length: 100 }),
    __metadata("design:type", String)
], Organization.prototype, "PhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ifsc_code", default: null }),
    __metadata("design:type", String)
], Organization.prototype, "IfscCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "capacity", type: 'bigint', default: null }),
    __metadata("design:type", Number)
], Organization.prototype, "Capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "morning_shift_start_time", type: "time", default: null }),
    __metadata("design:type", String)
], Organization.prototype, "MorningShiftStartTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "morning_shift_end_time", type: "time", default: null }),
    __metadata("design:type", String)
], Organization.prototype, "MorningShiftEndTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "evening_shift_start_time", type: "time", default: null }),
    __metadata("design:type", String)
], Organization.prototype, "EveningShiftStartTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "evening_shift_end_time", type: "time", default: null }),
    __metadata("design:type", String)
], Organization.prototype, "EveningShiftEndTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DefaultCollectionType_1.DefaultCollectionType, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "default_collection_type" }),
    __metadata("design:type", DefaultCollectionType_1.DefaultCollectionType)
], Organization.prototype, "DefaultCollectionType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PayrollTypes_1.PayrollTypes, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "payroll_type" }),
    __metadata("design:type", Object)
], Organization.prototype, "PayrollTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "enforce_strict_timing", nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "EnforceStrictTiming", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "enforce_no_due_collection", nullable: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "EnforceNoDueCollection", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RouteType_1.RouteType, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "route_type" }),
    __metadata("design:type", Object)
], Organization.prototype, "RouteType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "headload", type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Organization.prototype, "HeadLoad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "commission", type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Organization.prototype, "Commission", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Organization.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Organization.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], Organization.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], Organization.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], Organization.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], Organization.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], Organization.prototype, "DeletedBy", void 0);
exports.Organization = Organization = Organization_1 = __decorate([
    (0, typeorm_1.Entity)()
], Organization);
