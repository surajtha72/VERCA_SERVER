import { Request, Response } from "express";
import * as productSupplyServices from "../services/ProductSupplyServices";
import { CreateProductSupplyModel, DeleteProductSupplyModel, UpdateProductSupplyModel } from "../models/ProductSupplyModel";


async function GetProductSupplyIndent(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productSupplyServices.GetProductSupplyIndent(model);
        res.json(response);
    } else {
        const response = await productSupplyServices.GetProductSupplyIndent();
        res.json(response);
    }
}

async function GetProductSupplyApprove(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productSupplyServices.GetProductSupplyApprove(model);
        res.json(response);
    } else {
        const response = await productSupplyServices.GetProductSupplyApprove();
        res.json(response);
    }
}

async function GetDCNumbers(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productSupplyServices.GetDCNumbers(model);
        res.json(response);
    } else {
        const response = await productSupplyServices.GetDCNumbers();
        res.json(response);
    }
}

async function CreateProductSupply(req: Request, res: Response) {
    let rolemodel : CreateProductSupplyModel[] = req.body;
    const response = await productSupplyServices.CreateProductSupply(req, rolemodel);
    res.json(response);
}

async function UpdateProductSupply(req: Request, res: Response) {
    let roleModel = new UpdateProductSupplyModel(req.body);
    const response = await productSupplyServices.UpdateProductSupply(req, roleModel);
    res.json(response);
}

async function DeleteProductSupply(req: Request, res: Response) {
    let model = new DeleteProductSupplyModel(req.params);
    const response = await productSupplyServices.DeleteProductSupply(req, model);
    res.json(response);
}

export { 
    GetProductSupplyIndent,
    GetProductSupplyApprove, 
    CreateProductSupply, 
    UpdateProductSupply, 
    DeleteProductSupply,
    GetDCNumbers 
};
