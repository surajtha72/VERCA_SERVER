import { Request, Response } from "express";
import * as routeStopsServices from "../services/RouteStopsServices";
import { CreateRouteStopsModel, DeleteRouteStopsModel, UpdateRouteStopsModel } from "../models/RouteStopsModel";


async function GetRouteStops(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await routeStopsServices.GetRouteStops(model);
        res.json(response);
    } else {
        const response = await routeStopsServices.GetRouteStops();
        res.json(response);
    }
}

async function CreateRouteStop(req: Request, res: Response) {
    let model = new CreateRouteStopsModel(req.body);
    const response = await routeStopsServices.CreateRouteStop(req, model);
    res.json(response);
}

async function UpdateRouteStop(req: Request, res: Response) {
    let model = new UpdateRouteStopsModel(req.body);
    const response = await routeStopsServices.UpdateRouteStop(req, model);
    res.json(response);
}

async function DeleteRouteStop(req: Request, res: Response) {
    let model = new DeleteRouteStopsModel(req.params);
    const response = await routeStopsServices.DeleteRouteStop(req, model);
    res.json(response);
}

export { GetRouteStops, CreateRouteStop, UpdateRouteStop, DeleteRouteStop }