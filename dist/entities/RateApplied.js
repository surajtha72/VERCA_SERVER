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
exports.RateApplied = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const RateMaster_1 = require("./RateMaster");
let RateApplied = exports.RateApplied = class RateApplied {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], RateApplied.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RateMaster_1.RateMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "rate_id" }),
    __metadata("design:type", RateMaster_1.RateMaster)
], RateApplied.prototype, "RateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "applied_to", length: 100 }),
    __metadata("design:type", String)
], RateApplied.prototype, "AppliedTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "applied_on", type: "datetime" }),
    __metadata("design:type", Date)
], RateApplied.prototype, "AppliedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active" }),
    __metadata("design:type", Boolean)
], RateApplied.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], RateApplied.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], RateApplied.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], RateApplied.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], RateApplied.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], RateApplied.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], RateApplied.prototype, "DeletedBy", void 0);
exports.RateApplied = RateApplied = __decorate([
    (0, typeorm_1.Entity)()
], RateApplied);
