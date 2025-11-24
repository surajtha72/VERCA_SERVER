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
exports.DeleteMilkCollectionDetails = exports.UpdateMilkCollectionDetails = exports.CreateMilkCollectionDetails = exports.GetAllMilkCollectionDetails = void 0;
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
function GetAllMilkCollectionDetails(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let milkCollectionDetails;
            if (model.id) {
                milkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                    .createQueryBuilder("milkCollectionDetails")
                    .leftJoinAndSelect("milkCollectionDetails.MilkCollectionId", "MilkCollectionId")
                    .leftJoinAndSelect("milkCollectionDetails.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("milkCollectionDetails.TransporterVehicleId", "vehicle")
                    .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
                    .leftJoinAndSelect("milkCollectionDetails.CollectedBy", "collectedBy")
                    .leftJoinAndSelect("milkCollectionDetails.CreatedBy", "CreatedBy")
                    .leftJoinAndSelect("milkCollectionDetails.ModifiedBy", "ModifiedBy")
                    .leftJoinAndSelect("milkCollectionDetails.DeletedBy", "deletedBy")
                    .where("milkCollectionDetails.Id = :id", { id: model.id })
                    .andWhere("milkCollectionDetails.IsActive = :isActive", {
                    isActive: true,
                })
                    .getMany();
            }
            else if (model.milkCollectionId) {
                milkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                    .createQueryBuilder("milkCollectionDetails")
                    .leftJoinAndSelect("milkCollectionDetails.MilkCollectionId", "MilkCollectionId")
                    .leftJoinAndSelect("milkCollectionDetails.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("milkCollectionDetails.TransporterVehicleId", "vehicle")
                    .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
                    .leftJoinAndSelect("milkCollectionDetails.CreatedBy", "CreatedBy")
                    .leftJoinAndSelect("milkCollectionDetails.ModifiedBy", "ModifiedBy")
                    .leftJoinAndSelect("milkCollectionDetails.DeletedBy", "deletedBy")
                    .where("milkCollectionDetails.MilkCollectionId = :milkCollectionId", {
                    milkCollectionId: model.milkCollectionId,
                })
                    .andWhere("milkCollectionDetails.IsActive = :isActive", {
                    isActive: true,
                })
                    .orderBy("milkCollectionDetails.SampleNumber")
                    .getMany();
            }
            else if (model.milkType) {
                milkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                    .createQueryBuilder("milkCollectionDetails")
                    .leftJoinAndSelect("milkCollectionDetails.MilkCollectionId", "MilkCollectionId")
                    .leftJoinAndSelect("milkCollectionDetails.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("milkCollectionDetails.TransporterVehicleId", "vehicle")
                    .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
                    .leftJoinAndSelect("milkCollectionDetails.CreatedBy", "CreatedBy")
                    .leftJoinAndSelect("milkCollectionDetails.ModifiedBy", "ModifiedBy")
                    .leftJoinAndSelect("milkCollectionDetails.DeletedBy", "deletedBy")
                    .leftJoinAndSelect("milkCollectionDetails.CollectedBy", "collectedBy")
                    .where("milkCollectionDetails.MilkType = :milkType", {
                    milkType: model.milkType,
                })
                    .andWhere("milkCollectionDetails.IsActive = :isActive", {
                    isActive: true,
                })
                    .getMany();
            }
            else if (model.operationType) {
                milkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                    .createQueryBuilder("milkCollectionDetails")
                    .leftJoinAndSelect("milkCollectionDetails.MilkCollectionId", "MilkCollectionId")
                    .leftJoinAndSelect("milkCollectionDetails.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("milkCollectionDetails.TransporterVehicleId", "vehicle")
                    .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
                    .leftJoinAndSelect("milkCollectionDetails.CollectedBy", "collectedBy")
                    .where("milkCollectionDetails.OperationType = :operationType", {
                    operationType: model.operationType,
                })
                    .andWhere("milkCollectionDetails.IsActive = :isActive", {
                    isActive: true,
                })
                    .getMany();
            }
            else if (model.startDate && model.endDate && model.minFatLimit && model.minSnfLimit && model.bmcId) {
                milkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                    .createQueryBuilder("milkCollectionDetails")
                    .leftJoin("milkCollectionDetails.OrganizationUnitId", "agent")
                    .where("agent.ParentId =:parentId", { parentId: model.bmcId })
                    .andWhere("milkCollectionDetails.fat >= :minFatLimit", {
                    minFatLimit: model.minFatLimit,
                })
                    .andWhere("milkCollectionDetails.snf >= :minSnfLimit", {
                    minSnfLimit: model.minSnfLimit,
                })
                    .andWhere("DATE(milkCollectionDetails.CollectedAt) > :startDate", { startDate: model.startDate })
                    .andWhere("DATE(milkCollectionDetails.CollectedAt) < :endDate", { endDate: model.endDate })
                    .getMany();
            }
            else {
                milkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                    .createQueryBuilder("milkCollectionDetails")
                    .leftJoinAndSelect("milkCollectionDetails.MilkCollectionId", "MilkCollectionId")
                    .leftJoinAndSelect("milkCollectionDetails.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("milkCollectionDetails.TransporterVehicleId", "vehicle")
                    .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
                    .leftJoinAndSelect("milkCollectionDetails.CreatedBy", "CreatedBy")
                    .leftJoinAndSelect("milkCollectionDetails.ModifiedBy", "ModifiedBy")
                    .leftJoinAndSelect("milkCollectionDetails.DeletedBy", "deletedBy")
                    .leftJoinAndSelect("milkCollectionDetails.CollectedBy", "collectedBy")
                    .where("milkCollectionDetails.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const milkCollectionDetailsData = milkCollectionDetails.map((milkCollectionDetails) => ({
                id: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.Id,
                milkCollectionId: (milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.MilkCollectionId)
                    ? milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.MilkCollectionId.Id
                    : "",
                milkType: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.MilkType,
                collectionOperationType: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.CollectionOperationType,
                testingOperationType: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.TestingOperationType,
                fat: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.Fat,
                snf: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.Snf,
                clr: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.Clr,
                protein: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.Protein,
                lactose: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.Lactose,
                salt: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.Salt,
                water: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.Water,
                temperature: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.Temperature,
                sampleNumber: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.SampleNumber,
                weight: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.Weight,
                canCount: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.CanCount,
                organizationUnitId: (milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.OrganizationUnitId)
                    ? milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.OrganizationUnitId.Id
                    : 0,
                organizationUnitName: (milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.OrganizationUnitId)
                    ? milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.OrganizationUnitId.Name
                    : "",
                transporterVehicleId: (milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.TransporterVehicleId)
                    ? milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.TransporterVehicleId.Id
                    : 0,
                transporterVehicleName: (milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.TransporterVehicleId)
                    ? milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.TransporterVehicleId.VehicleType
                    : "",
                routeId: milkCollectionDetails.RouteId
                    ? milkCollectionDetails.RouteId.Id
                    : 0,
                routeName: milkCollectionDetails.RouteId
                    ? milkCollectionDetails.RouteId.RouteName
                    : "",
                collectedBy: milkCollectionDetails.CollectedBy ? milkCollectionDetails.CollectedBy.Id : 0,
                createdBy: milkCollectionDetails.CreatedBy ? milkCollectionDetails.CreatedBy.Id : 0,
                modifiedBy: milkCollectionDetails.ModifiedBy ? milkCollectionDetails.ModifiedBy.Id : 0,
                deletedBy: milkCollectionDetails.CollectedBy ? milkCollectionDetails.CollectedBy.Id : 0,
                collectedAt: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.CollectedAt,
                testedAt: milkCollectionDetails === null || milkCollectionDetails === void 0 ? void 0 : milkCollectionDetails.TestedAt,
                createdAt: milkCollectionDetails.CreatedAt,
                updatedAt: milkCollectionDetails.ModifiedAt,
                deletedAt: milkCollectionDetails.DeletedAt,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: milkCollectionDetailsData,
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
exports.GetAllMilkCollectionDetails = GetAllMilkCollectionDetails;
function CreateMilkCollectionDetails(req, model) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
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
                const milkCollection = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollections)
                    .createQueryBuilder("milkCollection")
                    .where("milkCollection.Id = :id", { id: record.milkCollectionId })
                    .getOne();
                if (!milkCollection) {
                    return {
                        status: 400,
                        message: "MILK COLLECTION DOESN'T EXIST",
                        data: null,
                    };
                }
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
                const repository = DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails);
                const milkCollectionDetails = new entities.MilkCollectionDetails();
                milkCollectionDetails.Id = record.id;
                if (milkCollection) {
                    milkCollectionDetails.MilkCollectionId = milkCollection;
                }
                if (record.fat > 5.4) {
                    milkCollectionDetails.MilkType = "buffalo";
                }
                else {
                    milkCollectionDetails.MilkType = "cow";
                }
                milkCollectionDetails.CollectionOperationType =
                    (_b = record.collectionOperationType) !== null && _b !== void 0 ? _b : milkCollectionDetails.CollectionOperationType;
                milkCollectionDetails.TestingOperationType =
                    (_c = record.testingOperationType) !== null && _c !== void 0 ? _c : milkCollectionDetails.TestingOperationType;
                milkCollectionDetails.Fat = (_d = record.fat) !== null && _d !== void 0 ? _d : milkCollectionDetails.Fat;
                milkCollectionDetails.Snf = (_e = record.snf) !== null && _e !== void 0 ? _e : milkCollectionDetails.Snf;
                milkCollectionDetails.Clr = (_f = record.clr) !== null && _f !== void 0 ? _f : milkCollectionDetails.Clr;
                milkCollectionDetails.Protein = (_g = record.protein) !== null && _g !== void 0 ? _g : milkCollectionDetails.Protein;
                milkCollectionDetails.Lactose = (_h = record.lactose) !== null && _h !== void 0 ? _h : milkCollectionDetails.Lactose;
                milkCollectionDetails.Salt = (_j = record.salt) !== null && _j !== void 0 ? _j : milkCollectionDetails.Salt;
                milkCollectionDetails.Water = (_k = record.water) !== null && _k !== void 0 ? _k : milkCollectionDetails.Water;
                milkCollectionDetails.Temperature = (_l = record.temperature) !== null && _l !== void 0 ? _l : milkCollectionDetails.Temperature;
                milkCollectionDetails.SampleNumber = (_m = record.sampleNumber) !== null && _m !== void 0 ? _m : milkCollectionDetails.SampleNumber;
                milkCollectionDetails.Weight = (_o = record.weight) !== null && _o !== void 0 ? _o : milkCollectionDetails.Weight;
                milkCollectionDetails.CanCount =
                    (_p = record.canCount) !== null && _p !== void 0 ? _p : milkCollectionDetails.CanCount;
                if (created) {
                    milkCollectionDetails.CreatedBy = created;
                }
                if (updated) {
                    milkCollectionDetails.ModifiedBy = updated;
                }
                if (deleted) {
                    milkCollectionDetails.DeletedBy = deleted;
                }
                if (organizationUnit) {
                    milkCollectionDetails.OrganizationUnitId = organizationUnit;
                }
                if (vehicle) {
                    milkCollectionDetails.TransporterVehicleId = vehicle;
                }
                if (route) {
                    milkCollectionDetails.RouteId = route;
                }
                milkCollectionDetails.CollectedAt =
                    (_q = record.collectedAt) !== null && _q !== void 0 ? _q : milkCollectionDetails.CollectedAt;
                milkCollectionDetails.TestedAt =
                    (_r = record.testedAt) !== null && _r !== void 0 ? _r : milkCollectionDetails.TestedAt;
                milkCollectionDetails.CreatedAt =
                    (_s = record.createdAt) !== null && _s !== void 0 ? _s : milkCollectionDetails.CreatedAt;
                milkCollectionDetails.ModifiedAt =
                    (_t = record.updatedAt) !== null && _t !== void 0 ? _t : milkCollectionDetails.ModifiedAt;
                milkCollectionDetails.DeletedAt =
                    (_u = record.deletedAt) !== null && _u !== void 0 ? _u : milkCollectionDetails.DeletedAt;
                milkCollectionDetails.CreatedBy = userId;
                yield repository.save(milkCollectionDetails);
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
exports.CreateMilkCollectionDetails = CreateMilkCollectionDetails;
function UpdateMilkCollectionDetails(req, model) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
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
                const repository = DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails);
                const milkCollectionDetails = yield repository.findOne({
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
                if (milkCollectionDetails) {
                    if (milkCollection) {
                        milkCollectionDetails.MilkCollectionId = milkCollection;
                    }
                    if (record.fat > 5.4) {
                        milkCollectionDetails.MilkType = "buffalo";
                    }
                    else {
                        milkCollectionDetails.MilkType = "cow";
                    }
                    // milkCollectionDetails.CollectionOperationType =
                    //   record.collectionOperationType ??
                    //   milkCollectionDetails.CollectionOperationType;
                    milkCollectionDetails.TestingOperationType =
                        (_c = record.testingOperationType) !== null && _c !== void 0 ? _c : milkCollectionDetails.TestingOperationType;
                    milkCollectionDetails.Fat = (_d = record.fat) !== null && _d !== void 0 ? _d : milkCollectionDetails.Fat;
                    //milkCollectionDetails.Snf = parseFloat(record?.snf?.toFixed(1)) ?? milkCollectionDetails.Snf;
                    milkCollectionDetails.Snf = (_e = Math.trunc((Math.round((record === null || record === void 0 ? void 0 : record.snf) * 100) / 100) * 10) / 10) !== null && _e !== void 0 ? _e : milkCollectionDetails.Snf;
                    milkCollectionDetails.Clr = (_f = record.clr) !== null && _f !== void 0 ? _f : milkCollectionDetails.Clr;
                    milkCollectionDetails.Protein = (_g = record.protein) !== null && _g !== void 0 ? _g : milkCollectionDetails.Protein;
                    milkCollectionDetails.Lactose = (_h = record.lactose) !== null && _h !== void 0 ? _h : milkCollectionDetails.Lactose;
                    milkCollectionDetails.Salt = (_j = record.salt) !== null && _j !== void 0 ? _j : milkCollectionDetails.Salt;
                    milkCollectionDetails.Water = (_k = record.water) !== null && _k !== void 0 ? _k : milkCollectionDetails.Water;
                    milkCollectionDetails.Temperature = (_l = record.temperature) !== null && _l !== void 0 ? _l : milkCollectionDetails.Temperature;
                    milkCollectionDetails.SampleNumber = (_m = record.sampleNumber) !== null && _m !== void 0 ? _m : milkCollectionDetails.SampleNumber;
                    milkCollectionDetails.Weight =
                        (_o = record.weight) !== null && _o !== void 0 ? _o : milkCollectionDetails.Weight;
                    milkCollectionDetails.CanCount =
                        (_p = record.canCount) !== null && _p !== void 0 ? _p : milkCollectionDetails.CanCount;
                    if (created) {
                        milkCollectionDetails.CreatedBy = created;
                    }
                    if (updated) {
                        milkCollectionDetails.ModifiedBy = updated;
                    }
                    if (deleted) {
                        milkCollectionDetails.DeletedBy = deleted;
                    }
                    if (organizationUnit) {
                        milkCollectionDetails.OrganizationUnitId = organizationUnit;
                    }
                    if (vehicle) {
                        milkCollectionDetails.TransporterVehicleId = vehicle;
                    }
                    if (route) {
                        milkCollectionDetails.RouteId = route;
                    }
                    milkCollectionDetails.CollectedAt =
                        (_q = record.collectedAt) !== null && _q !== void 0 ? _q : milkCollectionDetails.CollectedAt;
                    milkCollectionDetails.TestedAt =
                        (_r = record.testedAt) !== null && _r !== void 0 ? _r : milkCollectionDetails.TestedAt;
                    milkCollectionDetails.CreatedAt =
                        (_s = record.createdAt) !== null && _s !== void 0 ? _s : milkCollectionDetails.CreatedAt;
                    milkCollectionDetails.ModifiedAt =
                        (_t = record.updatedAt) !== null && _t !== void 0 ? _t : milkCollectionDetails.ModifiedAt;
                    milkCollectionDetails.DeletedAt =
                        (_u = record.deletedAt) !== null && _u !== void 0 ? _u : milkCollectionDetails.DeletedAt;
                    milkCollectionDetails.ModifiedBy = userId;
                    yield repository.save(milkCollectionDetails);
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
exports.UpdateMilkCollectionDetails = UpdateMilkCollectionDetails;
function DeleteMilkCollectionDetails(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails);
            const milkCollectionDetail = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (milkCollectionDetail) {
                milkCollectionDetail.IsActive = false;
                milkCollectionDetail.DeletedAt = new Date();
                milkCollectionDetail.DeletedBy = userId;
                yield repository.remove(milkCollectionDetail);
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
exports.DeleteMilkCollectionDetails = DeleteMilkCollectionDetails;
