import { Request, Response } from "express";
import * as entityServices from "../services/EntityServices";

async function GetAllEntities(req: Request, res: Response) {
  const response = await entityServices.GetAllEntities();
  res.json(response);
}

export { GetAllEntities };
