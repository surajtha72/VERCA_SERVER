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
exports.DeleteRateApplied = exports.UpdateRateApplied = exports.CreateRateApplied = exports.GetRateApplied = void 0;
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
    SUCCESS: "Success",
    ADD_SUCCESS: "Added Successfully",
    UPDATE_SUCCESS: "Updated Successfully",
    DELETE_SUCCESS: "Deleted Successfully",
};
function GetRateApplied(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let rateApplied;
            if (model.id) {
                rateApplied = yield DbConnection_1.AppDataSource.getRepository(entities.RateApplied)
                    .createQueryBuilder("rateApplied")
                    .leftJoinAndSelect("rateApplied.ProductCategId", "rate_master")
                    .where("rateApplied.Id = :id", { id: model.id })
                    .andWhere("rateApplied.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                rateApplied = yield DbConnection_1.AppDataSource.getRepository(entities.RateApplied)
                    .createQueryBuilder("rateApplied")
                    .leftJoinAndSelect("rateApplied.RateId", "rate_master")
                    .where("rateApplied.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const rateAppliedData = rateApplied.map((rateApplied) => {
                var _a;
                return ({
                    id: rateApplied.Id,
                    rateId: (_a = rateApplied.RateId) === null || _a === void 0 ? void 0 : _a.Id,
                    appliedTo: rateApplied.AppliedTo,
                    appliedOn: rateApplied.AppliedOn,
                    isActive: rateApplied.IsActive
                });
            });
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: rateAppliedData,
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
exports.GetRateApplied = GetRateApplied;
function CreateRateApplied(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const ratemaster = yield DbConnection_1.AppDataSource.getRepository(entities.RateMaster)
                .createQueryBuilder("ratemaster")
                .where("ratemaster.Id = :id", { id: model.rateId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.RateApplied);
            const rateApplied = new entities.RateApplied();
            if (ratemaster) {
                rateApplied.RateId = ratemaster;
            }
            // rateApplied.RateId = new entities.RateMaster();
            rateApplied.AppliedTo = model.appliedTo ? model.appliedTo : rateApplied.AppliedTo;
            rateApplied.AppliedOn = model.appliedOn ? model.appliedOn : rateApplied.AppliedOn;
            rateApplied.IsActive = true;
            rateApplied.CreatedAt = new Date();
            rateApplied.CreatedBy = userId;
            yield repository.save(rateApplied);
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
exports.CreateRateApplied = CreateRateApplied;
function UpdateRateApplied(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const ratemaster = yield DbConnection_1.AppDataSource.getRepository(entities.RateMaster)
                .createQueryBuilder("ratemaster")
                .where("ratemaster.Id = :id", { id: model.rateId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.RateApplied);
            const rateApplied = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (rateApplied) {
                if (ratemaster) {
                    rateApplied.RateId = ratemaster;
                }
                // rateApplied.RateId.Id = model.rateId ? model.rateId : rateApplied.RateId.Id;
                rateApplied.AppliedTo = model.appliedTo || rateApplied.AppliedTo;
                rateApplied.AppliedOn = model.appliedOn || rateApplied.AppliedOn;
                rateApplied.ModifiedAt = new Date();
                rateApplied.ModifiedBy = userId;
                yield repository.save(rateApplied);
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
exports.UpdateRateApplied = UpdateRateApplied;
function DeleteRateApplied(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.RateApplied);
            // console.log("repository: ", repository);
            const rateApplied = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            // console.log("ratemaster: ", rateApplied, model.id);
            if (rateApplied) {
                rateApplied.IsActive = false;
                rateApplied.DeletedAt = new Date();
                rateApplied.DeletedBy = userId;
                yield repository.save(rateApplied);
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
exports.DeleteRateApplied = DeleteRateApplied;
