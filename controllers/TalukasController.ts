import { Request, Response } from "express";
import * as talukasServices from "../services/TalukasServices";
import { CreateTalukasModel, DeleteTalukasModel, UpdateTalukasModel } from "../models/TalukasModel";

async function GetAllTalukas(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await talukasServices.GetAllTalukas(model);
    res.json(response);
  } else {
    const response = await talukasServices.GetAllTalukas();
    res.json(response);
  }
}

async function CreateTaluk(req: Request, res: Response) {
  let roleModel = new CreateTalukasModel(req.body);
  const response = await talukasServices.CreateTaluk(req, roleModel);
  res.json(response);
}

async function UpdateTaluk(req: Request, res: Response) {
  let roleModel = new UpdateTalukasModel(req.body);
  const response = await talukasServices.UpdateTaluk(req, roleModel);
  res.json(response);
}

async function DeleteTaluk(req: Request, res: Response) {
  let model = new DeleteTalukasModel(req.params);
  const response = await talukasServices.DeleteTaluk(req, model);
  res.json(response);
}

export { GetAllTalukas, CreateTaluk, UpdateTaluk, DeleteTaluk };
