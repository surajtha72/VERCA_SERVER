import { Request, Response } from "express";
import * as weighbridgeDataService from "../services/WeighbridgeDataService"
import { UpdateWeighbridgeData, UpdateWeighbridgeLabDataModel } from "../models/WeighbridgeDataModel";

async function UpdateWeighBridgeData(req: Request, res: Response) {
    let roleModel = new UpdateWeighbridgeData(req.body);
    const response = await weighbridgeDataService.UpdateWeighBridgeData(req, roleModel);
    res.json(response);
}

async function GetWeighBridgeData(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await weighbridgeDataService.GetWeighbridgeData(model);
        res.json(response);
    } else {
        const response = await weighbridgeDataService.GetWeighbridgeData();
        res.json(response);
    }
}

async function UpdateWeighBridgeLabData(req: Request, res: Response) {
    let roleModel = new UpdateWeighbridgeLabDataModel(req.body);
    const response = await weighbridgeDataService.UpdateWeighBridgeLabData(req, roleModel);
    res.json(response);
}

async function GetWeighBridgeLabData(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await weighbridgeDataService.GetWeighbridgeLabData(model);
        res.json(response);
    } else {
        const response = await weighbridgeDataService.GetWeighbridgeLabData();
        res.json(response);
    }
}

export { UpdateWeighBridgeData, GetWeighBridgeData, UpdateWeighBridgeLabData, GetWeighBridgeLabData };