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
exports.MilkCollectionDetails = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const MilkCollections_1 = require("./MilkCollections");
const Organization_1 = require("./Organization");
const TransporterVehicles_1 = require("./TransporterVehicles");
const RouteMaster_1 = require("./RouteMaster");
let MilkCollectionDetails = exports.MilkCollectionDetails = class MilkCollectionDetails {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "id", type: "uuid" }),
    __metadata("design:type", String)
], MilkCollectionDetails.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => MilkCollections_1.MilkCollections, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "milk_collection_id" }),
    __metadata("design:type", MilkCollections_1.MilkCollections)
], MilkCollectionDetails.prototype, "MilkCollectionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "milk_type", length: 200, nullable: true }),
    __metadata("design:type", String)
], MilkCollectionDetails.prototype, "MilkType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "collection_operation_type", length: 100, nullable: true }),
    __metadata("design:type", String)
], MilkCollectionDetails.prototype, "CollectionOperationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "testing_operation_type", length: 150, default: null }),
    __metadata("design:type", String)
], MilkCollectionDetails.prototype, "TestingOperationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "fat", type: "float", default: null }),
    __metadata("design:type", Number)
], MilkCollectionDetails.prototype, "Fat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "snf", type: "float", default: 0 }),
    __metadata("design:type", Number)
], MilkCollectionDetails.prototype, "Snf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "clr", type: "float", default: 0 }),
    __metadata("design:type", Number)
], MilkCollectionDetails.prototype, "Clr", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "protein", type: "float", default: null }),
    __metadata("design:type", Number)
], MilkCollectionDetails.prototype, "Protein", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "lactose", type: "float", default: null }),
    __metadata("design:type", Number)
], MilkCollectionDetails.prototype, "Lactose", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "salt", type: "float", default: null }),
    __metadata("design:type", Number)
], MilkCollectionDetails.prototype, "Salt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "water", type: "float", default: null }),
    __metadata("design:type", Number)
], MilkCollectionDetails.prototype, "Water", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "temperature", type: "float", default: null }),
    __metadata("design:type", Number)
], MilkCollectionDetails.prototype, "Temperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sample_number', type: "float", default: null }),
    __metadata("design:type", Number)
], MilkCollectionDetails.prototype, "SampleNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "weight", type: "float", default: null }),
    __metadata("design:type", Number)
], MilkCollectionDetails.prototype, "Weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "can_count", default: null }),
    __metadata("design:type", Number)
], MilkCollectionDetails.prototype, "CanCount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "organization_unit_id" }),
    __metadata("design:type", Organization_1.Organization)
], MilkCollectionDetails.prototype, "OrganizationUnitId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TransporterVehicles_1.TransporterVehicles, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "transporter_vehicle_id" }),
    __metadata("design:type", TransporterVehicles_1.TransporterVehicles)
], MilkCollectionDetails.prototype, "TransporterVehicleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RouteMaster_1.RouteMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "route_id" }),
    __metadata("design:type", RouteMaster_1.RouteMaster)
], MilkCollectionDetails.prototype, "RouteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "collected_by" }),
    __metadata("design:type", User_1.User)
], MilkCollectionDetails.prototype, "CollectedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "collected_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], MilkCollectionDetails.prototype, "CollectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "tested_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], MilkCollectionDetails.prototype, "TestedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], MilkCollectionDetails.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], MilkCollectionDetails.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], MilkCollectionDetails.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], MilkCollectionDetails.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], MilkCollectionDetails.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], MilkCollectionDetails.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], MilkCollectionDetails.prototype, "DeletedBy", void 0);
exports.MilkCollectionDetails = MilkCollectionDetails = __decorate([
    (0, typeorm_1.Entity)()
], MilkCollectionDetails);
