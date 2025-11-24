import { Request, Response } from "express";
import * as contractServices from "../services/ContractServices";
import {
  CreateContractModel,
  DeleteContractModel,
  UpdateContractModel,
} from "../models/ContractModel";

async function GetAllContracts(req: Request, res: Response) {
    const model = req.query;
    if (model) {
    const response = await contractServices.GetAllContract(model);
    res.json(response);
    } else {
    const response = await contractServices.GetAllContract();
    res.json(response);
    }
}

async function CreateContract(req: Request, res: Response) {
    let contractModel = new CreateContractModel(req.body);
    const response = await contractServices.CreateContract(
      req,
      contractModel
    );
    res.json(response);
  }

  async function UpdateContract(req: Request, res: Response) {
    let contractModel = new UpdateContractModel(req.body);
    const response = await contractServices.UpdateContract(
      req,
      contractModel
    );
    res.json(response);
  }

  async function DeleteContract(req: Request, res: Response) {
    let model = new DeleteContractModel(req.params);
    const response = await contractServices.DeleteContract(req, model);
    res.json(response);
  }
  
  export {
    GetAllContracts,
    CreateContract,
    UpdateContract,
    DeleteContract,
  };
  