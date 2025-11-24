import { Request, Response } from "express";
import * as rateAppliedServices from "../services/RateAppliedServices";
import { CreateRateAppliedModel, DeleteRateAppliedModel, UpdateRateAppliedModel } from "../models/RateAppliedModel";


async function GetRateApplied(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await rateAppliedServices.GetRateApplied(model);
        res.json(response);
    } else {
        const response = await rateAppliedServices.GetRateApplied();
        res.json(response);
    }
}

async function CreateRateApplied(req: Request, res: Response) {
    let roleModel = new CreateRateAppliedModel(req.body);
    const response = await rateAppliedServices.CreateRateApplied(req, roleModel);
    res.json(response);
}

async function UpdateRateApplied(req: Request, res: Response) {
    let roleModel = new UpdateRateAppliedModel(req.body);
    const response = await rateAppliedServices.UpdateRateApplied(req, roleModel);
    res.json(response);
}

async function DeleteRateApplied(req: Request, res: Response) {
    let model = new DeleteRateAppliedModel(req.params);
    const response = await rateAppliedServices.DeleteRateApplied(req, model);
    res.json(response);
}

export { GetRateApplied, CreateRateApplied, UpdateRateApplied, DeleteRateApplied };
