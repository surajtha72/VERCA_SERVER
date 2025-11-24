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
exports.ProductsSoldToAgent = void 0;
const typeorm_1 = require("typeorm");
const ProductSalesToAgent_1 = require("./ProductSalesToAgent");
const ProductMaster_1 = require("./ProductMaster");
const User_1 = require("./User");
let ProductsSoldToAgent = exports.ProductsSoldToAgent = class ProductsSoldToAgent {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], ProductsSoldToAgent.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductSalesToAgent_1.ProductSalesToAgent, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "product_sales_to_agent" }),
    __metadata("design:type", ProductSalesToAgent_1.ProductSalesToAgent)
], ProductsSoldToAgent.prototype, "ProductSalesToAgent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductMaster_1.ProductMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "product_id" }),
    __metadata("design:type", ProductMaster_1.ProductMaster)
], ProductsSoldToAgent.prototype, "ProductId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "quantity", default: null }),
    __metadata("design:type", Number)
], ProductsSoldToAgent.prototype, "Quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "rate", default: null }),
    __metadata("design:type", Number)
], ProductsSoldToAgent.prototype, "Rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], ProductsSoldToAgent.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], ProductsSoldToAgent.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], ProductsSoldToAgent.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], ProductsSoldToAgent.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], ProductsSoldToAgent.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], ProductsSoldToAgent.prototype, "DeletedBy", void 0);
exports.ProductsSoldToAgent = ProductsSoldToAgent = __decorate([
    (0, typeorm_1.Entity)()
], ProductsSoldToAgent);
