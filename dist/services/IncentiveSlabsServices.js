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
exports.DeleteIncentiveSlabs = exports.UpdateIncentiveSlabs = exports.CreateIncentiveSlabs = exports.GetAllIncentiveSlabs = void 0;
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
function GetAllIncentiveSlabs(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let slab;
            if (model.incentiveId) {
                slab = yield DbConnection_1.AppDataSource.getRepository(entities.IncentiveSlabs)
                    .createQueryBuilder("slab")
                    .leftJoinAndSelect("slab.IncentiveId", "incentive")
                    .where("incentive.Id = :id", { id: model.incentiveId })
                    .andWhere("slab.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                slab = yield DbConnection_1.AppDataSource.getRepository(entities.IncentiveSlabs)
                    .createQueryBuilder("slab")
                    .where("slab.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const slabData = slab.map((slab) => {
                var _a;
                return ({
                    id: slab.Id,
                    incentiveId: (_a = slab.IncentiveId) === null || _a === void 0 ? void 0 : _a.Id,
                    slabType: slab.SlabType,
                    slabFrom: slab.SlabFrom,
                    slabTo: slab.SlabTo,
                    incentivePerKg: slab.IncentivePerKg,
                    isActive: slab.IsActive
                });
            });
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: slabData,
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
exports.GetAllIncentiveSlabs = GetAllIncentiveSlabs;
function CreateIncentiveSlabs(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            // console.log(model);
            const repository = DbConnection_1.AppDataSource.getRepository(entities.IncentiveSlabs);
            const slab = new entities.IncentiveSlabs();
            slab.IncentiveId = new entities.IncentiveMaster();
            slab.IncentiveId.Id = model.incentiveId ? model.incentiveId : (_b = slab.IncentiveId) === null || _b === void 0 ? void 0 : _b.Id;
            slab.SlabType = model.slabType ? model.slabType : slab.SlabType;
            slab.SlabFrom = model.slabFrom ? model.slabFrom : slab.SlabFrom;
            slab.SlabTo = model.slabTo ? model.slabTo : slab.SlabTo;
            slab.IncentivePerKg = model.incentivePerKg ? model.incentivePerKg : slab.IncentivePerKg;
            slab.IsActive = true;
            slab.CreatedAt = new Date();
            slab.CreatedBy = userId;
            const savedRole = yield repository.save(slab);
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
exports.CreateIncentiveSlabs = CreateIncentiveSlabs;
function UpdateIncentiveSlabs(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            // console.log('payload data-->',model);
            const incentive = yield DbConnection_1.AppDataSource.getRepository(entities.IncentiveMaster)
                .createQueryBuilder("incentive")
                .where("incentive.Id = :id", { id: model.incentiveId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.IncentiveSlabs);
            const slab = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (slab) {
                if (incentive) {
                    slab.IncentiveId = incentive;
                }
                slab.SlabType = model.slabType ? model.slabType : slab.SlabType;
                slab.SlabFrom = model.slabFrom ? model.slabFrom : slab.SlabFrom;
                slab.SlabTo = model.slabTo ? model.slabTo : slab.SlabTo;
                slab.IncentivePerKg = model.incentivePerKg ? model.incentivePerKg : slab.IncentivePerKg;
                slab.ModifiedAt = new Date();
                slab.ModifiedBy = userId;
                yield repository.save(slab);
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
exports.UpdateIncentiveSlabs = UpdateIncentiveSlabs;
function DeleteIncentiveSlabs(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.IncentiveSlabs);
            // console.log("repository: ", repository);
            const slab = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            // console.log("incentive: ", slab, model.id);
            if (slab) {
                slab.IsActive = false;
                slab.DeletedAt = new Date();
                slab.DeletedBy = userId;
                yield repository.save(slab);
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
exports.DeleteIncentiveSlabs = DeleteIncentiveSlabs;
