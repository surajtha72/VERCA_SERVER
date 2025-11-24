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
exports.DeleteRouteType = exports.UpdateRouteType = exports.CreateRouteType = exports.GetRouteTypes = void 0;
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
function GetRouteTypes(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let routeType;
            if (model.id) {
                routeType = yield DbConnection_1.AppDataSource.getRepository(entities.RouteType)
                    .createQueryBuilder("routeType")
                    .leftJoinAndSelect("routeType.FromProcUnitType", "fromProcUnitType")
                    .leftJoinAndSelect("routeType.ToProcOrgUnitType", "toProcOrgUnitType")
                    .where("routeType.Id = :id", { id: model.id })
                    .andWhere("routeType.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                routeType = yield DbConnection_1.AppDataSource.getRepository(entities.RouteType)
                    .createQueryBuilder("routeType")
                    .leftJoinAndSelect("routeType.FromProcUnitType", "fromProcUnitType")
                    .leftJoinAndSelect("routeType.ToProcOrgUnitType", "toProcOrgUnitType")
                    .where("routeType.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const routeTypeData = routeType.map((routeType) => ({
                id: routeType.Id,
                shortDescription: routeType.ShortDescription,
                fromProcUnitType: routeType.FromProcUnitType ? routeType.FromProcUnitType.Id : 0,
                fromProcUnitTypeName: routeType.FromProcUnitType ? routeType.FromProcUnitType.Name : '',
                toProcOrgUnitType: routeType.ToProcOrgUnitType ? routeType.ToProcOrgUnitType.Id : 0,
                toProcOrgUnitTypeName: routeType.ToProcOrgUnitType ? routeType.ToProcOrgUnitType.Name : '',
                vehicleType: routeType.VehicleType,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: routeTypeData,
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
exports.GetRouteTypes = GetRouteTypes;
function CreateRouteType(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const fromProc = yield DbConnection_1.AppDataSource.getRepository(entities.OrganizationUnitType)
                .createQueryBuilder("fromProc")
                .where("fromProc.Id = :id", { id: model.fromProcUnitType })
                .getOne();
            const toProc = yield DbConnection_1.AppDataSource.getRepository(entities.OrganizationUnitType)
                .createQueryBuilder("toProc")
                .where("toProc.Id = :id", { id: model.toProcOrgUnitType })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.RouteType);
            const routeType = new entities.RouteType();
            routeType.ShortDescription = model.shortDescription ? model.shortDescription : routeType.ShortDescription;
            if (fromProc) {
                routeType.FromProcUnitType = fromProc;
            }
            if (toProc) {
                routeType.ToProcOrgUnitType = toProc;
            }
            routeType.VehicleType = model.vehicleType ? model.vehicleType : routeType.VehicleType;
            routeType.CreatedAt = new Date();
            routeType.CreatedBy = userId;
            yield repository.save(routeType);
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
exports.CreateRouteType = CreateRouteType;
function UpdateRouteType(req, model) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.RouteType);
            const routeType = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            const fromProc = yield DbConnection_1.AppDataSource.getRepository(entities.OrganizationUnitType)
                .createQueryBuilder("fromProc")
                .where("fromProc.Id = :id", { id: model.fromProcUnitType })
                .getOne();
            const toProc = yield DbConnection_1.AppDataSource.getRepository(entities.OrganizationUnitType)
                .createQueryBuilder("toProc")
                .where("toProc.Id = :id", { id: model.toProcOrgUnitType })
                .getOne();
            if (routeType) {
                routeType.ShortDescription = (_c = model.shortDescription) !== null && _c !== void 0 ? _c : routeType.ShortDescription;
                if (fromProc) {
                    routeType.FromProcUnitType = fromProc;
                }
                if (toProc) {
                    routeType.ToProcOrgUnitType = toProc;
                }
                routeType.VehicleType = (_d = model.vehicleType) !== null && _d !== void 0 ? _d : routeType.VehicleType;
                routeType.CreatedAt = new Date();
                routeType.CreatedBy = userId;
                yield repository.save(routeType);
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
exports.UpdateRouteType = UpdateRouteType;
function DeleteRouteType(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.RouteType);
            const routeType = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (routeType) {
                routeType.IsActive = false;
                routeType.DeletedAt = new Date();
                routeType.DeletedBy = userId;
                yield repository.save(routeType);
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
exports.DeleteRouteType = DeleteRouteType;
