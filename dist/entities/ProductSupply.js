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
exports.ProductSupply = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Organization_1 = require("./Organization");
let ProductSupply = exports.ProductSupply = class ProductSupply {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "id" }),
    __metadata("design:type", String)
], ProductSupply.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "indent_status", default: 0 }),
    __metadata("design:type", Number)
], ProductSupply.prototype, "IndentStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "indent_raised_by" }),
    __metadata("design:type", Organization_1.Organization)
], ProductSupply.prototype, "IndentRaisedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "indent_raised_for" }),
    __metadata("design:type", Organization_1.Organization)
], ProductSupply.prototype, "IndentRaisedFor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "indent_raised_on_date", type: "datetime" }),
    __metadata("design:type", Date)
], ProductSupply.prototype, "IndentRaisedOnDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "indent_approved_by" }),
    __metadata("design:type", Organization_1.Organization)
], ProductSupply.prototype, "IndentApprovedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "indent_rejected_by" }),
    __metadata("design:type", Organization_1.Organization)
], ProductSupply.prototype, "IndentRejectedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "approved_on_date", type: "datetime", default: null }),
    __metadata("design:type", Date)
], ProductSupply.prototype, "ApprovedOnDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "dispatch_by_employee" }),
    __metadata("design:type", User_1.User)
], ProductSupply.prototype, "DispatchByEmployee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "dispatch_date", type: "datetime", default: null }),
    __metadata("design:type", Date)
], ProductSupply.prototype, "DispatchDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "received_by_userid" }),
    __metadata("design:type", User_1.User)
], ProductSupply.prototype, "ReceivedByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "received_on", type: "datetime", default: null }),
    __metadata("design:type", Date)
], ProductSupply.prototype, "ReceivedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "dc_number", default: null, length: 30 }),
    __metadata("design:type", String)
], ProductSupply.prototype, "DCNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "reject_reason", length: 200, default: null }),
    __metadata("design:type", String)
], ProductSupply.prototype, "RejectReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active" }),
    __metadata("design:type", Boolean)
], ProductSupply.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], ProductSupply.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], ProductSupply.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], ProductSupply.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], ProductSupply.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], ProductSupply.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], ProductSupply.prototype, "DeletedBy", void 0);
exports.ProductSupply = ProductSupply = __decorate([
    (0, typeorm_1.Entity)()
], ProductSupply);
