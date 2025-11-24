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
exports.ChangeAppLoginPassword = exports.AppLogin = exports.ChangePassword = exports.Login = void 0;
const DbConnection_1 = require("../db-config/DbConnection");
const entities = __importStar(require("../entities/Context"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const ERROR_MESSAGES = {
    USER_EXISTS: "User already exists",
    USER_DOES_NOT_EXISTS: "User does not exists",
    INCORRECT_PASSWORD: "Incorrect Password",
    USER_DISABLED: "The User is Disabled",
    INVALID_BEARER: "Invalid bearer",
    NO_DATA: "No Data",
    INTERNAL_SERVER: "Internal Server Error",
};
const SUCCESS_MESSAGES = {
    REGISTER_SUCCESS: "Registration successful",
    SUCCESS: "Success",
};
function Login(model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if ((model === null || model === void 0 ? void 0 : model.username) && (model === null || model === void 0 ? void 0 : model.password)) {
                const user = yield DbConnection_1.AppDataSource.getRepository(entities.User).findOne({
                    where: { Username: model.username, IsActive: true },
                    relations: ["Role"],
                });
                if (user) {
                    const isMatch = yield bcrypt_1.default.compare(model.password, user.Password);
                    if (isMatch) {
                        if (user.IsActive == true) {
                            const userData = {
                                userId: user.Id,
                                username: user.Username,
                                roleId: user.Role.Id,
                                roleName: user.Role.Name,
                            };
                            const jwtReturn = yield CreateJWTToken(userData);
                            const permissionsData = yield permissions(userData === null || userData === void 0 ? void 0 : userData.roleId);
                            return {
                                status: 200,
                                message: SUCCESS_MESSAGES.SUCCESS,
                                data: {
                                    userDetails: {
                                        id: user.Id,
                                        username: model.username,
                                        accessToken: ((_a = jwtReturn === null || jwtReturn === void 0 ? void 0 : jwtReturn.data) === null || _a === void 0 ? void 0 : _a.accessToken) || null,
                                        roleId: user.Role.Id,
                                        roleName: user.Role.Name,
                                        expiryTime: 360000,
                                    },
                                    permissions: permissionsData,
                                },
                            };
                        }
                        else {
                            return {
                                status: 401,
                                message: ERROR_MESSAGES.USER_DISABLED,
                                data: null,
                            };
                        }
                    }
                    else {
                        return {
                            status: 401,
                            message: ERROR_MESSAGES.INCORRECT_PASSWORD,
                            data: null,
                        };
                    }
                }
                else {
                    return {
                        status: 404,
                        message: ERROR_MESSAGES.USER_DOES_NOT_EXISTS,
                        data: null,
                    };
                }
            }
            else {
                return { status: 400, message: ERROR_MESSAGES.NO_DATA, data: null };
            }
        }
        catch (error) {
            return { status: 500, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
        }
    });
}
exports.Login = Login;
function permissions(role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roleHasPermission = yield DbConnection_1.AppDataSource.getRepository(entities.RoleHasPermissions)
                .createQueryBuilder("roleHasPermission")
                .leftJoinAndSelect("roleHasPermission.Permissions", "permissions")
                .leftJoinAndSelect("permissions.EntityList", "entities")
                .where("roleHasPermission.Roles = :id", { id: role })
                .andWhere("roleHasPermission.IsActive = :isActive", { isActive: true })
                .andWhere("permissions.IsActive = :isActive", { isActive: true })
                .andWhere("entities.IsActive = :isActive", { isActive: true })
                .orderBy("entities.id", "ASC")
                .getMany();
            const roleHasPermissionData = roleHasPermission === null || roleHasPermission === void 0 ? void 0 : roleHasPermission.map((roleHasPermission) => ({
                id: roleHasPermission.Id,
                permissionId: roleHasPermission.Permissions.Id,
                permissionAction: roleHasPermission.Permissions.Action,
                entityid: roleHasPermission.Permissions.EntityList.Id,
                entityname: roleHasPermission.Permissions.EntityList.Name,
            }));
            const entityActionsMap = {};
            roleHasPermissionData.forEach((permission) => {
                const { entityname, permissionAction } = permission;
                if (entityActionsMap[entityname]) {
                    entityActionsMap[entityname].push(permissionAction);
                }
                else {
                    entityActionsMap[entityname] = [permissionAction];
                }
            });
            const permissionsArray = Object.keys(entityActionsMap).map((entityname) => ({
                [entityname]: entityActionsMap[entityname],
            }));
            return permissionsArray;
        }
        catch (error) {
            return [];
        }
    });
}
function ChangePassword(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if ((model === null || model === void 0 ? void 0 : model.username) && (model === null || model === void 0 ? void 0 : model.oldPassword) && (model === null || model === void 0 ? void 0 : model.newPassword)) {
                const user = yield DbConnection_1.AppDataSource.getRepository(entities.User).findOne({
                    where: { Username: model.username },
                    relations: ["Role"],
                });
                if (user) {
                    const isMatch = yield bcrypt_1.default.compare(model.oldPassword, user.Password);
                    if (isMatch) {
                        const hashedPassword = yield bcrypt_1.default.hash(model.newPassword, 10);
                        const repository = DbConnection_1.AppDataSource.getRepository(entities.User);
                        user.Password = hashedPassword;
                        user.ModifiedAt = new Date();
                        yield repository.save(user);
                        return {
                            status: 200,
                            message: SUCCESS_MESSAGES.SUCCESS,
                            data: null,
                        };
                    }
                    else {
                        return {
                            status: 401,
                            message: ERROR_MESSAGES.INCORRECT_PASSWORD,
                            data: null,
                        };
                    }
                }
                else {
                    return {
                        status: 404,
                        message: ERROR_MESSAGES.USER_DOES_NOT_EXISTS,
                        data: null,
                    };
                }
            }
            else {
                return { status: 400, message: ERROR_MESSAGES.NO_DATA, data: null };
            }
        }
        catch (error) {
            return { status: 500, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
        }
    });
}
exports.ChangePassword = ChangePassword;
function CreateJWTToken(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = jwt.sign({
                userId: model === null || model === void 0 ? void 0 : model.userId,
                username: model === null || model === void 0 ? void 0 : model.username,
                role: model.roleId,
            }, process.env.TOKEN_SECRET, {
                expiresIn: 60000000,
            });
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: {
                    username: model.username,
                    accessToken,
                    roleId: model.roleId,
                    roleName: model.roleName,
                },
            };
        }
        catch (error) {
            return { status: 500, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
        }
    });
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function AppLogin(model) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if ((model === null || model === void 0 ? void 0 : model.username) && (model === null || model === void 0 ? void 0 : model.password)) {
                const user = yield DbConnection_1.AppDataSource.getRepository(entities.User).findOne({
                    where: { Username: model.username, OrganizationUnitTypeId: { Id: 4 } },
                    relations: ["Role", "OrganizationUnitId"],
                });
                if (user) {
                    const isMatch = yield bcrypt_1.default.compare(model.password, user.Password);
                    if (isMatch) {
                        const existingData = yield DbConnection_1.AppDataSource.getRepository(entities.ImpsOneAppClients)
                            .createQueryBuilder("data")
                            .where("data.UserId = :userId", { userId: user.Id })
                            .getOne();
                        console.log('existing data', existingData);
                        if (!existingData) {
                            const repository = DbConnection_1.AppDataSource.getRepository(entities.ImpsOneAppClients);
                            const device = new entities.ImpsOneAppClients();
                            device.UserId = user;
                            device.DeviceId = model.deviceId;
                            device.CreatedAt = new Date();
                            device.CreatedBy = user;
                            yield repository.save(device);
                        }
                        else if (existingData.DeviceId !== model.deviceId) {
                            return {
                                status: 401,
                                message: "Device ID does not match",
                                data: null,
                            };
                        }
                        const userData = {
                            userId: user.Id,
                            username: user.Username,
                            roleId: user.Role.Id,
                            roleName: user.Role.Name,
                        };
                        const jwtReturn = yield CreateJWTToken(userData);
                        const organization = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                            .createQueryBuilder("organization")
                            .leftJoinAndSelect("organization.ParentId", "ParentId")
                            .leftJoinAndSelect("organization.OrganizationType", "OrganizationType")
                            .leftJoinAndSelect("organization.VctId", "VctId")
                            .leftJoinAndSelect("organization.DefaultCollectionType", "DefaultCollectionType")
                            .leftJoinAndSelect("organization.PayrollTypes", "PayrollTypes")
                            .where("organization.Id = :id", { id: user.OrganizationUnitId.Id })
                            .andWhere("organization.IsActive = :isActive", { isActive: true })
                            .getOne();
                        const isFarmer = yield DbConnection_1.AppDataSource.getRepository(entities.Farmer)
                            .createQueryBuilder("Farmer")
                            .where('Farmer.ParentId = :bmcid', { bmcid: organization === null || organization === void 0 ? void 0 : organization.Id })
                            .getCount();
                        const isDCS = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                            .createQueryBuilder("Organization")
                            .where('Organization.ParentId = :bmcid', { bmcid: organization === null || organization === void 0 ? void 0 : organization.Id })
                            .getCount();
                        console.log("org:", organization);
                        console.log("isDcs:", isDCS);
                        console.log("isFarmer:", isFarmer);
                        return {
                            status: 200,
                            message: SUCCESS_MESSAGES.SUCCESS,
                            data: {
                                authorization: {
                                    accessToken: ((_a = jwtReturn.data) === null || _a === void 0 ? void 0 : _a.accessToken) || null,
                                },
                                ou: {
                                    id: (organization === null || organization === void 0 ? void 0 : organization.Id) || null,
                                    name: (organization === null || organization === void 0 ? void 0 : organization.Name) || null,
                                    parentId: (organization === null || organization === void 0 ? void 0 : organization.ParentId)
                                        ? (_b = organization === null || organization === void 0 ? void 0 : organization.ParentId) === null || _b === void 0 ? void 0 : _b.Id
                                        : null,
                                    organizationType: (organization === null || organization === void 0 ? void 0 : organization.OrganizationType)
                                        ? organization === null || organization === void 0 ? void 0 : organization.OrganizationType.Id
                                        : null,
                                    organizationTypeName: (organization === null || organization === void 0 ? void 0 : organization.OrganizationType)
                                        ? organization === null || organization === void 0 ? void 0 : organization.OrganizationType.ShortName
                                        : null,
                                    businessRegnNo: (organization === null || organization === void 0 ? void 0 : organization.BusinessRegnNo) || null,
                                    gstNo: (organization === null || organization === void 0 ? void 0 : organization.GstNo) || null,
                                    addressLine1: (organization === null || organization === void 0 ? void 0 : organization.AddressLine1) || null,
                                    addressLine2: (organization === null || organization === void 0 ? void 0 : organization.AddressLine2) || null,
                                    vctId: (organization === null || organization === void 0 ? void 0 : organization.VctId) ? organization === null || organization === void 0 ? void 0 : organization.VctId.Id : null,
                                    geocode: (organization === null || organization === void 0 ? void 0 : organization.Geocode) || null,
                                    capacity: (organization === null || organization === void 0 ? void 0 : organization.Capacity) || null,
                                    morningShiftStartTime: (organization === null || organization === void 0 ? void 0 : organization.MorningShiftStartTime) || null,
                                    morningShiftEndTime: (organization === null || organization === void 0 ? void 0 : organization.MorningShiftEndTime) || null,
                                    eveningShiftStartTime: (organization === null || organization === void 0 ? void 0 : organization.EveningShiftStartTime) || null,
                                    eveningShiftEndTime: (organization === null || organization === void 0 ? void 0 : organization.EveningShiftEndTime) || null,
                                    defaultCollectionType: (organization === null || organization === void 0 ? void 0 : organization.DefaultCollectionType)
                                        ? organization === null || organization === void 0 ? void 0 : organization.DefaultCollectionType.Id
                                        : null,
                                    payrollTypes: (organization === null || organization === void 0 ? void 0 : organization.PayrollTypes)
                                        ? (_c = organization === null || organization === void 0 ? void 0 : organization.PayrollTypes) === null || _c === void 0 ? void 0 : _c.Id
                                        : null,
                                    enforceStrictTiming: (organization === null || organization === void 0 ? void 0 : organization.EnforceStrictTiming) || null,
                                    enforceNoDueCollection: (organization === null || organization === void 0 ? void 0 : organization.EnforceStrictTiming) || null,
                                    isDcs: isDCS == 0 ? false : true,
                                    isFarmer: isFarmer == 0 ? false : true,
                                },
                                user: {
                                    id: user.Id,
                                    name: user.Name,
                                    organizationId: user.OrganizationUnitId
                                        ? user.OrganizationUnitId.Id
                                        : 0,
                                    address: user.Address,
                                    contactNumber: user.MobileNo,
                                    emailAddress: user.EmailId,
                                    username: user.Username,
                                },
                            },
                        };
                    }
                    else {
                        return {
                            status: 401,
                            message: ERROR_MESSAGES.INCORRECT_PASSWORD,
                            data: null,
                        };
                    }
                }
                else {
                    return {
                        status: 404,
                        message: ERROR_MESSAGES.USER_DOES_NOT_EXISTS,
                        data: null,
                    };
                }
            }
            else {
                return { status: 400, message: ERROR_MESSAGES.NO_DATA, data: null };
            }
        }
        catch (error) {
            console.log(error);
            return { status: 500, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
        }
    });
}
exports.AppLogin = AppLogin;
function ChangeAppLoginPassword(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if ((model === null || model === void 0 ? void 0 : model.username) && (model === null || model === void 0 ? void 0 : model.oldPassword) && (model === null || model === void 0 ? void 0 : model.newPassword)) {
                const user = yield DbConnection_1.AppDataSource.getRepository(entities.User).findOne({
                    where: { Username: model.username, Role: { Id: 1 } },
                    relations: ["Role"],
                });
                if (user) {
                    const isMatch = yield bcrypt_1.default.compare(model.oldPassword, user.Password);
                    if (isMatch) {
                        const hashedPassword = yield bcrypt_1.default.hash(model.newPassword, 10);
                        const repository = DbConnection_1.AppDataSource.getRepository(entities.User);
                        user.Password = hashedPassword;
                        user.ModifiedAt = new Date();
                        yield repository.save(user);
                        return {
                            status: 200,
                            message: SUCCESS_MESSAGES.SUCCESS,
                            data: null,
                        };
                    }
                    else {
                        return {
                            status: 401,
                            message: ERROR_MESSAGES.INCORRECT_PASSWORD,
                            data: null,
                        };
                    }
                }
                else {
                    return {
                        status: 404,
                        message: ERROR_MESSAGES.USER_DOES_NOT_EXISTS,
                        data: null,
                    };
                }
            }
            else {
                return { status: 400, message: ERROR_MESSAGES.NO_DATA, data: null };
            }
        }
        catch (error) {
            return { status: 500, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
        }
    });
}
exports.ChangeAppLoginPassword = ChangeAppLoginPassword;
