import { Request, Response } from "express";
import * as milkCollectionsServices from "../services/MilkCollectionsServices";
import {
  CreateMilkCollectionModel,
  DeleteMilkCollectionModel,
  UpdateMilkCollectionModel,
} from "../models/MilkCollectionsModel";

async function GetAllMilkCollections(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await milkCollectionsServices.GetAllMilkCollections(req,model);
    res.json(response);
  } else {
    const response = await milkCollectionsServices.GetAllMilkCollections(req);
    res.json(response);
  }
}

async function GetMilkCollectionsPortal(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await milkCollectionsServices.GetMilkCollectionsPortal(req,model);
    res.json(response);
  } else {
    const response = await milkCollectionsServices.GetMilkCollectionsPortal(req);
    res.json(response);
  }
}

async function GetMilkRoutes(req: Request, res: Response) {
  const model = req.query;
  const response = await milkCollectionsServices.GetMilkRoutes(model);
  res.json(response);
}

async function CreateMilkCollection(req: Request, res: Response) {
  let milkModel: CreateMilkCollectionModel[] = req.body;
  const response = await milkCollectionsServices.CreateMilkCollection(
    req,
    milkModel
  );
  res.json(response);
}

async function UpdateMilkCollection(req: Request, res: Response) {
  let milkModel: UpdateMilkCollectionModel[] = req.body;
  const response = await milkCollectionsServices.UpdateMilkCollection(
    req,
    milkModel
  );
  res.json(response);
}

async function DeleteMilkCollection(req: Request, res: Response) {
  let model = new DeleteMilkCollectionModel(req.params);
  const response = await milkCollectionsServices.DeleteMilkCollection(
    req,
    model
  );
  res.json(response);
}

async function LockMilkBill(req: Request, res: Response) {
  let milkModel = req.body;
  const response = await milkCollectionsServices.LockMilkBill(
    req,
    milkModel
  );
  res.json(response);
}

async function GetUnlockedBillingCycles(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await milkCollectionsServices.GetUnlockedBillingCycles(model);
    res.json(response);
  } else {
    const response = await milkCollectionsServices.GetUnlockedBillingCycles(req);
    res.json(response);
  }
}

export {
  GetAllMilkCollections,
  CreateMilkCollection,
  UpdateMilkCollection,
  DeleteMilkCollection,
  GetMilkRoutes,
  GetMilkCollectionsPortal,
  LockMilkBill,
  GetUnlockedBillingCycles
};
