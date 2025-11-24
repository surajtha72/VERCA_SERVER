import { Request, Response } from "express";
import * as autoWeighbridgeService from "../services/AutoWeighbridgeService";


async function GetAutoWeighbridgeData(req: Request, res: Response) {
    const response = await autoWeighbridgeService.GetAutoWeighbridgeData();
    res.json(response);
}

export {GetAutoWeighbridgeData};