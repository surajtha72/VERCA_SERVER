import { Request, Response } from "express";
import * as slabServices from "../services/IncentiveSlabsServices";
import { CreateIncentiveSlabsModel, DeleteIncentiveSlabsModel, UpdateIncentiveSlabsModel } from "../models/IncentiveSlabsModel";


async function GetAllIncentiveSlabs(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await slabServices.GetAllIncentiveSlabs(model);
        res.json(response);
    } else {
        const response = await slabServices.GetAllIncentiveSlabs();
        res.json(response);
    }
}

async function CreateIncentiveSlabs(req: Request, res: Response) {
    let roleModel = new CreateIncentiveSlabsModel(req.body);
    const response = await slabServices.CreateIncentiveSlabs(req, roleModel);
    res.json(response);
}

async function UpdateIncentiveSlabs(req: Request, res: Response) {
    let roleModel = new UpdateIncentiveSlabsModel(req.body);
    const response = await slabServices.UpdateIncentiveSlabs(req, roleModel);
    res.json(response);
}

async function DeleteIncentiveSlabs(req: Request, res: Response) {
    let model = new DeleteIncentiveSlabsModel(req.params);
    const response = await slabServices.DeleteIncentiveSlabs(req, model);
    res.json(response);
}

export { GetAllIncentiveSlabs, CreateIncentiveSlabs, UpdateIncentiveSlabs, DeleteIncentiveSlabs };
