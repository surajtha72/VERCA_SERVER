import { Request, Response } from "express";
import * as transportersServices from "../services/TransportersServices";
import { CreateTransportersModel, DeleteTransporterModel, UpdateTransportersModel } from "../models/TransportersModel";

async function GetTransporters(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await transportersServices.GetTransporters(model);
    res.json(response);
  } else {
    const response = await transportersServices.GetTransporters();
    res.json(response);
  }
}

async function CreateTransporters(req: Request, res: Response) {
  let transportersModel = new CreateTransportersModel(req.body);
  const response = await transportersServices.CreateTransporters(
    req,
    transportersModel
  );
  res.json(response);
}

async function UpdateTransporters(req: Request, res: Response) {
  let transportersModel = new UpdateTransportersModel(req.body);
  const response = await transportersServices.UpdateTransporters(
    req,
    transportersModel
  );
  res.json(response);
}

async function DeleteTransporters(req: Request, res: Response) {
  let model = new DeleteTransporterModel(req.params);
  const response = await transportersServices.DeleteTransporters(req, model);
  res.json(response);
}

export { GetTransporters, DeleteTransporters, CreateTransporters,UpdateTransporters };
