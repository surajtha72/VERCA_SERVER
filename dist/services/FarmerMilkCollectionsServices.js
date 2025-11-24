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
exports.GetUnlockedBillingCycles = exports.LockMilkBill = exports.GetFarmerMilkCollectionsPortal = exports.GetMilkRoutes = exports.DeleteFarmerMilkCollection = exports.UpdateFarmerMilkCollection = exports.CreateFarmerMilkCollection = exports.GetAllFarmerMilkCollections = void 0;
const DbConnection_1 = require("../db-config/DbConnection");
const entities = __importStar(require("../entities/Context"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const AggregateCollectionData_1 = require("../utils/AggregateCollectionData");
const moment_1 = __importDefault(require("moment"));
dotenv_1.default.config();
const https = __importStar(require("https"));
const typeorm_1 = require("typeorm");
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
function calculateTotalWeight(milkCollectionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const totalWeightResult = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollectionDetails)
            .createQueryBuilder("farmermilkcollectiondetails")
            .select("SUM(farmermilkcollectiondetails.weight)", "totalWeight")
            .where("farmermilkcollectiondetails.MilkCollectionId = :id", { id: milkCollectionId })
            .getRawOne();
        return totalWeightResult.totalWeight || 0;
    });
}
function calculateGt(milkCollectionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const farmerMilkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollectionDetails)
            .createQueryBuilder("farmermilkcollectiondetails")
            .where("farmermilkcollectiondetails.MilkCollectionId = :id", { id: milkCollectionId })
            .getMany();
        let aggregatedData = {
            Fat: 0,
            Snf: 0,
            Weight: 0,
            KGFat: 0,
            KGSnf: 0,
            count: 0,
        };
        farmerMilkCollectionDetails.forEach((collection) => {
            aggregatedData.Weight += collection.Weight;
            aggregatedData.Fat += collection.Fat;
            aggregatedData.Snf += collection.Snf;
            aggregatedData.KGFat += (collection.Weight / 100) * collection.Fat;
            aggregatedData.KGSnf += (collection.Weight / 100) * collection.Snf;
            aggregatedData.count++;
        });
        let result = {
            Fat: 0,
            Snf: 0,
            Weight: 0,
            KGFat: 0,
            KGSnf: 0,
            count: 0,
        };
        result.Fat = (aggregatedData.KGFat / aggregatedData.Weight) * 100;
        result.Snf = (aggregatedData.KGSnf / aggregatedData.Weight) * 100;
        result.Weight = aggregatedData.Weight;
        result.KGFat = aggregatedData.KGFat;
        result.KGSnf = aggregatedData.KGSnf;
        return result;
    });
}
function GetAllFarmerMilkCollections(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            // console.log(decode)
            const user = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                .createQueryBuilder("user")
                .innerJoinAndSelect("user.OrganizationUnitId", "orgUnit")
                .where("user.Id = :id", { id: decode.userId })
                .getOne();
            const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            // console.log(user)
            let farmerMilkCollections;
            if (model.id) {
                farmerMilkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections)
                    .createQueryBuilder("farmerMilkCollections")
                    .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
                    .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
                    .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
                    .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
                    .where("farmerMilkCollections.Id = :id", { id: model.id })
                    .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.organizationUnitId && model.startDate && model.endDate) {
                // console.log('inside this function')
                farmerMilkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections)
                    .createQueryBuilder("farmerMilkCollections")
                    .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
                    .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
                    .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
                    .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
                    .innerJoin("farmerMilkCollections.CreatedBy", "createdByUser")
                    .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
                    .where("createdByOrganization.Id = :organizationUnitId", {
                    organizationUnitId: model.organizationUnitId,
                })
                    .andWhere("DATE(farmerMilkCollections.CollectionDateTime) >= :startDate", { startDate: model.startDate })
                    .andWhere("DATE(farmerMilkCollections.CollectionDateTime) <= :endDate", { endDate: model.endDate })
                    .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
                    .orderBy("farmerMilkCollections.CreatedAt", "ASC")
                    .getMany();
            }
            else if (model.organizationUnitId && model.filterDate) {
                // console.log("inside orgId and filterdate model")
                farmerMilkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections)
                    .createQueryBuilder("farmerMilkCollections")
                    .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
                    .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
                    .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
                    .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
                    .innerJoin("farmerMilkCollections.CreatedBy", "createdByUser")
                    .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
                    .where("createdByOrganization.Id = :organizationUnitId", {
                    organizationUnitId: model.organizationUnitId,
                })
                    .andWhere("DATE(farmerMilkCollections.CollectionDateTime) = :filterDate", { filterDate: model.filterDate })
                    .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.shift) {
                farmerMilkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections)
                    .createQueryBuilder("farmerMilkCollections")
                    .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
                    .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
                    .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
                    .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
                    .where("farmerMilkCollections.Shift = :shift", { shift: model.shift })
                    .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.status) {
                // console.log("model.status is being called")
                farmerMilkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections)
                    .createQueryBuilder("farmerMilkCollections")
                    .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
                    .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
                    .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
                    .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
                    .where("farmerMilkCollections.Status = :status", { status: model.status })
                    .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.organizationUnitId > 0) {
                // console.log("model.orgunitid is being called")
                farmerMilkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections)
                    .createQueryBuilder("farmerMilkCollections")
                    .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
                    .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
                    .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
                    .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
                    .innerJoin("farmerMilkCollections.CreatedBy", "createdByUser")
                    .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
                    .where("createdByOrganization.Id = :organizationUnitId", {
                    organizationUnitId: model.organizationUnitId,
                })
                    .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
                    .orderBy("farmerMilkCollections.CollectionDateTime", "ASC")
                    .getMany();
            }
            else {
                // console.log("else is being called")
                farmerMilkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections)
                    .createQueryBuilder("farmerMilkCollections")
                    .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
                    .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
                    .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
                    .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
                    .innerJoin("farmerMilkCollections.CreatedBy", "createdByUser")
                    .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
                    .where("createdByOrganization.Id =:organizationUnitId", {
                    organizationUnitId: user === null || user === void 0 ? void 0 : user.OrganizationUnitId.Id,
                })
                    .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
                    .andWhere("farmerMilkCollections.CollectionDateTime >:sevenDaysAgo", { sevenDaysAgo: sevenDaysAgo })
                    .orderBy("farmerMilkCollections.CollectionDateTime", "ASC")
                    .getMany();
            }
            const totalWeightPromises = farmerMilkCollections.map((farmerMilkCollection) => __awaiter(this, void 0, void 0, function* () {
                const totalWeight = yield calculateTotalWeight(farmerMilkCollection === null || farmerMilkCollection === void 0 ? void 0 : farmerMilkCollection.Id);
                // console.log("total weight : ", totalWeight)
                return totalWeight;
            }));
            const totalWeights = yield Promise.all(totalWeightPromises);
            const farmerMilkCollectionsData = farmerMilkCollections.map((farmerMilkCollections, index) => ({
                id: farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.Id,
                shift: farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.Shift,
                status: farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.Status,
                collectionDateTime: farmerMilkCollections.CollectionDateTime,
                startedAt: farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.StartedAt,
                completedAt: farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.CompletedAt,
                createdAt: farmerMilkCollections.CreatedAt,
                updatedAt: farmerMilkCollections.ModifiedAt,
                deletedAt: farmerMilkCollections.DeletedAt,
                createdBy: farmerMilkCollections.CreatedBy ? farmerMilkCollections.CreatedBy.Id : 0,
                updatedBy: farmerMilkCollections.ModifiedBy ? farmerMilkCollections.ModifiedBy.Id : 0,
                deletedBy: farmerMilkCollections.DeletedBy ? farmerMilkCollections.DeletedBy.Id : 0,
                milkDispatchId: (farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.MilkDispatchId)
                    ? farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.MilkDispatchId
                    : "",
                totalWeight: totalWeights[index],
                dispatchedQuantity: farmerMilkCollections.DispatchedQuantity,
                remainingQuantity: farmerMilkCollections.RemainingQuantity,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: farmerMilkCollectionsData,
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
exports.GetAllFarmerMilkCollections = GetAllFarmerMilkCollections;
function GetFarmerMilkCollectionsPortal(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            // console.log(decode)
            const user = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                .createQueryBuilder("user")
                .innerJoinAndSelect("user.OrganizationUnitId", "orgUnit")
                .where("user.Id = :id", { id: decode.userId })
                .getOne();
            // console.log(user)
            let farmerMilkCollections;
            if (model.id) {
                farmerMilkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollections)
                    .createQueryBuilder("farmerMilkCollections")
                    .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
                    .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
                    .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
                    .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
                    .where("farmerMilkCollections.Id = :id", { id: model.id })
                    .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.organizationUnitId && model.startDate && model.endDate) {
                // console.log('inside this function')
                farmerMilkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections)
                    .createQueryBuilder("farmerMilkCollections")
                    .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
                    .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
                    .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
                    .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
                    .innerJoin("farmerMilkCollections.CreatedBy", "createdByUser")
                    .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
                    .where("createdByOrganization.Id = :organizationUnitId", {
                    organizationUnitId: model.organizationUnitId,
                })
                    .andWhere("DATE(farmerMilkCollections.CollectionDateTime) >= :startDate", { startDate: model.startDate })
                    .andWhere("DATE(farmerMilkCollections.CollectionDateTime) <= :endDate", { endDate: model.endDate })
                    .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
                    .orderBy("farmerMilkCollections.CreatedAt", "ASC")
                    .getMany();
            }
            else {
                // console.log("else is being called")
                farmerMilkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections)
                    .createQueryBuilder("farmerMilkCollections")
                    .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
                    .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
                    .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
                    .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
                    .innerJoin("farmerMilkCollections.CreatedBy", "createdByUser")
                    .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
                    .where("createdByOrganization.Id =:organizationUnitId", {
                    organizationUnitId: user === null || user === void 0 ? void 0 : user.OrganizationUnitId.Id,
                })
                    .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
                    .orderBy("farmerMilkCollections.CollectionDateTime", "ASC")
                    .getMany();
            }
            const milkCollectionGtData = farmerMilkCollections.map((farmerMilkCollection) => __awaiter(this, void 0, void 0, function* () {
                const totalWeight = yield calculateGt(farmerMilkCollection === null || farmerMilkCollection === void 0 ? void 0 : farmerMilkCollection.Id);
                // console.log("total weight : ", totalWeight)
                return totalWeight;
            }));
            const calculatedGt = yield Promise.all(milkCollectionGtData);
            const farmerMilkCollectionsData = farmerMilkCollections.map((farmerMilkCollections, index) => ({
                id: farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.Id,
                shift: farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.Shift,
                status: farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.Status,
                collectionDateTime: farmerMilkCollections.CollectionDateTime,
                startedAt: farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.StartedAt,
                completedAt: farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.CompletedAt,
                createdAt: farmerMilkCollections.CreatedAt,
                updatedAt: farmerMilkCollections.ModifiedAt,
                deletedAt: farmerMilkCollections.DeletedAt,
                createdBy: farmerMilkCollections.CreatedBy ? farmerMilkCollections.CreatedBy.Id : 0,
                updatedBy: farmerMilkCollections.ModifiedBy ? farmerMilkCollections.ModifiedBy.Id : 0,
                deletedBy: farmerMilkCollections.DeletedBy ? farmerMilkCollections.DeletedBy.Id : 0,
                milkDispatchId: (farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.MilkDispatchId)
                    ? farmerMilkCollections === null || farmerMilkCollections === void 0 ? void 0 : farmerMilkCollections.MilkDispatchId
                    : "",
                totalWeight: calculatedGt[index].Weight,
                dispatchedQuantity: farmerMilkCollections.DispatchedQuantity,
                remainingQuantity: farmerMilkCollections.RemainingQuantity,
                gtFat: farmerMilkCollections.Fat,
                gtSnf: farmerMilkCollections.Snf,
                calculatedFat: parseFloat((calculatedGt[index].Fat).toFixed(2)),
                calculatedSnf: parseFloat((calculatedGt[index].Snf).toFixed(2)),
                totalKgFat: parseFloat((calculatedGt[index].KGFat).toFixed(2)),
                totalKgSnf: parseFloat((calculatedGt[index].KGSnf).toFixed(2)),
                isMilkBillLocked: farmerMilkCollections.IsMilkBillLocked,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: farmerMilkCollectionsData,
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
exports.GetFarmerMilkCollectionsPortal = GetFarmerMilkCollectionsPortal;
function GetMilkRoutes(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contracts = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterContracts)
                .createQueryBuilder("contracts")
                .leftJoinAndSelect("contracts.RouteId", "route")
                .leftJoinAndSelect("contracts.TransporterId", "transporter")
                .leftJoinAndSelect("contracts.VehicleId", "vehicle")
                .leftJoinAndSelect("vehicle.TransporterId", "TransporterId")
                .leftJoinAndSelect("route.RouteOwner", "routeOwner")
                // .where("routeOwner.Id = :routeOwnerId", {
                //   routeOwnerId: model.routeOwnerId,
                // })
                .where("route.IsActive = :isActive", { isActive: true })
                .getMany();
            // console.log(contracts.length);
            if (contracts.length === 0) {
                return {
                    status: 404,
                    message: "No data found for the particular Route Owner Id",
                    data: null,
                };
            }
            const contractsData = contracts.map((contract) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22;
                return ({
                    vehicle: {
                        id: contract.VehicleId ? (_a = contract.VehicleId) === null || _a === void 0 ? void 0 : _a.Id : null,
                        transporterId: contract.VehicleId.TransporterId
                            ? contract.VehicleId.TransporterId.Id
                            : null,
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
                        routeOwner: contract.RouteId.RouteOwner
                            ? contract.RouteId.RouteOwner.Id
                            : null,
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
exports.GetMilkRoutes = GetMilkRoutes;
function CreateFarmerMilkCollection(req, model) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const uuid = (0, uuid_1.v4)();
            for (const record of model) {
                const created = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :id", { id: record.createdBy })
                    .getOne();
                const updated = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :id", { id: record.updatedBy })
                    .getOne();
                const deleted = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :id", { id: record.deletedBy })
                    .getOne();
                const milkDispatch = yield DbConnection_1.AppDataSource.getRepository(entities.MilkDispatch)
                    .createQueryBuilder("milkDispatch")
                    .where("milkDispatch.Id = :id", { id: record.milkDispatchId })
                    .getOne();
                const billingCycle = yield DbConnection_1.AppDataSource.getRepository(entities.BillingCycleMaster)
                    .createQueryBuilder("billingCycle")
                    .where("billingCycle.StartDate <=:startDate", { startDate: record.collectionDateTime })
                    .andWhere("billingCycle.EndDate >=:endDate", { endDate: record.collectionDateTime })
                    .getOne();
                // console.log('billing cycle', billingCycle)
                const repository = DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections);
                const farmerMilkCollection = new entities.FarmerMilkCollections();
                farmerMilkCollection.Id = (_b = record.id) !== null && _b !== void 0 ? _b : farmerMilkCollection.Id;
                farmerMilkCollection.Shift = (_c = record.shift) !== null && _c !== void 0 ? _c : farmerMilkCollection.Shift;
                farmerMilkCollection.Status = (_d = record.status) !== null && _d !== void 0 ? _d : farmerMilkCollection.Status;
                farmerMilkCollection.StartedAt = (_e = record.startedAt) !== null && _e !== void 0 ? _e : farmerMilkCollection.StartedAt;
                farmerMilkCollection.CollectionDateTime =
                    (_f = record.collectionDateTime) !== null && _f !== void 0 ? _f : farmerMilkCollection.CollectionDateTime;
                farmerMilkCollection.CompletedAt =
                    (_g = record.completedAt) !== null && _g !== void 0 ? _g : farmerMilkCollection.CompletedAt;
                farmerMilkCollection.CreatedAt = (_h = record.createdAt) !== null && _h !== void 0 ? _h : farmerMilkCollection.CreatedAt;
                farmerMilkCollection.ModifiedAt = (_j = record.updatedAt) !== null && _j !== void 0 ? _j : farmerMilkCollection.ModifiedAt;
                farmerMilkCollection.DeletedAt = (_k = record.deletedAt) !== null && _k !== void 0 ? _k : farmerMilkCollection.DeletedAt;
                if (milkDispatch) {
                    farmerMilkCollection.MilkDispatchId = milkDispatch.Id;
                }
                if (created) {
                    farmerMilkCollection.CreatedBy = created;
                }
                if (updated) {
                    farmerMilkCollection.ModifiedBy = updated;
                }
                if (deleted) {
                    farmerMilkCollection.DeletedBy = deleted;
                }
                if (billingCycle) {
                    farmerMilkCollection.BillingCycle = billingCycle;
                }
                yield repository.save(farmerMilkCollection);
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
exports.CreateFarmerMilkCollection = CreateFarmerMilkCollection;
function UpdateFarmerMilkCollection(req, model) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const milkCollectionIdsToUpdate = [1, 2, 3];
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const uuid = (0, uuid_1.v4)();
            for (const record of model) {
                const repository = DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections);
                const farmerMilkCollection = yield repository.findOne({
                    where: { Id: (_b = record.id) !== null && _b !== void 0 ? _b : 0 },
                });
                const created = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :id", { id: record.createdBy })
                    .getOne();
                const updated = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :id", { id: record.updatedBy })
                    .getOne();
                const deleted = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :id", { id: record.deletedBy })
                    .getOne();
                const milkDispatch = yield DbConnection_1.AppDataSource.getRepository(entities.MilkDispatch)
                    .createQueryBuilder("milkDispatch")
                    .where("milkDispatch.Id = :id", { id: record.milkDispatchId })
                    .getOne();
                if (farmerMilkCollection) {
                    farmerMilkCollection.Shift = record.shift ? record.shift : farmerMilkCollection.Shift;
                    farmerMilkCollection.Status = record.status
                        ? record.status
                        : farmerMilkCollection.Status;
                    farmerMilkCollection.CollectionDateTime =
                        (_c = record.collectionDateTime) !== null && _c !== void 0 ? _c : farmerMilkCollection.CollectionDateTime;
                    farmerMilkCollection.StartedAt = record.startedAt
                        ? record.startedAt
                        : farmerMilkCollection.StartedAt;
                    farmerMilkCollection.CompletedAt = record.completedAt
                        ? record.completedAt
                        : farmerMilkCollection.CompletedAt;
                    farmerMilkCollection.CreatedAt = record.createdAt
                        ? record.createdAt
                        : farmerMilkCollection.CreatedAt;
                    farmerMilkCollection.ModifiedAt = record.updatedAt
                        ? record.updatedAt
                        : farmerMilkCollection.ModifiedAt;
                    farmerMilkCollection.DeletedAt = record.deletedAt
                        ? record.deletedAt
                        : farmerMilkCollection.DeletedAt;
                    if (milkDispatch) {
                        farmerMilkCollection.MilkDispatchId = milkDispatch.Id;
                    }
                    farmerMilkCollection.DispatchedQuantity = record.dispatchedQuantity ? record.dispatchedQuantity : farmerMilkCollection.DispatchedQuantity;
                    farmerMilkCollection.RemainingQuantity = record.remainingQuantity ? record.remainingQuantity : farmerMilkCollection.RemainingQuantity;
                    farmerMilkCollection.Fat = record.fat ? record.fat : farmerMilkCollection.Fat;
                    farmerMilkCollection.Clr = record.clr ? record.clr : farmerMilkCollection.Clr;
                    if (record.fat && record.clr) {
                        farmerMilkCollection.Snf = parseFloat((record.clr / 4 + 0.20 * record.fat + 0.66).toFixed(1));
                    }
                    if (created) {
                        farmerMilkCollection.CreatedBy = created;
                    }
                    if (updated) {
                        farmerMilkCollection.ModifiedBy = updated;
                    }
                    if (deleted) {
                        farmerMilkCollection.DeletedBy = deleted;
                    }
                    yield repository.save(farmerMilkCollection);
                    if (record.status == 'completed') {
                        SendSms(record.id);
                    }
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
exports.UpdateFarmerMilkCollection = UpdateFarmerMilkCollection;
function LockMilkBill(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const uuid = (0, uuid_1.v4)();
            const farmerMilkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections)
                .createQueryBuilder("milkCollection")
                .where("DATE(milkCollection.CollectionDateTime) >=:startDate", { startDate: model.startDate })
                .andWhere("DATE(milkCollection.CollectionDateTime) <=:endDate", { endDate: model.endDate })
                .getMany();
            const milkCollectionIds = farmerMilkCollections.map((milk) => milk.Id);
            if (farmerMilkCollections) {
                yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections)
                    .createQueryBuilder()
                    .update(entities.FarmerMilkCollections)
                    .set({ IsMilkBillLocked: true })
                    .where({ Id: (0, typeorm_1.In)(milkCollectionIds) })
                    .execute();
                return {
                    status: 200,
                    message: "Milk Payroll Finalized Succefully",
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
exports.LockMilkBill = LockMilkBill;
function GetUnlockedBillingCycles(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let billingCycles;
            const farmerMilkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections)
                .createQueryBuilder("farmerMilkCollection")
                .leftJoinAndSelect("farmerMilkCollection.BillingCycle", "billingCycle")
                .where("farmerMilkCollection.IsMilkBillLocked =:flag", { flag: false })
                .getMany();
            // const billingCycles:any[] = [];
            const billingCycleIds = [];
            farmerMilkCollections.map((milk) => {
                if (milk.BillingCycle) {
                    if (!billingCycleIds.includes(milk.BillingCycle.Id)) {
                        billingCycleIds.push(milk.BillingCycle.Id);
                    }
                }
            });
            if (billingCycleIds.length > 0) {
                billingCycles = yield DbConnection_1.AppDataSource.getRepository(entities.BillingCycleMaster)
                    .createQueryBuilder("billingcycle")
                    .where("billingcycle.Id IN (:...billingCycleIds)", { billingCycleIds })
                    .getMany();
            }
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: billingCycles !== null && billingCycles !== void 0 ? billingCycles : null,
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
exports.GetUnlockedBillingCycles = GetUnlockedBillingCycles;
function SendSms(milkCollectionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const farmerCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollectionDetails)
            .createQueryBuilder("farmerCollectionDetails")
            .leftJoinAndSelect("farmerCollectionDetails.OrganizationUnitId", "organizationUnitId")
            .leftJoinAndSelect("farmerCollectionDetails.MilkCollectionId", "milkCollectionId")
            .where("farmerCollectionDetails.MilkCollectionId =:milkCollectionId", { milkCollectionId: milkCollectionId })
            .getMany();
        const farmerMilkCollectionDetails = (0, AggregateCollectionData_1.smsAggregateData)(farmerCollectionDetails);
        let agentIds = [];
        farmerMilkCollectionDetails.forEach((data) => {
            if (!agentIds.includes(data.OrganizationUnitId.Id)) {
                agentIds.push(data.OrganizationUnitId.Id);
            }
        });
        let smsData = [];
        agentIds.forEach((id) => {
            let agentCollectionDetail = {
                agentId: 0,
                phoneNumber: '',
                shift: '',
                cWeight: 0,
                cCan: 0,
                cFat: 0,
                cSnf: 0,
                date: '',
                bWeight: 0,
                bFat: 0,
                bSnf: 0,
                bCan: 0
            };
            farmerMilkCollectionDetails.forEach((detail) => {
                if (detail.OrganizationUnitId.Id == id && detail.OrganizationUnitId.PhoneNumber !== null) {
                    agentCollectionDetail.phoneNumber = detail.OrganizationUnitId.PhoneNumber;
                    agentCollectionDetail.shift = detail.MilkCollectionId.Shift;
                    agentCollectionDetail.date = (0, moment_1.default)(detail.MilkCollectionId.CollectionDateTime).format("YYYY-MM-DD");
                    agentCollectionDetail.agentId = detail.OrganizationUnitId.Id;
                    if (detail.MilkType == 'cow') {
                        agentCollectionDetail.cCan = detail.CanCount;
                        agentCollectionDetail.cFat = parseFloat(detail.Fat.toFixed(1));
                        agentCollectionDetail.cSnf = parseFloat(detail.Snf.toFixed(1));
                        agentCollectionDetail.cWeight = parseFloat(detail.Weight.toFixed(1));
                    }
                    else {
                        agentCollectionDetail.bCan = detail.CanCount;
                        agentCollectionDetail.bFat = parseFloat(detail.Fat.toFixed(1));
                        agentCollectionDetail.bSnf = parseFloat(detail.Snf.toFixed(1));
                        agentCollectionDetail.bWeight = parseFloat(detail.Weight.toFixed(1));
                    }
                }
            });
            console.log("detail : ", agentCollectionDetail);
            smsData.push(agentCollectionDetail);
        });
        // code to send sms if the api can send sms to multiple agents at a time. collection data needs to be structured accordingly.
        smsData.forEach((collection) => {
            const username = 'UVBEkr810UN8QeYybMGW';
            const password = 'aErfm0LJRnlYbVSm72tmdlwkTcRNP1TaYLtJS1GF';
            const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
            console.log("collection : ", collection);
            const postData = JSON.stringify({
                "Text": `Dear ${collection.agentId}, Dt: ${collection.date}, ${collection.shift == "morning" ? "MOR" : "EVE"}: COW: C:${collection.cCan !== 0 ? collection.cCan : ""} /Q${collection.cWeight !== 0 ? collection.cWeight : ""} /F:${collection.cFat !== 0 ? collection.cFat : ""} /S:${collection.cSnf !== 0 ? collection.cSnf : ""} BUF: C:${collection.bCan !== 0 ? collection.bCan : ""} /Q:${collection.bWeight !== 0 ? collection.bWeight : ""} /F:${collection.bFat !== 0 ? collection.bFat : ""} /S:${collection.bSnf !== 0 ? collection.bSnf : ""} - Ganga dairy LTD`,
                "Number": `91${collection.phoneNumber}`,
                "SenderId": "GADLTD",
                "DRNotifyUrl": "https://www.domainname.com/notifyurl",
                "DRNotifyHttpMethod": "POST",
                "Tool": "API"
            });
            const options = {
                method: 'POST',
                hostname: 'restapi.smscountry.com',
                path: '/v0.1/Accounts/UVBEkr810UN8QeYybMGW/SMSes/',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth,
                    'Content-Length': Buffer.byteLength(postData)
                }
            };
            const req = https.request(options, (res) => {
                let responseBody = '';
                res.on('data', (chunk) => {
                    responseBody += chunk;
                });
                res.on('end', () => {
                    console.log('Response:', responseBody);
                });
            });
            req.on('error', (error) => {
                console.error('Error:', error);
            });
            req.write(postData);
            req.end();
        });
    });
}
function DeleteFarmerMilkCollection(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections);
            const farmerMilkCollection = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (farmerMilkCollection) {
                farmerMilkCollection.IsActive = false;
                farmerMilkCollection.DeletedAt = new Date();
                farmerMilkCollection.DeletedBy = userId;
                yield repository.save(farmerMilkCollection);
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
exports.DeleteFarmerMilkCollection = DeleteFarmerMilkCollection;
