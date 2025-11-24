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
exports.DeleteIndentProducts = exports.UpdateIndentProductsApprove = exports.UpdateIndentProducts = exports.CreateIndentProducts = exports.GetIndentProducts = void 0;
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
    UPDATE_SUCCESS: "Updated Successfully",
    DELETE_SUCCESS: "Deleted Successfully",
};
function GetIndentProducts(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(model);
            let indentProducts;
            if (model.indentId) {
                // console.log("indent id model")
                indentProducts = yield DbConnection_1.AppDataSource.getRepository(entities.IndentProducts)
                    .createQueryBuilder("indentProducts")
                    .leftJoinAndSelect("indentProducts.IndentId", "product_supply")
                    .leftJoinAndSelect("product_supply.IndentRaisedBy", "organization")
                    .leftJoinAndSelect("indentProducts.ProductId", "product_master")
                    .where("indentProducts.IndentId =:indentId", { indentId: model.indentId })
                    .andWhere("indentProducts.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.dcNumber) {
                indentProducts = yield DbConnection_1.AppDataSource.getRepository(entities.IndentProducts)
                    .createQueryBuilder("indentProducts")
                    .leftJoinAndSelect("indentProducts.IndentId", "productSupply")
                    .leftJoinAndSelect("productSupply.IndentRaisedBy", "organization")
                    .leftJoinAndSelect("indentProducts.ProductId", "product_master")
                    .where("productSupply.DCNumber = :dcNumber", { dcNumber: model.dcNumber })
                    .getMany();
            }
            else if (model.organizationUnitId) {
                indentProducts = yield DbConnection_1.AppDataSource.getRepository(entities.IndentProducts)
                    .createQueryBuilder("indentProducts")
                    .leftJoinAndSelect("indentProducts.IndentId", "productSupply")
                    .leftJoinAndSelect("indentProducts.CreatedBy", "user")
                    .leftJoinAndSelect("productSupply.IndentRaisedBy", "organization")
                    .leftJoinAndSelect("indentProducts.ProductId", "product_master")
                    .where("user.OrganizationUnitId = :organizationUnitId", { organizationUnitId: model.organizationUnitId })
                    .andWhere("indentProducts.IndentId IS NOT NULL")
                    .getMany();
            }
            else {
                indentProducts = yield DbConnection_1.AppDataSource.getRepository(entities.IndentProducts)
                    .createQueryBuilder("indentProducts")
                    .leftJoinAndSelect("indentProducts.IndentId", "product_supply")
                    .leftJoinAndSelect("product_supply.IndentRaisedBy", "organization")
                    .leftJoinAndSelect("indentProducts.ProductId", "product_master")
                    .andWhere("indentProducts.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const indentProductsData = indentProducts.map((indentProducts) => {
                var _a, _b, _c, _d, _e;
                return ({
                    id: indentProducts === null || indentProducts === void 0 ? void 0 : indentProducts.Id,
                    indentId: ((_a = model.indentId) === null || _a === void 0 ? void 0 : _a.Id) ? (_b = model.indentId) === null || _b === void 0 ? void 0 : _b.Id : indentProducts.IndentId,
                    productId: ((_c = model.productId) === null || _c === void 0 ? void 0 : _c.Id) ? (_d = model.productId) === null || _d === void 0 ? void 0 : _d.Id : indentProducts.ProductId,
                    availableQty: indentProducts.AvailableQty,
                    rate: indentProducts.Rate,
                    requestedQty: indentProducts.RequestedQty,
                    approvedQty: indentProducts.ApprovedQty,
                    dispatchQty: indentProducts.DispatchQty,
                    reveivedQty: indentProducts.ReceivedQty,
                    isActive: indentProducts.IsActive,
                    createdBy: (_e = indentProducts.CreatedBy) === null || _e === void 0 ? void 0 : _e.Id
                });
            });
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: indentProductsData,
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
exports.GetIndentProducts = GetIndentProducts;
function CreateIndentProducts(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const uuid = (0, uuid_1.v4)();
            for (const record of model) {
                console.log(record);
                const repository = DbConnection_1.AppDataSource.getRepository(entities.IndentProducts);
                const indentProducts = new entities.IndentProducts();
                if (!record.id) {
                    indentProducts.Id = uuid;
                }
                else {
                    indentProducts.Id = record.id;
                }
                indentProducts.IndentId = record.indentId || indentProducts.IndentId;
                indentProducts.ProductId = record.productId || indentProducts.ProductId;
                indentProducts.AvailableQty = record.availableQty || indentProducts.AvailableQty;
                indentProducts.Rate = record.rate || indentProducts.Rate;
                indentProducts.RequestedQty = record.requestedQty || indentProducts.RequestedQty;
                indentProducts.ApprovedQty = record.approvedQty || indentProducts.ApprovedQty;
                indentProducts.IsActive = true;
                indentProducts.CreatedAt = new Date();
                indentProducts.CreatedBy = userId;
                console.log(indentProducts);
                yield repository.save(indentProducts);
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
exports.CreateIndentProducts = CreateIndentProducts;
function UpdateIndentProducts(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.IndentProducts);
            const indentProducts = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (indentProducts) {
                indentProducts.IndentId = model.indentId || indentProducts.IndentId;
                indentProducts.ProductId = model.productId || indentProducts.ProductId;
                indentProducts.AvailableQty = model.availableQty || indentProducts.AvailableQty;
                indentProducts.Rate = model.rate || indentProducts.Rate;
                indentProducts.RequestedQty = model.requestedQty || indentProducts.RequestedQty;
                indentProducts.ApprovedQty = model.approvedQty || indentProducts.ApprovedQty;
                indentProducts.DispatchQty = model.dispatchQty || indentProducts.DispatchQty;
                indentProducts.ReceivedQty = model.reveivedQty || indentProducts.ReceivedQty;
                indentProducts.IsActive = model.isActive || indentProducts.IsActive;
                indentProducts.ModifiedAt = new Date();
                indentProducts.ModifiedBy = userId;
                yield repository.save(indentProducts);
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
exports.UpdateIndentProducts = UpdateIndentProducts;
function UpdateIndentProductsApprove(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.IndentProducts);
            const indentProducts = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (indentProducts) {
                indentProducts.ApprovedQty = model.approvedQty || indentProducts.ApprovedQty;
                indentProducts.ReceivedQty = model.reveivedQty || indentProducts.ReceivedQty;
                indentProducts.ModifiedAt = new Date();
                indentProducts.ModifiedBy = userId;
                yield repository.save(indentProducts);
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
exports.UpdateIndentProductsApprove = UpdateIndentProductsApprove;
function DeleteIndentProducts(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.IndentProducts);
            // console.log("repository: ", repository);
            const indentProducts = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            // console.log("indentProducts: ", indentProducts, model.id);
            if (indentProducts) {
                indentProducts.IsActive = false;
                indentProducts.DeletedAt = new Date();
                indentProducts.DeletedBy = userId;
                yield repository.save(indentProducts);
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
exports.DeleteIndentProducts = DeleteIndentProducts;
