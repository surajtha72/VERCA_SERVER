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
exports.UpdateWeighBridgeLabData = exports.GetWeighbridgeLabData = exports.GetWeighbridgeData = exports.UpdateWeighBridgeData = void 0;
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
    UPDATE_SUCCESS: "Updated Successfully",
};
function GetWeighbridgeData(model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let weighbridgeData;
            weighbridgeData = yield DbConnection_1.AppDataSource.getRepository(entities.WeighbridgeData)
                .createQueryBuilder("weighbridgeData")
                .where("weighbridgeData.Id =:id", { id: 1 })
                .getOne();
            const weighData = {
                id: (_a = weighbridgeData === null || weighbridgeData === void 0 ? void 0 : weighbridgeData.Id) !== null && _a !== void 0 ? _a : 0,
                weight: (_b = weighbridgeData === null || weighbridgeData === void 0 ? void 0 : weighbridgeData.weight) !== null && _b !== void 0 ? _b : 0
            };
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: weighData
            };
        }
        catch (err) {
            console.log(err);
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null
            };
        }
    });
}
exports.GetWeighbridgeData = GetWeighbridgeData;
function GetWeighbridgeLabData(model) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let weighbridgeLabData;
            weighbridgeLabData = yield DbConnection_1.AppDataSource.getRepository(entities.WeighbridgeLabData)
                .createQueryBuilder("weighbridgeLabData")
                .where("weighbridgeLabData.Id =:id", { id: 1 })
                .getOne();
            const labData = {
                id: (_a = weighbridgeLabData === null || weighbridgeLabData === void 0 ? void 0 : weighbridgeLabData.Id) !== null && _a !== void 0 ? _a : 0,
                fat: (_b = weighbridgeLabData === null || weighbridgeLabData === void 0 ? void 0 : weighbridgeLabData.Fat) !== null && _b !== void 0 ? _b : 0,
                snf: (_c = weighbridgeLabData === null || weighbridgeLabData === void 0 ? void 0 : weighbridgeLabData.Snf) !== null && _c !== void 0 ? _c : 0,
                clr: (_d = weighbridgeLabData === null || weighbridgeLabData === void 0 ? void 0 : weighbridgeLabData.Clr) !== null && _d !== void 0 ? _d : 0,
                protein: (_e = weighbridgeLabData === null || weighbridgeLabData === void 0 ? void 0 : weighbridgeLabData.Protein) !== null && _e !== void 0 ? _e : 0,
                lactose: (_f = weighbridgeLabData === null || weighbridgeLabData === void 0 ? void 0 : weighbridgeLabData.Lactose) !== null && _f !== void 0 ? _f : 0,
                salt: (_g = weighbridgeLabData === null || weighbridgeLabData === void 0 ? void 0 : weighbridgeLabData.Salt) !== null && _g !== void 0 ? _g : 0,
                water: (_h = weighbridgeLabData === null || weighbridgeLabData === void 0 ? void 0 : weighbridgeLabData.Water) !== null && _h !== void 0 ? _h : 0,
                temperature: (_j = weighbridgeLabData === null || weighbridgeLabData === void 0 ? void 0 : weighbridgeLabData.Temperature) !== null && _j !== void 0 ? _j : 0
            };
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: labData
            };
        }
        catch (err) {
            console.log(err);
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null
            };
        }
    });
}
exports.GetWeighbridgeLabData = GetWeighbridgeLabData;
function UpdateWeighBridgeData(req, model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const token = req.headers.authorization?.split(" ")[1];
            // const key = process.env.TOKEN_SECRET;
            // const decode = jwt.verify(token, key);
            // const userId = decode.userId;
            console.log("inside update weighbridge function");
            const repository = DbConnection_1.AppDataSource.getRepository(entities.WeighbridgeData);
            const weighBridgeData = yield repository.findOne({
                where: { Id: 1 },
            });
            if (weighBridgeData) {
                weighBridgeData.weight = model.weight ? model.weight : weighBridgeData.weight;
                weighBridgeData.ModifiedAt = new Date();
                yield repository.save(weighBridgeData);
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
exports.UpdateWeighBridgeData = UpdateWeighBridgeData;
function UpdateWeighBridgeLabData(req, model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const token = req.headers.authorization?.split(" ")[1];
            // const key = process.env.TOKEN_SECRET;
            // const decode = jwt.verify(token, key);
            // const userId = decode.userId;
            console.log("inside update lab function");
            const repository = DbConnection_1.AppDataSource.getRepository(entities.WeighbridgeLabData);
            const labdata = yield repository.findOne({
                where: { Id: 1 },
            });
            if (labdata) {
                labdata.Fat = model.fat ? model.fat : labdata.Fat;
                labdata.Snf = model.snf ? model.snf : labdata.Snf;
                labdata.Clr = model.clr ? model.clr : labdata.Clr;
                labdata.Protein = model.protein ? model.protein : labdata.Protein;
                labdata.Lactose = model.lactose ? model.lactose : labdata.Lactose;
                labdata.Salt = model.salt ? model.salt : labdata.Salt;
                labdata.Water = model.water ? model.water : labdata.Water;
                labdata.Temperature = model.temperature ? model.temperature : labdata.Temperature;
                labdata.ModifiedAt = new Date();
                yield repository.save(labdata);
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
exports.UpdateWeighBridgeLabData = UpdateWeighBridgeLabData;
