import { Request, Response } from "express";
import * as statesServices from "../services/StatesServices";
import { CreateStateModel, DeleteStateModel, UpdateStateModel } from "../models/StatesModel";

async function GetAllStates(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await statesServices.GetAllStates(model);
    res.json(response);
  } else {
    const response = await statesServices.GetAllStates();
    res.json(response);
  }
}

async function CreateState(req: Request, res: Response) {
  let stateModel = new CreateStateModel(req.body);
  const response = await statesServices.CreateState(req, stateModel);
  res.json(response);
}

async function UpdateState(req: Request, res: Response) {
  let stateModel = new UpdateStateModel(req.body);
  const response = await statesServices.UpdateState(req, stateModel);
  res.json(response);
}

async function DeleteState(req: Request, res: Response) {
  let model = new DeleteStateModel(req.params);
  const response = await statesServices.DeleteState(req, model);
  res.json(response);
}

export { GetAllStates, CreateState, UpdateState, DeleteState };
