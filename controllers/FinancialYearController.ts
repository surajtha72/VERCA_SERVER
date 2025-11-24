import { Request, Response } from "express";
import * as financialYearservice from "../services/FinancialYearServices";
import {
  CreateFinancialYearModel,
  DeleteFinancialYearModel,
  UpdateFinancialYearModel,
} from "../models/FinancialYearModel";

async function GetAllFinancialYear(req: Request, res: Response) {
    const model = req.query;
    if (model) {
    const response = await financialYearservice.GetAllFinancialYear(model);
    res.json(response);
    } else {
    const response = await financialYearservice.GetAllFinancialYear();
    res.json(response);
    }
}

async function CreateFinancialYear(req: Request, res: Response) {
    let vehicleModel = new CreateFinancialYearModel(req.body);
    const response = await financialYearservice.CreateFinancialYear(
      req,
      vehicleModel
    );
    res.json(response);
  }

  async function UpdateFinancialYear(req: Request, res: Response) {
    let vehicleModel = new UpdateFinancialYearModel(req.body);
    const response = await financialYearservice.UpdateFinancialYear(
      req,
      vehicleModel
    );
    res.json(response);
  }

  async function DeleteFinancialYear(req: Request, res: Response) {
    let model = new DeleteFinancialYearModel(req.params);
    const response = await financialYearservice.DeleteFinancialYear(req, model);
    res.json(response);
  }
  
  export {
    GetAllFinancialYear,
    CreateFinancialYear,
    UpdateFinancialYear,
    DeleteFinancialYear,
  };
  