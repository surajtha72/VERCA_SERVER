import { Request, Response } from "express";
import * as bankServices from "../services/BankServices";
import { CreateBankModel, DeleteBankModel, UpdateBankModel } from "../models/BankModel";

async function GetAllBanks(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await bankServices.GetAllBanks(model);
    res.json(response);
  } else {
    const response = await bankServices.GetAllBanks();
    res.json(response);
  }
}

async function CreateBank(req: Request, res: Response) {
    let bankModel = new CreateBankModel(req.body);
    const response = await bankServices.CreateBank(req, bankModel);
    res.json(response);
  }

  async function UpdateBank(req: Request, res: Response) {
    let bankModel = new UpdateBankModel(req.body);
    const response = await bankServices.UpdateBank(req, bankModel);
    res.json(response);
  }

  async function DeleteBank(req: Request, res: Response) {
    let model = new DeleteBankModel(req.params);
    const response = await bankServices.DeleteBank(req, model);
    res.json(response);
  }

export { GetAllBanks, CreateBank, UpdateBank, DeleteBank };
