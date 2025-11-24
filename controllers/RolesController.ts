import { Request, Response } from "express";
import * as rolesServices from "../services/RolesServices";
import {
  CreateRoleModel,
  DeleteRoleModel,
  UpdateRoleModel,
} from "../models/RolesModel";

async function GetAllRoles(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await rolesServices.GetAllRoles(model);
    res.json(response);
  } else {
    const response = await rolesServices.GetAllRoles();
    res.json(response);
  }
}

async function GetEntityAndPermissions(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await rolesServices.GetEntityAndPermissions(model);
    res.json(response);
  } else {
    const response = await rolesServices.GetEntityAndPermissions();
    res.json(response);
  }
}

async function CreateRole(req: Request, res: Response) {
  let roleModel = new CreateRoleModel(req.body);
  const response = await rolesServices.CreateRole(req, roleModel);
  res.json(response);
}

async function UpdateRole(req: Request, res: Response) {
  let roleModel = new UpdateRoleModel(req.body);
  const response = await rolesServices.UpdateRole(req, roleModel);
  res.json(response);
}

async function DeleteRole(req: Request, res: Response) {
  let model = new DeleteRoleModel(req.params);
  const response = await rolesServices.DeleteRole(req, model);
  res.json(response);
}

export {
  GetAllRoles,
  CreateRole,
  UpdateRole,
  DeleteRole,
  GetEntityAndPermissions,
};
