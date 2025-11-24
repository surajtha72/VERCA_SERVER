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
exports.GetMilkDipatchRoutes = exports.DeleteMilkDispatch = exports.UpdateMilkDispatch = exports.CreateMilkDispatch = exports.GetAllMilkDispatch = void 0;
const DbConnection_1 = require("../db-config/DbConnection");
const entities = __importStar(require("../entities/Context"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
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
function GetAllMilkDispatch(model, currentDate = new Date()) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let milkDispatch;
            const newDate = (0, moment_1.default)(currentDate).format('YYYY-MM-DD');
            if (model.id) {
                milkDispatch = yield DbConnection_1.AppDataSource.getRepository(entities.MilkDispatch)
                    .createQueryBuilder("milkDispatch")
                    .leftJoinAndSelect("milkDispatch.RouteId", "RouteId")
                    .leftJoinAndSelect("milkDispatch.TransporterVehicleId", "TransporterVehicleId")
                    .where("milkDispatch.Id = :id", { id: model.id })
                    .andWhere("milkDispatch.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.orgUnitId) {
                milkDispatch = yield DbConnection_1.AppDataSource.getRepository(entities.MilkDispatch)
                    .createQueryBuilder("milkDispatch")
                    .leftJoinAndSelect("milkDispatch.CreatedBy", "user")
                    .leftJoinAndSelect("milkDispatch.RouteId", "RouteId")
                    .leftJoinAndSelect("milkDispatch.TransporterVehicleId", "TransporterVehicleId")
                    .where("user.OrganizationUnitId = :orgUnitId", { orgUnitId: model.orgUnitId })
                    .andWhere("milkDispatch.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.vehicleNo) {
                // console.log("inside vehicleNo model")
                milkDispatch = yield DbConnection_1.AppDataSource.getRepository(entities.MilkDispatch)
                    .createQueryBuilder("milkdispatch")
                    .leftJoinAndSelect("milkdispatch.RouteId", "RouteId")
                    .leftJoinAndSelect("milkdispatch.TransporterVehicleId", "TransporterVehicleId")
                    .where("milkdispatch.TransporterVehicleId =:vehicleNo", { vehicleNo: model.vehicleNo })
                    .andWhere("milkdispatch.IsActive =:isActive", { isActive: true })
                    .andWhere("DATE(milkdispatch.CreatedAt) =:currentDate", { currentDate: newDate })
                    .orderBy("milkdispatch.CreatedAt", "DESC")
                    .getMany();
            }
            else if (model.vehicleId && model.fromDate && model.toDate) {
                console.log("inside report model");
                milkDispatch = yield DbConnection_1.AppDataSource.getRepository(entities.MilkDispatch)
                    .createQueryBuilder("milkdispatch")
                    .leftJoinAndSelect("milkdispatch.RouteId", "RouteId")
                    .leftJoinAndSelect("milkdispatch.TransporterVehicleId", "TransporterVehicleId")
                    .where("milkdispatch.TransporterVehicleId =:vehicleNo", { vehicleNo: model.vehicleId })
                    .andWhere("DATE(milkdispatch.DispatchedAt) >=:fromDate", { fromDate: model.fromDate })
                    .andWhere("DATE(milkdispatch.DispatchedAt) <=:toDate", { toDate: model.toDate })
                    .getMany();
            }
            else if (model.fromDate && model.toDate) {
                console.log("inside form date to date model");
                milkDispatch = yield DbConnection_1.AppDataSource.getRepository(entities.MilkDispatch)
                    .createQueryBuilder("milkdispatch")
                    .leftJoinAndSelect("milkdispatch.RouteId", "RouteId")
                    .leftJoinAndSelect("milkdispatch.TransporterVehicleId", "TransporterVehicleId")
                    .andWhere("DATE(milkdispatch.DispatchedAt) >=:fromDate", { fromDate: model.fromDate })
                    .andWhere("DATE(milkdispatch.DispatchedAt) <=:toDate", { toDate: model.toDate })
                    .getMany();
            }
            else {
                milkDispatch = yield DbConnection_1.AppDataSource.getRepository(entities.MilkDispatch)
                    .createQueryBuilder("milkDispatch")
                    .leftJoinAndSelect("milkDispatch.RouteId", "RouteId")
                    .leftJoinAndSelect("milkDispatch.TransporterVehicleId", "TransporterVehicleId")
                    .where("milkDispatch.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const milkDispatchData = milkDispatch.map((milkDispatch) => ({
                id: milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.Id,
                transporterVehicleId: (milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.TransporterVehicleId)
                    ? milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.TransporterVehicleId.Id
                    : 0,
                transporterVehicleType: (milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.TransporterVehicleId)
                    ? milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.TransporterVehicleId.VehicleType
                    : "",
                routeId: (milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.RouteId) ? milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.RouteId.Id : 0,
                routeName: (milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.RouteId) ? milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.RouteId.RouteName : "",
                startFat: milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.StartFat,
                startSnf: milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.StartSnf,
                startClr: milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.StartClr,
                endFat: milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.EndFat,
                endSnf: milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.EndSnf,
                endClr: milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.EndClr,
                weight: milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.Weight,
                dispatchedAt: milkDispatch === null || milkDispatch === void 0 ? void 0 : milkDispatch.DispatchedAt,
                createdAt: milkDispatch.CreatedAt,
                updatedAt: milkDispatch.ModifiedAt,
                deletedAt: milkDispatch.DeletedAt,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: milkDispatchData,
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
exports.GetAllMilkDispatch = GetAllMilkDispatch;
function GetMilkDipatchRoutes(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const routeStops = yield DbConnection_1.AppDataSource.getRepository(entities.RouteStops)
                .createQueryBuilder("stops")
                .leftJoinAndSelect("stops.RouteId", "route")
                // .where("stops.Id = :stopId", {
                //   stopId: model.routeStopId,
                // })
                .where("stops.IsActive = :isActive", { isActive: true })
                .getMany();
            // console.log('routestops', routeStops);
            if (routeStops.length === 0) {
                return {
                    status: 404,
                    message: "No data found for the particular Route Stops Id",
                    data: null,
                };
            }
            const routeMasterIds = routeStops.map((stop) => stop.RouteId.Id);
            const contracts = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterContracts)
                .createQueryBuilder("contracts")
                .leftJoinAndSelect("contracts.RouteId", "route")
                .leftJoinAndSelect("route.RouteOwner", "routeOwner")
                .leftJoinAndSelect("contracts.TransporterId", "transporter")
                .leftJoinAndSelect("contracts.VehicleId", "vehicle")
                .leftJoinAndSelect("vehicle.TransporterId", "TransporterId")
                .where("contracts.RouteId IN (:...routeMasterIds)", { routeMasterIds })
                .andWhere("contracts.IsActive = :isActive", { isActive: true })
                .getMany();
            if (contracts.length === 0) {
                return {
                    status: 404,
                    message: "No data found for the particular Route Stops Id",
                    data: null,
                };
            }
            const contractsData = contracts.map((contract) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22;
                return ({
                    vehicle: {
                        id: contract.VehicleId ? (_a = contract.VehicleId) === null || _a === void 0 ? void 0 : _a.Id : null,
                        transporterId: contract.VehicleId.TransporterId ? contract.VehicleId.TransporterId.Id : null,
                        isFoodTransportVehicle: contract.VehicleId
                            ? (_b = contract.VehicleId) === null || _b === void 0 ? void 0 : _b.IsFoodTransportVehicle
                            : null,
                        vehicleType: contract.VehicleId
                            ? (_c = contract.VehicleId) === null || _c === void 0 ? void 0 : _c.VehicleType
                            : null,
                        registrationNo: contract.VehicleId
                            ? (_d = contract.VehicleId) === null || _d === void 0 ? void 0 : _d.RegistrationNo
                            : null,
                        make: contract.VehicleId ? (_e = contract.VehicleId) === null || _e === void 0 ? void 0 : _e.Make : null,
                        model: contract.VehicleId ? (_f = contract.VehicleId) === null || _f === void 0 ? void 0 : _f.Model : null,
                        capacity: contract.VehicleId ? (_g = contract.VehicleId) === null || _g === void 0 ? void 0 : _g.Capacity : null,
                        fSSAILicNo: contract.VehicleId
                            ? (_h = contract.VehicleId) === null || _h === void 0 ? void 0 : _h.FSSAILicNo
                            : null,
                        fSSAILicExpiryDate: contract.VehicleId
                            ? (_j = contract.VehicleId) === null || _j === void 0 ? void 0 : _j.FSSAILicExpiryDate
                            : null,
                        insurance: contract.VehicleId ? (_k = contract.VehicleId) === null || _k === void 0 ? void 0 : _k.Insurance : null,
                        insuranceExpiryDate: contract.VehicleId
                            ? (_l = contract.VehicleId) === null || _l === void 0 ? void 0 : _l.InsuranceExpiryDate
                            : null,
                        isActive: contract.VehicleId ? (_m = contract.VehicleId) === null || _m === void 0 ? void 0 : _m.IsActive : null,
                        createdAt: contract.VehicleId ? (_o = contract.VehicleId) === null || _o === void 0 ? void 0 : _o.CreatedAt : null,
                        modifiedAt: contract.VehicleId
                            ? (_p = contract.VehicleId) === null || _p === void 0 ? void 0 : _p.ModifiedAt
                            : null,
                        deletedAt: contract.VehicleId ? (_q = contract.VehicleId) === null || _q === void 0 ? void 0 : _q.DeletedAt : null,
                    },
                    route: {
                        id: contract.RouteId ? (_r = contract.RouteId) === null || _r === void 0 ? void 0 : _r.Id : null,
                        routeOwner: contract.RouteId.RouteOwner ? contract.RouteId.RouteOwner.Id : null,
                        routeName: contract.RouteId ? (_s = contract.RouteId) === null || _s === void 0 ? void 0 : _s.RouteName : null,
                        routeCode: contract.RouteId ? (_t = contract.RouteId) === null || _t === void 0 ? void 0 : _t.RouteCode : null,
                        tripType: contract.RouteId ? (_u = contract.RouteId) === null || _u === void 0 ? void 0 : _u.TripType : null,
                        morningShiftSchTime: contract.RouteId
                            ? (_v = contract.RouteId) === null || _v === void 0 ? void 0 : _v.MorningShiftSchTime
                            : null,
                        eveningShiftSchTime: contract.RouteId
                            ? (_w = contract.RouteId) === null || _w === void 0 ? void 0 : _w.EveningShiftSchTime
                            : null,
                        isActive: contract.RouteId ? (_x = contract.RouteId) === null || _x === void 0 ? void 0 : _x.IsActive : null,
                        createdAt: contract.RouteId ? (_y = contract.RouteId) === null || _y === void 0 ? void 0 : _y.CreatedAt : null,
                        modifiedAt: contract.RouteId ? (_z = contract.RouteId) === null || _z === void 0 ? void 0 : _z.ModifiedAt : null,
                        deletedAt: contract.RouteId ? (_0 = contract.RouteId) === null || _0 === void 0 ? void 0 : _0.DeletedAt : null,
                    },
                    transporter: {
                        id: (contract === null || contract === void 0 ? void 0 : contract.TransporterId) ? (_1 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _1 === void 0 ? void 0 : _1.Id : null,
                        firmName: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_2 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _2 === void 0 ? void 0 : _2.FirmName
                            : null,
                        code: (contract === null || contract === void 0 ? void 0 : contract.TransporterId) ? (_3 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _3 === void 0 ? void 0 : _3.Code : null,
                        contactPersonName: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_4 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _4 === void 0 ? void 0 : _4.ContactPersonName
                            : null,
                        mobileNo: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_5 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _5 === void 0 ? void 0 : _5.MobileNo
                            : null,
                        emailId: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_6 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _6 === void 0 ? void 0 : _6.EmailId
                            : null,
                        addressLine1: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_7 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _7 === void 0 ? void 0 : _7.AddressLine1
                            : null,
                        addressLine2: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_8 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _8 === void 0 ? void 0 : _8.AddressLine2
                            : null,
                        state: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_9 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _9 === void 0 ? void 0 : _9.State
                            : null,
                        district: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_10 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _10 === void 0 ? void 0 : _10.District
                            : null,
                        vtc: (contract === null || contract === void 0 ? void 0 : contract.TransporterId) ? (_11 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _11 === void 0 ? void 0 : _11.Vtc : null,
                        pincode: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_12 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _12 === void 0 ? void 0 : _12.Pincode
                            : null,
                        geocode: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_13 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _13 === void 0 ? void 0 : _13.Geocode
                            : null,
                        aadhaarNo: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_14 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _14 === void 0 ? void 0 : _14.AadhaarNo
                            : null,
                        panNo: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_15 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _15 === void 0 ? void 0 : _15.PanNo
                            : null,
                        bankAcNo: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_16 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _16 === void 0 ? void 0 : _16.BankAcNo
                            : null,
                        bankAcName: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_17 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _17 === void 0 ? void 0 : _17.BankAcName
                            : null,
                        bankIfscCode: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_18 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _18 === void 0 ? void 0 : _18.BankIfscCode
                            : null,
                        isActive: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_19 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _19 === void 0 ? void 0 : _19.IsActive
                            : null,
                        createdAt: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_20 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _20 === void 0 ? void 0 : _20.CreatedAt
                            : null,
                        modifiedAt: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_21 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _21 === void 0 ? void 0 : _21.ModifiedAt
                            : null,
                        deletedAt: (contract === null || contract === void 0 ? void 0 : contract.TransporterId)
                            ? (_22 = contract === null || contract === void 0 ? void 0 : contract.TransporterId) === null || _22 === void 0 ? void 0 : _22.ModifiedAt
                            : null,
                    },
                });
            });
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: contractsData,
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
exports.GetMilkDipatchRoutes = GetMilkDipatchRoutes;
function CreateMilkDispatch(req, model) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            for (const record of model) {
                const route = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                    .createQueryBuilder("route")
                    .where("route.Id = :id", { id: record.routeId })
                    .getOne();
                const vehicle = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles)
                    .createQueryBuilder("vehicle")
                    .where("vehicle.Id = :id", { id: record.transporterVehicleId })
                    .getOne();
                const repository = DbConnection_1.AppDataSource.getRepository(entities.MilkDispatch);
                const milkDispatch = new entities.MilkDispatch();
                milkDispatch.Id = (_b = record.id) !== null && _b !== void 0 ? _b : milkDispatch.Id;
                // console.log(milkDispatch.Id, " -- milk dispatch Id");
                if (route) {
                    milkDispatch.RouteId = route;
                }
                if (vehicle) {
                    milkDispatch.TransporterVehicleId = vehicle;
                }
                milkDispatch.StartFat = (_c = record.startFat) !== null && _c !== void 0 ? _c : milkDispatch.StartFat;
                milkDispatch.StartSnf = (_d = record.startSnf) !== null && _d !== void 0 ? _d : milkDispatch.StartSnf;
                milkDispatch.StartClr = (_e = record.startClr) !== null && _e !== void 0 ? _e : milkDispatch.StartClr;
                milkDispatch.EndFat = (_f = record.endFat) !== null && _f !== void 0 ? _f : milkDispatch.EndFat;
                milkDispatch.EndSnf = (_g = record.endSnf) !== null && _g !== void 0 ? _g : milkDispatch.EndSnf;
                milkDispatch.EndClr = (_h = record.endClr) !== null && _h !== void 0 ? _h : milkDispatch.EndClr;
                milkDispatch.Weight = (_j = record.weight) !== null && _j !== void 0 ? _j : milkDispatch.Weight;
                milkDispatch.DispatchedAt = (_k = record.dispatchedAt) !== null && _k !== void 0 ? _k : milkDispatch.DispatchedAt;
                milkDispatch.CreatedAt = (_l = record.createdAt) !== null && _l !== void 0 ? _l : milkDispatch.CreatedAt;
                milkDispatch.ModifiedAt = (_m = record.updatedAt) !== null && _m !== void 0 ? _m : milkDispatch.ModifiedAt;
                milkDispatch.DeletedAt = (_o = record.deletedAt) !== null && _o !== void 0 ? _o : milkDispatch.DeletedAt;
                milkDispatch.CreatedBy = userId;
                yield repository.save(milkDispatch);
                console.log("milk collections-->", record);
                if (record.milkCollections && record.milkCollections.length > 0) {
                    const milkCollectionsRepository = DbConnection_1.AppDataSource.getRepository(entities.MilkCollections);
                    for (const milkCollectionData of record.milkCollections) {
                        console.log("milkcollection data -->", milkCollectionData);
                        const milkCollection = yield milkCollectionsRepository.findOne({
                            where: { Id: milkCollectionData.milkCollectionId },
                        });
                        if (milkCollection) {
                            milkCollection.MilkDispatchId = milkDispatch.Id;
                            milkCollection.DispatchedQuantity = milkCollectionData.dispatchedQuantity;
                            milkCollection.RemainingQuantity = milkCollectionData.remainingQuantity;
                            yield milkCollectionsRepository.save(milkCollection);
                        }
                    }
                }
            }
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
exports.CreateMilkDispatch = CreateMilkDispatch;
function UpdateMilkDispatch(req, model) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const uuid = (0, uuid_1.v4)();
            for (const record of model) {
                const route = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                    .createQueryBuilder("route")
                    .where("route.Id = :id", { id: record.routeId })
                    .getOne();
                const vehicle = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles)
                    .createQueryBuilder("vehicle")
                    .where("vehicle.Id = :id", { id: record.transporterVehicleId })
                    .getOne();
                const repository = DbConnection_1.AppDataSource.getRepository(entities.MilkDispatch);
                const milkDispatch = yield repository.findOne({
                    where: { Id: (_b = record.id) !== null && _b !== void 0 ? _b : 0 },
                });
                if (milkDispatch) {
                    if (route) {
                        milkDispatch.RouteId = route;
                    }
                    if (vehicle) {
                        milkDispatch.TransporterVehicleId = vehicle;
                    }
                    milkDispatch.StartFat = (_c = record.startFat) !== null && _c !== void 0 ? _c : milkDispatch.StartFat;
                    milkDispatch.StartSnf = (_d = record.startSnf) !== null && _d !== void 0 ? _d : milkDispatch.StartSnf;
                    milkDispatch.StartClr = (_e = record.startClr) !== null && _e !== void 0 ? _e : milkDispatch.StartClr;
                    milkDispatch.EndFat = (_f = record.endFat) !== null && _f !== void 0 ? _f : milkDispatch.EndFat;
                    milkDispatch.EndSnf = (_g = record.endSnf) !== null && _g !== void 0 ? _g : milkDispatch.EndSnf;
                    milkDispatch.EndClr = (_h = record.endClr) !== null && _h !== void 0 ? _h : milkDispatch.EndClr;
                    milkDispatch.Weight = (_j = record.weight) !== null && _j !== void 0 ? _j : milkDispatch.Weight;
                    milkDispatch.DispatchedAt =
                        (_k = record.dispatchedAt) !== null && _k !== void 0 ? _k : milkDispatch.DispatchedAt;
                    milkDispatch.CreatedAt = (_l = record.createdAt) !== null && _l !== void 0 ? _l : milkDispatch.CreatedAt;
                    milkDispatch.ModifiedAt = (_m = record.updatedAt) !== null && _m !== void 0 ? _m : milkDispatch.ModifiedAt;
                    milkDispatch.DeletedAt = (_o = record.deletedAt) !== null && _o !== void 0 ? _o : milkDispatch.DeletedAt;
                    milkDispatch.ModifiedBy = userId;
                    yield repository.save(milkDispatch);
                }
                else {
                    return {
                        status: 404,
                        message: ERROR_MESSAGES.NO_DATA,
                        data: null,
                    };
                }
            }
            return {
                status: 200,
                message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
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
exports.UpdateMilkDispatch = UpdateMilkDispatch;
function DeleteMilkDispatch(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.MilkDispatch);
            const milkDispatch = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (milkDispatch) {
                milkDispatch.IsActive = false;
                milkDispatch.DeletedAt = new Date();
                milkDispatch.DeletedBy = userId;
                yield repository.save(milkDispatch);
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
exports.DeleteMilkDispatch = DeleteMilkDispatch;
