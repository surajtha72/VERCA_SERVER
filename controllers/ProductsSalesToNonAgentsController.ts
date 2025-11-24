import { Request, Response } from "express";
import * as productSalesToNonAgentsService from "../services/ProductSalesToNonAgentsService";
import { CreateProductSalesToNonAgentsModel, DeleteProductSalesToNonAgentsModel, UpdateProductSalesToNonAgentsModel } from "../models/ProductSalesToNonAgentsModel";
import { CreateProductsSoldToNonAgentsOTPModel } from "../models/ProductSoldToNonAgentsModelOTP";

async function GetProductSalesToNonAgents(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productSalesToNonAgentsService.GetProductSalesToNonAgents(model);
        res.json(response);
    }
}

async function CreateProductSalesToNonAgents(req: Request, res: Response) {
    let roleModel = new CreateProductSalesToNonAgentsModel(req.body);
    const response = await productSalesToNonAgentsService.CreateProductsSalesToNonAgents(req, roleModel);
    res.json(response);
}

async function GetOtp(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productSalesToNonAgentsService.GetOTP(model);
        res.json(response);
    }
}

async function CreateOtp(req: Request, res: Response) {
    let roleModel = new CreateProductsSoldToNonAgentsOTPModel(req.body);
    const response = await productSalesToNonAgentsService.CreateOTP(req, roleModel);
    res.json(response);
}


async function UpdateProductSalesToNonAgents(req: Request, res: Response) {
    let salesModel = new UpdateProductSalesToNonAgentsModel(req.body);
    const response = await productSalesToNonAgentsService.UpdateProductSalesToNonAgents(req, salesModel);
    res.json(response);
}

async function DeleteProductSalesToNonAgents(req: Request, res: Response) {
    console.log('req : ',req);
    let model = new DeleteProductSalesToNonAgentsModel(req.params);
    const response = await productSalesToNonAgentsService.DeleteProductSalesToNonAgents(req, model);
    res.json(response);
}

async function GetTotalBalance(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productSalesToNonAgentsService.GetTotalBalance(model);
        res.json(response);
    }
}

export { GetProductSalesToNonAgents, CreateProductSalesToNonAgents, GetOtp, CreateOtp, UpdateProductSalesToNonAgents, DeleteProductSalesToNonAgents, GetTotalBalance }