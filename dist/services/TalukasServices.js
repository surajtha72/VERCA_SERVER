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
exports.DeleteTaluk = exports.UpdateTaluk = exports.CreateTaluk = exports.GetAllTalukas = void 0;
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
function GetAllTalukas(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let talukas;
            if (model && model.DistrictId) {
                talukas = yield DbConnection_1.AppDataSource.getRepository(entities.Vct)
                    .createQueryBuilder("talukas")
                    .leftJoinAndSelect("talukas.DistrictId", "district")
                    .where("talukas.DistrictId = :id", { id: model.DistrictId })
                    .andWhere("talukas.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model && model.id) {
                talukas = yield DbConnection_1.AppDataSource.getRepository(entities.Vct)
                    .createQueryBuilder("talukas")
                    .leftJoinAndSelect("talukas.DistrictId", "district")
                    .where("talukas.Id = :id", { id: model.id })
                    .andWhere("talukas.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                talukas = yield DbConnection_1.AppDataSource.getRepository(entities.Vct)
                    .createQueryBuilder("talukas")
                    .leftJoinAndSelect("talukas.DistrictId", "district")
                    .where("talukas.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const talukasData = talukas.map((talukas) => ({
                id: talukas.Id,
                districtId: talukas.DistrictId ? talukas.DistrictId.Id : null,
                stateId: talukas.StateId ? talukas.StateId.Id : null,
                districtName: talukas.DistrictId ? talukas.DistrictId.Name : null,
                name: talukas.Name,
                pincode: talukas.Pincode,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: talukasData,
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
exports.GetAllTalukas = GetAllTalukas;
function CreateTaluk(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Vct);
            const taluk = new entities.Vct();
            taluk.DistrictId = model.districtId ? model.districtId : taluk.DistrictId;
            taluk.StateId = model.stateId ? model.stateId : taluk.StateId;
            taluk.Name = model.name ? model.name : taluk.Name;
            taluk.Pincode = model.pincode ? model.pincode : taluk.Pincode;
            taluk.CreatedAt = new Date();
            taluk.CreatedBy = userId;
            yield repository.save(taluk);
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
exports.CreateTaluk = CreateTaluk;
function UpdateTaluk(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Vct);
            const taluk = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (taluk) {
                taluk.DistrictId = model.districtId ? model.districtId : taluk.DistrictId;
                taluk.StateId = model.stateId ? model.stateId : taluk.StateId;
                taluk.Name = model.name ? model.name : taluk.Name;
                taluk.Pincode = model.pincode ? model.pincode : taluk.Pincode;
                taluk.ModifiedAt = new Date();
                taluk.ModifiedBy = userId;
                yield repository.save(taluk);
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
exports.UpdateTaluk = UpdateTaluk;
function DeleteTaluk(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Vct);
            const taluk = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (taluk) {
                taluk.IsActive = false;
                taluk.DeletedAt = new Date();
                taluk.DeletedBy = userId;
                yield repository.save(taluk);
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
exports.DeleteTaluk = DeleteTaluk;
