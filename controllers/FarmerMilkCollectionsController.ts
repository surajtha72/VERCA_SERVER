import { Request, Response } from "express";
import * as farmerMilkCollectionsServices from "../services/FarmerMilkCollectionsServices";
import {
  CreateFarmerMilkCollectionModel,
  DeleteFarmerMilkCollectionModel,
  UpdateFarmerMilkCollectionModel,
} from "../models/FarmerMilkCollectionsModel";

async function GetAllFarmerMilkCollections(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await farmerMilkCollectionsServices.GetAllFarmerMilkCollections(req,model);
    res.json(response);
  } else {
    const response = await farmerMilkCollectionsServices.GetAllFarmerMilkCollections(req);
    res.json(response);
  }
}

async function GetFarmerMilkCollectionsPortal(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await farmerMilkCollectionsServices.GetFarmerMilkCollectionsPortal(req,model);
    res.json(response);
  } else {
    const response = await farmerMilkCollectionsServices.GetFarmerMilkCollectionsPortal(req);
    res.json(response);
  }
}

async function GeFarmerMilkRoutes(req: Request, res: Response) {
  const model = req.query;
  const response = await farmerMilkCollectionsServices.GetMilkRoutes(model);
  res.json(response);
}

async function CreateFarmerMilkCollection(req: Request, res: Response) {
  let milkModel : CreateFarmerMilkCollectionModel[] = req.body;
  const response = await farmerMilkCollectionsServices.CreateFarmerMilkCollection(
    req,
    milkModel
  );
  res.json(response);
}

async function UpdateFarmerMilkCollection(req: Request, res: Response) {
  let milkModel : UpdateFarmerMilkCollectionModel[] = req.body;
  const response = await farmerMilkCollectionsServices.UpdateFarmerMilkCollection(
    req,
    milkModel
  );
  res.json(response);
}

async function DeleteFarmerMilkCollection(req: Request, res: Response) {
  let model = new DeleteFarmerMilkCollectionModel(req.params);
  const response = await farmerMilkCollectionsServices.DeleteFarmerMilkCollection(
    req,
    model
  );
  res.json(response);
}

async function LockMilkBill(req: Request, res: Response) {
  let milkModel = req.body;
  const response = await farmerMilkCollectionsServices.LockMilkBill(
    req,
    milkModel
  );
  res.json(response);
}

async function GetUnlockedBillingCycles(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await farmerMilkCollectionsServices.GetUnlockedBillingCycles(model);
    res.json(response);
  } else {
    const response = await farmerMilkCollectionsServices.GetUnlockedBillingCycles(req);
    res.json(response);
  }
}

export {
  GetAllFarmerMilkCollections,
  CreateFarmerMilkCollection,
  UpdateFarmerMilkCollection,
  DeleteFarmerMilkCollection,
  GeFarmerMilkRoutes,
  GetFarmerMilkCollectionsPortal,
  LockMilkBill,
  GetUnlockedBillingCycles
};