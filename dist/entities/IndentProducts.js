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
exports.IndentProducts = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const ProductMaster_1 = require("./ProductMaster");
const ProductSupply_1 = require("./ProductSupply");
let IndentProducts = exports.IndentProducts = class IndentProducts {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: "id" }),
    __metadata("design:type", String)
], IndentProducts.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductSupply_1.ProductSupply, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "indent_id" }),
    __metadata("design:type", ProductSupply_1.ProductSupply)
], IndentProducts.prototype, "IndentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductMaster_1.ProductMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "product_id" }),
    __metadata("design:type", ProductMaster_1.ProductMaster)
], IndentProducts.prototype, "ProductId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "available_qty", default: null }),
    __metadata("design:type", Number)
], IndentProducts.prototype, "AvailableQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "rate", type: "float", default: null }),
    __metadata("design:type", Number)
], IndentProducts.prototype, "Rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "requested_qty", default: null }),
    __metadata("design:type", Number)
], IndentProducts.prototype, "RequestedQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "approved_qty", default: null }),
    __metadata("design:type", Number)
], IndentProducts.prototype, "ApprovedQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "dispatch_qty", default: null }),
    __metadata("design:type", Number)
], IndentProducts.prototype, "DispatchQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "received_qty", default: null }),
    __metadata("design:type", Number)
], IndentProducts.prototype, "ReceivedQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active" }),
    __metadata("design:type", Boolean)
], IndentProducts.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], IndentProducts.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], IndentProducts.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], IndentProducts.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], IndentProducts.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], IndentProducts.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], IndentProducts.prototype, "DeletedBy", void 0);
exports.IndentProducts = IndentProducts = __decorate([
    (0, typeorm_1.Entity)()
], IndentProducts);
