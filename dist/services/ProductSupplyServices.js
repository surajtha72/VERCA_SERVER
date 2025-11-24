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
exports.GetDCNumbers = exports.DeleteProductSupply = exports.UpdateProductSupply = exports.CreateProductSupply = exports.GetProductSupplyApprove = exports.GetProductSupplyIndent = void 0;
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
    SUCCESS: "Success",
    ADD_SUCCESS: "Added Successfully",
    UPDATE_SUCCESS: "Approved Successfully",
    UPDATE_SUCCESS_DISPATCH: "Dispatched Successfully",
    UPDATE_SUCCESS_RECEIVED: "Received Successfully",
    DELETE_SUCCESS: "Deleted Successfully",
};
function GetProductSupplyIndent(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let productSupply;
            if (model.indent_raised_by) {
                productSupply = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSupply)
                    .createQueryBuilder("productSupply")
                    .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
                    .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
                    .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
                    .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
                    .andWhere("raisedForUser.Id = :approvedId", {
                    approvedId: model.indentRaisedFor,
                })
                    .andWhere("raisedByUser.Id = :raisedId", {
                    raisedId: model.indentRaisedBy,
                })
                    .andWhere("productSupply.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.indentStatus) {
                productSupply = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSupply)
                    .createQueryBuilder("productSupply")
                    .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
                    .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
                    .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
                    .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
                    .where("productSupply.IndentStatus =:status", {
                    status: model.indentStatus,
                })
                    .andWhere("productSupply.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                productSupply = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSupply)
                    .createQueryBuilder("productSupply")
                    .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
                    .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
                    .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
                    .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
                    .where("productSupply.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            // console.log(productSupply);
            const productMasterData = productSupply.map((productSupply) => ({
                id: productSupply.Id,
                indentStatus: productSupply.IndentStatus,
                indentRaisedBy: productSupply.IndentRaisedBy,
                indentRaisedFor: productSupply.IndentRaisedFor,
                indentRaisedOnDate: productSupply.IndentRaisedOnDate,
                indentApprovedBy: productSupply.IndentApprovedBy,
                indentRejectedBy: productSupply.IndentRejectedBy,
                approvedOnDate: productSupply.ApprovedOnDate,
                dispatchByEmployee: productSupply.DispatchByEmployee,
                dispatchDate: productSupply.DispatchDate,
                receivedByUserId: productSupply.ReceivedByUserId,
                receivedOn: productSupply.ReceivedOn,
                isActive: productSupply.IsActive,
                rejectReason: productSupply.RejectReason,
                dcNumber: productSupply.DCNumber,
            }));
            // console.log(productMasterData);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: productMasterData,
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
exports.GetProductSupplyIndent = GetProductSupplyIndent;
function GetProductSupplyApprove(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let productSupply;
            // console.log("model : ", model)
            if (model.id) {
                productSupply = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSupply)
                    .createQueryBuilder("productSupply")
                    .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
                    .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
                    .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
                    .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
                    .andWhere("productSupply.IsActive = :isActive", { isActive: true })
                    // .andWhere("productSupply.IndentStatus = :indentStatus", { indentStatus: 1 })
                    .getMany();
            }
            else if (model.indentStatus) {
                productSupply = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSupply)
                    .createQueryBuilder("productSupply")
                    .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
                    .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
                    .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
                    .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
                    .where("productSupply.IsActive = :isActive", { isActive: true })
                    .andWhere("productSupply.IndentStatus = :indentStatus", {
                    indentStatus: model.indentStatus,
                })
                    .getMany();
            }
            else if (model.dcNumber) {
                productSupply = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSupply)
                    .createQueryBuilder("productSupply")
                    .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
                    .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
                    .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
                    .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
                    .where("productSupply.IsActive = :isActive", { isActive: true })
                    .andWhere("productSupply.DCNumber IS NOT NULL")
                    .andWhere("productSupply.DCNumber =:dcNumber", {
                    dcNumber: model.dcNumber,
                })
                    .getMany();
            }
            else if (model.organizationUnitId) {
                productSupply = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSupply)
                    .createQueryBuilder("productSupply")
                    .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedBy")
                    .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
                    .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
                    .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
                    .where("productSupply.IndentRaisedBy = :id", {
                    id: model.organizationUnitId,
                })
                    .getMany();
            }
            else {
                productSupply = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSupply)
                    .createQueryBuilder("productSupply")
                    .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
                    .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
                    .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
                    .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
                    .where("productSupply.IsActive = :isActive", { isActive: true })
                    // .andWhere("productSupply.IndentStatus = :indentStatus", { indentStatus: 1 })
                    .getMany();
            }
            // console.log(productSupply);
            const productMasterData = productSupply.map((productSupply) => ({
                id: productSupply.Id,
                indentStatus: productSupply.IndentStatus,
                indentRaisedBy: productSupply.IndentRaisedBy,
                indentRaisedFor: productSupply.IndentRaisedFor,
                indentRaisedOnDate: productSupply.IndentRaisedOnDate,
                indentApprovedBy: productSupply.IndentApprovedBy,
                indentRejectedBy: productSupply.IndentRejectedBy,
                approvedOnDate: productSupply.ApprovedOnDate,
                dispatchByEmployee: productSupply.DispatchByEmployee,
                dispatchDate: productSupply.DispatchDate,
                receivedByUserId: productSupply.ReceivedByUserId,
                receivedOn: productSupply.ReceivedOn,
                isActive: productSupply.IsActive,
                rejectReason: productSupply.RejectReason,
                dcNumber: productSupply.DCNumber,
            }));
            // console.log(productMasterData);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: productMasterData,
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
exports.GetProductSupplyApprove = GetProductSupplyApprove;
function GetDCNumbers(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let productSupply;
            productSupply = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSupply)
                .createQueryBuilder("productSupply")
                .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
                .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
                .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
                .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
                .where("productSupply.IsActive = :isActive", { isActive: true })
                .andWhere("productSupply.DCNumber IS NOT NULL")
                .andWhere("productSupply.ReceivedByUserId IS NULL")
                .getMany();
            // console.log(productSupply);
            const productMasterData = productSupply.map((productSupply) => ({
                id: productSupply.Id,
                dcNumber: productSupply.DCNumber,
            }));
            // console.log(productMasterData);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: productMasterData,
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
exports.GetDCNumbers = GetDCNumbers;
function CreateProductSupply(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const uuid = (0, uuid_1.v4)();
            // console.log(model);
            for (const record of model) {
                console.log(record);
                const indentRaisedBy = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organization")
                    .where("organization.Id = :id", { id: record.indentRaisedBy })
                    .getOne();
                const indentRaisedFor = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organization")
                    .where("organization.Id = :id", { id: record.indentRaisedBy })
                    .getOne();
                const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductSupply);
                const productSupply = new entities.ProductSupply();
                if (indentRaisedBy) {
                    productSupply.IndentRaisedBy = indentRaisedBy;
                }
                if (indentRaisedFor) {
                    productSupply.IndentRaisedFor = indentRaisedFor;
                }
                if (record.id) {
                    productSupply.Id = record.id;
                }
                else {
                    productSupply.Id = uuid;
                }
                if (record.indentRaisedOnDate) {
                    productSupply.IndentRaisedOnDate = record.indentRaisedOnDate;
                }
                else {
                    productSupply.IndentRaisedOnDate = new Date();
                }
                productSupply.IndentStatus = 1;
                productSupply.IsActive = true;
                productSupply.CreatedAt = new Date();
                productSupply.CreatedBy = userId;
                console.log(productSupply);
                yield repository.save(productSupply);
            }
            // if (model.indentProducts) {
            //   const indentProductsRepository = AppDataSource.getRepository(
            //     entities.IndentProducts
            //   );
            //   for (const indentProduct of model.indentProducts) {
            //     // console.log("indentProduct: ", indentProduct);
            //     const product = new entities.IndentProducts();
            //     product.Id = indentProduct.id;
            //     product.IndentId = productSupply;
            //     product.ProductId = indentProduct.productId || product.ProductId;
            //     product.AvailableQty =
            //       indentProduct.availableQty || product.AvailableQty;
            //     product.Rate = indentProduct.rate || product.Rate;
            //     product.RequestedQty =
            //       indentProduct.requestedQty || product.RequestedQty;
            //     product.IsActive = true;
            //     product.CreatedAt = new Date();
            //     product.CreatedBy = userId;
            //     await indentProductsRepository.save(product);
            //   }
            // }
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
exports.CreateProductSupply = CreateProductSupply;
function UpdateProductSupply(req, model) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log("abcd", model);
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const indentApprovedBy = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("organization")
                .where("organization.Id = :id", { id: model.indentApprovedBy })
                .getOne();
            const indentRaisedBy = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("organization")
                .where("organization.Id = :id", { id: model.indentRaisedBy })
                .getOne();
            const indentRaisedFor = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("organization")
                .where("organization.Id = :id", { id: model.indentRaisedFor })
                .getOne();
            const indentRejectedBy = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("organization")
                .where("organization.Id = :id", { id: model.indentRejectedBy })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductSupply);
            const productSupply = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (productSupply) {
                productSupply.IndentRaisedOnDate = model.indentRaisedOnDate
                    ? model.indentRaisedOnDate
                    : productSupply.IndentRaisedOnDate;
                if (indentApprovedBy) {
                    productSupply.IndentApprovedBy = indentApprovedBy;
                }
                if (indentRejectedBy) {
                    productSupply.IndentRejectedBy = indentRejectedBy;
                }
                productSupply.DispatchByEmployee = model.dispatchByEmployee
                    ? model.dispatchByEmployee
                    : productSupply.DispatchByEmployee;
                productSupply.DispatchDate = model.dispatchDate
                    ? model.dispatchDate
                    : productSupply.DispatchDate;
                productSupply.ReceivedOn = model.receivedOn
                    ? model.receivedOn
                    : productSupply.ReceivedOn;
                productSupply.RejectReason = model.rejectReason
                    ? model.rejectReason
                    : productSupply.RejectReason;
                productSupply.IndentStatus = model.indentStatus
                    ? model.indentStatus
                    : productSupply.IndentStatus;
                productSupply.DCNumber = model.dcNumber
                    ? model.dcNumber
                    : productSupply.DCNumber;
                productSupply.ApprovedOnDate = new Date();
                productSupply.ModifiedAt = new Date();
                productSupply.ModifiedBy = userId;
                if (model.indentProducts) {
                    productSupply.ReceivedByUserId = userId;
                }
                yield repository.save(productSupply);
                if (model.indentProducts) {
                    const indentProductsRepository = DbConnection_1.AppDataSource.getRepository(entities.IndentProducts);
                    for (const indentProduct of model.indentProducts) {
                        const product = yield indentProductsRepository.findOne({
                            where: { Id: (_c = indentProduct.id) !== null && _c !== void 0 ? _c : 0 },
                        });
                        if (product) {
                            product.ReceivedQty =
                                indentProduct.receivedQty || product.ReceivedQty;
                            product.ApprovedQty =
                                indentProduct.approvedQty || product.ApprovedQty;
                            product.IsActive = true;
                            product.ModifiedAt = new Date();
                            product.ModifiedBy = userId;
                            yield indentProductsRepository.save(product);
                        }
                    }
                }
                return {
                    status: 200,
                    message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
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
exports.UpdateProductSupply = UpdateProductSupply;
function DeleteProductSupply(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductSupply);
            // console.log("repository: ", repository);
            const productSupply = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (productSupply) {
                productSupply.IsActive = false;
                productSupply.DeletedAt = new Date();
                productSupply.DeletedBy = userId;
                yield repository.save(productSupply);
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
exports.DeleteProductSupply = DeleteProductSupply;
