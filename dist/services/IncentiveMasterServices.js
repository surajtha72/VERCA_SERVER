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
exports.DeleteIncentiveMaster = exports.UpdateIncentiveMaster = exports.CreateIncentiveMaster = exports.GetAllIncentiveMaster = void 0;
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
function GetAllIncentiveMaster(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let incentive;
            if (model.currentDate) {
                incentive = yield DbConnection_1.AppDataSource.getRepository(entities.IncentiveMaster)
                    .createQueryBuilder("incentive")
                    .leftJoinAndSelect("incentive.BillingCycleRef", "billingCycleRef")
                    .where("incentive.EffectiveFrom < :currentDate", { currentDate: model.currentDate })
                    .andWhere("incentive.IsActive = :isActive", { isActive: true })
                    .orderBy("incentive.EffectiveFrom", "DESC")
                    .getMany();
            }
            else if (model.id) {
                incentive = yield DbConnection_1.AppDataSource.getRepository(entities.IncentiveMaster)
                    .createQueryBuilder("incentive")
                    .leftJoinAndSelect("incentive.BillingCycleRef", "billingCycleRef")
                    .where("incentive.IncentiveId = :id", { id: model.id })
                    .andWhere("incentive.IsActive = :isActive", { isActive: true })
                    .orderBy("incentive.EffectiveFrom", "DESC")
                    .getMany();
            }
            else {
                incentive = yield DbConnection_1.AppDataSource.getRepository(entities.IncentiveMaster)
                    .createQueryBuilder("incentive")
                    .leftJoinAndSelect("incentive.BillingCycleRef", "billingCycleRef")
                    .where("incentive.IsActive = :isActive", { isActive: true })
                    .orderBy("incentive.EffectiveFrom", "DESC")
                    .getMany();
            }
            const incentiveData = incentive.map((incentive) => ({
                id: incentive.Id,
                incentiveName: incentive.IncentiveName,
                incentiveType: incentive.IncentiveType,
                effectiveFrom: incentive.EffectiveFrom,
                billingCycleRef: incentive.BillingCycleRef,
                minFatLimit: incentive.MinFatLimit,
                minSnfLimit: incentive.MinSnfLimit,
                shiftsApplicable: incentive.ShiftsApplicable,
                isActive: incentive.IsActive
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: incentiveData,
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
exports.GetAllIncentiveMaster = GetAllIncentiveMaster;
function CreateIncentiveMaster(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            console.log("model: ", model);
            const repository = DbConnection_1.AppDataSource.getRepository(entities.IncentiveMaster);
            const incentive = new entities.IncentiveMaster();
            incentive.IncentiveName = model.incentiveName ? model.incentiveName : incentive.IncentiveName;
            incentive.IncentiveType = model.incentiveType ? model.incentiveType : incentive.IncentiveType;
            incentive.EffectiveFrom = model.effectiveFrom ? model.effectiveFrom : incentive.EffectiveFrom;
            incentive.BillingCycleRef = model.billingCycleRef ? model.billingCycleRef : incentive.BillingCycleRef;
            incentive.MinFatLimit = model.minFatLimit ? model.minFatLimit : incentive.MinFatLimit;
            incentive.MinSnfLimit = model.minSnfLimit ? model.minSnfLimit : incentive.MinSnfLimit;
            incentive.ShiftsApplicable = model.shiftsApplicable ? model.shiftsApplicable : incentive.ShiftsApplicable;
            incentive.IsActive = true;
            incentive.CreatedAt = new Date();
            incentive.CreatedBy = userId;
            const savedRole = yield repository.save(incentive);
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
exports.CreateIncentiveMaster = CreateIncentiveMaster;
function UpdateIncentiveMaster(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.IncentiveMaster);
            const incentive = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (incentive) {
                incentive.IncentiveName = model.incentiveName ? model.incentiveName : incentive.IncentiveName;
                incentive.IncentiveType = model.incentiveType ? model.incentiveType : incentive.IncentiveType;
                incentive.EffectiveFrom = model.effectiveFrom ? model.effectiveFrom : incentive.EffectiveFrom;
                incentive.BillingCycleRef = model.billingCycleRef ? model.billingCycleRef : incentive.BillingCycleRef;
                incentive.MinFatLimit = model.minFatLimit ? model.minFatLimit : incentive.MinFatLimit;
                incentive.MinSnfLimit = model.minSnfLimit ? model.minSnfLimit : incentive.MinSnfLimit;
                incentive.ShiftsApplicable = model.shiftsApplicable ? model.shiftsApplicable : incentive.ShiftsApplicable;
                incentive.ModifiedAt = new Date();
                incentive.ModifiedBy = userId;
                yield repository.save(incentive);
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
exports.UpdateIncentiveMaster = UpdateIncentiveMaster;
function DeleteIncentiveMaster(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.IncentiveMaster);
            // console.log("repository: ", repository);
            const incentive = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            // console.log("incentive: ",incentive,model.id);
            if (incentive) {
                incentive.IsActive = false;
                incentive.DeletedAt = new Date();
                incentive.DeletedBy = userId;
                yield repository.save(incentive);
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
exports.DeleteIncentiveMaster = DeleteIncentiveMaster;
