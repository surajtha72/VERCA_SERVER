import { Request, Response } from "express";
import * as productsSoldToFarmer from "../services/ProductsSoldToFarmerService";
import { CreateProductsSoldToFarmerModel } from "../models/ProductsSoldToFarmerModel";

async function GetProductsSoldToFarmer(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productsSoldToFarmer.GetProductSoldToFarmer(model);
        res.json(response);
    }
}

async function CreateProductSoldToFarmer(req: Request, res: Response) {
    let roleModel = new CreateProductsSoldToFarmerModel(req.body);
    const response = await productsSoldToFarmer.CreateProductsSoldToFarmer(req, roleModel);
    res.json(response);
}

export { GetProductsSoldToFarmer, CreateProductSoldToFarmer }