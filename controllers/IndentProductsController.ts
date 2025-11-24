import { Request, Response } from "express";
import * as indentProductsServices from "../services/IndentProductsService";
import { CreateIndentProductsModel, DeleteIndentProductsModel, UpdateIndentProductsModel } from "../models/IndentProductsModel";


async function GetIndentProducts(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await indentProductsServices.GetIndentProducts(model);
        res.json(response);
    } else {
        const response = await indentProductsServices.GetIndentProducts();
        res.json(response);
    }
}

async function CreateIndentProducts(req: Request, res: Response) {
    let roleModel :CreateIndentProductsModel[] = req.body;
    const response = await indentProductsServices.CreateIndentProducts(req, roleModel);
    res.json(response);
}

async function UpdateIndentProducts(req: Request, res: Response) {
    let roleModel = new UpdateIndentProductsModel(req.body);
    const response = await indentProductsServices.UpdateIndentProducts(req, roleModel);
    res.json(response);
}

async function UpdateIndentProductsApprove(req: Request, res: Response) {
    let roleModel = new UpdateIndentProductsModel(req.body);
    const response = await indentProductsServices.UpdateIndentProductsApprove(req, roleModel);
    res.json(response);
}

async function DeleteIndentProducts(req: Request, res: Response) {
    let model = new DeleteIndentProductsModel(req.params);
    const response = await indentProductsServices.DeleteIndentProducts(req, model);
    res.json(response);
}

export { GetIndentProducts, CreateIndentProducts, UpdateIndentProducts, UpdateIndentProductsApprove, DeleteIndentProducts };