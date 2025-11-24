import { Request, Response } from "express";
import * as productSalesToAgentService from "../services/ProductSalesToAgentService";
import { CreateProductSalesToAgentModel, DeleteProductSalesToAgentModel, UpdateProductSalesToAgentModel } from "../models/ProductSalesToAgentModel";
import { CreateProductsSoldToAgentOTPModel } from "../models/ProductSoldToAgentModelOTP";

async function GetProductSalesToAgent(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productSalesToAgentService.GetProductSalesToAgent(model);
        res.json(response);
    }
}

async function CreateProductSalesToAgent(req: Request, res: Response) {
    let roleModel = new CreateProductSalesToAgentModel(req.body);
    const response = await productSalesToAgentService.CreateProductSalesToAgent(req, roleModel);
    res.json(response);
}

async function GetOtp(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productSalesToAgentService.GetOTP(model);
        res.json(response);
    }
}

async function CreateOtp(req: Request, res: Response) {
    let roleModel = new CreateProductsSoldToAgentOTPModel(req.body);
    const response = await productSalesToAgentService.CreateOTP(req, roleModel);
    res.json(response);
}


async function UpdateProductSalesToAgent(req: Request, res: Response) {
    let salesModel = new UpdateProductSalesToAgentModel(req.body);
    const response = await productSalesToAgentService.UpdateProductSalesToAgent(req, salesModel);
    res.json(response);
}

async function DeleteProductSale(req: Request, res: Response) {
    console.log('req : ',req);
    let model = new DeleteProductSalesToAgentModel(req.params);
    const response = await productSalesToAgentService.DeleteProductSalesToAgent(req, model);
    res.json(response);
}

async function GetTotalBalance(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productSalesToAgentService.GetTotalBalance(model);
        res.json(response);
    }
}

export { GetProductSalesToAgent, CreateProductSalesToAgent, GetOtp, CreateOtp, UpdateProductSalesToAgent, DeleteProductSale, GetTotalBalance }