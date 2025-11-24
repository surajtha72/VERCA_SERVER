import { Request, Response } from "express";
import * as routeMasterServices from "../services/RouteMasterServices";
import { CreateRouteMasterModel, DeleteRouteMasterModel, UpdateRouteMasterModel } from "../models/RouteMasterModel";

async function GetRouteMaster(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await routeMasterServices.GetRouteMaster(model);
    res.json(response);
  } else {
    const response = await routeMasterServices.GetRouteMaster();
    res.json(response);
  }
}

async function CreateRouteMaster(req: Request, res: Response) {
  let model = new CreateRouteMasterModel(req.body);
  const response = await routeMasterServices.CreateRouteMaster(req, model);
  res.json(response);
}

async function UpdateRouteMaster(req: Request, res: Response) {
  let model = new UpdateRouteMasterModel(req.body);
  const response = await routeMasterServices.UpdateRouteMaster(req, model);
  res.json(response);
}

async function DeleteRouteMaster(req: Request, res: Response) {
  let model = new DeleteRouteMasterModel(req.params);
  const response = await routeMasterServices.DeleteRouteMaster(req, model);
  res.json(response);
}

export { GetRouteMaster, CreateRouteMaster, UpdateRouteMaster, DeleteRouteMaster }