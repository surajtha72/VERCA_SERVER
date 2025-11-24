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
exports.DeleteBankBranch = exports.UpdateBankBranch = exports.CreateBankBranch = exports.GetAllBankBranches = void 0;
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
function GetAllBankBranches(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let bankBranch;
            if (model.BankId) {
                bankBranch = yield DbConnection_1.AppDataSource.getRepository(entities.BankBranch)
                    .createQueryBuilder("bankBranch")
                    .leftJoinAndSelect("bankBranch.BankId", "bank")
                    .where("bank.Id = :id", { id: model.BankId })
                    .andWhere("bankBranch.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.id) {
                bankBranch = yield DbConnection_1.AppDataSource.getRepository(entities.BankBranch)
                    .createQueryBuilder("bankBranch")
                    .leftJoinAndSelect("bankBranch.BankId", "bank")
                    .where("bankBranch.Id = :id", { id: model.id })
                    .andWhere("bankBranch.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                bankBranch = yield DbConnection_1.AppDataSource.getRepository(entities.BankBranch)
                    .createQueryBuilder("bankBranch")
                    .leftJoinAndSelect("bankBranch.BankId", "banks")
                    .where("bankBranch.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const bankBranchData = bankBranch.map((bankBranch) => ({
                id: bankBranch === null || bankBranch === void 0 ? void 0 : bankBranch.Id,
                bankId: bankBranch.BankId,
                branchName: bankBranch === null || bankBranch === void 0 ? void 0 : bankBranch.BranchName,
                ifscCode: bankBranch === null || bankBranch === void 0 ? void 0 : bankBranch.IfscCode,
                address: bankBranch === null || bankBranch === void 0 ? void 0 : bankBranch.Address,
                isActive: bankBranch === null || bankBranch === void 0 ? void 0 : bankBranch.IsActive
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: bankBranchData,
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
exports.GetAllBankBranches = GetAllBankBranches;
function CreateBankBranch(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const bank = yield DbConnection_1.AppDataSource.getRepository(entities.Bank)
                .createQueryBuilder("bank")
                .where("bank.Id = :id", { id: model.bankId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.BankBranch);
            const bankBranch = new entities.BankBranch();
            if (bank) {
                bankBranch.BankId = bank;
            }
            bankBranch.BranchName = model.branchName ? model.branchName : bankBranch.BranchName;
            bankBranch.IfscCode = model.ifscCode ? model.ifscCode : bankBranch.IfscCode;
            bankBranch.Address = model.address ? model.address : bankBranch.Address;
            bankBranch.IsActive = model.isActive ? model.isActive : bankBranch.IsActive;
            bankBranch.CreatedAt = new Date();
            bankBranch.CreatedBy = userId;
            yield repository.save(bankBranch);
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
exports.CreateBankBranch = CreateBankBranch;
function UpdateBankBranch(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const bank = yield DbConnection_1.AppDataSource.getRepository(entities.Bank)
                .createQueryBuilder("bank")
                .where("bank.Id = :id", { id: model.bankId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.BankBranch);
            const bankBranch = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (bankBranch) {
                if (bank) {
                    bankBranch.BankId = bank;
                }
                bankBranch.BranchName = model.branchName ? model.branchName : bankBranch.BranchName;
                bankBranch.IfscCode = model.ifscCode ? model.ifscCode : bankBranch.IfscCode;
                bankBranch.Address = model.address ? model.address : bankBranch.Address;
                bankBranch.IsActive = model.isActive ? model.isActive : bankBranch.IsActive;
                bankBranch.CreatedAt = new Date();
                bankBranch.CreatedBy = userId;
                yield repository.save(bankBranch);
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
exports.UpdateBankBranch = UpdateBankBranch;
function DeleteBankBranch(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.BankBranch);
            const bankBranch = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (bankBranch) {
                bankBranch.IsActive = false;
                bankBranch.DeletedAt = new Date();
                bankBranch.DeletedBy = userId;
                yield repository.save(bankBranch);
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
exports.DeleteBankBranch = DeleteBankBranch;
