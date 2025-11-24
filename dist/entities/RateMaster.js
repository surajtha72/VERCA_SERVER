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
exports.RateMaster = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Shifts_1 = require("./Shifts");
let RateMaster = exports.RateMaster = class RateMaster {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], RateMaster.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "effective_from", type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], RateMaster.prototype, "EffectiveFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cow_fat_rate", type: "float", default: null }),
    __metadata("design:type", Number)
], RateMaster.prototype, "CowFatRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "seq_no", default: null }),
    __metadata("design:type", Number)
], RateMaster.prototype, "SeqNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "wef", type: "datetime", default: null }),
    __metadata("design:type", Date)
], RateMaster.prototype, "Wef", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cow_snf_rate", type: "float", default: null }),
    __metadata("design:type", Number)
], RateMaster.prototype, "CowSnfRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "buff_fat_rate", type: "float", default: null }),
    __metadata("design:type", Number)
], RateMaster.prototype, "BuffFatRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "buff_snf_rate", type: "float", default: null }),
    __metadata("design:type", Number)
], RateMaster.prototype, "BuffSnfRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "short_desc", default: null }),
    __metadata("design:type", String)
], RateMaster.prototype, "ShortDesc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "fat_range_min", type: "float", default: null }),
    __metadata("design:type", Number)
], RateMaster.prototype, "FatRangeMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "fat_range_max", type: "float", default: null }),
    __metadata("design:type", Number)
], RateMaster.prototype, "FatRangeMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cow_min_fat", type: "float", default: null }),
    __metadata("design:type", Number)
], RateMaster.prototype, "CowMinFat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cow_min_snf", type: "float", default: null }),
    __metadata("design:type", Number)
], RateMaster.prototype, "CowMinSnf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "buff_min_fat", type: "float", default: null }),
    __metadata("design:type", Number)
], RateMaster.prototype, "BuffMinFat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "buff_min_snf", type: "float", default: null }),
    __metadata("design:type", Number)
], RateMaster.prototype, "BuffMinSnf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "snf_range_min", type: "float", default: null }),
    __metadata("design:type", Number)
], RateMaster.prototype, "SnfRangeMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "snf_range_max", type: "float", default: null }),
    __metadata("design:type", Number)
], RateMaster.prototype, "SnfRangeMax", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Shifts_1.Shifts, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "shifts_applicable" }),
    __metadata("design:type", Shifts_1.Shifts)
], RateMaster.prototype, "ShiftsApplicable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], RateMaster.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], RateMaster.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], RateMaster.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], RateMaster.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], RateMaster.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], RateMaster.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], RateMaster.prototype, "DeletedBy", void 0);
exports.RateMaster = RateMaster = __decorate([
    (0, typeorm_1.Entity)()
], RateMaster);
