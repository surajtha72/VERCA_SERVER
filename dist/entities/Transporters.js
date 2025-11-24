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
exports.Transporters = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Bank_1 = require("./Bank");
let Transporters = exports.Transporters = class Transporters {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], Transporters.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "firm_name", length: 200 }),
    __metadata("design:type", String)
], Transporters.prototype, "FirmName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "code", length: 200, default: null }),
    __metadata("design:type", String)
], Transporters.prototype, "Code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "contact_person_name", length: 100, default: null }),
    __metadata("design:type", String)
], Transporters.prototype, "ContactPersonName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "mobile_no", length: 50, default: null }),
    __metadata("design:type", String)
], Transporters.prototype, "MobileNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email_id", length: 100, default: null }),
    __metadata("design:type", String)
], Transporters.prototype, "EmailId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address_line_1", length: 250, default: null }),
    __metadata("design:type", String)
], Transporters.prototype, "AddressLine1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address_line_2", length: 250, default: null }),
    __metadata("design:type", String)
], Transporters.prototype, "AddressLine2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "state", default: null }),
    __metadata("design:type", Number)
], Transporters.prototype, "State", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "district", default: null }),
    __metadata("design:type", Number)
], Transporters.prototype, "District", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "vtc", default: null }),
    __metadata("design:type", Number)
], Transporters.prototype, "Vtc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "pincode", length: 20, default: null }),
    __metadata("design:type", String)
], Transporters.prototype, "Pincode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "geocode", length: 250, default: null }),
    __metadata("design:type", String)
], Transporters.prototype, "Geocode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "aadhaar_no", length: 20, default: null }),
    __metadata("design:type", String)
], Transporters.prototype, "AadhaarNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "pan_no", length: 20, default: null }),
    __metadata("design:type", String)
], Transporters.prototype, "PanNo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Bank_1.Bank, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "bank_id" }),
    __metadata("design:type", Bank_1.Bank)
], Transporters.prototype, "BankId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "bank_ac_no", length: 50, default: null }),
    __metadata("design:type", String)
], Transporters.prototype, "BankAcNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "bank_ac_name", length: 100, default: null }),
    __metadata("design:type", String)
], Transporters.prototype, "BankAcName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "bank_ifsc_code", length: 100, default: null }),
    __metadata("design:type", String)
], Transporters.prototype, "BankIfscCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Transporters.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: 'datetime' }),
    __metadata("design:type", Date)
], Transporters.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], Transporters.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], Transporters.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], Transporters.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], Transporters.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], Transporters.prototype, "DeletedBy", void 0);
exports.Transporters = Transporters = __decorate([
    (0, typeorm_1.Entity)()
], Transporters);
