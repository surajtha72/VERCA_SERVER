import { Request, Response } from "express";
import * as bankBranchServices from "../services/BankBranchServices";
import { CreateBankBranchModel, UpdateBankBranchModel, DeleteBankBranchModel } from "../models/BankBranchModel";

async function GetAllBankBranches(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await bankBranchServices.GetAllBankBranches(model);
    res.json(response);
  } else {
    const response = await bankBranchServices.GetAllBankBranches();
    res.json(response);
  }
}

async function CreateBankBranch(req: Request, res: Response) {
  let bankBranchModel = new CreateBankBranchModel(req.body);
  const response = await bankBranchServices.CreateBankBranch(req, bankBranchModel);
  res.json(response);
}

async function UpdateBankBranch(req: Request, res: Response) {
  let bankBranchModel = new UpdateBankBranchModel(req.body);
  const response = await bankBranchServices.UpdateBankBranch(req, bankBranchModel);
  res.json(response);
}

async function DeleteBankBranch(req: Request, res: Response) {
  let model = new DeleteBankBranchModel(req.params);
  const response = await bankBranchServices.DeleteBankBranch(req, model);
  res.json(response);
}

export { GetAllBankBranches, CreateBankBranch, UpdateBankBranch, DeleteBankBranch };
