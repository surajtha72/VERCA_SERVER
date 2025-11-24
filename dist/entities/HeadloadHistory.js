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
exports.HeadloadHistory = void 0;
const typeorm_1 = require("typeorm");
const Organization_1 = require("./Organization");
const BillingCycleMaster_1 = require("./BillingCycleMaster");
const User_1 = require("./User");
let HeadloadHistory = exports.HeadloadHistory = class HeadloadHistory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], HeadloadHistory.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "organization_id" }),
    __metadata("design:type", Organization_1.Organization)
], HeadloadHistory.prototype, "Agent_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BillingCycleMaster_1.BillingCycleMaster, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "cycle_id" }),
    __metadata("design:type", BillingCycleMaster_1.BillingCycleMaster)
], HeadloadHistory.prototype, "BillingCycle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "headload", type: "float", nullable: false }),
    __metadata("design:type", Number)
], HeadloadHistory.prototype, "HeadLoad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "account_number", default: null }),
    __metadata("design:type", String)
], HeadloadHistory.prototype, "AccountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(({ name: "acc_holder_name", default: null, length: 100 })),
    __metadata("design:type", String)
], HeadloadHistory.prototype, "AccHolderName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "route_id", nullable: true }),
    __metadata("design:type", Number)
], HeadloadHistory.prototype, "RouteId", void 0);
__decorate([
    (0, typeorm_1.Column)(({ name: "route_name", default: null, length: 100 })),
    __metadata("design:type", String)
], HeadloadHistory.prototype, "RouteName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime" }),
    __metadata("design:type", Date)
], HeadloadHistory.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], HeadloadHistory.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], HeadloadHistory.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], HeadloadHistory.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], HeadloadHistory.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], HeadloadHistory.prototype, "DeletedBy", void 0);
exports.HeadloadHistory = HeadloadHistory = __decorate([
    (0, typeorm_1.Entity)()
], HeadloadHistory);
