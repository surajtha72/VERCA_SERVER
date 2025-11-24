import { Request, Response } from "express";
import * as productMasterServices from "../services/ProductMasterServices";
import { CreateProductMasterModel, DeleteProductMasterModel, UpdateProductMasterModel } from "../models/ProductMasterModel";


async function GetProductMaster(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productMasterServices.GetProductMaster(model);
        res.json(response);
    } else {
        const response = await productMasterServices.GetProductMaster();
        res.json(response);
    }
}

async function CreateProductMaster(req: Request, res: Response) {
    let roleModel = new CreateProductMasterModel(req.body);
    const response = await productMasterServices.CreateProductMaster(req, roleModel);
    res.json(response);
}

async function UpdateProductMaster(req: Request, res: Response) {
    let roleModel = new UpdateProductMasterModel(req.body);
    const response = await productMasterServices.UpdateProductMaster(req, roleModel);
    res.json(response);
}

async function DeleteProductMaster(req: Request, res: Response) {
    let model = new DeleteProductMasterModel(req.params);
    const response = await productMasterServices.DeleteProductMaster(req, model);
    res.json(response);
}

export { GetProductMaster, CreateProductMaster, UpdateProductMaster, DeleteProductMaster };
