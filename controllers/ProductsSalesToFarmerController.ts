import { Request, Response } from "express";
import * as productSalesToFarmerService from "../services/ProductSalesToFarmerService";
import { CreateProductSalesToFarmerModel, DeleteProductSalesToFarmerModel, UpdateProductSalesToFarmerModel } from "../models/ProductSalesToFarmerModel";
import { CreateProductsSoldToFarmerOTPModel } from "../models/ProductSoldToFarmerModelOTP";

async function GetProductSalesToFarmer(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productSalesToFarmerService.GetProductSalesToFarmer(model);
        res.json(response);
    }
}

async function CreateProductSalesToFarmer(req: Request, res: Response) {
    let roleModel = new CreateProductSalesToFarmerModel(req.body);
    const response = await productSalesToFarmerService.CreateProductsSalesToFarmer(req, roleModel);
    res.json(response);
}

async function GetOtp(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productSalesToFarmerService.GetOTP(model);
        res.json(response);
    }
}

async function CreateOtp(req: Request, res: Response) {
    let roleModel = new CreateProductsSoldToFarmerOTPModel(req.body);
    const response = await productSalesToFarmerService.CreateOTP(req, roleModel);
    res.json(response);
}


async function UpdateProductSalesToFarmer(req: Request, res: Response) {
    let salesModel = new UpdateProductSalesToFarmerModel(req.body);
    const response = await productSalesToFarmerService.UpdateProductSalesToFarmer(req, salesModel);
    res.json(response);
}

async function DeleteProductSalesToFarmer(req: Request, res: Response) {
    console.log('req : ',req);
    let model = new DeleteProductSalesToFarmerModel(req.params);
    const response = await productSalesToFarmerService.DeleteProductSalesToFarmer(req, model);
    res.json(response);
}

async function GetTotalBalance(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productSalesToFarmerService.GetTotalBalance(model);
        res.json(response);
    }
}

export { GetProductSalesToFarmer, CreateProductSalesToFarmer, GetOtp, CreateOtp, UpdateProductSalesToFarmer, DeleteProductSalesToFarmer, GetTotalBalance }