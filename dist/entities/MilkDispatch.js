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
exports.MilkDispatch = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const TransporterVehicles_1 = require("./TransporterVehicles");
const RouteMaster_1 = require("./RouteMaster");
let MilkDispatch = exports.MilkDispatch = class MilkDispatch {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "id", type: "uuid" }),
    __metadata("design:type", String)
], MilkDispatch.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RouteMaster_1.RouteMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "route_id" }),
    __metadata("design:type", RouteMaster_1.RouteMaster)
], MilkDispatch.prototype, "RouteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TransporterVehicles_1.TransporterVehicles, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "transporter_vehicle_id" }),
    __metadata("design:type", TransporterVehicles_1.TransporterVehicles)
], MilkDispatch.prototype, "TransporterVehicleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "start_fat", type: 'float', default: null }),
    __metadata("design:type", Number)
], MilkDispatch.prototype, "StartFat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "start_snf", type: 'float', default: null }),
    __metadata("design:type", Number)
], MilkDispatch.prototype, "StartSnf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "start_clr", type: 'float', default: null }),
    __metadata("design:type", Number)
], MilkDispatch.prototype, "StartClr", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "end_fat", type: 'float', default: null }),
    __metadata("design:type", Number)
], MilkDispatch.prototype, "EndFat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "end_snf", type: 'float', default: null }),
    __metadata("design:type", Number)
], MilkDispatch.prototype, "EndSnf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "end_clr", type: 'float', default: null }),
    __metadata("design:type", Number)
], MilkDispatch.prototype, "EndClr", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "weight", type: 'float', default: null }),
    __metadata("design:type", Number)
], MilkDispatch.prototype, "Weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "dispatched_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], MilkDispatch.prototype, "DispatchedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], MilkDispatch.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], MilkDispatch.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], MilkDispatch.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], MilkDispatch.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], MilkDispatch.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], MilkDispatch.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], MilkDispatch.prototype, "DeletedBy", void 0);
exports.MilkDispatch = MilkDispatch = __decorate([
    (0, typeorm_1.Entity)()
], MilkDispatch);
