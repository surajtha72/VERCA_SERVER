import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import { CreateProductsSoldToNonAgentsModel, GetProductsSoldToNonAgentsModel } from "../models/ProductsSoldToNonAgentsModel";
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

async function GetProductSoldToNonAgents(model: any):
    Promise<ServiceResponse<GetProductsSoldToNonAgentsModel[]>> {
    try {
        let productsSoldToNonAgents;
        productsSoldToNonAgents = await AppDataSource.getRepository(entities.ProductsSoldToNonAgents)
            .createQueryBuilder("productsSoldToAgent")
            .leftJoinAndSelect("productsSoldToAgent.ProductSalesToAgent", "productSalesToAgent")
            .leftJoinAndSelect("productSalesToAgent.Product", "products")
            .getMany();

        const soldProductsData: GetProductsSoldToNonAgentsModel[] = productsSoldToNonAgents.map(
            (soldProduct) => ({
                id: soldProduct.Id,  
                productSalesToNonAgents: soldProduct.ProductSalesToNonAgents,
                productId: soldProduct.ProductId,
                quantity: soldProduct.Quantity,
                rate: soldProduct.Rate,
            })
        );
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: soldProductsData
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null
        }
    }
}

async function CreateProductsSoldToNonAgents(
    req: Request,
    model: CreateProductsSoldToNonAgentsModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const ProductSalesToNonAgents = await AppDataSource.getRepository(entities.ProductSalesToAgent)
            .createQueryBuilder("productSalesToAgent")
            .where("productSalesToAgent.Id =:id", { id: model.productSalesToNonAgents })
            .getOne();

        const product = await AppDataSource.getRepository(entities.ProductMaster)
            .createQueryBuilder("product")
            .where("product.Id =:id", { id: model.productId })
            .getOne();

        const repository = AppDataSource.getRepository(entities.ProductsSoldToAgent);
        const productSoldToAgent = new entities.ProductsSoldToAgent();
        if (ProductSalesToNonAgents) {
            productSoldToAgent.ProductSalesToAgent = ProductSalesToNonAgents;
        }
        if(product){
            productSoldToAgent.ProductId = product;
        }
        productSoldToAgent.Quantity = model.quantity;
        productSoldToAgent.Rate = model.rate;
        productSoldToAgent.CreatedBy = userId;
        productSoldToAgent.CreatedAt = new Date();

        await repository.save(productSoldToAgent);
        // console.log(model)
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: null
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null
        }
    }
}

export { GetProductSoldToNonAgents, CreateProductsSoldToNonAgents }