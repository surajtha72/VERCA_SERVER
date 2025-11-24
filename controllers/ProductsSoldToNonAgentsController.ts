import { Request, Response } from "express";
import * as productsSoldToNonAgents from "../services/ProductsSoldToNonAgentsService";
import { CreateProductsSoldToNonAgentsModel } from "../models/ProductsSoldToNonAgentsModel";

async function GetProductsSoldToNonAgents(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productsSoldToNonAgents.GetProductSoldToNonAgents(model);
        res.json(response);
    }
}

async function CreateProductSoldToNonAgents(req: Request, res: Response) {
    let roleModel = new CreateProductsSoldToNonAgentsModel(req.body);
    const response = await productsSoldToNonAgents.CreateProductsSoldToNonAgents(req, roleModel);
    res.json(response);
}

export { GetProductsSoldToNonAgents, CreateProductSoldToNonAgents }