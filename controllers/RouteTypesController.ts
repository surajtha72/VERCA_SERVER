import { Request, Response } from "express";
import * as routesServices from "../services/RouteTypesServices";
import { CreateRouteTypeModel, DeleteRouteTypeModel, UpdateRouteTypeModel } from "../models/RouteTypesModel";

async function GetRouteTypes(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await routesServices.GetRouteTypes(model);
    res.json(response);
  } else {
    const response = await routesServices.GetRouteTypes();
    res.json(response);
  }
}

async function CreateRouteType(req: Request, res: Response) {
  let routeTypeModel = new CreateRouteTypeModel(req.body);
  const response = await routesServices.CreateRouteType(req, routeTypeModel);
  res.json(response);
}

async function UpdateRouteType(req: Request, res: Response) {
  let model = new UpdateRouteTypeModel(req.body);
  const response = await routesServices.UpdateRouteType(req, model);
  res.json(response);
}

async function DeleteRouteType(req: Request, res: Response) {
  let model = new DeleteRouteTypeModel(req.params);
  const response = await routesServices.DeleteRouteType(req, model);
  res.json(response);
}

export{GetRouteTypes,CreateRouteType, UpdateRouteType,DeleteRouteType}