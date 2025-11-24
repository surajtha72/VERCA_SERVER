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
exports.DeleteFarmers = exports.UpdateFarmers = exports.CreateFarmers = exports.GetAllFarmers = void 0;
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
function GetAllFarmers(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let farmers;
            if (model.id) {
                farmers = yield DbConnection_1.AppDataSource.getRepository(entities.Farmer)
                    .createQueryBuilder("farmers")
                    .where("farmers.Id = :id", { id: model.id })
                    .andWhere("farmers.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                farmers = yield DbConnection_1.AppDataSource.getRepository(entities.Farmer)
                    .createQueryBuilder("farmers")
                    .where("farmers.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const famrmersData = farmers.map((farmers) => ({
                id: farmers.Id,
                parentId: farmers.ParentId ? farmers.ParentId.Id : 0,
                name: farmers.Name,
                addressLine1: farmers.AddressLine1,
                addressLine2: farmers.AddressLine2,
                stateId: farmers.State ? farmers.State.Id : 0,
                districtId: farmers.District ? farmers.District.Id : 0,
                vctId: farmers.VctId ? farmers.VctId.Id : 0,
                accountNumber: farmers.AccountNumber ? farmers.AccountNumber : "",
                phoneNumber: farmers.PhoneNumber ? farmers.PhoneNumber : "",
                ifscCode: farmers.IfscCode ? farmers.IfscCode : "",
                adhharNumber: farmers.AadharNumber ? farmers.AadharNumber : "",
                isCurrentrate: farmers.IsCurrentRate
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: famrmersData,
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
exports.GetAllFarmers = GetAllFarmers;
function CreateFarmers(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            // const parent = await AppDataSource.getRepository(entities.Organization)
            //   .createQueryBuilder("parent")
            //   .where("parent.Id = :id", { id: model.parentId })
            //   .getOne();
            let parent = null;
            if (model.parentId) {
                parent = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("parent")
                    .where("parent.Id = :id", { id: model.parentId })
                    .getOne();
            }
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Farmer);
            const farmers = new entities.Farmer();
            if (parent) {
                farmers.ParentId = parent;
            }
            farmers.Name = model.name,
                farmers.AddressLine1 = model.addressLine1,
                farmers.AddressLine2 = model.addressLine2,
                farmers.State = model.stateId,
                farmers.District = model.districtId,
                farmers.AccountNumber = model.accountNumber,
                farmers.PhoneNumber = model.phoneNumber,
                farmers.IfscCode = model.ifscCode,
                farmers.AadharNumber = model.adhharNumber,
                farmers.IsCurrentRate = model.isCurrentrate,
                farmers.CreatedAt = new Date();
            farmers.CreatedBy = userId;
            yield repository.save(farmers);
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
exports.CreateFarmers = CreateFarmers;
function UpdateFarmers(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("model : ", model);
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Farmer);
            const farmers = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            const parent = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("parent")
                .where("parent.Id = :id", { id: model.parentId })
                .getOne();
            if (farmers) {
                if (parent) {
                    farmers.ParentId = parent;
                }
                farmers.Name = model.name,
                    farmers.AddressLine1 = model.addressLine1,
                    farmers.AddressLine2 = model.addressLine2,
                    farmers.State = model.stateId,
                    farmers.District = model.districtId,
                    farmers.VctId = model.vctId,
                    farmers.AccountNumber = model.accountNumber,
                    farmers.PhoneNumber = model.phoneNumber,
                    farmers.IfscCode = model.ifscCode,
                    farmers.AadharNumber = model.adhharNumber,
                    farmers.IsCurrentRate = model.isCurrentrate,
                    farmers.ModifiedAt = new Date();
                farmers.ModifiedBy = userId;
                yield repository.save(farmers);
                // console.log(organizations)
                return {
                    status: 200,
                    message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
                    data: null,
                };
            }
            else {
                return {
                    status: 404,
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
exports.UpdateFarmers = UpdateFarmers;
function DeleteFarmers(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Farmer);
            const farmers = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (farmers) {
                farmers.IsActive = false;
                farmers.DeletedAt = new Date();
                farmers.DeletedBy = userId;
                yield repository.save(farmers);
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
exports.DeleteFarmers = DeleteFarmers;
