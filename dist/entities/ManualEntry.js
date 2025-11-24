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
exports.ManualEntry = void 0;
const typeorm_1 = require("typeorm");
const Organization_1 = require("./Organization");
const User_1 = require("./User");
let ManualEntry = exports.ManualEntry = class ManualEntry {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], ManualEntry.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "organization_unit_id" }),
    __metadata("design:type", Organization_1.Organization)
], ManualEntry.prototype, "OrganizationUnitId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "status", length: 20, default: null }),
    __metadata("design:type", String)
], ManualEntry.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], ManualEntry.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "request_for", length: 20, default: null }),
    __metadata("design:type", String)
], ManualEntry.prototype, "RequestFor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ManualEntry.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], ManualEntry.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], ManualEntry.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], ManualEntry.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: 'datetime' }),
    __metadata("design:type", Date)
], ManualEntry.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], ManualEntry.prototype, "DeletedBy", void 0);
exports.ManualEntry = ManualEntry = __decorate([
    (0, typeorm_1.Entity)()
], ManualEntry);
