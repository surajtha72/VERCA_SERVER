import { Request, Response } from "express";
import * as incentiveServices from "../services/IncentiveMasterServices";
import { CreateIncentiveMasterModel, DeleteIncentiveMasterModel, UpdateIncentiveMasterModel } from "../models/IncentiveMasterModel";


async function GetAllIncentiveMaster(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await incentiveServices.GetAllIncentiveMaster(model);
    res.json(response);
  } else {
    const response = await incentiveServices.GetAllIncentiveMaster();
    res.json(response);
  }
}

async function CreateIncentiveMaster(req: Request, res: Response) {
    let roleModel = new CreateIncentiveMasterModel(req.body);
    const response = await incentiveServices.CreateIncentiveMaster(req, roleModel);
    res.json(response);
  }

  async function UpdateIncentiveMaster(req: Request, res: Response) {
    let roleModel = new UpdateIncentiveMasterModel(req.body);
    const response = await incentiveServices.UpdateIncentiveMaster(req, roleModel);
    res.json(response);
  }

  async function DeleteIncentiveMaster(req: Request, res: Response) {
    let model = new DeleteIncentiveMasterModel(req.params);
    const response = await incentiveServices.DeleteIncentiveMaster(req, model);
    res.json(response);
  }

export { GetAllIncentiveMaster, CreateIncentiveMaster, UpdateIncentiveMaster, DeleteIncentiveMaster };
