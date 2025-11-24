import { Request, Response } from "express";
import * as roleHasPermissionsServices from "../services/RoleHasPermissionsServices";

async function GetAllRoleHasPermissions(req: Request, res: Response) {
  const response = await roleHasPermissionsServices.GetAllRoleHasPermissions();
  res.json(response);
}

export { GetAllRoleHasPermissions };
