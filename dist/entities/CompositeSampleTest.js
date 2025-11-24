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
exports.CompositeSampleTest = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const TransporterVehicles_1 = require("./TransporterVehicles");
const ProductCategory_1 = require("./ProductCategory");
const RouteMaster_1 = require("./RouteMaster");
let CompositeSampleTest = exports.CompositeSampleTest = class CompositeSampleTest {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], CompositeSampleTest.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TransporterVehicles_1.TransporterVehicles, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "vehicle_no" }),
    __metadata("design:type", TransporterVehicles_1.TransporterVehicles)
], CompositeSampleTest.prototype, "VehicleNo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductCategory_1.ProductCategory, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "product_category" }),
    __metadata("design:type", ProductCategory_1.ProductCategory)
], CompositeSampleTest.prototype, "ProductCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_name", length: 100 }),
    __metadata("design:type", String)
], CompositeSampleTest.prototype, "ProductName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RouteMaster_1.RouteMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "route_id" }),
    __metadata("design:type", RouteMaster_1.RouteMaster)
], CompositeSampleTest.prototype, "RouteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "test_date", type: "datetime" }),
    __metadata("design:type", Date)
], CompositeSampleTest.prototype, "TestDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "fat", type: "float", default: null }),
    __metadata("design:type", Number)
], CompositeSampleTest.prototype, "Fat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "snf", type: "float", default: null }),
    __metadata("design:type", Number)
], CompositeSampleTest.prototype, "Snf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "clr", type: "float", default: null }),
    __metadata("design:type", Number)
], CompositeSampleTest.prototype, "Clr", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "protein", type: "float", default: null }),
    __metadata("design:type", Number)
], CompositeSampleTest.prototype, "Protein", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "lactose", type: "float", default: null }),
    __metadata("design:type", Number)
], CompositeSampleTest.prototype, "Lactose", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "salt", type: "float", default: null }),
    __metadata("design:type", Number)
], CompositeSampleTest.prototype, "Salt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "water", type: "float", default: null }),
    __metadata("design:type", Number)
], CompositeSampleTest.prototype, "water", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "temperature", type: "float", default: null }),
    __metadata("design:type", Number)
], CompositeSampleTest.prototype, "Temperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "analyst", length: 100 }),
    __metadata("design:type", String)
], CompositeSampleTest.prototype, "Analyst", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "status", length: 100 }),
    __metadata("design:type", String)
], CompositeSampleTest.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "remarks", length: 100 }),
    __metadata("design:type", String)
], CompositeSampleTest.prototype, "Remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active" }),
    __metadata("design:type", Boolean)
], CompositeSampleTest.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], CompositeSampleTest.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], CompositeSampleTest.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], CompositeSampleTest.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], CompositeSampleTest.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], CompositeSampleTest.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], CompositeSampleTest.prototype, "DeletedBy", void 0);
exports.CompositeSampleTest = CompositeSampleTest = __decorate([
    (0, typeorm_1.Entity)()
], CompositeSampleTest);
