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
exports.DeleteFarmerMilkCollectionDetails = exports.UpdateFarmerMilkCollectionDetails = exports.CreateFarmerMilkCollectionDetails = exports.GetAllFarmerMilkCollectionDetails = void 0;
const DbConnection_1 = require("../db-config/DbConnection");
const entities = __importStar(require("../entities/Context"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
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
function GetAllFarmerMilkCollectionDetails(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let farmerMilkCollectionDetails;
            if (model.id) {
                farmerMilkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                    .createQueryBuilder("farmerMilkCollectionDetails")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.MilkCollectionId", "MilkCollectionId")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.TransporterVehicleId", "vehicle")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.RouteId", "route")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.CollectedBy", "collectedBy")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.CreatedBy", "CreatedBy")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.ModifiedBy", "ModifiedBy")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.DeletedBy", "deletedBy")
                    .where("farmerMilkCollectionDetails.Id = :id", { id: model.id })
                    .andWhere("farmerMilkCollectionDetails.IsActive = :isActive", {
                    isActive: true,
                })
                    .getMany();
            }
            else if (model.milkCollectionId) {
                farmerMilkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollectionDetails)
                    .createQueryBuilder("farmerMilkCollectionDetails")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.MilkCollectionId", "MilkCollectionId")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.TransporterVehicleId", "vehicle")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.RouteId", "route")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.CreatedBy", "CreatedBy")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.ModifiedBy", "ModifiedBy")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.DeletedBy", "deletedBy")
                    .where("farmerMilkCollectionDetails.MilkCollectionId = :milkCollectionId", {
                    milkCollectionId: model.milkCollectionId,
                })
                    .andWhere("farmerMilkCollectionDetails.IsActive = :isActive", {
                    isActive: true,
                })
                    .orderBy("farmerMilkCollectionDetails.SampleNumber")
                    .getMany();
            }
            else if (model.milkType) {
                farmerMilkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollectionDetails)
                    .createQueryBuilder("farmerMilkCollectionDetails")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.MilkCollectionId", "MilkCollectionId")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.TransporterVehicleId", "vehicle")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.RouteId", "route")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.CreatedBy", "CreatedBy")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.ModifiedBy", "ModifiedBy")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.DeletedBy", "deletedBy")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.CollectedBy", "collectedBy")
                    .where("farmerMilkCollectionDetails.MilkType = :milkType", {
                    milkType: model.milkType,
                })
                    .andWhere("farmerMilkCollectionDetails.IsActive = :isActive", {
                    isActive: true,
                })
                    .getMany();
            }
            else if (model.operationType) {
                farmerMilkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollectionDetails)
                    .createQueryBuilder("farmerMilkCollectionDetails")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.MilkCollectionId", "MilkCollectionId")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.TransporterVehicleId", "vehicle")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.RouteId", "route")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.CollectedBy", "collectedBy")
                    .where("farmerMilkCollectionDetails.OperationType = :operationType", {
                    operationType: model.operationType,
                })
                    .andWhere("farmerMilkCollectionDetails.IsActive = :isActive", {
                    isActive: true,
                })
                    .getMany();
            }
            else if (model.startDate && model.endDate && model.minFatLimit && model.minSnfLimit && model.bmcId) {
                farmerMilkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                    .createQueryBuilder("farmerMilkCollectionDetails")
                    .leftJoin("farmerMilkCollectionDetails.OrganizationUnitId", "agent")
                    .where("agent.ParentId =:parentId", { parentId: model.bmcId })
                    .andWhere("farmerMilkCollectionDetails.fat >= :minFatLimit", {
                    minFatLimit: model.minFatLimit,
                })
                    .andWhere("farmerMilkCollectionDetails.snf >= :minSnfLimit", {
                    minSnfLimit: model.minSnfLimit,
                })
                    .andWhere("DATE(farmerMilkCollectionDetails.CollectedAt) > :startDate", { startDate: model.startDate })
                    .andWhere("DATE(farmerMilkCollectionDetails.CollectedAt) < :endDate", { endDate: model.endDate })
                    .getMany();
            }
            else {
                farmerMilkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                    .createQueryBuilder("farmerMilkCollectionDetails")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.MilkCollectionId", "MilkCollectionId")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.TransporterVehicleId", "vehicle")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.RouteId", "route")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.CreatedBy", "CreatedBy")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.ModifiedBy", "ModifiedBy")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.DeletedBy", "deletedBy")
                    .leftJoinAndSelect("farmerMilkCollectionDetails.CollectedBy", "collectedBy")
                    .where("farmerMilkCollectionDetails.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const farmerMilkCollectionDetailsData = farmerMilkCollectionDetails.map((farmerMilkCollectionDetails) => ({
                id: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.Id,
                milkCollectionId: (farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.MilkCollectionId)
                    ? farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.MilkCollectionId.Id
                    : "",
                milkType: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.MilkType,
                collectionOperationType: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.CollectionOperationType,
                testingOperationType: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.TestingOperationType,
                fat: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.Fat,
                snf: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.Snf,
                clr: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.Clr,
                protein: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.Protein,
                lactose: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.Lactose,
                salt: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.Salt,
                water: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.Water,
                temperature: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.Temperature,
                sampleNumber: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.SampleNumber,
                weight: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.Weight,
                canCount: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.CanCount,
                organizationUnitId: (farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.OrganizationUnitId)
                    ? farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.OrganizationUnitId.Id
                    : 0,
                organizationUnitName: (farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.OrganizationUnitId)
                    ? farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.OrganizationUnitId.Name
                    : "",
                transporterVehicleId: (farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.TransporterVehicleId)
                    ? farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.TransporterVehicleId.Id
                    : 0,
                transporterVehicleName: (farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.TransporterVehicleId)
                    ? farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.TransporterVehicleId.VehicleType
                    : "",
                routeId: farmerMilkCollectionDetails.RouteId
                    ? farmerMilkCollectionDetails.RouteId.Id
                    : 0,
                routeName: farmerMilkCollectionDetails.RouteId
                    ? farmerMilkCollectionDetails.RouteId.RouteName
                    : "",
                collectedBy: farmerMilkCollectionDetails.CollectedBy ? farmerMilkCollectionDetails.CollectedBy.Id : 0,
                createdBy: farmerMilkCollectionDetails.CreatedBy ? farmerMilkCollectionDetails.CreatedBy.Id : 0,
                modifiedBy: farmerMilkCollectionDetails.ModifiedBy ? farmerMilkCollectionDetails.ModifiedBy.Id : 0,
                deletedBy: farmerMilkCollectionDetails.CollectedBy ? farmerMilkCollectionDetails.CollectedBy.Id : 0,
                collectedAt: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.CollectedAt,
                testedAt: farmerMilkCollectionDetails === null || farmerMilkCollectionDetails === void 0 ? void 0 : farmerMilkCollectionDetails.TestedAt,
                createdAt: farmerMilkCollectionDetails.CreatedAt,
                updatedAt: farmerMilkCollectionDetails.ModifiedAt,
                deletedAt: farmerMilkCollectionDetails.DeletedAt,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: farmerMilkCollectionDetailsData,
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
exports.GetAllFarmerMilkCollectionDetails = GetAllFarmerMilkCollectionDetails;
function CreateFarmerMilkCollectionDetails(req, model) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            for (const record of model) {
                const created = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :id", { id: record.createdBy })
                    .getOne();
                const updated = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :id", { id: record.modifiedBy })
                    .getOne();
                const deleted = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :id", { id: record.deletedBy })
                    .getOne();
                const farmerMilkCollection = yield DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollections)
                    .createQueryBuilder("farmerMilkCollection")
                    .where("farmerMilkCollection.Id = :id", { id: record.milkCollectionId })
                    .getOne();
                const organizationUnit = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizationUnit")
                    .where("organizationUnit.Id = :id", { id: record.organizationUnitId })
                    .getOne();
                const vehicle = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles)
                    .createQueryBuilder("vehcile")
                    .where("vehcile.Id = :id", { id: record.transporterVehicleId })
                    .getOne();
                const route = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                    .createQueryBuilder("route")
                    .where("route.Id = :id", { id: record.routeId })
                    .getOne();
                const repository = DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollectionDetails);
                const farmerMilkCollectionDetails = new entities.FarmerMilkCollectionDetails();
                farmerMilkCollectionDetails.Id = (_b = record.id) !== null && _b !== void 0 ? _b : farmerMilkCollectionDetails.Id;
                if (farmerMilkCollection) {
                    farmerMilkCollectionDetails.MilkCollectionId = farmerMilkCollection;
                }
                farmerMilkCollectionDetails.MilkType =
                    (_c = record.milkType) !== null && _c !== void 0 ? _c : farmerMilkCollectionDetails.MilkType;
                farmerMilkCollectionDetails.CollectionOperationType =
                    (_d = record.collectionOperationType) !== null && _d !== void 0 ? _d : farmerMilkCollectionDetails.CollectionOperationType;
                farmerMilkCollectionDetails.TestingOperationType =
                    (_e = record.testingOperationType) !== null && _e !== void 0 ? _e : farmerMilkCollectionDetails.TestingOperationType;
                farmerMilkCollectionDetails.Fat = (_f = record.fat) !== null && _f !== void 0 ? _f : farmerMilkCollectionDetails.Fat;
                farmerMilkCollectionDetails.Snf = (_g = record.snf) !== null && _g !== void 0 ? _g : farmerMilkCollectionDetails.Snf;
                farmerMilkCollectionDetails.Clr = (_h = record.clr) !== null && _h !== void 0 ? _h : farmerMilkCollectionDetails.Clr;
                farmerMilkCollectionDetails.Protein = (_j = record.protein) !== null && _j !== void 0 ? _j : farmerMilkCollectionDetails.Protein;
                farmerMilkCollectionDetails.Lactose = (_k = record.lactose) !== null && _k !== void 0 ? _k : farmerMilkCollectionDetails.Lactose;
                farmerMilkCollectionDetails.Salt = (_l = record.salt) !== null && _l !== void 0 ? _l : farmerMilkCollectionDetails.Salt;
                farmerMilkCollectionDetails.Water = (_m = record.water) !== null && _m !== void 0 ? _m : farmerMilkCollectionDetails.Water;
                farmerMilkCollectionDetails.Temperature = (_o = record.temperature) !== null && _o !== void 0 ? _o : farmerMilkCollectionDetails.Temperature;
                farmerMilkCollectionDetails.SampleNumber = (_p = record.sampleNumber) !== null && _p !== void 0 ? _p : farmerMilkCollectionDetails.SampleNumber;
                farmerMilkCollectionDetails.Weight = (_q = record.weight) !== null && _q !== void 0 ? _q : farmerMilkCollectionDetails.Weight;
                farmerMilkCollectionDetails.CanCount =
                    (_r = record.canCount) !== null && _r !== void 0 ? _r : farmerMilkCollectionDetails.CanCount;
                if (created) {
                    farmerMilkCollectionDetails.CreatedBy = created;
                }
                if (updated) {
                    farmerMilkCollectionDetails.ModifiedBy = updated;
                }
                if (deleted) {
                    farmerMilkCollectionDetails.DeletedBy = deleted;
                }
                if (organizationUnit) {
                    farmerMilkCollectionDetails.OrganizationUnitId = organizationUnit;
                }
                if (vehicle) {
                    farmerMilkCollectionDetails.TransporterVehicleId = vehicle;
                }
                if (route) {
                    farmerMilkCollectionDetails.RouteId = route;
                }
                farmerMilkCollectionDetails.CollectedAt =
                    (_s = record.collectedAt) !== null && _s !== void 0 ? _s : farmerMilkCollectionDetails.CollectedAt;
                farmerMilkCollectionDetails.TestedAt =
                    (_t = record.testedAt) !== null && _t !== void 0 ? _t : farmerMilkCollectionDetails.TestedAt;
                farmerMilkCollectionDetails.CreatedAt =
                    (_u = record.createdAt) !== null && _u !== void 0 ? _u : farmerMilkCollectionDetails.CreatedAt;
                farmerMilkCollectionDetails.ModifiedAt =
                    (_v = record.updatedAt) !== null && _v !== void 0 ? _v : farmerMilkCollectionDetails.ModifiedAt;
                farmerMilkCollectionDetails.DeletedAt =
                    (_w = record.deletedAt) !== null && _w !== void 0 ? _w : farmerMilkCollectionDetails.DeletedAt;
                farmerMilkCollectionDetails.CreatedBy = userId;
                yield repository.save(farmerMilkCollectionDetails);
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
exports.CreateFarmerMilkCollectionDetails = CreateFarmerMilkCollectionDetails;
function UpdateFarmerMilkCollectionDetails(req, model) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const uuid = (0, uuid_1.v4)();
            for (const record of model) {
                const created = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :id", { id: record.createdBy })
                    .getOne();
                const updated = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :id", { id: record.modifiedBy })
                    .getOne();
                const deleted = yield DbConnection_1.AppDataSource.getRepository(entities.User)
                    .createQueryBuilder("user")
                    .where("user.Id = :id", { id: record.deletedBy })
                    .getOne();
                const repository = DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollectionDetails);
                const farmerMilkCollectionDetails = yield repository.findOne({
                    where: { Id: (_b = record.id) !== null && _b !== void 0 ? _b : 0 },
                });
                const milkCollection = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollections)
                    .createQueryBuilder("milkCollection")
                    .where("milkCollection.Id = :id", { id: record.milkCollectionId })
                    .getOne();
                const organizationUnit = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizationUnit")
                    .where("organizationUnit.Id = :id", { id: record.organizationUnitId })
                    .getOne();
                const vehicle = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles)
                    .createQueryBuilder("vehcile")
                    .where("vehcile.Id = :id", { id: record.transporterVehicleId })
                    .getOne();
                const route = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                    .createQueryBuilder("route")
                    .where("route.Id = :id", { id: record.routeId })
                    .getOne();
                if (farmerMilkCollectionDetails) {
                    if (milkCollection) {
                        farmerMilkCollectionDetails.MilkCollectionId = milkCollection;
                    }
                    if (record.fat > 5.4) {
                        farmerMilkCollectionDetails.MilkType = "buffalo";
                    }
                    else {
                        farmerMilkCollectionDetails.MilkType = "cow";
                    }
                    // farmerMilkCollectionDetails.CollectionOperationType =
                    //   record.collectionOperationType ??
                    //   farmerMilkCollectionDetails.CollectionOperationType;
                    farmerMilkCollectionDetails.TestingOperationType =
                        (_c = record.testingOperationType) !== null && _c !== void 0 ? _c : farmerMilkCollectionDetails.TestingOperationType;
                    farmerMilkCollectionDetails.Fat = (_d = record.fat) !== null && _d !== void 0 ? _d : farmerMilkCollectionDetails.Fat;
                    farmerMilkCollectionDetails.Snf = (_f = parseFloat((_e = record === null || record === void 0 ? void 0 : record.snf) === null || _e === void 0 ? void 0 : _e.toFixed(1))) !== null && _f !== void 0 ? _f : farmerMilkCollectionDetails.Snf;
                    farmerMilkCollectionDetails.Clr = (_g = record.clr) !== null && _g !== void 0 ? _g : farmerMilkCollectionDetails.Clr;
                    farmerMilkCollectionDetails.Protein = (_h = record.protein) !== null && _h !== void 0 ? _h : farmerMilkCollectionDetails.Protein;
                    farmerMilkCollectionDetails.Lactose = (_j = record.lactose) !== null && _j !== void 0 ? _j : farmerMilkCollectionDetails.Lactose;
                    farmerMilkCollectionDetails.Salt = (_k = record.salt) !== null && _k !== void 0 ? _k : farmerMilkCollectionDetails.Salt;
                    farmerMilkCollectionDetails.Water = (_l = record.water) !== null && _l !== void 0 ? _l : farmerMilkCollectionDetails.Water;
                    farmerMilkCollectionDetails.Temperature = (_m = record.temperature) !== null && _m !== void 0 ? _m : farmerMilkCollectionDetails.Temperature;
                    farmerMilkCollectionDetails.SampleNumber = (_o = record.sampleNumber) !== null && _o !== void 0 ? _o : farmerMilkCollectionDetails.SampleNumber;
                    farmerMilkCollectionDetails.Weight =
                        (_p = record.weight) !== null && _p !== void 0 ? _p : farmerMilkCollectionDetails.Weight;
                    farmerMilkCollectionDetails.CanCount =
                        (_q = record.canCount) !== null && _q !== void 0 ? _q : farmerMilkCollectionDetails.CanCount;
                    if (created) {
                        farmerMilkCollectionDetails.CreatedBy = created;
                    }
                    if (updated) {
                        farmerMilkCollectionDetails.ModifiedBy = updated;
                    }
                    if (deleted) {
                        farmerMilkCollectionDetails.DeletedBy = deleted;
                    }
                    if (organizationUnit) {
                        farmerMilkCollectionDetails.OrganizationUnitId = organizationUnit;
                    }
                    if (vehicle) {
                        farmerMilkCollectionDetails.TransporterVehicleId = vehicle;
                    }
                    if (route) {
                        farmerMilkCollectionDetails.RouteId = route;
                    }
                    farmerMilkCollectionDetails.CollectedAt =
                        (_r = record.collectedAt) !== null && _r !== void 0 ? _r : farmerMilkCollectionDetails.CollectedAt;
                    farmerMilkCollectionDetails.TestedAt =
                        (_s = record.testedAt) !== null && _s !== void 0 ? _s : farmerMilkCollectionDetails.TestedAt;
                    farmerMilkCollectionDetails.CreatedAt =
                        (_t = record.createdAt) !== null && _t !== void 0 ? _t : farmerMilkCollectionDetails.CreatedAt;
                    farmerMilkCollectionDetails.ModifiedAt =
                        (_u = record.updatedAt) !== null && _u !== void 0 ? _u : farmerMilkCollectionDetails.ModifiedAt;
                    farmerMilkCollectionDetails.DeletedAt =
                        (_v = record.deletedAt) !== null && _v !== void 0 ? _v : farmerMilkCollectionDetails.DeletedAt;
                    farmerMilkCollectionDetails.ModifiedBy = userId;
                    yield repository.save(farmerMilkCollectionDetails);
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
exports.UpdateFarmerMilkCollectionDetails = UpdateFarmerMilkCollectionDetails;
function DeleteFarmerMilkCollectionDetails(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.FarmerMilkCollectionDetails);
            const farmerMilkCollectionDetail = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (farmerMilkCollectionDetail) {
                farmerMilkCollectionDetail.IsActive = false;
                farmerMilkCollectionDetail.DeletedAt = new Date();
                farmerMilkCollectionDetail.DeletedBy = userId;
                yield repository.remove(farmerMilkCollectionDetail);
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
exports.DeleteFarmerMilkCollectionDetails = DeleteFarmerMilkCollectionDetails;
