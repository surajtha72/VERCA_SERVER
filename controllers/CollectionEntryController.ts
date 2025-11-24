import { Request, Response } from "express";
import * as collectionEntryServices from "../services/AllowCollectionEntryService"
import{
    CreateCollectionEntryModel,
    DeleteCollectionEntryModel,
    UpdateCollectionEntryModel,
} from "../models/CollectionEntryModel";

async function GetCollectionEntry(req: Request, res: Response) {
    const model = req.query;
    if (model) {
      const response = await collectionEntryServices.GetCollectionEntry(model);
      res.json(response);
    } else {
      const response = await collectionEntryServices.GetCollectionEntry();
      res.json(response);
    }
  }
  
  async function CreateCollectionEntry(req: Request, res: Response) {
    let model = new CreateCollectionEntryModel(req.body);
    const response = await collectionEntryServices.CreateCollectionEntry(
      req,
      model
    );
    res.json(response);
  }
  
  async function UpdateCollectionEntry(req: Request, res: Response) {
    let model = new UpdateCollectionEntryModel(req.body);
    const response = await collectionEntryServices.UpdateCollectionEntry(
      req,
      model
    );
    res.json(response);
  }
  
  async function DeleteCollectionEntry(req: Request, res: Response) {
    let model = new DeleteCollectionEntryModel(req.params);
    const response = await collectionEntryServices.DeleteCollectionEntry(req, model);
    res.json(response);
  }
  
  export {
    GetCollectionEntry,
    CreateCollectionEntry,
    UpdateCollectionEntry,
    DeleteCollectionEntry,
  };
  