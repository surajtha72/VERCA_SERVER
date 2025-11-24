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
exports.TransporterContracts = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Transporters_1 = require("./Transporters");
const RouteMaster_1 = require("./RouteMaster");
const TransporterVehicles_1 = require("./TransporterVehicles");
let TransporterContracts = exports.TransporterContracts = class TransporterContracts {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], TransporterContracts.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Transporters_1.Transporters, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "transporter_id" }),
    __metadata("design:type", Transporters_1.Transporters)
], TransporterContracts.prototype, "TransporterId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RouteMaster_1.RouteMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "route_id" }),
    __metadata("design:type", RouteMaster_1.RouteMaster)
], TransporterContracts.prototype, "RouteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TransporterVehicles_1.TransporterVehicles, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "vehicle_id" }),
    __metadata("design:type", TransporterVehicles_1.TransporterVehicles)
], TransporterContracts.prototype, "VehicleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "start_date" }),
    __metadata("design:type", Date)
], TransporterContracts.prototype, "StartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "end_date" }),
    __metadata("design:type", Date)
], TransporterContracts.prototype, "EndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "pay_terms", length: 100, default: null }),
    __metadata("design:type", String)
], TransporterContracts.prototype, "PayTerms", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "pay_amount", type: 'bigint', default: null }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], TransporterContracts.prototype, "PayAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "addl_charge_type", length: 100, nullable: true }),
    __metadata("design:type", String)
], TransporterContracts.prototype, "AddlChargeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "addl_charge_amount", type: 'bigint', nullable: true }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], TransporterContracts.prototype, "AddlChargeAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "status", length: 150, nullable: true }),
    __metadata("design:type", String)
], TransporterContracts.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], TransporterContracts.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: 'datetime' }),
    __metadata("design:type", Date)
], TransporterContracts.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], TransporterContracts.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], TransporterContracts.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], TransporterContracts.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], TransporterContracts.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], TransporterContracts.prototype, "DeletedBy", void 0);
exports.TransporterContracts = TransporterContracts = __decorate([
    (0, typeorm_1.Entity)()
], TransporterContracts);
