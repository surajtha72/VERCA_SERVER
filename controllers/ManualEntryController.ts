import { Request, Response } from "express";
import * as manualEntryServices from "../services/AllowManualEntryService"
import{
    CreateManualEntryModel,
    DeleteManualEntryModel,
    UpdateManualEntryModel,
} from "../models/ManualEntryModel";

async function GetManualEntry(req: Request, res: Response) {
    const model = req.query;
    if (model) {
      const response = await manualEntryServices.GetManualEntry(model);
      res.json(response);
    } else {
      const response = await manualEntryServices.GetManualEntry();
      res.json(response);
    }
  }
  
  async function CreateManualEntry(req: Request, res: Response) {
    let model = new CreateManualEntryModel(req.body);
    const response = await manualEntryServices.CreateManualEntry(
      req,
      model
    );
    res.json(response);
  }
  
  async function UpdateManualEntry(req: Request, res: Response) {
    let model = new UpdateManualEntryModel(req.body);
    const response = await manualEntryServices.UpdateManualEntry(
      req,
      model
    );
    res.json(response);
  }
  
  async function DeleteManualEntry(req: Request, res: Response) {
    let model = new DeleteManualEntryModel(req.params);
    const response = await manualEntryServices.DeleteManualEntry(req, model);
    res.json(response);
  }
  
  export {
    GetManualEntry,
    CreateManualEntry,
    UpdateManualEntry,
    DeleteManualEntry,
  };
  