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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Roles_1 = require("./Roles");
const States_1 = require("./States");
const Districts_1 = require("./Districts");
const Vct_1 = require("./Vct");
const OrganizationUnitType_1 = require("./OrganizationUnitType");
const Organization_1 = require("./Organization");
let User = exports.User = User_1 = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], User.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OrganizationUnitType_1.OrganizationUnitType, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "organization_unit_type_id" }),
    __metadata("design:type", OrganizationUnitType_1.OrganizationUnitType)
], User.prototype, "OrganizationUnitTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "organization_unit_id" }),
    __metadata("design:type", Organization_1.Organization)
], User.prototype, "OrganizationUnitId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", length: 20, default: null }),
    __metadata("design:type", String)
], User.prototype, "Name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address", length: 200, default: null }),
    __metadata("design:type", String)
], User.prototype, "Address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "mobile_no", length: 20, default: null }),
    __metadata("design:type", String)
], User.prototype, "MobileNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email_id", length: 50, default: null }),
    __metadata("design:type", String)
], User.prototype, "EmailId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Roles_1.Roles, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "role" }),
    __metadata("design:type", Roles_1.Roles)
], User.prototype, "Role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => States_1.States, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "state" }),
    __metadata("design:type", States_1.States)
], User.prototype, "State", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Districts_1.Districts, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "district" }),
    __metadata("design:type", Districts_1.Districts)
], User.prototype, "District", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vct_1.Vct, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "taluka" }),
    __metadata("design:type", Vct_1.Vct)
], User.prototype, "Taluka", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "aadhaar_no", length: 15, default: null }),
    __metadata("design:type", String)
], User.prototype, "AadhaarNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "pan_no", length: 10, default: null }),
    __metadata("design:type", String)
], User.prototype, "PanNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "bank_ac_no", length: 25, default: null }),
    __metadata("design:type", String)
], User.prototype, "BankAcNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "bank_ac_name", length: 50, default: null }),
    __metadata("design:type", String)
], User.prototype, "BankAcName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "bank_branch_ifsc", default: null }),
    __metadata("design:type", String)
], User.prototype, "BankBranIfsc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "username", length: 25, default: null }),
    __metadata("design:type", String)
], User.prototype, "Username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "password", length: 250 }),
    __metadata("design:type", String)
], User.prototype, "Password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User)
], User.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], User.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User)
], User.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], User.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User)
], User.prototype, "DeletedBy", void 0);
exports.User = User = User_1 = __decorate([
    (0, typeorm_1.Entity)()
], User);
