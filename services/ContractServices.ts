import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import {
    AllContractModel,
    CreateContractModel,
    UpdateContractModel,
    DeleteContractModel,
} from "../models/ContractModel";
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

async function GetAllContract(
  model?: any
): Promise<ServiceResponse<AllContractModel[]>> {
  try {
    let contract;
    if (model.TransporterId) {
      contract = await AppDataSource.getRepository(
        entities.TransporterContracts
      )
        .createQueryBuilder("contract")
        .leftJoinAndSelect("contract.TransporterId", "transporter")
        .leftJoinAndSelect("contract.RouteId", "route")
        .leftJoinAndSelect("contract.VehicleId", "vehicle")
        .where("transporter.Id = :id", { id: model.TransporterId })
        .andWhere("contract.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      contract = await AppDataSource.getRepository(
        entities.TransporterContracts
      )
        .createQueryBuilder("contract")
        .leftJoinAndSelect("contract.TransporterId", "transporter")
        .leftJoinAndSelect("contract.RouteId", "route")
        .leftJoinAndSelect("contract.VehicleId", "vehicle")
        .where("contract.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const contractData: AllContractModel[] = contract.map((contract) => ({
      id: contract.Id,
      transporterId: contract?.TransporterId.Id,
      routeId: contract?.RouteId,
      vehicleId: contract?.VehicleId,
      startDate: contract?.StartDate,
      endDate: contract?.EndDate,
      payTerms: contract?.PayTerms,
      payAmount: contract?.PayAmount,
      addlChargeType: contract?.AddlChargeType,
      addlChargeAmount: contract?.AddlChargeAmount,
      status: contract?.Status,
      isActive: contract?.IsActive,
    }));

    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: contractData,
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


async function CreateContract(
  req: Request,
  model: CreateContractModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const transporterId = await AppDataSource.getRepository(
      entities.Transporters
    )
      .createQueryBuilder("transporter")
      .where("transporter.Id = :id", { id: model.transporterId })
      .getOne();

    const routeId = await AppDataSource.getRepository(entities.RouteMaster)
      .createQueryBuilder("route")
      .where("route.Id = :id", { id: model.routeId })
      .getOne();

    const vehicleId = await AppDataSource.getRepository(
      entities.TransporterVehicles
    )
      .createQueryBuilder("vehicle")
      .where("vehicle.Id = :id", { id: model.vehicleId })
      .getOne();

    const repository = AppDataSource.getRepository(
      entities.TransporterContracts
    );
    const contract = new entities.TransporterContracts();
    if (transporterId) {
      contract.TransporterId = transporterId;
    }
    if (routeId) {
      contract.RouteId = routeId;
    }
    if (vehicleId) {
      contract.VehicleId = vehicleId;
    }
    contract.StartDate = model.startDate
      ? model.startDate
      : contract.StartDate;
    contract.EndDate = model.endDate ? model.endDate : contract.EndDate;
    contract.PayTerms = model.payTerms ? model.payTerms : contract.PayTerms;
    contract.PayAmount = model.payAmount
      ? model.payAmount
      : contract.PayAmount;
    contract.AddlChargeType = model.addlChargeType
      ? model.addlChargeType
      : contract.AddlChargeType;
    contract.AddlChargeAmount = model.addlChargeAmount
      ? model.addlChargeAmount
      : contract.AddlChargeAmount;
    contract.Status = model.status ? model.status : contract.Status;
    contract.IsActive = model.isActive ? model.isActive : contract.IsActive;

    contract.CreatedAt = new Date();

    contract.CreatedBy = userId;
    await repository.save(contract);

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

async function UpdateContract(
    req: Request,
    model: UpdateContractModel
  ): Promise<ServiceResponse<APIResponse[]>> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const key = process.env.TOKEN_SECRET;
      const decode = jwt.verify(token, key);
      const userId = decode.userId;
  
      const repository = AppDataSource.getRepository(
        entities.TransporterContracts
      );
      const contract = await repository.findOne({
        where: { Id: model.id ?? 0 },
        relations: ["TransporterId", "RouteId", "VehicleId"]
      });
      // console.log(model.id, contract);
  
      if (contract) {
        const transporterId = await AppDataSource.getRepository(
          entities.Transporters
        )
          .createQueryBuilder("transporter")
          .where("transporter.Id = :id", { id: model.transporterId })
          .getOne();
  
        const routeId = await AppDataSource.getRepository(entities.RouteMaster)
          .createQueryBuilder("route")
          .where("route.Id = :id", { id: model.routeId })
          .getOne();
  
        const vehicleId = await AppDataSource.getRepository(
          entities.TransporterVehicles
        )
          .createQueryBuilder("vehicle")
          .where("vehicle.Id = :id", { id: model.vehicleId })
          .getOne();
  
        if (transporterId) {
          contract.TransporterId = transporterId;
        }
        if (routeId) {
          contract.RouteId = routeId;
        }
        if (vehicleId) {
          contract.VehicleId = vehicleId;
        }
        contract.StartDate = model.startDate
          ? model.startDate
          : contract.StartDate;
        contract.EndDate = model.endDate ? model.endDate : contract.EndDate;
        contract.PayTerms = model.payTerms ? model.payTerms : contract.PayTerms;
        contract.PayAmount = model.payAmount
          ? model.payAmount
          : contract.PayAmount;
        contract.AddlChargeType = model.addlChargeType
          ? model.addlChargeType
          : contract.AddlChargeType;
        contract.AddlChargeAmount = model.addlChargeAmount
          ? model.addlChargeAmount
          : contract.AddlChargeAmount;
        contract.Status = model.status ? model.status : contract.Status;
        contract.IsActive = model.isActive ? model.isActive : contract.IsActive;
  
        contract.ModifiedAt = new Date();
        contract.ModifiedBy = userId;
  
        await repository.save(contract);
  
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

async function DeleteContract(
    req: Request,
    model: DeleteContractModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const repository = AppDataSource.getRepository(
            entities.TransporterContracts
        );
        const contract = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });
        if (contract) {
            contract.IsActive = false;
            contract.DeletedAt = new Date();
            contract.DeletedBy = userId;
            await repository.save(contract);

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
    GetAllContract,
    CreateContract,
    UpdateContract,
    DeleteContract
}