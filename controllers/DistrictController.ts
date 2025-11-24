import { Request, Response } from "express";
import * as districtServices from "../services/DistrictServices";
import { CreateDistrictModel, DeleteDistrictModel, UpdateDistrictModel } from "../models/DistrictModel";

async function GetAllDistricts(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await districtServices.GetAllDistricts(model);
    res.json(response);
  } else {
    const response = await districtServices.GetAllDistricts();
    res.json(response);
  }
}

async function CreateDistrict(req: Request, res: Response) {
  let districtModel = new CreateDistrictModel(req.body);
  const response = await districtServices.CreateDistrict(req, districtModel);
  res.json(response);
}

async function UpdateDistrict(req: Request, res: Response) {
  let districtModel = new UpdateDistrictModel(req.body);
  const response = await districtServices.UpdateDistrict(req, districtModel);
  res.json(response);
}

async function DeleteDistrict(req: Request, res: Response) {
  let model = new DeleteDistrictModel(req.params);
  const response = await districtServices.DeleteDistrict(req, model);
  res.json(response);
}

export { GetAllDistricts, CreateDistrict, UpdateDistrict, DeleteDistrict };
