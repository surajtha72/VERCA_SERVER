import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
    AllProductMasterModel,
    CreateProductMasterModel,
    DeleteProductMasterModel,
    UpdateProductMasterModel,
} from "../models/ProductMasterModel";
dotenv.config();

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

async function GetProductMaster(
    model?: any
): Promise<ServiceResponse<AllProductMasterModel[]>> {
    try {
        let productMaster;
        if (model.productCategId) {
            productMaster = await AppDataSource.getRepository(entities.ProductMaster)
                .createQueryBuilder("productMaster")
                .leftJoinAndSelect("productMaster.ProductCategId", "product_category")
                .where("product_category.Id = :id", { id: model.productCategId })
                .andWhere("productMaster.IsActive = :isActive", { isActive: true })
                .getMany();
        }else if (model.id) {
            productMaster = await AppDataSource.getRepository(entities.ProductMaster)
                .createQueryBuilder("productMaster")
                .where("productMaster.Id = :id", { id: model.id })
                .andWhere("productMaster.IsActive = :isActive", { isActive: true })
                .getMany();
        } else {
            productMaster = await AppDataSource.getRepository(entities.ProductMaster)
                .createQueryBuilder("productMaster")
                .leftJoinAndSelect("productMaster.ProductCategId", "product_category")
                .where("productMaster.IsActive = :isActive", { isActive: true })
                .getMany();
        }
        // console.log(productMaster);
        const productMasterData: AllProductMasterModel[] = productMaster.map(
            (productMaster) => ({
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

            })
        );
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: productMasterData,
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null,
        };
    }
}

async function CreateProductMaster(
    req: Request,
    model: CreateProductMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const productcategory = await AppDataSource.getRepository(entities.ProductCategory)
            .createQueryBuilder("productcategory")
            .where("productcategory.Id = :id", { id: model.productCategId })
            .getOne();

        const repository = AppDataSource.getRepository(entities.ProductMaster);
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
        await repository.save(productMaster);

        return {
            status: 200,
            message: SUCCESS_MESSAGES.ADD_SUCCESS,
            data: null,
        };
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null,
        };
    }
}

async function UpdateProductMaster(
    req: Request,
    model: UpdateProductMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const productcategory = await AppDataSource.getRepository(entities.ProductCategory)
            .createQueryBuilder("productcategory")
            .where("productcategory.Id = :id", { id: model.productCategId })
            .getOne();

        const repository = AppDataSource.getRepository(entities.ProductMaster);
        const productMaster = await repository.findOne({
            where: { Id: model.id ?? 0 },
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
            await repository.save(productMaster);

            return {
                status: 200,
                message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
                data: null,
            };
        } else {
            return {
                status: 404,
                message: ERROR_MESSAGES.NO_DATA,
                data: null,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null,
        };
    }
}

async function DeleteProductMaster(
    req: Request,
    model: DeleteProductMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const repository = AppDataSource.getRepository(entities.ProductMaster);
        // console.log("repository: ", repository);
        const productMaster = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });
        if (productMaster) {
            productMaster.IsActive = false;
            productMaster.DeletedAt = new Date();
            productMaster.DeletedBy = userId;
            await repository.save(productMaster);

            return {
                status: 200,
                message: SUCCESS_MESSAGES.DELETE_SUCCESS,
                data: null,
            };
        } else {
            return {
                status: 200,
                message: ERROR_MESSAGES.NO_DATA,
                data: null,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null,
        };
    }
}

export { GetProductMaster, CreateProductMaster, UpdateProductMaster, DeleteProductMaster };
