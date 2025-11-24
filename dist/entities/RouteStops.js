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
exports.RouteStops = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const RouteMaster_1 = require("./RouteMaster");
const Organization_1 = require("./Organization");
let RouteStops = exports.RouteStops = class RouteStops {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], RouteStops.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RouteMaster_1.RouteMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "route_id" }),
    __metadata("design:type", RouteMaster_1.RouteMaster)
], RouteStops.prototype, "RouteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "sequence_no", default: null }),
    __metadata("design:type", Number)
], RouteStops.prototype, "SequenceNo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "stop_id" }),
    __metadata("design:type", Organization_1.Organization)
], RouteStops.prototype, "StopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "travel_kms", type: 'float', default: null }),
    __metadata("design:type", Number)
], RouteStops.prototype, "TravelKms", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], RouteStops.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], RouteStops.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], RouteStops.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], RouteStops.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], RouteStops.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], RouteStops.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], RouteStops.prototype, "DeletedBy", void 0);
exports.RouteStops = RouteStops = __decorate([
    (0, typeorm_1.Entity)()
], RouteStops);
