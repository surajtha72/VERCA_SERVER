import { Request, Response } from "express";
import * as productCategoryServices from "../services/ProductCategoryServices";
import { CreateProductCategoryModel, DeleteProductCategoryModel, UpdateProductCategoryModel } from "../models/ProductCategoryModel";

async function GetProductCategory(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await productCategoryServices.GetProductCategory(model);
    res.json(response);
  } else {
    const response = await productCategoryServices.GetProductCategory();
    res.json(response);
  }
}

async function CreateProductCategory(req: Request, res: Response) {
    let productCategoryModel = new CreateProductCategoryModel(req.body);
    const response = await productCategoryServices.CreateProductCategory(
      req,
      productCategoryModel
    );
    res.json(response);
  }

  async function UpdateProductCategory(req: Request, res: Response) {
    let rateMasterModel = new UpdateProductCategoryModel(req.body);
    const response = await productCategoryServices.UpdateProductCategory(
      req,
      rateMasterModel
    );
    res.json(response);
  }

  async function DeleteProductCategory(req: Request, res: Response) {
    let model = new DeleteProductCategoryModel(req.params);
    const response = await productCategoryServices.DeleteProductCategory(req, model);
    res.json(response);
  }
  

export { CreateProductCategory, GetProductCategory, UpdateProductCategory, DeleteProductCategory };
