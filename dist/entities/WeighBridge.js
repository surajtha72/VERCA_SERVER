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
exports.WeighBridge = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const TransporterVehicles_1 = require("./TransporterVehicles");
const ProductCategory_1 = require("./ProductCategory");
const RouteMaster_1 = require("./RouteMaster");
let WeighBridge = exports.WeighBridge = class WeighBridge {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], WeighBridge.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "weighbridge_no", length: 100 }),
    __metadata("design:type", String)
], WeighBridge.prototype, "WeighbridgeNo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TransporterVehicles_1.TransporterVehicles, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "vehicle_no" }),
    __metadata("design:type", TransporterVehicles_1.TransporterVehicles)
], WeighBridge.prototype, "VehicleNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "contractor_name", length: 100, default: null }),
    __metadata("design:type", String)
], WeighBridge.prototype, "ContractorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "challan_no", length: 100, default: null }),
    __metadata("design:type", String)
], WeighBridge.prototype, "ChallanNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "destination", length: 100, default: null }),
    __metadata("design:type", String)
], WeighBridge.prototype, "Destination", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "purpose", length: 100, default: null }),
    __metadata("design:type", String)
], WeighBridge.prototype, "Purpose", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "supplier_name", length: 100, default: null }),
    __metadata("design:type", String)
], WeighBridge.prototype, "SupplierName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RouteMaster_1.RouteMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "route_id" }),
    __metadata("design:type", RouteMaster_1.RouteMaster)
], WeighBridge.prototype, "RouteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductCategory_1.ProductCategory, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "product_category" }),
    __metadata("design:type", ProductCategory_1.ProductCategory)
], WeighBridge.prototype, "ProductCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_name", length: 100, default: null }),
    __metadata("design:type", String)
], WeighBridge.prototype, "ProductName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "weight_mode", length: 100, default: null }),
    __metadata("design:type", String)
], WeighBridge.prototype, "WeightMode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "tare_weight", type: "float", default: null }),
    __metadata("design:type", Number)
], WeighBridge.prototype, "TareWeight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "tare_date", type: "datetime", default: null }),
    __metadata("design:type", Date)
], WeighBridge.prototype, "TareDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "gross_weight", type: "float", default: null }),
    __metadata("design:type", Number)
], WeighBridge.prototype, "GrossWeight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "gross_date", type: "datetime", default: null }),
    __metadata("design:type", Date)
], WeighBridge.prototype, "GrossDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "net_weight_kg", type: "float", default: null }),
    __metadata("design:type", Number)
], WeighBridge.prototype, "NetWeightKg", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "supply_qty", default: null }),
    __metadata("design:type", Number)
], WeighBridge.prototype, "SupplyQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "remarks", length: 100, default: null }),
    __metadata("design:type", String)
], WeighBridge.prototype, "Remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], WeighBridge.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], WeighBridge.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], WeighBridge.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], WeighBridge.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], WeighBridge.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], WeighBridge.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], WeighBridge.prototype, "DeletedBy", void 0);
exports.WeighBridge = WeighBridge = __decorate([
    (0, typeorm_1.Entity)()
], WeighBridge);
