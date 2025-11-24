import { Request, Response } from "express";
import * as nonAgentsServices from "../services/NonAgentsServices";
import {
    CreateNonAgentsModel,
    DeleteNonAgentsModel,
    UpdateNonAgentsModel,
} from "../models/NonAgentsModel";

async function GetAllNonAgents(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await nonAgentsServices.GetAllNonAgents(model);
        res.json(response);
    } else {
        const response = await nonAgentsServices.GetAllNonAgents();
        res.json(response);
    }
}

async function CreateNonAgents(req: Request, res: Response) {
    let farmersModel = new CreateNonAgentsModel(req.body);
    const response = await nonAgentsServices.CreateNonAgents(
        req,
        farmersModel
    );
    res.json(response);
}

async function UpdateNonAgents(req: Request, res: Response) {
    let transportersModel = new UpdateNonAgentsModel(req.body);
    const response = await nonAgentsServices.UpdateNonAgents(
        req,
        transportersModel
    );
    res.json(response);
}

async function DeleteNonAgents(req: Request, res: Response) {
    let model = new DeleteNonAgentsModel(req.params);
    const response = await nonAgentsServices.DeleteNonAgents(req, model);
    res.json(response);
}

export {
    GetAllNonAgents,
    CreateNonAgents,
    UpdateNonAgents,
    DeleteNonAgents
};