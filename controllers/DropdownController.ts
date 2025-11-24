import { Request, Response } from "express";
import * as dropdownServices from "../services/DropdownServices";

async function GetPayrollTypes(req: Request, res: Response) {
  const response = await dropdownServices.GetPayrollTypes();
  res.json(response);
}

async function GetDefaultCollectionType(req: Request, res: Response) {
  const response = await dropdownServices.GetDefaultCollectionType();
  res.json(response);
}

async function GetOrganizationUnitTypes(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await dropdownServices.GetOrganizationUnitTypes(model);
    res.json(response);
  } else {
    const response = await dropdownServices.GetOrganizationUnitTypes();
    res.json(response);
  }
}

async function GetShifts(req: Request, res: Response) {
  const response = await dropdownServices.GetShifts();
  res.json(response);
}

export { GetPayrollTypes, GetDefaultCollectionType, GetOrganizationUnitTypes, GetShifts };
