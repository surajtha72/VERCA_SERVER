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
exports.RouteType = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const OrganizationUnitType_1 = require("./OrganizationUnitType");
let RouteType = exports.RouteType = class RouteType {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], RouteType.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "short_description", length: 50, default: null }),
    __metadata("design:type", String)
], RouteType.prototype, "ShortDescription", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OrganizationUnitType_1.OrganizationUnitType, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "from_proc_unit_type" }),
    __metadata("design:type", OrganizationUnitType_1.OrganizationUnitType)
], RouteType.prototype, "FromProcUnitType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OrganizationUnitType_1.OrganizationUnitType, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "to_proc-org_unit_type" }),
    __metadata("design:type", OrganizationUnitType_1.OrganizationUnitType)
], RouteType.prototype, "ToProcOrgUnitType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "vehicleType", default: null }),
    __metadata("design:type", String)
], RouteType.prototype, "VehicleType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], RouteType.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], RouteType.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], RouteType.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], RouteType.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], RouteType.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], RouteType.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], RouteType.prototype, "DeletedBy", void 0);
exports.RouteType = RouteType = __decorate([
    (0, typeorm_1.Entity)()
], RouteType);
