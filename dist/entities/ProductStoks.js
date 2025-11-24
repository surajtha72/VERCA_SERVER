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
exports.ProductStocks = void 0;
const typeorm_1 = require("typeorm");
const Organization_1 = require("./Organization");
const ProductMaster_1 = require("./ProductMaster");
const User_1 = require("./User");
const ProductSupply_1 = require("./ProductSupply");
let ProductStocks = exports.ProductStocks = class ProductStocks {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "id" }),
    __metadata("design:type", String)
], ProductStocks.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductSupply_1.ProductSupply, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "indentId" }),
    __metadata("design:type", ProductSupply_1.ProductSupply)
], ProductStocks.prototype, "IndentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "organization_unit" }),
    __metadata("design:type", Organization_1.Organization)
], ProductStocks.prototype, "OrganizationUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "available_quantity", default: null }),
    __metadata("design:type", Number)
], ProductStocks.prototype, "AvailableQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "dispatch_quantity", default: null }),
    __metadata("design:type", Number)
], ProductStocks.prototype, "DispatchQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_quantity", default: null }),
    __metadata("design:type", Number)
], ProductStocks.prototype, "TotalQuantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductMaster_1.ProductMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "product_master" }),
    __metadata("design:type", ProductMaster_1.ProductMaster)
], ProductStocks.prototype, "ProductMaster", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], ProductStocks.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], ProductStocks.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], ProductStocks.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], ProductStocks.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], ProductStocks.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], ProductStocks.prototype, "DeletedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_complete", default: false }),
    __metadata("design:type", Boolean)
], ProductStocks.prototype, "IsComplete", void 0);
exports.ProductStocks = ProductStocks = __decorate([
    (0, typeorm_1.Entity)()
], ProductStocks);
