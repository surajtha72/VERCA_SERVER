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
exports.DeleteVehicle = exports.UpdateVehicle = exports.CreateVehicle = exports.GetAllVehicles = void 0;
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
function GetAllVehicles(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let vehicle;
            if (model.TransporterId) {
                vehicle = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles)
                    .createQueryBuilder("vehicle")
                    .leftJoinAndSelect("vehicle.TransporterId", "transporter")
                    .where("transporter.Id = :id", { id: model.TransporterId })
                    .andWhere("vehicle.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.vehicleNo) {
                vehicle = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles)
                    .createQueryBuilder("vehicle")
                    // .leftJoinAndSelect("vehicle.TransporterId", "transporter")
                    .where("vehicle.RegistrationNo = :id", { id: model.vehicleNo })
                    .andWhere("vehicle.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                vehicle = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles)
                    .createQueryBuilder("vehicle")
                    .leftJoinAndSelect("vehicle.TransporterId", "transporter")
                    .where("vehicle.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            // console.log("#################################",vehicle);
            const vehicleData = vehicle.map((vehicle) => ({
                id: vehicle.Id,
                transporterId: vehicle.TransporterId,
                isFoodTransferVehicle: vehicle.IsFoodTransportVehicle,
                vehicleType: vehicle.VehicleType,
                registrationNumber: vehicle.RegistrationNo,
                make: vehicle.Make,
                model: vehicle.Model,
                capacity: Number(vehicle.Capacity),
                FSSAILicNo: vehicle.FSSAILicNo,
                FSSAILicExpiryDate: vehicle.FSSAILicExpiryDate,
                insurance: vehicle.Insurance,
                insuranceExpiryDate: vehicle.InsuranceExpiryDate,
                isActive: vehicle.IsActive
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: vehicleData,
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
exports.GetAllVehicles = GetAllVehicles;
function CreateVehicle(req, model) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles);
            const transporterId = yield DbConnection_1.AppDataSource.getRepository(entities.Transporters)
                .createQueryBuilder("transporter")
                .where("transporter.Id = :id", { id: model.transporterId })
                .getOne();
            const vehicle = new entities.TransporterVehicles();
            if (transporterId) {
                vehicle.TransporterId = transporterId;
            }
            // vehicle.TransporterId = new entities.Transporters();
            // vehicle.TransporterId.Id = model.transporterId ?? vehicle.TransporterId;
            vehicle.IsFoodTransportVehicle = (_b = model.isFoodTransferVehicle) !== null && _b !== void 0 ? _b : vehicle.IsFoodTransportVehicle;
            vehicle.VehicleType = (_c = model.vehicleType) !== null && _c !== void 0 ? _c : vehicle.VehicleType;
            vehicle.RegistrationNo = (_d = model.registrationNumber) !== null && _d !== void 0 ? _d : vehicle.RegistrationNo;
            vehicle.Make = (_e = model.make) !== null && _e !== void 0 ? _e : vehicle.Make;
            vehicle.Model = (_f = model.model) !== null && _f !== void 0 ? _f : vehicle.Model;
            vehicle.Capacity = (_g = model.capacity) !== null && _g !== void 0 ? _g : vehicle.Capacity;
            vehicle.FSSAILicNo = (_h = model.FSSAILicNo) !== null && _h !== void 0 ? _h : vehicle.FSSAILicNo;
            vehicle.FSSAILicExpiryDate = (_j = model.insuranceExpiryDate) !== null && _j !== void 0 ? _j : vehicle.FSSAILicExpiryDate;
            vehicle.Insurance = (_k = model.insurance) !== null && _k !== void 0 ? _k : vehicle.Insurance;
            vehicle.InsuranceExpiryDate = (_l = model.insuranceExpiryDate) !== null && _l !== void 0 ? _l : vehicle.InsuranceExpiryDate;
            vehicle.CreatedAt = new Date();
            vehicle.CreatedBy = userId;
            yield repository.save(vehicle);
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
exports.CreateVehicle = CreateVehicle;
function UpdateVehicle(req, model) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles);
            const vehicle = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 }
            });
            // console.log('model: ', model);
            const transporterId = yield DbConnection_1.AppDataSource.getRepository(entities.Transporters)
                .createQueryBuilder("transporters")
                .where("transporters.Id = :id", { id: model.transporterId.Id })
                .getOne();
            if (vehicle) {
                if (transporterId) {
                    vehicle.TransporterId = transporterId;
                }
                vehicle.IsFoodTransportVehicle = (_c = model.isFoodTransferVehicle) !== null && _c !== void 0 ? _c : vehicle.IsFoodTransportVehicle;
                vehicle.VehicleType = model.vehicleType ? model.vehicleType : vehicle.VehicleType;
                vehicle.RegistrationNo = model.registrationNumber ? model.registrationNumber : vehicle.RegistrationNo;
                vehicle.Make = model.make ? model.make : vehicle.Make;
                vehicle.Model = model.model ? model.model : vehicle.Model;
                vehicle.Capacity = model.capacity ? model.capacity : vehicle.Capacity;
                vehicle.FSSAILicNo = model.FSSAILicNo ? model.FSSAILicNo : vehicle.FSSAILicNo;
                vehicle.FSSAILicExpiryDate = model.FSSAILicExpiryDate ? model.insuranceExpiryDate : vehicle.FSSAILicExpiryDate;
                vehicle.Insurance = model.insurance ? model.insurance : vehicle.Insurance;
                vehicle.InsuranceExpiryDate = model.insuranceExpiryDate ? model.insuranceExpiryDate : vehicle.InsuranceExpiryDate;
                vehicle.ModifiedAt = new Date();
                vehicle.ModifiedBy = userId;
                yield repository.save(vehicle);
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
exports.UpdateVehicle = UpdateVehicle;
function DeleteVehicle(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles);
            const vehicle = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (vehicle) {
                vehicle.IsActive = false;
                vehicle.DeletedAt = new Date();
                vehicle.DeletedBy = userId;
                yield repository.save(vehicle);
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
exports.DeleteVehicle = DeleteVehicle;
