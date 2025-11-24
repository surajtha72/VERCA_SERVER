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
exports.RouteMaster = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const RouteType_1 = require("./RouteType");
const Organization_1 = require("./Organization");
let RouteMaster = exports.RouteMaster = class RouteMaster {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], RouteMaster.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RouteType_1.RouteType, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "route_type_id" }),
    __metadata("design:type", RouteType_1.RouteType)
], RouteMaster.prototype, "RouteTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "route_owner" }),
    __metadata("design:type", Organization_1.Organization)
], RouteMaster.prototype, "RouteOwner", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "route_name", length: 100, default: null }),
    __metadata("design:type", String)
], RouteMaster.prototype, "RouteName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "route_code", length: 200, default: null }),
    __metadata("design:type", String)
], RouteMaster.prototype, "RouteCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "trip_type", default: null }),
    __metadata("design:type", String)
], RouteMaster.prototype, "TripType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "morning_shift_sch_time", type: "time", nullable: true }),
    __metadata("design:type", String)
], RouteMaster.prototype, "MorningShiftSchTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "evening_shift_sch_time", type: "time", nullable: true }),
    __metadata("design:type", String)
], RouteMaster.prototype, "EveningShiftSchTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], RouteMaster.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], RouteMaster.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], RouteMaster.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], RouteMaster.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], RouteMaster.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], RouteMaster.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], RouteMaster.prototype, "DeletedBy", void 0);
exports.RouteMaster = RouteMaster = __decorate([
    (0, typeorm_1.Entity)()
], RouteMaster);
