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
exports.DeleteNonAgents = exports.UpdateNonAgents = exports.CreateNonAgents = exports.GetAllNonAgents = void 0;
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
function GetAllNonAgents(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let nonAgents;
            if (model.id) {
                nonAgents = yield DbConnection_1.AppDataSource.getRepository(entities.NonAgents)
                    .createQueryBuilder("nonAgents")
                    .where("nonAgents.Id = :id", { id: model.id })
                    .andWhere("nonAgents.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                nonAgents = yield DbConnection_1.AppDataSource.getRepository(entities.NonAgents)
                    .createQueryBuilder("nonAgents")
                    .where("nonAgents.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const famrmersData = nonAgents.map((nonAgents) => ({
                id: nonAgents.Id,
                parentId: nonAgents.ParentId ? nonAgents.ParentId.Id : 0,
                name: nonAgents.Name,
                addressLine1: nonAgents.AddressLine1,
                addressLine2: nonAgents.AddressLine2,
                stateId: nonAgents.State ? nonAgents.State.Id : 0,
                districtId: nonAgents.District ? nonAgents.District.Id : 0,
                vctId: nonAgents.VctId ? nonAgents.VctId.Id : 0,
                accountNumber: nonAgents.AccountNumber ? nonAgents.AccountNumber : "",
                phoneNumber: nonAgents.PhoneNumber ? nonAgents.PhoneNumber : "",
                ifscCode: nonAgents.IfscCode ? nonAgents.IfscCode : "",
                adhharNumber: nonAgents.AadharNumber ? nonAgents.AadharNumber : "",
                isCurrentrate: nonAgents.IsCurrentRate
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
exports.GetAllNonAgents = GetAllNonAgents;
function CreateNonAgents(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const parent = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("parent")
                .where("parent.Id = :id", { id: model.parentId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.NonAgents);
            const nonAgents = new entities.NonAgents();
            if (parent) {
                nonAgents.ParentId = parent;
            }
            nonAgents.Name = model.name,
                nonAgents.AddressLine1 = model.addressLine1,
                nonAgents.AddressLine2 = model.addressLine2,
                nonAgents.State = model.stateId,
                nonAgents.District = model.districtId,
                nonAgents.AccountNumber = model.accountNumber,
                nonAgents.PhoneNumber = model.phoneNumber,
                nonAgents.IfscCode = model.ifscCode,
                nonAgents.AadharNumber = model.adhharNumber,
                nonAgents.IsCurrentRate = model.isCurrentrate,
                nonAgents.CreatedAt = new Date();
            nonAgents.CreatedBy = userId;
            yield repository.save(nonAgents);
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
exports.CreateNonAgents = CreateNonAgents;
function UpdateNonAgents(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("model : ", model);
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.NonAgents);
            const nonAgents = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            const parent = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("parent")
                .where("parent.Id = :id", { id: model.parentId })
                .getOne();
            if (nonAgents) {
                if (parent) {
                    nonAgents.ParentId = parent;
                }
                nonAgents.Name = model.name,
                    nonAgents.AddressLine1 = model.addressLine1,
                    nonAgents.AddressLine2 = model.addressLine2,
                    nonAgents.State = model.stateId,
                    nonAgents.District = model.districtId,
                    nonAgents.VctId = model.vctId,
                    nonAgents.AccountNumber = model.accountNumber,
                    nonAgents.PhoneNumber = model.phoneNumber,
                    nonAgents.IfscCode = model.ifscCode,
                    nonAgents.AadharNumber = model.adhharNumber,
                    nonAgents.IsCurrentRate = model.isCurrentrate,
                    nonAgents.ModifiedAt = new Date();
                nonAgents.ModifiedBy = userId;
                yield repository.save(nonAgents);
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
exports.UpdateNonAgents = UpdateNonAgents;
function DeleteNonAgents(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.NonAgents);
            const nonAgents = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (nonAgents) {
                nonAgents.IsActive = false;
                nonAgents.DeletedAt = new Date();
                nonAgents.DeletedBy = userId;
                yield repository.save(nonAgents);
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
exports.DeleteNonAgents = DeleteNonAgents;
