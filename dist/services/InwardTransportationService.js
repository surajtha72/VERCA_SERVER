"use strict";
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
exports.GetVehicleAttendance = exports.GetInwardTransportation = void 0;
const TransporterContracts_1 = require("./../entities/TransporterContracts");
const Organization_1 = require("./../entities/Organization");
const MilkCollections_1 = require("./../entities/MilkCollections");
const moment_1 = __importDefault(require("moment"));
const DbConnection_1 = require("../db-config/DbConnection");
const MilkCollectionDetails_1 = require("../entities/MilkCollectionDetails");
const RouteMaster_1 = require("../entities/RouteMaster");
const jwt = require("jsonwebtoken");
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
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
function GetInwardTransportation(req, model) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const { startDate, endDate, bmcId, shift } = model;
            let milkCollections;
            const daysCount = (0, moment_1.default)(endDate).diff((0, moment_1.default)(startDate), "days") + 1;
            const bmc = yield DbConnection_1.AppDataSource.getRepository(Organization_1.Organization)
                .createQueryBuilder("organization")
                .innerJoinAndSelect("organization.OrganizationType", "organizationType")
                .where("organization.Id = :id", { id: bmcId })
                .andWhere("organization.IsActive = :cond", { cond: true })
                .andWhere("organizationType.Id = :bmcid", { bmcid: 4 })
                .getOne();
            if (!bmc) {
                return { status: 200, message: ERROR_MESSAGES.NO_DATA, data: null };
            }
            const bmcRoutes = yield DbConnection_1.AppDataSource.getRepository(RouteMaster_1.RouteMaster)
                .createQueryBuilder("RouteMaster")
                .select()
                .where("RouteMaster.RouteOwner = :id", { id: bmc === null || bmc === void 0 ? void 0 : bmc.Id })
                .andWhere("RouteMaster.RouteTypeId = :rid", { rid: 1 })
                .getMany();
            let inwardData = [];
            for (let routeItr = 0; routeItr < bmcRoutes.length; routeItr++) {
                const contracts = yield DbConnection_1.AppDataSource.getRepository(TransporterContracts_1.TransporterContracts)
                    .createQueryBuilder("TransporterContracts")
                    .leftJoinAndSelect("TransporterContracts.TransporterId", "Transporters")
                    .leftJoinAndSelect("TransporterContracts.VehicleId", "TransporterVehicles")
                    .where("TransporterContracts.RouteId = :id", {
                    id: (_b = bmcRoutes[routeItr]) === null || _b === void 0 ? void 0 : _b.Id,
                })
                    .getMany();
                for (let contractItr = 0; contractItr < contracts.length; contractItr++) {
                    let inwardDetails = {
                        vehicle: {},
                        totalMilk: 0,
                        contract: {},
                        payAmount: 0,
                        totalMilkCollections: 0,
                        payTerm: "",
                        daysCount: daysCount,
                        arrivalTime: "",
                        accName: "",
                        accNumber: "",
                        accIfscCode: "",
                        attendanceDates: new Set(),
                        canCount: 0,
                        KgFat: 0,
                        KgSnf: 0,
                        Headload: 0,
                        HeadloadQty: 0,
                        HeadloadAmt: 0,
                    };
                    if (shift === null || shift === "both") {
                        milkCollections = yield DbConnection_1.AppDataSource.getRepository(MilkCollections_1.MilkCollections)
                            .createQueryBuilder("milkCollections")
                            .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
                            startDate: startDate,
                        })
                            .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
                            endDate: endDate,
                        })
                            .andWhere("milkCollections.IsActive = :isActive", {
                            isActive: true,
                        })
                            .getMany();
                    }
                    else {
                        milkCollections = yield DbConnection_1.AppDataSource.getRepository(MilkCollections_1.MilkCollections)
                            .createQueryBuilder("milkCollections")
                            .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
                            startDate,
                        })
                            .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
                            endDate,
                        })
                            .andWhere("milkCollections.IsActive = :isActive", {
                            isActive: true,
                        })
                            .andWhere("milkCollections.Shift = :Shift", { Shift: shift })
                            .getMany();
                    }
                    const milkCollectionIds = milkCollections.map((milk) => milk.Id);
                    const milkCollectionsDetails = yield DbConnection_1.AppDataSource.getRepository(MilkCollectionDetails_1.MilkCollectionDetails)
                        .createQueryBuilder("MilkCollection")
                        .select("MilkCollection.Id")
                        .addSelect("MilkCollection.Weight")
                        .addSelect("MilkCollection.CollectedAt")
                        .addSelect("MilkCollection.CanCount")
                        .addSelect("MilkCollection.Fat")
                        .addSelect("MilkCollection.Snf")
                        .addSelect("MilkCollection.RouteId")
                        .addSelect("Organization.Headload")
                        .leftJoinAndSelect("MilkCollection.OrganizationUnitId", "Organization")
                        .where("MilkCollection.RouteId = :rid", {
                        rid: (_c = bmcRoutes[routeItr]) === null || _c === void 0 ? void 0 : _c.Id,
                    })
                        .andWhere("MilkCollection.TransporterVehicleId = :vid", {
                        vid: (_e = (_d = contracts[contractItr]) === null || _d === void 0 ? void 0 : _d.VehicleId) === null || _e === void 0 ? void 0 : _e.Id,
                    })
                        .andWhere("MilkCollection.MilkCollectionId IN (:...milkCollectionIds)", { milkCollectionIds })
                        .getMany();
                    //for vehicle attendance
                    const milkCollectionsDetailsAttd = yield DbConnection_1.AppDataSource.getRepository(MilkCollectionDetails_1.MilkCollectionDetails)
                        .createQueryBuilder("MilkCollection")
                        .select("MilkCollection.Id")
                        .addSelect("MilkCollection.Weight")
                        .addSelect("MilkCollection.CollectedAt")
                        .addSelect("MilkCollection.CanCount")
                        .addSelect("MilkCollection.Fat")
                        .addSelect("MilkCollection.Snf")
                        .addSelect("Organization.Headload")
                        .leftJoinAndSelect("MilkCollection.OrganizationUnitId", "Organization")
                        .where("MilkCollection.RouteId = :rid", {
                        rid: (_f = bmcRoutes[routeItr]) === null || _f === void 0 ? void 0 : _f.Id,
                    })
                        .andWhere("MilkCollection.TransporterVehicleId = :vid", {
                        vid: (_h = (_g = contracts[contractItr]) === null || _g === void 0 ? void 0 : _g.VehicleId) === null || _h === void 0 ? void 0 : _h.Id,
                    })
                        .andWhere("DATE(MilkCollection.CreatedAt) >= :startDate", {
                        startDate: startDate,
                    })
                        .andWhere("DATE(MilkCollection.CreatedAt) <= :endDate", {
                        endDate: endDate,
                    })
                        .getMany();
                    let hlAmount = 0.0;
                    let hlQty = 0.0;
                    milkCollectionsDetails.forEach((collection) => {
                        var _a, _b;
                        inwardDetails.totalMilk += collection.Weight;
                        inwardDetails.totalMilkCollections += 1;
                        inwardDetails.canCount += collection.CanCount;
                        inwardDetails.Headload = (_b = (_a = collection.OrganizationUnitId) === null || _a === void 0 ? void 0 : _a.HeadLoad) !== null && _b !== void 0 ? _b : 0;
                        if (inwardDetails.Headload > 0) {
                            const weight = (collection === null || collection === void 0 ? void 0 : collection.Weight).toFixed(3);
                            const fat = (collection === null || collection === void 0 ? void 0 : collection.Fat).toFixed(3);
                            const snf = (collection === null || collection === void 0 ? void 0 : collection.Snf).toFixed(3);
                            const KgFat = parseFloat(weight) / 100 * parseFloat(fat);
                            const KgSnf = parseFloat(weight) / 100 * parseFloat(snf);
                            hlQty += ((KgFat + KgSnf) / 12) * 100;
                            inwardDetails.HeadloadQty = hlQty;
                            inwardDetails.HeadloadQty = parseInt(inwardDetails.HeadloadQty).toFixed(3);
                            console.log(collection.RouteId);
                            // if(bmcRoutes[routeItr]?.Id==204){
                            //   console.log('inwardDetails.HeadloadQty: ',inwardDetails.HeadloadQty);
                            // }
                            hlAmount += ((KgFat + KgSnf) / 12) * 100 * collection.OrganizationUnitId.HeadLoad;
                            inwardDetails.HeadloadAmt = hlAmount;
                            inwardDetails.HeadloadAmt = parseInt(inwardDetails.HeadloadAmt).toFixed(3);
                            // console.log(contracts);
                        }
                        if (!inwardDetails.arrivalTime ||
                            collection.CollectedAt < inwardDetails.arrivalTime) {
                            inwardDetails.arrivalTime = collection.CollectedAt;
                        }
                    });
                    milkCollectionsDetailsAttd.forEach((collection) => {
                        const collectionDate = (0, moment_1.default)(collection.CollectedAt).format("YYYY-MM-DD");
                        if (!inwardDetails.attendanceDates.has(collectionDate)) {
                            inwardDetails.attendanceDates.add(collectionDate);
                        }
                    });
                    inwardDetails.routId = bmcRoutes[routeItr];
                    inwardDetails.contract = contracts[contractItr];
                    inwardDetails.vehicle = (_k = (_j = contracts[contractItr]) === null || _j === void 0 ? void 0 : _j.VehicleId) === null || _k === void 0 ? void 0 : _k.Id;
                    inwardDetails.accName =
                        (_l = contracts[contractItr]) === null || _l === void 0 ? void 0 : _l.TransporterId.BankAcName;
                    inwardDetails.accNumber =
                        (_m = contracts[contractItr]) === null || _m === void 0 ? void 0 : _m.TransporterId.BankAcNo;
                    inwardDetails.payAmount = (_o = contracts[contractItr]) === null || _o === void 0 ? void 0 : _o.PayAmount;
                    inwardDetails.payTerm = (_p = contracts[contractItr]) === null || _p === void 0 ? void 0 : _p.PayTerms;
                    inwardDetails.accIfscCode =
                        (_q = contracts[contractItr]) === null || _q === void 0 ? void 0 : _q.TransporterId.BankIfscCode;
                    inwardData.push(inwardDetails);
                }
            }
            const combinedData = inwardData.reduce((acc, current) => {
                const existing = acc.find((item) => item.vehicle === current.vehicle);
                if (existing) {
                    existing.totalMilk += current.totalMilk;
                    existing.totalMilkCollections += current.totalMilkCollections;
                    existing.canCount += current.canCount;
                    current.attendanceDates.forEach((date) => existing.attendanceDates.add(date));
                }
                else {
                    acc.push(Object.assign(Object.assign({}, current), { attendanceDates: new Set([...current.attendanceDates]) }));
                }
                return acc;
            }, []);
            combinedData.forEach((item) => {
                item.attendance = item.attendanceDates.size;
                delete item.attendanceDates;
            });
            //console.log(combinedData[0])
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: combinedData,
            };
        }
        catch (error) {
            console.error(error);
            return { status: 400, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
        }
    });
}
exports.GetInwardTransportation = GetInwardTransportation;
function GetVehicleAttendance(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const { startDate, endDate, bmcId } = model;
            let attendanceData = [];
            const bmc = yield DbConnection_1.AppDataSource.getRepository(Organization_1.Organization)
                .createQueryBuilder("BmcMaster")
                .select("BmcMaster.Name", "bmcName")
                .where("BmcMaster.Id = :id", { id: bmcId })
                .getRawOne();
            const bmcName = bmc ? bmc.bmcName : "Unknown BMC";
            const bmcRoutes = yield DbConnection_1.AppDataSource.getRepository(RouteMaster_1.RouteMaster)
                .createQueryBuilder("RouteMaster")
                .select()
                .where("RouteMaster.RouteOwner = :id", { id: bmcId })
                .andWhere("RouteMaster.RouteTypeId = :rid", { rid: 1 })
                .getMany();
            for (let route of bmcRoutes) {
                const contracts = yield DbConnection_1.AppDataSource.getRepository(TransporterContracts_1.TransporterContracts)
                    .createQueryBuilder("TransporterContracts")
                    .leftJoinAndSelect("TransporterContracts.VehicleId", "TransporterVehicles")
                    .where("TransporterContracts.RouteId = :id", { id: route.Id })
                    .getMany();
                for (let contract of contracts) {
                    let vehicleAttendance = {
                        startDate: startDate,
                        endDate: endDate,
                        bmc: bmcName,
                        vehicleRegNo: (_b = contract.VehicleId) === null || _b === void 0 ? void 0 : _b.RegistrationNo,
                        route: route.RouteName,
                        morningShiftArrival: {},
                        eveningShiftArrival: {},
                    };
                    let currentDate = (0, moment_1.default)(startDate);
                    const endDateMoment = (0, moment_1.default)(endDate);
                    while (currentDate.isSameOrBefore(endDateMoment)) {
                        const dateStr = currentDate.format("YYYY-MM-DD");
                        const morningShift = yield DbConnection_1.AppDataSource.getRepository(MilkCollectionDetails_1.MilkCollectionDetails)
                            .createQueryBuilder("MilkCollectionDetails")
                            .leftJoinAndSelect("MilkCollectionDetails.MilkCollectionId", "MilkCollections")
                            .where("MilkCollectionDetails.TransporterVehicleId = :vid", {
                            vid: contract.VehicleId.Id,
                        })
                            .andWhere("DATE(MilkCollectionDetails.CollectedAt) = :dateStr", {
                            dateStr,
                        })
                            .andWhere("MilkCollections.Shift = :shift", { shift: "morning" })
                            .orderBy("MilkCollectionDetails.CollectedAt", "ASC")
                            .getOne();
                        const eveningShift = yield DbConnection_1.AppDataSource.getRepository(MilkCollectionDetails_1.MilkCollectionDetails)
                            .createQueryBuilder("MilkCollectionDetails")
                            .leftJoinAndSelect("MilkCollectionDetails.MilkCollectionId", "MilkCollections")
                            .where("MilkCollectionDetails.TransporterVehicleId = :vid", {
                            vid: contract.VehicleId.Id,
                        })
                            .andWhere("DATE(MilkCollectionDetails.CollectedAt) = :dateStr", {
                            dateStr,
                        })
                            .andWhere("MilkCollections.Shift = :shift", { shift: "evening" })
                            .orderBy("MilkCollectionDetails.CollectedAt", "ASC")
                            .getOne();
                        vehicleAttendance.morningShiftArrival[dateStr] = morningShift
                            ? morningShift.CollectedAt
                            : null;
                        vehicleAttendance.eveningShiftArrival[dateStr] = eveningShift
                            ? eveningShift.CollectedAt
                            : null;
                        currentDate.add(1, "days");
                    }
                    attendanceData.push(vehicleAttendance);
                }
            }
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: attendanceData,
            };
        }
        catch (error) {
            console.error(error);
            return { status: 400, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
        }
    });
}
exports.GetVehicleAttendance = GetVehicleAttendance;
