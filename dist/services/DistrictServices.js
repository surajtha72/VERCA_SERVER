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
exports.DeleteDistrict = exports.UpdateDistrict = exports.CreateDistrict = exports.GetAllDistricts = void 0;
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
function GetAllDistricts(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let district;
            if (model.StateId) {
                district = yield DbConnection_1.AppDataSource.getRepository(entities.Districts)
                    .createQueryBuilder("district")
                    .leftJoinAndSelect("district.StateId", "states")
                    .where("district.StateId = :id", { id: model.StateId })
                    .andWhere("district.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.id) {
                district = yield DbConnection_1.AppDataSource.getRepository(entities.Districts)
                    .createQueryBuilder("district")
                    .leftJoinAndSelect("district.StateId", "states")
                    .where("district.Id = :id", { id: model.id })
                    .andWhere("district.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                district = yield DbConnection_1.AppDataSource.getRepository(entities.Districts)
                    .createQueryBuilder("district")
                    .leftJoinAndSelect("district.StateId", "states")
                    .where("district.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const districtData = district.map((district) => {
                var _a, _b;
                return ({
                    id: district === null || district === void 0 ? void 0 : district.Id,
                    stateId: (district === null || district === void 0 ? void 0 : district.StateId) ? (_a = district === null || district === void 0 ? void 0 : district.StateId) === null || _a === void 0 ? void 0 : _a.Id : 0,
                    stateName: (district === null || district === void 0 ? void 0 : district.StateId) ? (_b = district === null || district === void 0 ? void 0 : district.StateId) === null || _b === void 0 ? void 0 : _b.Name : "",
                    name: district === null || district === void 0 ? void 0 : district.Name,
                });
            });
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: districtData,
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
exports.GetAllDistricts = GetAllDistricts;
function CreateDistrict(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Districts);
            const district = new entities.Districts();
            district.StateId = model.stateId ? model.stateId : district.StateId;
            district.Name = model.name ? model.name : district.Name;
            district.CreatedAt = new Date();
            district.CreatedBy = userId;
            yield repository.save(district);
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
exports.CreateDistrict = CreateDistrict;
function UpdateDistrict(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Districts);
            const district = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (district) {
                district.StateId = model.stateId ? model.stateId : district.StateId;
                district.Name = model.name ? model.name : district.Name;
                district.ModifiedAt = new Date();
                district.ModifiedBy = userId;
                yield repository.save(district);
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
exports.UpdateDistrict = UpdateDistrict;
function DeleteDistrict(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Districts);
            const district = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (district) {
                district.IsActive = false;
                district.DeletedAt = new Date();
                district.DeletedBy = userId;
                yield repository.save(district);
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
exports.DeleteDistrict = DeleteDistrict;
