import { Request, Response } from "express";
import * as productPurchaseQtyServices from "../services/ProductPurchaseQtyServices";
import { CreateProductPurchaseQtyModel, DeleteProductPurchaseQtyModel, UpdateProductPurchaseQtyModel } from "../models/ProductPurchaseQtyModel";


async function GetProductPurchaseQty(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await productPurchaseQtyServices.GetProductPurchaseQty(model);
        res.json(response);
    } else {
        const response = await productPurchaseQtyServices.GetProductPurchaseQty();
        res.json(response);
    }
}

async function CreateProductPurchaseQty(req: Request, res: Response) {
    let roleModel = new CreateProductPurchaseQtyModel(req.body);
    const response = await productPurchaseQtyServices.CreateProductPurchaseQty(req, roleModel);
    res.json(response);
}

async function UpdateProductPurchaseQty(req: Request, res: Response) {
    let roleModel = new UpdateProductPurchaseQtyModel(req.body);
    const response = await productPurchaseQtyServices.UpdateProductPurchaseQty(req, roleModel);
    res.json(response);
}

async function DeleteproductPurchaseQty(req: Request, res: Response) {
    let model = new DeleteProductPurchaseQtyModel(req.params);
    const response = await productPurchaseQtyServices.DeleteproductPurchaseQty(req, model);
    res.json(response);
}

export { GetProductPurchaseQty, CreateProductPurchaseQty, UpdateProductPurchaseQty, DeleteproductPurchaseQty };
