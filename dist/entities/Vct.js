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
exports.Vct = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Districts_1 = require("./Districts");
const States_1 = require("./States");
let Vct = exports.Vct = class Vct {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], Vct.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => States_1.States, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "state_id" }),
    __metadata("design:type", States_1.States)
], Vct.prototype, "StateId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Districts_1.Districts, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "district_id" }),
    __metadata("design:type", Districts_1.Districts)
], Vct.prototype, "DistrictId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", length: 50, default: null }),
    __metadata("design:type", String)
], Vct.prototype, "Name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "pincode", length: 15, default: null }),
    __metadata("design:type", String)
], Vct.prototype, "Pincode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Vct.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Vct.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], Vct.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], Vct.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], Vct.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], Vct.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], Vct.prototype, "DeletedBy", void 0);
exports.Vct = Vct = __decorate([
    (0, typeorm_1.Entity)()
], Vct);
