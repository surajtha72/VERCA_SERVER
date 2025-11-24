import { Request, Response } from "express";
import * as dashboardServices from "../services/DashboardServices";

async function GetOrganizationUnitWeights(req: Request, res: Response) {
    const response = await dashboardServices.GetOrganizationUnitWeights();
    res.json(response);
}

async function GetMorEveBargraphData(req: Request, res: Response) {
    const model = req.query;
    if (model) {
    const response = await dashboardServices.MorEveBargraphData(model);
    res.json(response);
    } else {
    const response = await dashboardServices.MorEveBargraphData();
    res.json(response);
    }
}

async function GetLinneGraphData(req: Request, res: Response) {
    const model = req.query;
    if (model) {
    const response = await dashboardServices.LinegraphData(model);
    res.json(response);
    } else {
    const response = await dashboardServices.LinegraphData();
    res.json(response);
    }
}

export { GetOrganizationUnitWeights, GetMorEveBargraphData, GetLinneGraphData }
