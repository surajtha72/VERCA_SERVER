import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import {
  AllVehiclesModel,
  CreateVehicleModel,
  UpdateVehicleModel,
  DeleteVehicleModel,
} from "../models/VehiclesModels";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
dotenv.config();

const ERROR_MESSAGES = {
  NO_DATA: "No Data",
  INTERNAL_SERVER: "Internal Server Error",
};

const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: "Registration successful",
  SUCCESS: "Success",
  ADD_SUCCESS: "Added Successfully",
  UPDATE_SUCCESS: "Updated Successfully",
  DELETE_SUCCESS: "Deleted Successfully",
};

async function GetAllVehicles(
  model?: any
): Promise<ServiceResponse<AllVehiclesModel[]>> {
  try {
    let vehicle;
    if (model.TransporterId) {
      vehicle = await AppDataSource.getRepository(
        entities.TransporterVehicles
      )
        .createQueryBuilder("vehicle")
        .leftJoinAndSelect("vehicle.TransporterId", "transporter")
        .where("transporter.Id = :id", { id: model.TransporterId })
        .andWhere("vehicle.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.vehicleNo) {
      vehicle = await AppDataSource.getRepository(
        entities.TransporterVehicles
      )
        .createQueryBuilder("vehicle")
        // .leftJoinAndSelect("vehicle.TransporterId", "transporter")
        .where("vehicle.RegistrationNo = :id", { id: model.vehicleNo })
        .andWhere("vehicle.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      vehicle = await AppDataSource.getRepository(
        entities.TransporterVehicles
      )
        .createQueryBuilder("vehicle")
        .leftJoinAndSelect("vehicle.TransporterId", "transporter")
        .where("vehicle.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    // console.log("#################################",vehicle);
    const vehicleData: AllVehiclesModel[] = vehicle.map(
      (vehicle) => ({
        id: vehicle.Id,
        transporterId: vehicle.TransporterId,
        isFoodTransferVehicle: vehicle.IsFoodTransportVehicle,
        vehicleType: vehicle.VehicleType,
        registrationNumber: vehicle.RegistrationNo,
        make: vehicle.Make,
        model: vehicle.Model,
        capacity: Number(vehicle.Capacity),
        FSSAILicNo: vehicle.FSSAILicNo,
        FSSAILicExpiryDate: vehicle.FSSAILicExpiryDate,
        insurance: vehicle.Insurance,
        insuranceExpiryDate: vehicle.InsuranceExpiryDate,
        isActive: vehicle.IsActive
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: vehicleData,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

async function CreateVehicle(
  req: Request,
  model: CreateVehicleModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(
      entities.TransporterVehicles
    );

    const transporterId = await AppDataSource.getRepository(
      entities.Transporters
    )
      .createQueryBuilder("transporter")
      .where("transporter.Id = :id", { id: model.transporterId })
      .getOne();


    const vehicle = new entities.TransporterVehicles();

    if (transporterId) {
      vehicle.TransporterId = transporterId;
    }

    // vehicle.TransporterId = new entities.Transporters();
    // vehicle.TransporterId.Id = model.transporterId ?? vehicle.TransporterId;
    vehicle.IsFoodTransportVehicle = model.isFoodTransferVehicle ?? vehicle.IsFoodTransportVehicle;
    vehicle.VehicleType = model.vehicleType ?? vehicle.VehicleType;
    vehicle.RegistrationNo = model.registrationNumber ?? vehicle.RegistrationNo;
    vehicle.Make = model.make ?? vehicle.Make;
    vehicle.Model = model.model ?? vehicle.Model;
    vehicle.Capacity = model.capacity ?? vehicle.Capacity;
    vehicle.FSSAILicNo = model.FSSAILicNo ?? vehicle.FSSAILicNo;
    vehicle.FSSAILicExpiryDate = model.insuranceExpiryDate ?? vehicle.FSSAILicExpiryDate;
    vehicle.Insurance = model.insurance ?? vehicle.Insurance;
    vehicle.InsuranceExpiryDate = model.insuranceExpiryDate ?? vehicle.InsuranceExpiryDate;
    vehicle.CreatedAt = new Date();
    vehicle.CreatedBy = userId;
    await repository.save(vehicle);
    return {
      status: 200,
      message: SUCCESS_MESSAGES.ADD_SUCCESS,
      data: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

async function UpdateVehicle(
  req: Request,
  model: UpdateVehicleModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(
      entities.TransporterVehicles
    );
    const vehicle = await repository.findOne({
      where: { Id: model.id ?? 0 }
    });

    // console.log('model: ', model);

    const transporterId = await AppDataSource.getRepository(entities.Transporters)
      .createQueryBuilder("transporters")
      .where("transporters.Id = :id", { id: model.transporterId.Id })
      .getOne();

    if (vehicle) {
      if (transporterId) {
        vehicle.TransporterId = transporterId;
      }
      vehicle.IsFoodTransportVehicle = model.isFoodTransferVehicle ?? vehicle.IsFoodTransportVehicle;
      vehicle.VehicleType = model.vehicleType ? model.vehicleType : vehicle.VehicleType;
      vehicle.RegistrationNo = model.registrationNumber ? model.registrationNumber : vehicle.RegistrationNo;
      vehicle.Make = model.make ? model.make : vehicle.Make;
      vehicle.Model = model.model ? model.model : vehicle.Model;
      vehicle.Capacity = model.capacity ? model.capacity : vehicle.Capacity;
      vehicle.FSSAILicNo = model.FSSAILicNo ? model.FSSAILicNo : vehicle.FSSAILicNo;
      vehicle.FSSAILicExpiryDate = model.FSSAILicExpiryDate ? model.insuranceExpiryDate : vehicle.FSSAILicExpiryDate;
      vehicle.Insurance = model.insurance ? model.insurance : vehicle.Insurance;
      vehicle.InsuranceExpiryDate = model.insuranceExpiryDate ? model.insuranceExpiryDate : vehicle.InsuranceExpiryDate;
      vehicle.ModifiedAt = new Date();
      vehicle.ModifiedBy = userId;
      await repository.save(vehicle);

      return {
        status: 200,
        message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
        data: null,
      };
    } else {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

async function DeleteVehicle(
  req: Request,
  model: DeleteVehicleModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(
      entities.TransporterVehicles
    );
    const vehicle = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (vehicle) {
      vehicle.IsActive = false;
      vehicle.DeletedAt = new Date();
      vehicle.DeletedBy = userId;
      await repository.save(vehicle);

      return {
        status: 200,
        message: SUCCESS_MESSAGES.DELETE_SUCCESS,
        data: null,
      };
    } else {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

export {
  GetAllVehicles,
  CreateVehicle,
  UpdateVehicle,
  DeleteVehicle
}