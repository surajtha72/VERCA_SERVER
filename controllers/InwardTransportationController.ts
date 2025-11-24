import { Request, Response } from "express";
import * as inwardTransportation from "../services/InwardTransportationService";

async function GetInwardTransportation(req: Request, res: Response) {
    const model = req.body;
    const response = await inwardTransportation.GetInwardTransportation(req, model);
    res.json(response);
}

async function GetVehicleAttendance(req: Request, res: Response) {
    const model = req.body;
    const response = await inwardTransportation.GetVehicleAttendance(req, model);
    res.json(response);
}

export { GetInwardTransportation, GetVehicleAttendance }