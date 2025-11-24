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
exports.DeleteProductStock = exports.UpdateProductStock = exports.CreateProductStock = exports.GetProductStock = void 0;
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
    SUCCESS: "Success",
    ADD_SUCCESS: "Added Successfully",
    UPDATE_SUCCESS: "Approved Successfully",
    UPDATE_SUCCESS_DISPATCH: "Dispatched Successfully",
    UPDATE_SUCCESS_RECEIVED: "Received Successfully",
    DELETE_SUCCESS: "Deleted Successfully",
};
function GetProductStock(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let productStock;
            if (model.id) {
                productStock = yield DbConnection_1.AppDataSource.getRepository(entities.ProductStocks)
                    .createQueryBuilder("productStock")
                    .leftJoinAndSelect("productStock.IndentId", "indentId")
                    .leftJoinAndSelect("productStock.ProductMaster", "productMaster")
                    .leftJoinAndSelect("productStock.OrganizationUnit", "organizationUnit")
                    .andWhere("indentId.Id = :indentId", { indentId: model.indentId })
                    .andWhere("productMaster.Id = :productMaster", { productMaster: model.productMaster })
                    .andWhere("organizationUnit.Id = :organizationUnit", { organizationUnit: model.organizationUnit })
                    .andWhere("productStock.IsComplete = :isComplete", { isComplete: true })
                    .getMany();
            }
            else {
                productStock = yield DbConnection_1.AppDataSource.getRepository(entities.ProductStocks)
                    .createQueryBuilder("productStock")
                    .leftJoinAndSelect("productStock.IndentId", "indentId")
                    .leftJoinAndSelect("productStock.ProductMaster", "productMaster")
                    .leftJoinAndSelect("productStock.OrganizationUnit", "organizationUnit")
                    .where("productStock.IsComplete = :isComplete", { isComplete: true })
                    .getMany();
            }
            const productStockData = productStock.map((productStock) => ({
                id: productStock.Id,
                indentId: productStock.IndentId,
                productMaster: productStock.ProductMaster,
                organizationUnit: productStock.OrganizationUnit,
                availableQty: productStock.AvailableQuantity,
                dispatchQty: productStock.DispatchQuantity,
                totalQty: productStock.TotalQuantity,
                isComplete: productStock.IsComplete
            }));
            // console.log(productStockData);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: productStockData,
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
exports.GetProductStock = GetProductStock;
function CreateProductStock(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const indentId = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSupply)
                .createQueryBuilder("product_supply")
                .where("product_supply.Id = :id", { id: model.indentId })
                .getOne();
            const organizationUnit = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("organization")
                .where("organization.Id = :id", { id: model.organizationUnit })
                .getOne();
            const productMaster = yield DbConnection_1.AppDataSource.getRepository(entities.ProductMaster)
                .createQueryBuilder("product_master")
                .where("product_master.Id = :id", { id: model.productMaster })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductStocks);
            const productStock = new entities.ProductStocks();
            if (indentId) {
                productStock.IndentId = indentId;
                productStock.Id = indentId.Id;
            }
            if (productMaster) {
                productStock.ProductMaster = productMaster;
            }
            if (organizationUnit) {
                productStock.OrganizationUnit = organizationUnit;
            }
            productStock.AvailableQuantity = model.availableQty;
            productStock.CreatedAt = new Date();
            productStock.CreatedBy = userId;
            yield repository.save(productStock);
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
exports.CreateProductStock = CreateProductStock;
function UpdateProductStock(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const indentId = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSupply)
                .createQueryBuilder("product_supply")
                .where("product_supply.Id = :id", { id: model.indentId })
                .getOne();
            const organizationUnit = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("organization")
                .where("organization.Id = :id", { id: model.productMaster })
                .getOne();
            const productMaster = yield DbConnection_1.AppDataSource.getRepository(entities.ProductMaster)
                .createQueryBuilder("product_master")
                .where("product_master.Id = :id", { id: model.organizationUnit })
                .getOne();
            // console.log(indentId, 'this is indent');
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductStocks);
            const productStock = yield repository.findOne({
                where: { Id: model.id },
            });
            console.log(productStock);
            if (productStock) {
                if (indentId) {
                    productStock.IndentId = indentId;
                }
                if (productMaster) {
                    productStock.ProductMaster = productMaster;
                }
                if (organizationUnit) {
                    productStock.OrganizationUnit = organizationUnit;
                }
                productStock.DispatchQuantity = model.dispatchQty;
                productStock.TotalQuantity = productStock.AvailableQuantity + model.dispatchQty;
                productStock.ModifiedAt = new Date();
                productStock.ModifiedBy = userId;
                productStock.IsComplete = true;
                yield repository.save(productStock);
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
exports.UpdateProductStock = UpdateProductStock;
function DeleteProductStock(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductStocks);
            // console.log("repository: ", repository);
            const productStock = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (productStock) {
                productStock.DeletedAt = new Date();
                productStock.DeletedBy = userId;
                yield repository.save(productStock);
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
exports.DeleteProductStock = DeleteProductStock;
