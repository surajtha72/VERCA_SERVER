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
exports.DeleteRouteMaster = exports.UpdateRouteMaster = exports.CreateRouteMaster = exports.GetRouteMaster = void 0;
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
function GetRouteMaster(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let routeMaster;
            if (model.id) {
                routeMaster = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                    .createQueryBuilder("routeMaster")
                    .leftJoinAndSelect("routeMaster.RouteTypeId", "RouteTypeId")
                    .leftJoinAndSelect("routeMaster.RouteOwner", "RouteOwner")
                    .where("routeMaster.Id = :id", { id: model.id })
                    .andWhere("routeMaster.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                routeMaster = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                    .createQueryBuilder("routeMaster")
                    .leftJoinAndSelect("routeMaster.RouteTypeId", "RouteTypeId")
                    .leftJoinAndSelect("routeMaster.RouteOwner", "RouteOwner")
                    .where("routeMaster.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const routeMasterData = routeMaster.map((routeMaster) => ({
                id: routeMaster.Id,
                routeTypeId: routeMaster.RouteTypeId ? routeMaster.RouteTypeId.Id : 0,
                routeTypeName: routeMaster.RouteTypeId
                    ? routeMaster.RouteTypeId.ShortDescription
                    : "",
                routeOwnerId: routeMaster.RouteOwner ? routeMaster.RouteOwner.Id : 0,
                routeOwnerName: routeMaster.RouteOwner
                    ? routeMaster.RouteOwner.Name
                    : "",
                routeName: routeMaster.RouteName,
                routeCode: routeMaster.RouteCode,
                tripType: routeMaster.TripType,
                morningShiftSchTime: routeMaster.MorningShiftSchTime,
                eveningShiftSchTime: routeMaster.EveningShiftSchTime,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: routeMasterData,
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
exports.GetRouteMaster = GetRouteMaster;
function CreateRouteMaster(req, model) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const routeType = yield DbConnection_1.AppDataSource.getRepository(entities.RouteType)
                .createQueryBuilder("routeType")
                .where("routeType.Id = :id", { id: model.routeTypeId })
                .getOne();
            const routeOwner = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("routeOwner")
                .where("routeOwner.Id = :id", { id: model.routeOwner })
                .getOne();
            if (!routeOwner) {
                return {
                    status: 404,
                    message: "Invalid routeOwner id. Organization not found.",
                    data: null,
                };
            }
            const existingRouteMaster = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                .createQueryBuilder("routeMaster")
                .where("routeMaster.RouteOwner = :routeOwnerId", {
                routeOwnerId: routeOwner.Id,
            })
                .andWhere("routeMaster.RouteCode = :routeCode", {
                routeCode: model.routeCode,
            })
                .getOne();
            if (existingRouteMaster) {
                return {
                    status: 422,
                    message: "A RouteMaster with the provided routeOwner and routeCode already exists.",
                    data: null,
                };
            }
            const repository = DbConnection_1.AppDataSource.getRepository(entities.RouteMaster);
            const routeMaster = new entities.RouteMaster();
            if (routeType) {
                routeMaster.RouteTypeId = routeType;
            }
            if (routeOwner) {
                routeMaster.RouteOwner = routeOwner;
            }
            routeMaster.RouteName = (_b = model.routeName) !== null && _b !== void 0 ? _b : routeMaster.RouteName;
            routeMaster.RouteCode = (_c = model.routeCode) !== null && _c !== void 0 ? _c : routeMaster.RouteCode;
            routeMaster.TripType = (_d = model.tripType) !== null && _d !== void 0 ? _d : routeMaster.TripType;
            routeMaster.MorningShiftSchTime =
                (_e = model.morningShiftSchTime) !== null && _e !== void 0 ? _e : routeMaster.MorningShiftSchTime;
            routeMaster.EveningShiftSchTime =
                (_f = model.eveningShiftSchTime) !== null && _f !== void 0 ? _f : routeMaster.EveningShiftSchTime;
            routeMaster.CreatedAt = new Date();
            routeMaster.CreatedBy = userId;
            yield repository.save(routeMaster);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.ADD_SUCCESS,
                data: null,
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
exports.CreateRouteMaster = CreateRouteMaster;
function UpdateRouteMaster(req, model) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const routeType = yield DbConnection_1.AppDataSource.getRepository(entities.RouteType)
                .createQueryBuilder("routeType")
                .where("routeType.Id = :id", { id: model.routeTypeId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.RouteMaster);
            const routeMaster = yield repository
                .createQueryBuilder("routeMaster")
                .leftJoinAndSelect("routeMaster.RouteOwner", "RouteOwner")
                .where("routeMaster.Id = :id", { id: model.id })
                .getOne();
            // console.log("model: ", model.routeOwner, model.routeCode);
            // console.log("routeMaster.RouteOwner: ", routeMaster?.RouteOwner.Id);
            // console.log("routeCode: ", routeMaster);
            if (routeMaster) {
                const existingRouteOwner = routeMaster.RouteOwner;
                // console.log("inside if routemaster");
                if (model.routeOwner !== existingRouteOwner.Id) {
                    // console.log("inside if routewoner");
                    const newRouteOwner = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                        .createQueryBuilder("routeOwner")
                        .where("routeOwner.Id = :id", { id: model.routeOwner })
                        .getOne();
                    if (!newRouteOwner) {
                        return {
                            status: 404,
                            message: "Invalid routeOwner id. Organization not found.",
                            data: null,
                        };
                    }
                    // console.log("newRouteOwner.Id: ", newRouteOwner.Id);
                    // console.log("model.routeCode: ", model.routeCode);
                    // console.log("routeMaster.Id: ", routeMaster.Id);
                    const existingRouteMaster = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                        .createQueryBuilder("routeMaster")
                        .where("routeMaster.route_owner = :routeOwnerId", {
                        routeOwnerId: newRouteOwner.Id,
                    })
                        .andWhere("routeMaster.route_code = :routeCode", {
                        routeCode: model.routeCode,
                    })
                        .andWhere("routeMaster.Id != :routeMasterId", {
                        routeMasterId: routeMaster.Id,
                    })
                        .getOne();
                    if (existingRouteMaster) {
                        return {
                            status: 422,
                            message: "A Route Master with the provided Route Owner and Route Code already exists !",
                            data: null,
                        };
                    }
                    routeMaster.RouteOwner = newRouteOwner;
                }
                if (routeType) {
                    routeMaster.RouteTypeId = routeType;
                }
                routeMaster.RouteName = (_b = model.routeName) !== null && _b !== void 0 ? _b : routeMaster.RouteName;
                routeMaster.RouteCode = (_c = model.routeCode) !== null && _c !== void 0 ? _c : routeMaster.RouteCode;
                routeMaster.TripType = (_d = model.tripType) !== null && _d !== void 0 ? _d : routeMaster.TripType;
                routeMaster.MorningShiftSchTime = (_e = model.morningShiftSchTime) !== null && _e !== void 0 ? _e : routeMaster.MorningShiftSchTime;
                routeMaster.EveningShiftSchTime = (_f = model.eveningShiftSchTime) !== null && _f !== void 0 ? _f : routeMaster.EveningShiftSchTime;
                routeMaster.ModifiedAt = new Date();
                routeMaster.ModifiedBy = userId;
                yield repository.save(routeMaster);
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
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.UpdateRouteMaster = UpdateRouteMaster;
function DeleteRouteMaster(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.RouteMaster);
            const routeMaster = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (routeMaster) {
                routeMaster.IsActive = false;
                routeMaster.DeletedAt = new Date();
                routeMaster.DeletedBy = userId;
                yield repository.save(routeMaster);
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
exports.DeleteRouteMaster = DeleteRouteMaster;
