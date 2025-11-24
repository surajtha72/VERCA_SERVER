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
exports.DeleteManualEntry = exports.UpdateManualEntry = exports.CreateManualEntry = exports.GetManualEntry = void 0;
const DbConnection_1 = require("../db-config/DbConnection");
const entities = __importStar(require("../entities/Context"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ERROR_MESSAGES = {
    NO_DATA: "No Data",
    INTERNAL_SERVER: "Internal Server Error"
};
const SUCCESS_MESSAGES = {
    REGISTER_SUCCESS: "Registration Successful",
    SUCCESS: "Success",
    ADD_SUCCESSS: "Add Successfully",
    UPDATE_SUCCESS: "Approved Successfully",
    DELETE_SUCCESS: "Deleted Successfully"
};
function GetManualEntry(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let manualEntry;
            if (model.organizationUnitId) {
                manualEntry = yield DbConnection_1.AppDataSource.getRepository(entities.ManualEntry)
                    .createQueryBuilder("allowManualEntry")
                    .leftJoinAndSelect("allowManualEntry.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("allowManualEntry.CreatedBy", "user")
                    .where("allowManualEntry.OrganizationUnitId =:organizationUnitId", { organizationUnitId: model.organizationUnitId })
                    .getMany();
            }
            else {
                manualEntry = yield DbConnection_1.AppDataSource.getRepository(entities.ManualEntry)
                    .createQueryBuilder("allowManualEntry")
                    .leftJoinAndSelect("allowManualEntry.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("allowManualEntry.CreatedBy", "user")
                    .where("allowManualEntry.Status =:pending", { pending: "pending" })
                    .getMany();
            }
            const manualEntryData = manualEntry.map((manualEntry) => {
                var _a;
                return ({
                    id: manualEntry === null || manualEntry === void 0 ? void 0 : manualEntry.Id,
                    organizationUnitId: manualEntry.OrganizationUnitId,
                    status: manualEntry === null || manualEntry === void 0 ? void 0 : manualEntry.Status,
                    createdBy: (manualEntry === null || manualEntry === void 0 ? void 0 : manualEntry.CreatedBy) ? (_a = manualEntry.CreatedBy) === null || _a === void 0 ? void 0 : _a.Id : 0,
                    createdAt: manualEntry === null || manualEntry === void 0 ? void 0 : manualEntry.CreatedAt,
                    requestFor: manualEntry === null || manualEntry === void 0 ? void 0 : manualEntry.RequestFor
                });
            });
            //console.log(manualEntry);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: manualEntryData
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null
            };
        }
    });
}
exports.GetManualEntry = GetManualEntry;
function CreateManualEntry(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const organization = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("organization")
                .where("organization.Id =:id", { id: model.organizationUnitId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ManualEntry);
            const manualEntry = new entities.ManualEntry();
            if (organization) {
                manualEntry.OrganizationUnitId = organization;
            }
            manualEntry.Status = "pending";
            manualEntry.CreatedBy = userId;
            manualEntry.CreatedAt = new Date();
            // console.log(manualEntry.CreatedAt,"create");
            manualEntry.RequestFor = model.requestFor ? model.requestFor : manualEntry.RequestFor;
            yield repository.save(manualEntry);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: null
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 400,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null
            };
        }
    });
}
exports.CreateManualEntry = CreateManualEntry;
function UpdateManualEntry(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const organizationUnit = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("organization")
                .where("organization.Id =:id", { id: model.organizationUnitId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ManualEntry);
            const manualEntry = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (manualEntry) {
                if (organizationUnit) {
                    manualEntry.OrganizationUnitId = organizationUnit;
                }
                manualEntry.Status = model.status ? model.status : manualEntry.Status;
                manualEntry.RequestFor = model.requestFor ? model.requestFor : manualEntry.RequestFor;
                // console.log(manualEntry.ModifiedAt,"modify")
                manualEntry.ModifiedBy = userId;
                yield repository.save(manualEntry);
                return {
                    status: 200,
                    message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
                    data: null
                };
            }
            else {
                return {
                    status: 404,
                    message: ERROR_MESSAGES.NO_DATA,
                    data: null
                };
            }
        }
        catch (error) {
            console.log(error);
            return {
                status: 400,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null
            };
        }
    });
}
exports.UpdateManualEntry = UpdateManualEntry;
function DeleteManualEntry(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ManualEntry);
            const manualEntry = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (manualEntry) {
                manualEntry.IsActive = false;
                manualEntry.DeletedAt = new Date();
                manualEntry.DeletedBy = userId;
                yield repository.save(manualEntry);
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
exports.DeleteManualEntry = DeleteManualEntry;
