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
exports.MilkCollections = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const BillingCycleMaster_1 = require("./BillingCycleMaster");
let MilkCollections = exports.MilkCollections = class MilkCollections {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "id", type: "uuid" }),
    __metadata("design:type", String)
], MilkCollections.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "shift", length: 20, nullable: true }),
    __metadata("design:type", String)
], MilkCollections.prototype, "Shift", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "status", length: 20, nullable: true }),
    __metadata("design:type", String)
], MilkCollections.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "collection_date_time", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], MilkCollections.prototype, "CollectionDateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "started_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], MilkCollections.prototype, "StartedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "completed_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], MilkCollections.prototype, "CompletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], MilkCollections.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "milk_dispatch_id", length: 100, nullable: true }),
    __metadata("design:type", String)
], MilkCollections.prototype, "MilkDispatchId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "dispatched_quantity", type: "float", default: null }),
    __metadata("design:type", Number)
], MilkCollections.prototype, "DispatchedQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "remaining_quantity", type: "float", default: null }),
    __metadata("design:type", Number)
], MilkCollections.prototype, "RemainingQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "fat", type: "float", default: null }),
    __metadata("design:type", Number)
], MilkCollections.prototype, "Fat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "clr", type: "float", default: null }),
    __metadata("design:type", Number)
], MilkCollections.prototype, "Clr", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "snf", type: "float", default: null }),
    __metadata("design:type", Number)
], MilkCollections.prototype, "Snf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], MilkCollections.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], MilkCollections.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], MilkCollections.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], MilkCollections.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], MilkCollections.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], MilkCollections.prototype, "DeletedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_milk_bill_locked", default: false }),
    __metadata("design:type", Boolean)
], MilkCollections.prototype, "IsMilkBillLocked", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BillingCycleMaster_1.BillingCycleMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "billing_cycle" }),
    __metadata("design:type", BillingCycleMaster_1.BillingCycleMaster)
], MilkCollections.prototype, "BillingCycle", void 0);
exports.MilkCollections = MilkCollections = __decorate([
    (0, typeorm_1.Entity)()
], MilkCollections);
