import { Request, Response } from "express";
import * as rateMasterServices from "../services/RateMasterServices";
import { CreateRateMasterModel, DeleteRateMasterModel, UpdateRateMasterModel } from "../models/RateMasterModel";

async function GetRateMaster(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await rateMasterServices.GetRateMaster(model);
    res.json(response);
  } else {
    const response = await rateMasterServices.GetRateMaster();
    res.json(response);
  }
}

async function CreateRateMaster(req: Request, res: Response) {
    let rateMasterModel = new CreateRateMasterModel(req.body);
    const response = await rateMasterServices.CreateRateMaster(
      req,
      rateMasterModel
    );
    res.json(response);
  }

  async function UpdateRateMaster(req: Request, res: Response) {
    let rateMasterModel = new UpdateRateMasterModel(req.body);
    const response = await rateMasterServices.UpdateRateMaster(
      req,
      rateMasterModel
    );
    res.json(response);
  }

  async function DeleteRateMaster(req: Request, res: Response) {
    let model = new DeleteRateMasterModel(req.params);
    const response = await rateMasterServices.DeleteRateMaster(req, model);
    res.json(response);
  }
  

export { CreateRateMaster, GetRateMaster, UpdateRateMaster,DeleteRateMaster };
