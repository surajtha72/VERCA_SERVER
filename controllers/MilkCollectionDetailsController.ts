import { Request, Response } from "express";
import * as milkCollectionDetailsServices from "../services/MilkCollectionDetailsServices";
import { CreateMilkCollectionDetailsModel, DeleteMilkCollectionDetailsModel, UpdateMilkCollectionDetailsModel } from "../models/MilkCollectionDetailsModel";

async function GetAllMilkCollectionDetails(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await milkCollectionDetailsServices.GetAllMilkCollectionDetails(model);
        res.json(response);
    } else {
        const response = await milkCollectionDetailsServices.GetAllMilkCollectionDetails();
        res.json(response);
    }
}

async function CreateMilkCollectionDetails(req: Request, res: Response) {
    let milkModel: CreateMilkCollectionDetailsModel[] = req.body ;
    const response = await milkCollectionDetailsServices.CreateMilkCollectionDetails(req, milkModel);
    res.json(response);
}

async function UpdateMilkCollectionDetails(req: Request, res: Response) {
    let milkModel: UpdateMilkCollectionDetailsModel[] = req.body;
    const response = await milkCollectionDetailsServices.UpdateMilkCollectionDetails(req, milkModel);
    res.json(response);
}

async function DeleteMilkCollectionDetails(req: Request, res: Response) {
    let model = new DeleteMilkCollectionDetailsModel(req.params);
    const response = await milkCollectionDetailsServices.DeleteMilkCollectionDetails(req, model);
    res.json(response);
}

export {GetAllMilkCollectionDetails, CreateMilkCollectionDetails, UpdateMilkCollectionDetails, DeleteMilkCollectionDetails }