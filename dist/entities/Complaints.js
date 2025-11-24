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
exports.Complaints = void 0;
const typeorm_1 = require("typeorm");
const Organization_1 = require("./Organization");
const BillingCycleMaster_1 = require("./BillingCycleMaster");
const User_1 = require("./User");
let Complaints = exports.Complaints = class Complaints {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], Complaints.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "agent_id" }),
    __metadata("design:type", Organization_1.Organization)
], Complaints.prototype, "AgentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BillingCycleMaster_1.BillingCycleMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'billing_cycle_id' }),
    __metadata("design:type", BillingCycleMaster_1.BillingCycleMaster)
], Complaints.prototype, "BillingCycleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "settlement_amount" }),
    __metadata("design:type", Number)
], Complaints.prototype, "SettlementAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "complaint", length: 100 }),
    __metadata("design:type", String)
], Complaints.prototype, "Complaint", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "to_be_settled_start_date", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Complaints.prototype, "TobeSettledStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "to_be_settled_end_date", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Complaints.prototype, "TobeSettledEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Complaints.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], Complaints.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], Complaints.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], Complaints.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], Complaints.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], Complaints.prototype, "DeletedBy", void 0);
exports.Complaints = Complaints = __decorate([
    (0, typeorm_1.Entity)()
], Complaints);
