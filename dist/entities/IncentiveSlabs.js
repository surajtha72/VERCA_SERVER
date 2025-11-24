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
exports.IncentiveSlabs = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const IncentiveMaster_1 = require("./IncentiveMaster");
let IncentiveSlabs = exports.IncentiveSlabs = class IncentiveSlabs {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], IncentiveSlabs.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => IncentiveMaster_1.IncentiveMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "incentive_id" }),
    __metadata("design:type", IncentiveMaster_1.IncentiveMaster)
], IncentiveSlabs.prototype, "IncentiveId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slab_type" }),
    __metadata("design:type", Number)
], IncentiveSlabs.prototype, "SlabType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slab_from", type: "float", default: 0 }),
    __metadata("design:type", Number)
], IncentiveSlabs.prototype, "SlabFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slab_to", type: "float", default: 0 }),
    __metadata("design:type", Number)
], IncentiveSlabs.prototype, "SlabTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "sequence_no", default: null }),
    __metadata("design:type", Number)
], IncentiveSlabs.prototype, "SequenceNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "incentive_per_kg", type: "float", default: 0 }),
    __metadata("design:type", String)
], IncentiveSlabs.prototype, "IncentivePerKg", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active" }),
    __metadata("design:type", Boolean)
], IncentiveSlabs.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], IncentiveSlabs.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], IncentiveSlabs.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], IncentiveSlabs.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], IncentiveSlabs.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], IncentiveSlabs.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], IncentiveSlabs.prototype, "DeletedBy", void 0);
exports.IncentiveSlabs = IncentiveSlabs = __decorate([
    (0, typeorm_1.Entity)()
], IncentiveSlabs);
