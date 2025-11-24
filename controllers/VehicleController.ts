import { Request, Response } from "express";
import * as vehicleService from "../services/VehiclesServices";
import {
  CreateVehicleModel,
  DeleteVehicleModel,
  UpdateVehicleModel,
} from "../models/VehiclesModels";

async function GetAllVehicles(req: Request, res: Response) {
    const model = req.query;
    if (model) {
    const response = await vehicleService.GetAllVehicles(model);
    res.json(response);
    } else {
    const response = await vehicleService.GetAllVehicles();
    res.json(response);
    }
}

async function CreateVehicle(req: Request, res: Response) {
    let vehicleModel = new CreateVehicleModel(req.body);
    const response = await vehicleService.CreateVehicle(
      req,
      vehicleModel
    );
    res.json(response);
  }

  async function UpdateVehicle(req: Request, res: Response) {
    let vehicleModel = new UpdateVehicleModel(req.body);
    const response = await vehicleService.UpdateVehicle(
      req,
      vehicleModel
    );
    res.json(response);
  }

  async function DeleteVehicle(req: Request, res: Response) {
    let model = new DeleteVehicleModel(req.params);
    const response = await vehicleService.DeleteVehicle(req, model);
    res.json(response);
  }
  
  export {
    GetAllVehicles,
    CreateVehicle,
    UpdateVehicle,
    DeleteVehicle,
  };
  