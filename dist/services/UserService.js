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
exports.CheckCollectionEntry = exports.CheckManualEntry = exports.DeleteUser = exports.UpdateUser = exports.CreateUser = exports.GetAllUsers = void 0;
const DbConnection_1 = require("../db-config/DbConnection");
const entities = __importStar(require("../entities/Context"));
const jwt = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
function GetAllUsers(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user;
            if (model.id) {
                // console.log(model)
                user = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .leftJoinAndSelect("user.Role", "Role")
                    .leftJoinAndSelect("user.OrganizationUnitTypeId", "OrganizationUnitTypeId")
                    .leftJoinAndSelect("user.OrganizationUnitId", "OrganizationUnitId")
                    .leftJoinAndSelect("user.State", "State")
                    .leftJoinAndSelect("user.District", "District")
                    .leftJoinAndSelect("user.Taluka", "Taluka")
                    .where("user.Id = :id", { id: model.id })
                    // .andWhere("user.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.organizationUnitId) {
                user = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .leftJoinAndSelect("user.Role", "Role")
                    .leftJoinAndSelect("user.OrganizationUnitTypeId", "OrganizationUnitTypeId")
                    .leftJoinAndSelect("user.OrganizationUnitId", "OrganizationUnitId")
                    .leftJoinAndSelect("user.State", "State")
                    .leftJoinAndSelect("user.District", "District")
                    .leftJoinAndSelect("user.Taluka", "Taluka")
                    .where("user.OrganizationUnitId = :organizationUnit", {
                    organizationUnit: model.organizationUnitId,
                })
                    // .andWhere("user.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                user = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .leftJoinAndSelect("user.Role", "Role")
                    .leftJoinAndSelect("user.OrganizationUnitTypeId", "OrganizationUnitTypeId")
                    .leftJoinAndSelect("user.OrganizationUnitId", "OrganizationUnitId")
                    .leftJoinAndSelect("user.State", "State")
                    .leftJoinAndSelect("user.District", "District")
                    .leftJoinAndSelect("user.Taluka", "Taluka")
                    // .where("user.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const userData = user.map((user) => ({
                id: user.Id,
                organizationUnitTypeId: user.OrganizationUnitTypeId
                    ? user.OrganizationUnitTypeId.Id
                    : 0,
                organizationUnitTypeName: user.OrganizationUnitTypeId
                    ? user.OrganizationUnitTypeId.Name
                    : "",
                organizationUnitId: user.OrganizationUnitId
                    ? user.OrganizationUnitId.Id
                    : 0,
                organizationUnitName: user.OrganizationUnitId
                    ? user.OrganizationUnitId.Name
                    : "",
                name: user.Name,
                address: user.Address,
                mobileNo: user.MobileNo,
                emailId: user.EmailId,
                roleId: user.Role.Id,
                roleName: user.Role.Name,
                stateId: user.State ? user.State.Id : 0,
                stateName: user.State ? user.State.Name : "",
                districtId: user.District ? user.District.Id : 0,
                districtName: user.District ? user.District.Name : "",
                vctId: user.Taluka ? user.Taluka.Id : 0,
                vctName: user.Taluka ? user.Taluka.Name : "",
                aadhaarNo: user.AadhaarNo,
                panNo: user.PanNo,
                bankAccNo: user.BankAcNo,
                bankAccName: user.BankAcName,
                bankBranchId: user.BankBranIfsc,
                isActive: user.IsActive,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: userData,
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
exports.GetAllUsers = GetAllUsers;
function CreateUser(req, model) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const organizationUnitType = yield DbConnection_1.AppDataSource.getRepository(entities.OrganizationUnitType)
                .createQueryBuilder("organizationUnitType")
                .where("organizationUnitType.Id = :id", {
                id: model.organizationUnitTypeId,
            })
                .getOne();
            const organizationUnit = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("organization")
                .where("organization.Id = :id", { id: model.organizationUnitId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.User);
            const user = new entities.User();
            if (organizationUnitType) {
                user.OrganizationUnitTypeId = organizationUnitType;
            }
            if (organizationUnit) {
                user.OrganizationUnitId = organizationUnit;
            }
            user.Name = model.name ? model.name : user.Name;
            user.Address = model.address ? model.address : user.Address;
            user.MobileNo = model.mobileNo ? model.mobileNo : user.MobileNo;
            user.EmailId = model.emailId ? model.emailId : user.EmailId;
            user.Role = model.roleId ? model.roleId : user.Role;
            user.State = model.stateId ? model.stateId : user.State;
            user.District = model.districtId ? model.districtId : user.District;
            user.Taluka = model.vctId ? model.vctId : user.Taluka;
            user.AadhaarNo = model.aadhaarNo ? model.aadhaarNo : user.AadhaarNo;
            user.PanNo = model.panNo ? model.panNo : user.PanNo;
            user.BankAcNo = (_b = model.bankAccNo) !== null && _b !== void 0 ? _b : user.BankAcNo;
            user.BankAcName = (_c = model.bankAccName) !== null && _c !== void 0 ? _c : user.BankAcName;
            user.BankBranIfsc = (_d = model.bankBranchId) !== null && _d !== void 0 ? _d : user.BankBranIfsc;
            user.Username = model.username ? model.username : user.Username;
            if (model.password) {
                const hashedPassword = yield bcrypt_1.default.hash(model.password, 10);
                user.Password = hashedPassword;
            }
            user.IsActive = model.isActive ? model.isActive : user.IsActive;
            user.CreatedAt = new Date();
            user.CreatedBy = userId;
            const getRole = yield DbConnection_1.AppDataSource.getRepository(entities.Roles)
                .createQueryBuilder("role")
                .where("role.id = :roleId", { roleId: model.roleId })
                .getOne();
            if (getRole) {
                user.Role = getRole;
            }
            yield repository.save(user);
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
exports.CreateUser = CreateUser;
function UpdateUser(req, model) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.User);
            const user = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            console.log("model: ", model.isActive);
            const organizationUnitType = yield DbConnection_1.AppDataSource.getRepository(entities.OrganizationUnitType)
                .createQueryBuilder("organizationUnitType")
                .where("organizationUnitType.Id = :id", {
                id: model.organizationUnitTypeId,
            })
                .getOne();
            const organizationUnit = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("organization")
                .where("organization.Id = :id", { id: model.organizationUnitId })
                .getOne();
            if (user) {
                if (organizationUnitType) {
                    user.OrganizationUnitTypeId = organizationUnitType;
                }
                if (organizationUnit) {
                    user.OrganizationUnitId = organizationUnit;
                }
                user.Name = model.name ? model.name : user.Name;
                user.Address = model.address ? model.address : user.Address;
                user.MobileNo = model.mobileNo ? model.mobileNo : user.MobileNo;
                user.EmailId = model.emailId ? model.emailId : user.EmailId;
                user.Role = model.roleId ? model.roleId : user.Role;
                user.State = model.stateId ? model.stateId : user.State;
                user.District = model.districtId ? model.districtId : user.District;
                user.Taluka = model.vctId ? model.vctId : user.Taluka;
                user.AadhaarNo = model.aadhaarNo ? model.aadhaarNo : user.AadhaarNo;
                user.PanNo = model.panNo ? model.panNo : user.PanNo;
                user.BankAcNo = (_c = model.bankAccNo) !== null && _c !== void 0 ? _c : user.BankAcNo;
                user.BankAcName = (_d = model.bankAccName) !== null && _d !== void 0 ? _d : user.BankAcName;
                user.BankBranIfsc = (_e = model.bankBranchId) !== null && _e !== void 0 ? _e : user.BankBranIfsc;
                user.Username = model.username ? model.username : user.Username;
                if (model.password) {
                    const hashedPassword = yield bcrypt_1.default.hash(model.password, 10);
                    user.Password = hashedPassword;
                }
                user.IsActive = model.isActive;
                user.ModifiedAt = new Date();
                user.ModifiedBy = userId;
                yield repository.save(user);
                console.log('user: ', user);
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
exports.UpdateUser = UpdateUser;
function DeleteUser(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.User);
            const user = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (user) {
                user.IsActive = false;
                user.DeletedAt = new Date();
                user.DeletedBy = userId;
                yield repository.save(user);
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
exports.DeleteUser = DeleteUser;
function CheckManualEntry(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (model.userId && model.aadhaarNo) {
                // console.log(model.aadhaarNo)
                const user = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :userId", { userId: model.userId })
                    .andWhere("user.AadhaarNo = :aadhaarNo", { aadhaarNo: model.aadhaarNo })
                    .getOne();
                if (user) {
                    if (model.aadhaarNo === '0') {
                        return {
                            status: 400,
                            message: "Not allowed",
                            data: null,
                        };
                    }
                    else if (user.AadhaarNo === model.aadhaarNo) {
                        return {
                            status: 200,
                            message: "Allowed",
                            data: null,
                        };
                    }
                    else {
                        return {
                            status: 200,
                            message: "SUCCESS",
                            data: null,
                        };
                    }
                }
                else {
                    return {
                        status: 400,
                        message: "Not allowed",
                        data: null,
                    };
                }
            }
            else {
                return {
                    status: 200,
                    message: SUCCESS_MESSAGES.SUCCESS,
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
exports.CheckManualEntry = CheckManualEntry;
function CheckCollectionEntry(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (model.userId && model.aadhaarNo) {
                // console.log(model.aadhaarNo)
                const user = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :userId", { userId: model.userId })
                    .andWhere("user.AadhaarNo = :aadhaarNo", { aadhaarNo: model.aadhaarNo })
                    .getOne();
                if (user) {
                    if (model.aadhaarNo === '0') {
                        return {
                            status: 400,
                            message: "Not allowed",
                            data: null,
                        };
                    }
                    else if (user.AadhaarNo === model.aadhaarNo) {
                        return {
                            status: 200,
                            message: "Allowed",
                            data: null,
                        };
                    }
                    else {
                        return {
                            status: 200,
                            message: "SUCCESS",
                            data: null,
                        };
                    }
                }
                else {
                    return {
                        status: 400,
                        message: "Not allowed",
                        data: null,
                    };
                }
            }
            else {
                return {
                    status: 200,
                    message: SUCCESS_MESSAGES.SUCCESS,
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
exports.CheckCollectionEntry = CheckCollectionEntry;
