import { Request, Response } from "express";
import * as organizationsServices from "../services/OrganizationsServices";
import {
  CreateOrganizationsModel,
  DeleteOrganizationsModel,
  UpdateOrganizationsModel,
} from "../models/OrganizationsModel";

async function GetOrganizations(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await organizationsServices.GetOrganizations(model);
    res.json(response);
  } else {
    const response = await organizationsServices.GetOrganizations();
    res.json(response);
  }
}

async function GetAllOrganizations(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await organizationsServices.GetAllOrganizations(model);
    res.json(response);
  } else {
    const response = await organizationsServices.GetAllOrganizations();
    res.json(response);
  }
}

async function CreateOrganizations(req: Request, res: Response) {
  let transportersModel = new CreateOrganizationsModel(req.body);
  const response = await organizationsServices.CreateOrganizations(
    req,
    transportersModel
  );
  res.json(response);
}

async function UpdateOrganizations(req: Request, res: Response) {
  let transportersModel = new UpdateOrganizationsModel(req.body);
  const response = await organizationsServices.UpdateOrganizations(
    req,
    transportersModel
  );
  res.json(response);
}

async function DeleteOrganizations(req: Request, res: Response) {
  let model = new DeleteOrganizationsModel(req.params);
  const response = await organizationsServices.DeleteOrganizations(req, model);
  res.json(response);
}

export {
  GetOrganizations,
  GetAllOrganizations,
  CreateOrganizations,
  UpdateOrganizations,
  DeleteOrganizations,
};
