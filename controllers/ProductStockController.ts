import { Request, Response } from "express";
import * as productStockServices from "../services/ProductStockServices";
import { CreateProductStockModel, DeleteProductStockModel, UpdateProductStockModel } from "../models/ProductStockModel";


async function GetProductStock(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productStockServices.GetProductStock(model);
        res.json(response);
    }
}

async function CreateProductStock(req: Request, res: Response) {
    let roleModel = new CreateProductStockModel(req.body);
    const response = await productStockServices.CreateProductStock(req, roleModel);
    res.json(response);
}

async function UpdateProductStock(req: Request, res: Response) {
    let roleModel = new UpdateProductStockModel(req.body);
    const response = await productStockServices.UpdateProductStock(req, roleModel);
    res.json(response);
}

async function DeleteProductStock(req: Request, res: Response) {
    let model = new DeleteProductStockModel(req.params);
    const response = await productStockServices.DeleteProductStock(req, model);
    res.json(response);
}

export {
    GetProductStock,
    CreateProductStock,
    UpdateProductStock,
    DeleteProductStock
};

