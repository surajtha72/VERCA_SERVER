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
exports.NonAgents = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const States_1 = require("./States");
const Districts_1 = require("./Districts");
const Vct_1 = require("./Vct");
const Organization_1 = require("./Organization");
let NonAgents = exports.NonAgents = class NonAgents {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], NonAgents.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "parent_id" }),
    __metadata("design:type", Object)
], NonAgents.prototype, "ParentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", length: 200, default: null }),
    __metadata("design:type", String)
], NonAgents.prototype, "Name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address_line_1", length: 250, default: null }),
    __metadata("design:type", String)
], NonAgents.prototype, "AddressLine1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address_line_2", length: 250, default: null }),
    __metadata("design:type", String)
], NonAgents.prototype, "AddressLine2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => States_1.States, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "state" }),
    __metadata("design:type", States_1.States)
], NonAgents.prototype, "State", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Districts_1.Districts, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "district" }),
    __metadata("design:type", Districts_1.Districts)
], NonAgents.prototype, "District", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vct_1.Vct, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "vct_id" }),
    __metadata("design:type", Vct_1.Vct)
], NonAgents.prototype, "VctId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "account_number", default: null }),
    __metadata("design:type", String)
], NonAgents.prototype, "AccountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(({ name: "acc_holder_name", default: null, length: 100 })),
    __metadata("design:type", String)
], NonAgents.prototype, "AccHolderName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "phone_number", default: null, length: 100 }),
    __metadata("design:type", String)
], NonAgents.prototype, "PhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "ifsc_code", default: null }),
    __metadata("design:type", String)
], NonAgents.prototype, "IfscCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "aadhar_number", length: 200, default: null }),
    __metadata("design:type", String)
], NonAgents.prototype, "AadharNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_current_rate", default: true }),
    __metadata("design:type", Boolean)
], NonAgents.prototype, "IsCurrentRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], NonAgents.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], NonAgents.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], NonAgents.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], NonAgents.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], NonAgents.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], NonAgents.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], NonAgents.prototype, "DeletedBy", void 0);
exports.NonAgents = NonAgents = __decorate([
    (0, typeorm_1.Entity)()
], NonAgents);
