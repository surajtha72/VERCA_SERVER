import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
    AllProductStockModel,
    CreateProductStockModel,
    DeleteProductStockModel,
    UpdateProductStockModel,
} from "../models/ProductStockModel";
dotenv.config();

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

async function GetProductStock(
    model?: any
): Promise<ServiceResponse<AllProductStockModel[]>> {
    try {
        let productStock;
        if (model.id) {
            productStock = await AppDataSource.getRepository(entities.ProductStocks)
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
            productStock = await AppDataSource.getRepository(entities.ProductStocks)
                .createQueryBuilder("productStock")
                .leftJoinAndSelect("productStock.IndentId", "indentId")
                .leftJoinAndSelect("productStock.ProductMaster", "productMaster")
                .leftJoinAndSelect("productStock.OrganizationUnit", "organizationUnit")
                .where("productStock.IsComplete = :isComplete", { isComplete: true })
                .getMany();
        }
        const productStockData: AllProductStockModel[] = productStock.map(
            (productStock) => ({
                id: productStock.Id,
                indentId: productStock.IndentId,
                productMaster: productStock.ProductMaster,
                organizationUnit: productStock.OrganizationUnit,
                availableQty: productStock.AvailableQuantity,
                dispatchQty: productStock.DispatchQuantity,
                totalQty: productStock.TotalQuantity,
                isComplete: productStock.IsComplete

            })
        );
        // console.log(productStockData);
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: productStockData,
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

async function CreateProductStock(
    req: Request,
    model: CreateProductStockModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const indentId = await AppDataSource.getRepository(entities.ProductSupply)
            .createQueryBuilder("product_supply")
            .where("product_supply.Id = :id", { id: model.indentId })
            .getOne();
        const organizationUnit = await AppDataSource.getRepository(entities.Organization)
            .createQueryBuilder("organization")
            .where("organization.Id = :id", { id: model.organizationUnit })
            .getOne();
        const productMaster = await AppDataSource.getRepository(entities.ProductMaster)
            .createQueryBuilder("product_master")
            .where("product_master.Id = :id", { id: model.productMaster })
            .getOne();


        const repository = AppDataSource.getRepository(entities.ProductStocks);
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

        await repository.save(productStock);
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

async function UpdateProductStock(
    req: Request,
    model: UpdateProductStockModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const indentId = await AppDataSource.getRepository(entities.ProductSupply)
            .createQueryBuilder("product_supply")
            .where("product_supply.Id = :id", { id: model.indentId })
            .getOne();
        const organizationUnit = await AppDataSource.getRepository(entities.Organization)
            .createQueryBuilder("organization")
            .where("organization.Id = :id", { id: model.productMaster })
            .getOne();
        const productMaster = await AppDataSource.getRepository(entities.ProductMaster)
            .createQueryBuilder("product_master")
            .where("product_master.Id = :id", { id: model.organizationUnit })
            .getOne();

        // console.log(indentId, 'this is indent');
        const repository = AppDataSource.getRepository(entities.ProductStocks);

        const productStock = await repository.findOne({
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
            await repository.save(productStock);
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

async function DeleteProductStock(
    req: Request,
    model: DeleteProductStockModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const repository = AppDataSource.getRepository(entities.ProductStocks);
        // console.log("repository: ", repository);
        const productStock = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });
        if (productStock) {
            productStock.DeletedAt = new Date();
            productStock.DeletedBy = userId;
            await repository.save(productStock);

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

export {
    GetProductStock,
    CreateProductStock,
    UpdateProductStock,
    DeleteProductStock
};