"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEntityAndPermissions = exports.DeleteRole = exports.UpdateRole = exports.CreateRole = exports.GetAllRoles = void 0;
const DbConnection_1 = require("../db-config/DbConnection");
const entities = __importStar(require("../entities/Context"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ERROR_MESSAGES = {
    NO_DATA: "No Data",
    INTERNAL_SERVER: "Internal Server Error",
};
const SUCCESS_MESSAGES = {
    REGISTER_SUCCESS: "Registration successful",
    SUCCESS: "Success",
    ADD_SUCCESS: "Added Successfully",
    UPDATE_SUCCESS: "Updated Successfully",
    DELETE_SUCCESS: "Deleted Successfully",
};
function GetAllRoles(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let role;
            if (model.id) {
                role = yield DbConnection_1.AppDataSource.getRepository(entities.Roles)
                    .createQueryBuilder("role")
                    .where("role.Id = :id", { id: model.id })
                    .andWhere("role.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                role = yield DbConnection_1.AppDataSource.getRepository(entities.Roles)
                    .createQueryBuilder("role")
                    .where("role.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const roleData = role.map((role) => ({
                id: role.Id,
                name: role.Name,
                description: role.Description,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: roleData,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.GetAllRoles = GetAllRoles;
function GetEntityAndPermissions(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entity = yield DbConnection_1.AppDataSource.getRepository(entities.EntityList)
                .createQueryBuilder("entity")
                .where("entity.IsActive = :isActive", { isActive: true })
                .getMany();
            const permissions = yield DbConnection_1.AppDataSource.getRepository(entities.Permissions)
                .createQueryBuilder("permissions")
                .leftJoinAndSelect("permissions.EntityList", "entity")
                .where("permissions.IsActive = :isActive", { isActive: true })
                .getMany();
            const roleHasPermissions = yield DbConnection_1.AppDataSource.getRepository(entities.RoleHasPermissions)
                .createQueryBuilder("roleHasPermissions")
                .leftJoinAndSelect("roleHasPermissions.Roles", "role")
                .leftJoinAndSelect("roleHasPermissions.Permissions", "permission")
                .where("roleHasPermissions.IsActive = :isActive", { isActive: true })
                .andWhere("role.IsActive = :isActive", { isActive: true })
                .getMany();
            const entityPermissions = entity.map((entity) => {
                const entityPermissions = permissions
                    .filter((permission) => { var _a; return ((_a = permission.EntityList) === null || _a === void 0 ? void 0 : _a.Id) === entity.Id; })
                    .map((permission) => {
                    let valid = false;
                    if (model === null || model === void 0 ? void 0 : model.id) {
                        const matchingPermission = roleHasPermissions.find((rolePermission) => {
                            var _a, _b;
                            return ((_a = rolePermission.Roles) === null || _a === void 0 ? void 0 : _a.Id) === +model.id &&
                                ((_b = rolePermission.Permissions) === null || _b === void 0 ? void 0 : _b.Id) === permission.Id;
                        });
                        valid = !!matchingPermission;
                    }
                    return {
                        id: permission.Id,
                        name: permission.ShortName,
                        action: permission.Action,
                        description: permission.Description,
                        valid: valid,
                    };
                });
                return {
                    id: entity.Id,
                    name: entity.Name,
                    permissions: entityPermissions,
                };
            });
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: entityPermissions,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.GetEntityAndPermissions = GetEntityAndPermissions;
function CreateRole(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Roles);
            const role = new entities.Roles();
            role.Name = model.name ? model.name : role.Name;
            role.Description = model.description ? model.description : role.Description;
            role.CreatedAt = new Date();
            role.CreatedBy = userId;
            const savedRole = yield repository.save(role);
            const rolePermissionPromises = model.permissionIds.map((permissionId) => __awaiter(this, void 0, void 0, function* () {
                const rolePermission = new entities.RoleHasPermissions();
                rolePermission.Roles = savedRole;
                rolePermission.Permissions = permissionId;
                rolePermission.CreatedAt = new Date();
                rolePermission.CreatedBy = userId;
                return DbConnection_1.AppDataSource.getRepository(entities.RoleHasPermissions).save(rolePermission);
            }));
            yield Promise.all(rolePermissionPromises);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.ADD_SUCCESS,
                data: null,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 400,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.CreateRole = CreateRole;
function UpdateRole(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Roles);
            const role = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            // console.log(role);
            if (role) {
                role.Id = model.id ? model.id : role.Id;
                role.Name = model.name ? model.name : role.Name;
                role.Description = model.description
                    ? model.description
                    : role.Description;
                role.ModifiedAt = new Date();
                role.ModifiedBy = userId;
                const savedRole = yield repository.save(role);
                const permissionIds = model.permissionIds;
                const getRolesHasPermission = yield DbConnection_1.AppDataSource.getRepository(entities.RoleHasPermissions)
                    .createQueryBuilder("rolesHasPermission")
                    .innerJoinAndSelect("rolesHasPermission.Permissions", "permission")
                    .innerJoinAndSelect("rolesHasPermission.Roles", "role")
                    .where("rolesHasPermission.IsActive =:cond", { cond: true })
                    .andWhere("role.Id =:id", { id: model.id })
                    .getMany();
                const permissionIdDB = getRolesHasPermission.map((roles) => {
                    return roles.Permissions.Id;
                });
                // console.log(permissionIdDB);
                const commonPermissions = [];
                for (let i = 0; i < permissionIds.length; i++) {
                    if (permissionIdDB.includes(permissionIds[i])) {
                        commonPermissions.push(permissionIds[i]);
                    }
                    else {
                        const permission = yield DbConnection_1.AppDataSource.getRepository(entities.Permissions).findOne({
                            where: { Id: permissionIds[i], IsActive: true },
                        });
                        // console.log(permission);
                        if (permission) {
                            const rolePermission = new entities.RoleHasPermissions();
                            rolePermission.Roles = savedRole;
                            rolePermission.Permissions = permission;
                            rolePermission.ModifiedAt = new Date();
                            rolePermission.ModifiedBy = userId;
                            rolePermission.IsActive = true;
                            yield DbConnection_1.AppDataSource.getRepository(entities.RoleHasPermissions).save(rolePermission);
                        }
                    }
                }
                // console.log(commonPermissions);
                const filteredPermissions = permissionIdDB.filter((element) => !commonPermissions.includes(element));
                // console.log(filteredPermissions);
                if (filteredPermissions.length !== 0) {
                    const roleHasPermissions = yield DbConnection_1.AppDataSource.getRepository(entities.RoleHasPermissions)
                        .createQueryBuilder("roleHasPermission")
                        .innerJoin("roleHasPermission.Roles", "roles")
                        .innerJoin("roleHasPermission.Permissions", "permission")
                        .where("roles.Id=:id", { id: model.id })
                        .andWhere("permission.Id IN(:...pid)", { pid: filteredPermissions })
                        .andWhere("roleHasPermission.IsActive=:cond", { cond: true })
                        .getMany();
                    const roleHasPermissionsIds = roleHasPermissions.map((element) => {
                        return element.Id;
                    });
                    for (let i = 0; i < roleHasPermissionsIds.length; i++) {
                        const repositoryRole = DbConnection_1.AppDataSource.getRepository(entities.RoleHasPermissions);
                        const role = yield repositoryRole.findOne({
                            where: { Id: roleHasPermissionsIds[i] },
                        });
                        if (role) {
                            role.IsActive = false;
                            yield repositoryRole.save(role);
                        }
                    }
                }
                return {
                    status: 200,
                    message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
                    data: null,
                };
            }
            else {
                return {
                    status: 200,
                    message: ERROR_MESSAGES.NO_DATA,
                    data: null,
                };
            }
        }
        catch (error) {
            console.log(error);
            return {
                status: 400,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.UpdateRole = UpdateRole;
function DeleteRole(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Roles);
            const role = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (role) {
                role.IsActive = false;
                role.DeletedAt = new Date();
                role.DeletedBy = userId;
                yield repository.save(role);
                return {
                    status: 200,
                    message: SUCCESS_MESSAGES.DELETE_SUCCESS,
                    data: null,
                };
            }
            else {
                return {
                    status: 200,
                    message: ERROR_MESSAGES.NO_DATA,
                    data: null,
                };
            }
        }
        catch (error) {
            console.log(error);
            return {
                status: 400,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.DeleteRole = DeleteRole;
