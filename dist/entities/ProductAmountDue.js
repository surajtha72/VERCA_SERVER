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
exports.ProductAmountDue = void 0;
const typeorm_1 = require("typeorm");
const Organization_1 = require("./Organization");
let ProductAmountDue = exports.ProductAmountDue = class ProductAmountDue {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], ProductAmountDue.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "agent_id" }),
    (0, typeorm_1.Index)({ unique: true }),
    __metadata("design:type", Organization_1.Organization)
], ProductAmountDue.prototype, "AgentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cycle_start_date", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], ProductAmountDue.prototype, "CycleStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "cycle_end_date", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], ProductAmountDue.prototype, "CycleEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "short_desc", nullable: true }),
    __metadata("design:type", String)
], ProductAmountDue.prototype, "ShortDesc", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { name: "due_amount", default: null, scale: 2 }),
    __metadata("design:type", Number)
], ProductAmountDue.prototype, "DueAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], ProductAmountDue.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], ProductAmountDue.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_cycle_start_date", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], ProductAmountDue.prototype, "ModifiedCycleStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_cycle_end_date", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], ProductAmountDue.prototype, "ModifiedCycleEndDate", void 0);
exports.ProductAmountDue = ProductAmountDue = __decorate([
    (0, typeorm_1.Entity)()
], ProductAmountDue);
