import { Request, Response } from "express";
import * as milkDispatchServices from "../services/MilkDispatchServices";
import { CreateMilkDispatchModel, DeleteMilkDispatchModel, UpdateMilkDispatchModel } from "../models/MilkDispatchModel";

async function GetAllMilkDispatch(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await milkDispatchServices.GetAllMilkDispatch(model);
        res.json(response);
    } else {
        const response = await milkDispatchServices.GetAllMilkDispatch();
        res.json(response);
    }
}

async function GetMilkDipatchRoutes(req: Request, res: Response) {
    const model = req.query;
    const response = await milkDispatchServices.GetMilkDipatchRoutes(model);
    res.json(response);
  }

async function CreateMilkDispatch(req: Request, res: Response) {
    let milkModel: CreateMilkDispatchModel[] = req.body;
    const response = await milkDispatchServices.CreateMilkDispatch(req, milkModel);
    res.json(response);
}

async function UpdateMilkDispatch(req: Request, res: Response) {
    let milkModel: UpdateMilkDispatchModel[] = req.body;
    const response = await milkDispatchServices.UpdateMilkDispatch(req, milkModel);
    res.json(response);
}

async function DeleteMilkDispatch(req: Request, res: Response) {
    let model = new DeleteMilkDispatchModel(req.params);
    const response = await milkDispatchServices.DeleteMilkDispatch(req, model);
    res.json(response);
}

export { GetAllMilkDispatch, GetMilkDipatchRoutes, CreateMilkDispatch, UpdateMilkDispatch, DeleteMilkDispatch }