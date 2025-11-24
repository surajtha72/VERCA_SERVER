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
exports.DeleteProductMaster = exports.UpdateProductMaster = exports.CreateProductMaster = exports.GetProductMaster = void 0;
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
function GetProductMaster(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let productMaster;
            if (model.productCategId) {
                productMaster = yield DbConnection_1.AppDataSource.getRepository(entities.ProductMaster)
                    .createQueryBuilder("productMaster")
                    .leftJoinAndSelect("productMaster.ProductCategId", "product_category")
                    .where("product_category.Id = :id", { id: model.productCategId })
                    .andWhere("productMaster.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.id) {
                productMaster = yield DbConnection_1.AppDataSource.getRepository(entities.ProductMaster)
                    .createQueryBuilder("productMaster")
                    .where("productMaster.Id = :id", { id: model.id })
                    .andWhere("productMaster.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                productMaster = yield DbConnection_1.AppDataSource.getRepository(entities.ProductMaster)
                    .createQueryBuilder("productMaster")
                    .leftJoinAndSelect("productMaster.ProductCategId", "product_category")
                    .where("productMaster.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            // console.log(productMaster);
            const productMasterData = productMaster.map((productMaster) => ({
                id: productMaster.Id,
                productCategId: productMaster.ProductCategId,
                productName: productMaster.ProductName,
                description: productMaster.Description,
                supplierMake: productMaster.SupplierMake,
                batchNo: productMaster.BatchNo,
                mfgDate: productMaster.MfgDate,
                expDate: productMaster.ExpDate,
                recorderLevel: productMaster.RecorderLevel,
                leadTimeInDelay: productMaster.LeadTimeInDelay,
                unitQtyUomId: productMaster.UnitQtyUomId,
                unitQtyPurchasePrice: productMaster.UnitQtyPurchasePrice,
                unitQtySupplyPrice: productMaster.UnitQtySupplyPrice,
                taxOnSupply: productMaster.TaxOnSupply,
                unitQtyIncentiveAmount: productMaster.UnitQtyIncentiveAmount,
                openingBalanceQty: productMaster.OpeningBalanceQty,
                openingBalanceDate: productMaster.OpeningBalanceDate,
                isActive: productMaster.IsActive
            }));
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
exports.GetProductMaster = GetProductMaster;
function CreateProductMaster(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const productcategory = yield DbConnection_1.AppDataSource.getRepository(entities.ProductCategory)
                .createQueryBuilder("productcategory")
                .where("productcategory.Id = :id", { id: model.productCategId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductMaster);
            const productMaster = new entities.ProductMaster();
            if (productcategory) {
                productMaster.ProductCategId = productcategory;
            }
            productMaster.ProductName = model.productName ? model.productName : productMaster.ProductName;
            productMaster.Description = model.description ? model.description : productMaster.Description;
            productMaster.SupplierMake = model.supplierMake ? model.supplierMake : productMaster.SupplierMake;
            productMaster.BatchNo = model.batchNo ? model.batchNo : productMaster.BatchNo;
            productMaster.MfgDate = model.mfgDate ? model.mfgDate : productMaster.MfgDate;
            productMaster.ExpDate = model.expDate ? model.expDate : productMaster.ExpDate;
            productMaster.RecorderLevel = model.recorderLevel ? model.recorderLevel : productMaster.RecorderLevel;
            productMaster.LeadTimeInDelay = model.leadTimeInDelay ? model.leadTimeInDelay : productMaster.LeadTimeInDelay;
            productMaster.UnitQtyUomId = model.unitQtyUomId ? model.unitQtyUomId : productMaster.UnitQtyUomId;
            productMaster.UnitQtyPurchasePrice = model.unitQtyPurchasePrice ? model.unitQtyPurchasePrice : productMaster.UnitQtyPurchasePrice;
            productMaster.UnitQtySupplyPrice = model.unitQtySupplyPrice ? model.unitQtySupplyPrice : productMaster.UnitQtySupplyPrice;
            productMaster.TaxOnSupply = model.taxOnSupply ? model.taxOnSupply : productMaster.TaxOnSupply;
            productMaster.UnitQtyIncentiveAmount = model.unitQtyIncentiveAmount ? model.unitQtyIncentiveAmount : productMaster.UnitQtyIncentiveAmount;
            productMaster.OpeningBalanceQty = model.openingBalanceQty ? model.openingBalanceQty : productMaster.OpeningBalanceQty;
            productMaster.OpeningBalanceDate = model.openingBalanceDate ? model.openingBalanceDate : productMaster.OpeningBalanceDate;
            productMaster.IsActive = true;
            productMaster.CreatedAt = new Date();
            productMaster.CreatedBy = userId;
            yield repository.save(productMaster);
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
exports.CreateProductMaster = CreateProductMaster;
function UpdateProductMaster(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const productcategory = yield DbConnection_1.AppDataSource.getRepository(entities.ProductCategory)
                .createQueryBuilder("productcategory")
                .where("productcategory.Id = :id", { id: model.productCategId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductMaster);
            const productMaster = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (productMaster) {
                if (productcategory) {
                    productMaster.ProductCategId = productcategory;
                }
                productMaster.ProductName = model.productName ? model.productName : productMaster.ProductName;
                productMaster.Description = model.description ? model.description : productMaster.Description;
                productMaster.SupplierMake = model.supplierMake ? model.supplierMake : productMaster.SupplierMake;
                productMaster.BatchNo = model.batchNo ? model.batchNo : productMaster.BatchNo;
                productMaster.MfgDate = model.mfgDate ? model.mfgDate : productMaster.MfgDate;
                productMaster.ExpDate = model.expDate ? model.expDate : productMaster.ExpDate;
                productMaster.RecorderLevel = model.recorderLevel ? model.recorderLevel : productMaster.RecorderLevel;
                productMaster.LeadTimeInDelay = model.leadTimeInDelay ? model.leadTimeInDelay : productMaster.LeadTimeInDelay;
                productMaster.UnitQtyUomId = model.unitQtyUomId ? model.unitQtyUomId : productMaster.UnitQtyUomId;
                productMaster.UnitQtyPurchasePrice = model.unitQtyPurchasePrice ? model.unitQtyPurchasePrice : productMaster.UnitQtyPurchasePrice;
                productMaster.UnitQtySupplyPrice = model.unitQtySupplyPrice ? model.unitQtySupplyPrice : productMaster.UnitQtySupplyPrice;
                productMaster.TaxOnSupply = model.taxOnSupply ? model.taxOnSupply : productMaster.TaxOnSupply;
                productMaster.UnitQtyIncentiveAmount = model.unitQtyIncentiveAmount ? model.unitQtyIncentiveAmount : productMaster.UnitQtyIncentiveAmount;
                productMaster.OpeningBalanceQty = model.openingBalanceQty ? model.openingBalanceQty : productMaster.OpeningBalanceQty;
                productMaster.OpeningBalanceDate = model.openingBalanceDate ? model.openingBalanceDate : productMaster.OpeningBalanceDate;
                productMaster.ModifiedAt = new Date();
                productMaster.ModifiedBy = userId;
                yield repository.save(productMaster);
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
exports.UpdateProductMaster = UpdateProductMaster;
function DeleteProductMaster(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductMaster);
            // console.log("repository: ", repository);
            const productMaster = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (productMaster) {
                productMaster.IsActive = false;
                productMaster.DeletedAt = new Date();
                productMaster.DeletedBy = userId;
                yield repository.save(productMaster);
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
exports.DeleteProductMaster = DeleteProductMaster;
