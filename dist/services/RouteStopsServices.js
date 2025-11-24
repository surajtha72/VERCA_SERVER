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
exports.DeleteRouteStop = exports.UpdateRouteStop = exports.CreateRouteStop = exports.GetRouteStops = void 0;
const DbConnection_1 = require("../db-config/DbConnection");
const entities = __importStar(require("../entities/Context"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const moment_1 = __importDefault(require("moment"));
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
function GetRouteStops(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let routeStops;
            if (model.id) {
                routeStops = yield DbConnection_1.AppDataSource.getRepository(entities.RouteStops)
                    .createQueryBuilder("routeStops")
                    .leftJoinAndSelect("routeStops.RouteId", "RouteId")
                    .leftJoinAndSelect("routeStops.StopId", "StopId")
                    .where("routeStops.Id = :id", { id: model.id })
                    .andWhere("routeStops.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.routeMasterId) {
                routeStops = yield DbConnection_1.AppDataSource.getRepository(entities.RouteStops)
                    .createQueryBuilder("routeStops")
                    .leftJoinAndSelect("routeStops.RouteId", "RouteId")
                    .leftJoinAndSelect("routeStops.StopId", "StopId")
                    .where("routeStops.RouteId = :id", { id: model.routeMasterId })
                    .andWhere("routeStops.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                routeStops = yield DbConnection_1.AppDataSource.getRepository(entities.RouteStops)
                    .createQueryBuilder("routeStops")
                    .leftJoinAndSelect("routeStops.RouteId", "RouteId")
                    .leftJoinAndSelect("routeStops.StopId", "StopId")
                    .where("routeStops.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const routeStopsData = routeStops.map((routeStops) => ({
                id: routeStops.Id,
                routeId: routeStops.RouteId ? routeStops.RouteId.Id : 0,
                routeName: routeStops.RouteId ? routeStops.RouteId.RouteName : "",
                sequenceNo: routeStops.SequenceNo,
                stopId: routeStops.StopId ? routeStops.StopId.Id : 0,
                stopName: routeStops.StopId ? routeStops.StopId.Name : "",
                travelKms: routeStops.TravelKms,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: routeStopsData,
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
exports.GetRouteStops = GetRouteStops;
function CreateRouteStop(req, model) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const route = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                .createQueryBuilder("route")
                .where("route.Id = :id", { id: model.routeId })
                .getOne();
            const stop = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("stop")
                .where("stop.Id = :id", { id: model.stopId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.RouteStops);
            const routeStops = new entities.RouteStops();
            if (route) {
                routeStops.RouteId = route;
            }
            routeStops.SequenceNo = (_b = model.sequenceNo) !== null && _b !== void 0 ? _b : routeStops.SequenceNo;
            if (stop) {
                routeStops.StopId = stop;
            }
            routeStops.TravelKms = (_c = model.travelKms) !== null && _c !== void 0 ? _c : routeStops.TravelKms;
            routeStops.CreatedAt = new Date();
            routeStops.CreatedBy = userId;
            yield repository.save(routeStops);
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
exports.CreateRouteStop = CreateRouteStop;
function UpdateRouteStop(req, model) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const route = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                .createQueryBuilder("route")
                .where("route.Id = :id", { id: model.routeId })
                .getOne();
            const stop = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("stop")
                .where("stop.Id = :id", { id: model.stopId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.RouteStops);
            const routeStops = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (routeStops) {
                if (route) {
                    routeStops.RouteId = route;
                }
                routeStops.SequenceNo = (_c = model.sequenceNo) !== null && _c !== void 0 ? _c : routeStops.SequenceNo;
                if (stop) {
                    routeStops.StopId = stop;
                }
                routeStops.TravelKms = (_d = model.travelKms) !== null && _d !== void 0 ? _d : routeStops.TravelKms;
                routeStops.ModifiedAt = new Date();
                routeStops.ModifiedBy = userId;
                yield repository.save(routeStops);
                const currentDate = new Date();
                // Fetch the cycle startDate and endDate
                const cycle = yield DbConnection_1.AppDataSource.getRepository(entities.BillingCycleMaster)
                    .createQueryBuilder("cycle")
                    .where(":currentDate BETWEEN cycle.StartDate AND cycle.EndDate", {
                    currentDate,
                })
                    .getOne();
                // console.log("cycle: ", cycle);
                if (!cycle) {
                    throw new Error("No active billing cycle found for the current date.");
                }
                // Format startDate and endDate to 'YYYY-MM-DD HH:mm:ss'
                const startDate = (0, moment_1.default)(cycle.StartDate).format("YYYY-MM-DD HH:mm:ss");
                const endDate = (0, moment_1.default)(cycle.EndDate).format("YYYY-MM-DD HH:mm:ss");
                console.log(startDate, endDate);
                // Fetch milk collection details within the date range
                const milkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                    .createQueryBuilder("milkCollectionDetails")
                    .leftJoinAndSelect("milkCollectionDetails.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("organization.ParentId", "organizationParent")
                    .leftJoinAndSelect("organization.OrganizationType", "organizationType")
                    .leftJoinAndSelect("milkCollectionDetails.MilkCollectionId", "collections")
                    .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
                    .andWhere("milkCollectionDetails.IsActive = :isActive", { isActive: true })
                    .andWhere("organizationType.Id = :id", { id: 5 })
                    .andWhere("milkCollectionDetails.Fat IS NOT NULL")
                    .andWhere("milkCollectionDetails.Snf IS NOT NULL")
                    .andWhere("milkCollectionDetails.Clr IS NOT NULL")
                    .andWhere("milkCollectionDetails.CollectedAt BETWEEN :startDate AND :endDate", { startDate, endDate }).andWhere("milkCollectionDetails.OrganizationUnitId = :orgunitid", { orgunitid: model.stopId })
                    .orderBy("milkCollectionDetails.OrganizationUnitId")
                    .getMany();
                console.log("milkcollection details: ", milkCollectionDetails.length);
                if (milkCollectionDetails.length > 0) {
                    // console.log("milkcollection details before update: ", milkCollectionDetails);
                    // Update each milk collection detail's RouteId with routeStops.RouteId
                    for (const detail of milkCollectionDetails) {
                        detail.RouteId = routeStops.RouteId;
                    }
                    // console.log("milkcollection details after update: ", milkCollectionDetails);
                    // Optionally, save the updated details back to the database
                    for (const detail of milkCollectionDetails) {
                        yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails).save(detail);
                    }
                }
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
exports.UpdateRouteStop = UpdateRouteStop;
function DeleteRouteStop(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.RouteStops);
            const routeStops = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (routeStops) {
                routeStops.IsActive = false;
                routeStops.DeletedAt = new Date();
                routeStops.DeletedBy = userId;
                yield repository.save(routeStops);
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
exports.DeleteRouteStop = DeleteRouteStop;
