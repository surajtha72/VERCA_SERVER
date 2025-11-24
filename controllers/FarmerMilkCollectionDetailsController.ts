import { Request, Response } from "express";
import * as farmerMilkCollectionDetailsServices from "../services/FarmerMilkCollectionDetailsServices";
import { CreateFarmerMilkCollectionDetailsModel, DeleteFarmerMilkCollectionDetailsModel, UpdateFarmerMilkCollectionDetailsModel } from "../models/FarmerMilkCollectionDetailsModel";

async function GetAllFarmerMilkCollectionDetails(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await farmerMilkCollectionDetailsServices.GetAllFarmerMilkCollectionDetails(model);
        res.json(response);
    } else {
        const response = await farmerMilkCollectionDetailsServices.GetAllFarmerMilkCollectionDetails();
        res.json(response);
    }
}

async function CreateFarmerMilkCollectionDetails(req: Request, res: Response) {
    let milkModel : CreateFarmerMilkCollectionDetailsModel[] = req.body;
    const response = await farmerMilkCollectionDetailsServices.CreateFarmerMilkCollectionDetails(req, milkModel);
    res.json(response);
}

async function UpdateFarmerMilkCollectionDetails(req: Request, res: Response) {
    let milkModel : UpdateFarmerMilkCollectionDetailsModel[] = req.body;
    const response = await farmerMilkCollectionDetailsServices.UpdateFarmerMilkCollectionDetails(req, milkModel);
    res.json(response);
}

async function DeleteFarmerMilkCollectionDetails(req: Request, res: Response) {
    let model = new DeleteFarmerMilkCollectionDetailsModel(req.params);
    const response = await farmerMilkCollectionDetailsServices.DeleteFarmerMilkCollectionDetails(req, model);
    res.json(response);
}

export {GetAllFarmerMilkCollectionDetails, CreateFarmerMilkCollectionDetails, UpdateFarmerMilkCollectionDetails, DeleteFarmerMilkCollectionDetails }