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
exports.DeleteproductPurchaseQty = exports.UpdateProductPurchaseQty = exports.CreateProductPurchaseQty = exports.GetProductPurchaseQty = void 0;
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
    UPDATE_SUCCESS: "Updated Successfully",
    DELETE_SUCCESS: "Deleted Successfully",
};
function GetProductPurchaseQty(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let productPurchaseQty;
            if (model.productId) {
                productPurchaseQty = yield DbConnection_1.AppDataSource.getRepository(entities.ProductPurchaseQty)
                    .createQueryBuilder("productPurchaseQty")
                    .leftJoinAndSelect("productPurchaseQty.ProductId", "product_master")
                    .where("product_master.Id = :id", { id: model.productId })
                    .andWhere("productPurchaseQty.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                productPurchaseQty = yield DbConnection_1.AppDataSource.getRepository(entities.ProductPurchaseQty)
                    .createQueryBuilder("productPurchaseQty")
                    .leftJoinAndSelect("productPurchaseQty.ProductId", "product_master")
                    .where("productPurchaseQty.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            const productPurchaeQtyData = productPurchaseQty.map((productPurchaseQty) => ({
                id: productPurchaseQty.Id,
                productId: productPurchaseQty.ProductId,
                purchaseDate: productPurchaseQty.PurchaseDate,
                invoiceNo: productPurchaseQty.InvoiceNo,
                quantity: productPurchaseQty.Quantity,
                isActive: productPurchaseQty.IsActive
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: productPurchaeQtyData,
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
exports.GetProductPurchaseQty = GetProductPurchaseQty;
function CreateProductPurchaseQty(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const productmaster = yield DbConnection_1.AppDataSource.getRepository(entities.ProductMaster)
                .createQueryBuilder("productmaster")
                .where("productmaster.Id = :id", { id: model.productId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductPurchaseQty);
            const productPurchaseQty = new entities.ProductPurchaseQty();
            if (productmaster) {
                productPurchaseQty.ProductId = productmaster;
            }
            productPurchaseQty.InvoiceNo = model.invoiceNo ? model.invoiceNo : productPurchaseQty.InvoiceNo;
            productPurchaseQty.PurchaseDate = model.purchaseDate ? model.purchaseDate : productPurchaseQty.PurchaseDate;
            productPurchaseQty.Quantity = model.quantity ? model.quantity : productPurchaseQty.Quantity;
            productPurchaseQty.IsActive = true;
            productPurchaseQty.CreatedAt = new Date();
            productPurchaseQty.CreatedBy = userId;
            // console.log(productPurchaseQty);
            yield repository.save(productPurchaseQty);
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
exports.CreateProductPurchaseQty = CreateProductPurchaseQty;
function UpdateProductPurchaseQty(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const productmaster = yield DbConnection_1.AppDataSource.getRepository(entities.ProductMaster)
                .createQueryBuilder("productmaster")
                .where("productmaster.Id = :id", { id: model.productId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductPurchaseQty);
            const productPurchaseQty = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (productPurchaseQty) {
                if (productmaster) {
                    productPurchaseQty.ProductId = productmaster;
                }
                productPurchaseQty.InvoiceNo = model.invoiceNo ? model.invoiceNo : productPurchaseQty.InvoiceNo;
                productPurchaseQty.PurchaseDate = model.purchaseDate ? model.purchaseDate : productPurchaseQty.PurchaseDate;
                productPurchaseQty.Quantity = model.quantity ? model.quantity : productPurchaseQty.Quantity;
                productPurchaseQty.ModifiedAt = new Date();
                productPurchaseQty.ModifiedBy = userId;
                yield repository.save(productPurchaseQty);
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
exports.UpdateProductPurchaseQty = UpdateProductPurchaseQty;
function DeleteproductPurchaseQty(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductPurchaseQty);
            // console.log("repository: ", repository);
            const productPurchaseQty = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (productPurchaseQty) {
                productPurchaseQty.IsActive = false;
                productPurchaseQty.DeletedAt = new Date();
                productPurchaseQty.DeletedBy = userId;
                yield repository.save(productPurchaseQty);
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
exports.DeleteproductPurchaseQty = DeleteproductPurchaseQty;
