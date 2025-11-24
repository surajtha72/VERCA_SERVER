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
exports.Permissions = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const EntityList_1 = require("./EntityList");
let Permissions = exports.Permissions = class Permissions {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], Permissions.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "short_name", length: 20, default: null }),
    __metadata("design:type", String)
], Permissions.prototype, "ShortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description", length: 200, default: null }),
    __metadata("design:type", String)
], Permissions.prototype, "Description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "action", length: 200, default: null }),
    __metadata("design:type", String)
], Permissions.prototype, "Action", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EntityList_1.EntityList, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "entity_id" }),
    __metadata("design:type", EntityList_1.EntityList)
], Permissions.prototype, "EntityList", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: true }),
    __metadata("design:type", Boolean)
], Permissions.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "created_at", type: "datetime", nullable: true, }),
    __metadata("design:type", Date)
], Permissions.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "created_by" }),
    __metadata("design:type", User_1.User)
], Permissions.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "modified_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], Permissions.prototype, "ModifiedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "modified_by" }),
    __metadata("design:type", User_1.User)
], Permissions.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "deleted_at", nullable: true, type: "datetime" }),
    __metadata("design:type", Date)
], Permissions.prototype, "DeletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "deleted_by" }),
    __metadata("design:type", User_1.User)
], Permissions.prototype, "DeletedBy", void 0);
exports.Permissions = Permissions = __decorate([
    (0, typeorm_1.Entity)()
], Permissions);
