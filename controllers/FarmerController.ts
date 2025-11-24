import { Request, Response } from "express";
import * as farmersServices from "../services/FarmerService";
import {
    CreateFarmersModel,
    DeleteFarmersModel,
    UpdateFarmersModel,
} from "../models/FarmerModel";

async function GetAllFarmers(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await farmersServices.GetAllFarmers(model);
        res.json(response);
    } else {
        const response = await farmersServices.GetAllFarmers();
        res.json(response);
    }
}

async function CreateFarmers(req: Request, res: Response) {
    let farmersModel = new CreateFarmersModel(req.body);
    const response = await farmersServices.CreateFarmers(
        req,
        farmersModel
    );
    res.json(response);
}

async function UpdateFarmers(req: Request, res: Response) {
    let transportersModel = new UpdateFarmersModel(req.body);
    const response = await farmersServices.UpdateFarmers(
        req,
        transportersModel
    );
    res.json(response);
}

async function DeleteFarmers(req: Request, res: Response) {
    let model = new DeleteFarmersModel(req.params);
    const response = await farmersServices.DeleteFarmers(req, model);
    res.json(response);
}

export {
    GetAllFarmers,
    CreateFarmers,
    UpdateFarmers,
    DeleteFarmers
};