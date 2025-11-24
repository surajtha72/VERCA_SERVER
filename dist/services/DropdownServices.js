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
exports.GetShifts = exports.GetDefaultCollectionType = exports.GetOrganizationUnitTypes = exports.GetPayrollTypes = void 0;
const DbConnection_1 = require("../db-config/DbConnection");
const entities = __importStar(require("../entities/Context"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ERROR_MESSAGES = {
    INTERNAL_SERVER: "Internal Server Error",
};
const SUCCESS_MESSAGES = {
    SUCCESS: "Success",
};
function GetPayrollTypes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payroll = yield DbConnection_1.AppDataSource.getRepository(entities.PayrollTypes)
                .createQueryBuilder("payrollTypes")
                .where("payrollTypes.IsActive = :isActive", { isActive: true })
                .getMany();
            const payrollData = payroll.map((payroll) => ({
                id: payroll.Id,
                name: payroll.Name,
                shortName: payroll.ShortName,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: payrollData,
            };
        }
        catch (error) {
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.GetPayrollTypes = GetPayrollTypes;
function GetDefaultCollectionType() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const defaultCollection = yield DbConnection_1.AppDataSource.getRepository(entities.DefaultCollectionType)
                .createQueryBuilder("defaultCollection")
                .where("defaultCollection.IsActive = :isActive", { isActive: true })
                .getMany();
            const defaultCollectionData = defaultCollection.map((defaultCollection) => ({
                id: defaultCollection.Id,
                name: defaultCollection.Name,
                shortName: defaultCollection.ShortName,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: defaultCollectionData,
            };
        }
        catch (error) {
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.GetDefaultCollectionType = GetDefaultCollectionType;
function GetOrganizationUnitTypes(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let organizationTypes;
            const isProcurementCenter = model.isProcurementCenter === 'true';
            if (model.isProcurementCenter) {
                organizationTypes = yield DbConnection_1.AppDataSource.getRepository(entities.OrganizationUnitType)
                    .createQueryBuilder("organization")
                    .where("organization.IsActive = :isActive", { isActive: true })
                    .andWhere("organization.IsProcurementCenter = :isProcurementCenter", { isProcurementCenter })
                    .getMany();
            }
            else {
                organizationTypes = yield DbConnection_1.AppDataSource.getRepository(entities.OrganizationUnitType)
                    .createQueryBuilder("organization")
                    .where("organization.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const organizationTypesData = organizationTypes.map((organizationTypes) => ({
                id: organizationTypes.Id,
                name: organizationTypes.Name,
                shortName: organizationTypes.ShortName,
                isProcurementCenter: organizationTypes.IsProcurementCenter
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: organizationTypesData,
            };
        }
        catch (error) {
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.GetOrganizationUnitTypes = GetOrganizationUnitTypes;
function GetShifts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const shifts = yield DbConnection_1.AppDataSource.getRepository(entities.Shifts)
                .createQueryBuilder("shifts")
                .where("shifts.IsActive = :isActive", { isActive: true })
                .getMany();
            const shiftData = shifts.map((shifts) => ({
                id: shifts.Id,
                name: shifts.Name,
                index: shifts.Index,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: shiftData,
            };
        }
        catch (error) {
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.GetShifts = GetShifts;
