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
exports.DeleteCollectionEntry = exports.UpdateCollectionEntry = exports.CreateCollectionEntry = exports.GetCollectionEntry = void 0;
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
function GetCollectionEntry(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collectionEntry;
            if (model.organizationUnitId) {
                collectionEntry = yield DbConnection_1.AppDataSource.getRepository(entities.CollectionEntry)
                    .createQueryBuilder("allowCollectionEntry")
                    .leftJoinAndSelect("allowCollectionEntry.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("allowCollectionEntry.CreatedBy", "user")
                    .where("allowCollectionEntry.OrganizationUnitId =:organizationUnitId", { organizationUnitId: model.organizationUnitId })
                    .getMany();
            }
            else {
                collectionEntry = yield DbConnection_1.AppDataSource.getRepository(entities.CollectionEntry)
                    .createQueryBuilder("allowCollectionEntry")
                    .leftJoinAndSelect("allowCollectionEntry.OrganizationUnitId", "organization")
                    .leftJoinAndSelect("allowCollectionEntry.CreatedBy", "user")
                    .where("allowCollectionEntry.Status =:pending", { pending: "pending" })
                    .getMany();
            }
            const collectionEntryData = collectionEntry.map((collectionEntry) => {
                var _a;
                return ({
                    id: collectionEntry === null || collectionEntry === void 0 ? void 0 : collectionEntry.Id,
                    organizationUnitId: collectionEntry.OrganizationUnitId,
                    status: collectionEntry === null || collectionEntry === void 0 ? void 0 : collectionEntry.Status,
                    createdBy: (collectionEntry === null || collectionEntry === void 0 ? void 0 : collectionEntry.CreatedBy) ? (_a = collectionEntry.CreatedBy) === null || _a === void 0 ? void 0 : _a.Id : 0,
                    createdAt: collectionEntry === null || collectionEntry === void 0 ? void 0 : collectionEntry.CreatedAt,
                    requestFor: collectionEntry === null || collectionEntry === void 0 ? void 0 : collectionEntry.RequestFor
                });
            });
            //console.log(collectionEntry);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: collectionEntryData
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
exports.GetCollectionEntry = GetCollectionEntry;
function CreateCollectionEntry(req, model) {
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
            const repository = DbConnection_1.AppDataSource.getRepository(entities.CollectionEntry);
            const collectionEntry = new entities.CollectionEntry();
            if (organization) {
                collectionEntry.OrganizationUnitId = organization;
            }
            collectionEntry.Status = "pending";
            collectionEntry.CreatedBy = userId;
            collectionEntry.CreatedAt = new Date();
            // console.log(collectionEntry.CreatedAt,"create");
            collectionEntry.RequestFor = model.requestFor ? model.requestFor : collectionEntry.RequestFor;
            yield repository.save(collectionEntry);
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
exports.CreateCollectionEntry = CreateCollectionEntry;
function UpdateCollectionEntry(req, model) {
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
            const repository = DbConnection_1.AppDataSource.getRepository(entities.CollectionEntry);
            const collectionEntry = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (collectionEntry) {
                if (organizationUnit) {
                    collectionEntry.OrganizationUnitId = organizationUnit;
                }
                collectionEntry.Status = model.status ? model.status : collectionEntry.Status;
                collectionEntry.RequestFor = model.requestFor ? model.requestFor : collectionEntry.RequestFor;
                // console.log(collectionEntry.ModifiedAt,"modify")
                collectionEntry.ModifiedBy = userId;
                yield repository.save(collectionEntry);
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
exports.UpdateCollectionEntry = UpdateCollectionEntry;
function DeleteCollectionEntry(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.CollectionEntry);
            const collectionEntry = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (collectionEntry) {
                collectionEntry.IsActive = false;
                collectionEntry.DeletedAt = new Date();
                collectionEntry.DeletedBy = userId;
                yield repository.save(collectionEntry);
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
exports.DeleteCollectionEntry = DeleteCollectionEntry;
