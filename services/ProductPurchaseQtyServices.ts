import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
    AllProductPurchaseQtyModel,
    CreateProductPurchaseQtyModel,
    DeleteProductPurchaseQtyModel,
    UpdateProductPurchaseQtyModel,
} from "../models/ProductPurchaseQtyModel";
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

async function GetProductPurchaseQty(
    model?: any
): Promise<ServiceResponse<AllProductPurchaseQtyModel[]>> {
    try {
        let productPurchaseQty;
        if (model.productId) {
            productPurchaseQty = await AppDataSource.getRepository(entities.ProductPurchaseQty)
                .createQueryBuilder("productPurchaseQty")
                .leftJoinAndSelect("productPurchaseQty.ProductId", "product_master")
                .where("product_master.Id = :id", { id: model.productId })
                .andWhere("productPurchaseQty.IsActive = :isActive", { isActive: true })
                .getMany();
        } else {
            productPurchaseQty = await AppDataSource.getRepository(entities.ProductPurchaseQty)
                .createQueryBuilder("productPurchaseQty")
                .leftJoinAndSelect("productPurchaseQty.ProductId", "product_master")
                .where("productPurchaseQty.IsActive = :isActive", { isActive: true })
                .getMany();
        }
        const productPurchaeQtyData: AllProductPurchaseQtyModel[] = productPurchaseQty.map(
            (productPurchaseQty) => ({
                id: productPurchaseQty.Id,
                productId: productPurchaseQty.ProductId,
                purchaseDate: productPurchaseQty.PurchaseDate,
                invoiceNo: productPurchaseQty.InvoiceNo,
                quantity: productPurchaseQty.Quantity,
                isActive: productPurchaseQty.IsActive

            })
        );
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: productPurchaeQtyData,
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

async function CreateProductPurchaseQty(
    req: Request,
    model: CreateProductPurchaseQtyModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const productmaster = await AppDataSource.getRepository(entities.ProductMaster)
            .createQueryBuilder("productmaster")
            .where("productmaster.Id = :id", { id: model.productId })
            .getOne();

        const repository = AppDataSource.getRepository(entities.ProductPurchaseQty);
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
        await repository.save(productPurchaseQty);

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

async function UpdateProductPurchaseQty(
    req: Request,
    model: UpdateProductPurchaseQtyModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const productmaster = await AppDataSource.getRepository(entities.ProductMaster)
            .createQueryBuilder("productmaster")
            .where("productmaster.Id = :id", { id: model.productId })
            .getOne();

        const repository = AppDataSource.getRepository(entities.ProductPurchaseQty);
        const productPurchaseQty = await repository.findOne({
            where: { Id: model.id ?? 0 },
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
            await repository.save(productPurchaseQty);

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

async function DeleteproductPurchaseQty(
    req: Request,
    model: DeleteProductPurchaseQtyModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const repository = AppDataSource.getRepository(entities.ProductPurchaseQty);
        // console.log("repository: ", repository);
        const productPurchaseQty = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });
        if (productPurchaseQty) {
            productPurchaseQty.IsActive = false;
            productPurchaseQty.DeletedAt = new Date();
            productPurchaseQty.DeletedBy = userId;
            await repository.save(productPurchaseQty);

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

export { GetProductPurchaseQty, CreateProductPurchaseQty, UpdateProductPurchaseQty, DeleteproductPurchaseQty };
