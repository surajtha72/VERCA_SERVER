import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import { CeateProductsSoldToAgentModel, GetProductsSoldToAgentModel } from "../models/ProductsSoldToAgentModel";
import { CreateProductSalesToAgentModel } from "../models/ProductSalesToAgentModel";
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

async function GetProductSoldToAgent(model: any):
    Promise<ServiceResponse<GetProductsSoldToAgentModel[]>> {
    try {
        let productsSoldToAgent;
        productsSoldToAgent = await AppDataSource.getRepository(entities.ProductsSoldToAgent)
            .createQueryBuilder("productsSoldToAgent")
            .leftJoinAndSelect("productsSoldToAgent.ProductSalesToAgent", "productSalesToAgent")
            .leftJoinAndSelect("productSalesToAgent.Product", "products")
            .getMany();

        const soldProductsData: GetProductsSoldToAgentModel[] = productsSoldToAgent.map(
            (soldProduct) => ({
                id: soldProduct.Id,
                productSalesToAgent: soldProduct.ProductSalesToAgent,
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

async function CreateProductsSoldToAgent(
    req: Request,
    model: CeateProductsSoldToAgentModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const productSalesToAgent = await AppDataSource.getRepository(entities.ProductSalesToAgent)
            .createQueryBuilder("productSalesToAgent")
            .where("productSalesToAgent.Id =:id", { id: model.productSalesToAgent })
            .getOne();

        const product = await AppDataSource.getRepository(entities.ProductMaster)
            .createQueryBuilder("product")
            .where("product.Id =:id", { id: model.productId })
            .getOne();

        const repository = AppDataSource.getRepository(entities.ProductsSoldToAgent);
        const productSoldToAgent = new entities.ProductsSoldToAgent();
        if (productSalesToAgent) {
            productSoldToAgent.ProductSalesToAgent = productSalesToAgent;
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

export { GetProductSoldToAgent, CreateProductsSoldToAgent }