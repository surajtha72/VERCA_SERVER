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
exports.DeleteContract = exports.UpdateContract = exports.CreateContract = exports.GetAllContract = void 0;
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
function GetAllContract(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let contract;
            if (model.TransporterId) {
                contract = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterContracts)
                    .createQueryBuilder("contract")
                    .leftJoinAndSelect("contract.TransporterId", "transporter")
                    .leftJoinAndSelect("contract.RouteId", "route")
                    .leftJoinAndSelect("contract.VehicleId", "vehicle")
                    .where("transporter.Id = :id", { id: model.TransporterId })
                    .andWhere("contract.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                contract = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterContracts)
                    .createQueryBuilder("contract")
                    .leftJoinAndSelect("contract.TransporterId", "transporter")
                    .leftJoinAndSelect("contract.RouteId", "route")
                    .leftJoinAndSelect("contract.VehicleId", "vehicle")
                    .where("contract.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const contractData = contract.map((contract) => ({
                id: contract.Id,
                transporterId: contract === null || contract === void 0 ? void 0 : contract.TransporterId.Id,
                routeId: contract === null || contract === void 0 ? void 0 : contract.RouteId,
                vehicleId: contract === null || contract === void 0 ? void 0 : contract.VehicleId,
                startDate: contract === null || contract === void 0 ? void 0 : contract.StartDate,
                endDate: contract === null || contract === void 0 ? void 0 : contract.EndDate,
                payTerms: contract === null || contract === void 0 ? void 0 : contract.PayTerms,
                payAmount: contract === null || contract === void 0 ? void 0 : contract.PayAmount,
                addlChargeType: contract === null || contract === void 0 ? void 0 : contract.AddlChargeType,
                addlChargeAmount: contract === null || contract === void 0 ? void 0 : contract.AddlChargeAmount,
                status: contract === null || contract === void 0 ? void 0 : contract.Status,
                isActive: contract === null || contract === void 0 ? void 0 : contract.IsActive,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: contractData,
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
exports.GetAllContract = GetAllContract;
function CreateContract(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const transporterId = yield DbConnection_1.AppDataSource.getRepository(entities.Transporters)
                .createQueryBuilder("transporter")
                .where("transporter.Id = :id", { id: model.transporterId })
                .getOne();
            const routeId = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                .createQueryBuilder("route")
                .where("route.Id = :id", { id: model.routeId })
                .getOne();
            const vehicleId = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles)
                .createQueryBuilder("vehicle")
                .where("vehicle.Id = :id", { id: model.vehicleId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.TransporterContracts);
            const contract = new entities.TransporterContracts();
            if (transporterId) {
                contract.TransporterId = transporterId;
            }
            if (routeId) {
                contract.RouteId = routeId;
            }
            if (vehicleId) {
                contract.VehicleId = vehicleId;
            }
            contract.StartDate = model.startDate
                ? model.startDate
                : contract.StartDate;
            contract.EndDate = model.endDate ? model.endDate : contract.EndDate;
            contract.PayTerms = model.payTerms ? model.payTerms : contract.PayTerms;
            contract.PayAmount = model.payAmount
                ? model.payAmount
                : contract.PayAmount;
            contract.AddlChargeType = model.addlChargeType
                ? model.addlChargeType
                : contract.AddlChargeType;
            contract.AddlChargeAmount = model.addlChargeAmount
                ? model.addlChargeAmount
                : contract.AddlChargeAmount;
            contract.Status = model.status ? model.status : contract.Status;
            contract.IsActive = model.isActive ? model.isActive : contract.IsActive;
            contract.CreatedAt = new Date();
            contract.CreatedBy = userId;
            yield repository.save(contract);
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
exports.CreateContract = CreateContract;
function UpdateContract(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.TransporterContracts);
            const contract = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
                relations: ["TransporterId", "RouteId", "VehicleId"]
            });
            // console.log(model.id, contract);
            if (contract) {
                const transporterId = yield DbConnection_1.AppDataSource.getRepository(entities.Transporters)
                    .createQueryBuilder("transporter")
                    .where("transporter.Id = :id", { id: model.transporterId })
                    .getOne();
                const routeId = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                    .createQueryBuilder("route")
                    .where("route.Id = :id", { id: model.routeId })
                    .getOne();
                const vehicleId = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles)
                    .createQueryBuilder("vehicle")
                    .where("vehicle.Id = :id", { id: model.vehicleId })
                    .getOne();
                if (transporterId) {
                    contract.TransporterId = transporterId;
                }
                if (routeId) {
                    contract.RouteId = routeId;
                }
                if (vehicleId) {
                    contract.VehicleId = vehicleId;
                }
                contract.StartDate = model.startDate
                    ? model.startDate
                    : contract.StartDate;
                contract.EndDate = model.endDate ? model.endDate : contract.EndDate;
                contract.PayTerms = model.payTerms ? model.payTerms : contract.PayTerms;
                contract.PayAmount = model.payAmount
                    ? model.payAmount
                    : contract.PayAmount;
                contract.AddlChargeType = model.addlChargeType
                    ? model.addlChargeType
                    : contract.AddlChargeType;
                contract.AddlChargeAmount = model.addlChargeAmount
                    ? model.addlChargeAmount
                    : contract.AddlChargeAmount;
                contract.Status = model.status ? model.status : contract.Status;
                contract.IsActive = model.isActive ? model.isActive : contract.IsActive;
                contract.ModifiedAt = new Date();
                contract.ModifiedBy = userId;
                yield repository.save(contract);
                return {
                    status: 200,
                    message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
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
exports.UpdateContract = UpdateContract;
function DeleteContract(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.TransporterContracts);
            const contract = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (contract) {
                contract.IsActive = false;
                contract.DeletedAt = new Date();
                contract.DeletedBy = userId;
                yield repository.save(contract);
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
exports.DeleteContract = DeleteContract;
