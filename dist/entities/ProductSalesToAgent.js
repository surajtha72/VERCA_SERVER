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
exports.ProductSalesToAgent = void 0;
const typeorm_1 = require("typeorm");
const Organization_1 = require("./Organization");
const User_1 = require("./User");
let ProductSalesToAgent = exports.ProductSalesToAgent = class ProductSalesToAgent {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], ProductSalesToAgent.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "invoice_number", length: 20, default: null }),
    __metadata("design:type", String)
], ProductSalesToAgent.prototype, "InvoiceNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "sold_to_agent" }),
    __metadata("design:type", Organization_1.Organization)
], ProductSalesToAgent.prototype, "SoldToAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_amount", default: null }),
    __metadata("design:type", Number)
], ProductSalesToAgent.prototype, "TotalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "payment_mode", length: 10, default: null }),
    __metadata("design:type", String)
], ProductSalesToAgent.prototype, "PaymentMode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "paid_amount", default: null }),
    __metadata("design:type", Number)
], ProductSalesToAgent.prototype, "PaidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "balance", default: null }),
    __metadata("design:type", Number)
], ProductSalesToAgent.prototype, "Balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "to_be_settled_start_date", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ProductSalesToAgent.prototype, "TobeSettledStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "to_be_settled_end_date", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ProductSalesToAgent.prototype, "TobeSettledEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], ProductSalesToAgent.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], ProductSalesToAgent.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], ProductSalesToAgent.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], ProductSalesToAgent.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], ProductSalesToAgent.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], ProductSalesToAgent.prototype, "DeletedBy", void 0);
exports.ProductSalesToAgent = ProductSalesToAgent = __decorate([
    (0, typeorm_1.Entity)()
], ProductSalesToAgent);
