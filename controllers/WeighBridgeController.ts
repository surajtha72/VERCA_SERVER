import { Request, Response } from "express";
import * as weighBridgeServices from "../services/WeighBridgeServices";
import { CreateWeighBridgeModel, DeleteWeighBridgeModel, UpdateWeighBridgeModel } from "../models/WeighBridgeModel";


async function GetWeighBridge(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await weighBridgeServices.GetWeighBridge(model);
        res.json(response);
    } else {
        const response = await weighBridgeServices.GetWeighBridge();
        res.json(response);
    }
}

async function GetTransitLossGainReports(req: Request, res: Response) {
  
    
     const model = req.query;
     console.log('called',model);
    // let model= { vehicleId: '31', fromDate: '2024-05-03', toDate: '2024-06-02' };
    
        const response = await weighBridgeServices.GetTransitLossGainReports(model);
        res.json(response);
    
}

async function CreateWeighBridge(req: Request, res: Response) {
    let roleModel = new CreateWeighBridgeModel(req.body);
    const response = await weighBridgeServices.CreateWeighBridge(req, roleModel);
    res.json(response);
}

async function CreateWeighBridgeVehicle(req: Request, res: Response) {
    let reqModel = req.body;
    const response = await weighBridgeServices.CreateWeighBridgeVehicle(req, reqModel);
    res.json(response);
}

async function UpdateWeighBridge(req: Request, res: Response) {
    let roleModel = new UpdateWeighBridgeModel(req.body);
    const response = await weighBridgeServices.UpdateWeighBridge(req, roleModel);
    res.json(response);
}

async function DeleteWeighBridge(req: Request, res: Response) {
    let model = new DeleteWeighBridgeModel(req.params);
    const response = await weighBridgeServices.DeleteWeighBridge(req, model);
    res.json(response);
}

export { GetWeighBridge, CreateWeighBridge, UpdateWeighBridge, DeleteWeighBridge, CreateWeighBridgeVehicle,GetTransitLossGainReports };