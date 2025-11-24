import { Request, Response } from "express";
import * as permissionsServices from "../services/PermissionsServices";

async function GetAllPermissions(req: Request, res: Response) {
  const response = await permissionsServices.GetAllPermissions();
  res.json(response);
}

export { GetAllPermissions };
