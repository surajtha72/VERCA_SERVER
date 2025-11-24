import { Request, Response } from "express";
import * as productsSoldToAgent from "../services/ProductsSoldToAgentService";
import { CeateProductsSoldToAgentModel } from "../models/ProductsSoldToAgentModel";

async function GetProductsSoldToAgent(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productsSoldToAgent.GetProductSoldToAgent(model);
        res.json(response);
    }
}

async function CreateProductSoldToAgent(req: Request, res: Response) {
    let roleModel = new CeateProductsSoldToAgentModel(req.body);
    const response = await productsSoldToAgent.CreateProductsSoldToAgent(req, roleModel);
    res.json(response);
}

export { GetProductsSoldToAgent, CreateProductSoldToAgent }