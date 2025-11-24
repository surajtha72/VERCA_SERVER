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
exports.ProductMaster = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const ProductCategory_1 = require("./ProductCategory");
let ProductMaster = exports.ProductMaster = class ProductMaster {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductCategory_1.ProductCategory, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "product_categ_id" }),
    __metadata("design:type", ProductCategory_1.ProductCategory)
], ProductMaster.prototype, "ProductCategId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_name", length: 100 }),
    __metadata("design:type", String)
], ProductMaster.prototype, "ProductName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description", length: 100 }),
    __metadata("design:type", String)
], ProductMaster.prototype, "Description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "supplier_make", length: 100 }),
    __metadata("design:type", String)
], ProductMaster.prototype, "SupplierMake", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "batch_no", length: 100 }),
    __metadata("design:type", String)
], ProductMaster.prototype, "BatchNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "mfg_date", type: "datetime" }),
    __metadata("design:type", Date)
], ProductMaster.prototype, "MfgDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "exp_date", type: "datetime" }),
    __metadata("design:type", Date)
], ProductMaster.prototype, "ExpDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "recorder_level", default: null }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "RecorderLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "lead_time_in_delay", default: null }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "LeadTimeInDelay", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "unit_qty_uom_id", default: null }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "UnitQtyUomId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "unit_qty_purchase_price", type: "float", default: null }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "UnitQtyPurchasePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "unit_qty_supply_price", type: "float", default: null }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "UnitQtySupplyPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "tax_on_supply", type: "float", default: null }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "TaxOnSupply", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "unit_qty_incentive_amount", type: "float", default: null }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "UnitQtyIncentiveAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "opening_balance_qty", type: "float", default: null }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "OpeningBalanceQty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "opening_balance_date", type: "datetime" }),
    __metadata("design:type", Date)
], ProductMaster.prototype, "OpeningBalanceDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active" }),
    __metadata("design:type", Boolean)
], ProductMaster.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], ProductMaster.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], ProductMaster.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], ProductMaster.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], ProductMaster.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], ProductMaster.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], ProductMaster.prototype, "DeletedBy", void 0);
exports.ProductMaster = ProductMaster = __decorate([
    (0, typeorm_1.Entity)()
], ProductMaster);
