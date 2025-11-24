import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import { AllRouteTypesModel, CreateRouteTypeModel, DeleteRouteTypeModel, UpdateRouteTypeModel } from "../models/RouteTypesModel";
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

async function GetRouteTypes(
  model?: any
): Promise<ServiceResponse<AllRouteTypesModel[]>> {
  try {
    let routeType;
    if (model.id) {
      routeType = await AppDataSource.getRepository(entities.RouteType)
        .createQueryBuilder("routeType")
        .leftJoinAndSelect("routeType.FromProcUnitType", "fromProcUnitType")
        .leftJoinAndSelect("routeType.ToProcOrgUnitType", "toProcOrgUnitType")
        .where("routeType.Id = :id", { id: model.id })
        .andWhere("routeType.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      routeType = await AppDataSource.getRepository(entities.RouteType)
        .createQueryBuilder("routeType")
        .leftJoinAndSelect("routeType.FromProcUnitType", "fromProcUnitType")
        .leftJoinAndSelect("routeType.ToProcOrgUnitType", "toProcOrgUnitType")
        .where("routeType.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const routeTypeData: AllRouteTypesModel[] = routeType.map((routeType) => ({
      id: routeType.Id,
      shortDescription: routeType.ShortDescription,
      fromProcUnitType: routeType.FromProcUnitType ? routeType.FromProcUnitType.Id : 0,
      fromProcUnitTypeName: routeType.FromProcUnitType ? routeType.FromProcUnitType.Name : '',
      toProcOrgUnitType: routeType.ToProcOrgUnitType ? routeType.ToProcOrgUnitType.Id : 0,
      toProcOrgUnitTypeName: routeType.ToProcOrgUnitType ? routeType.ToProcOrgUnitType.Name : '',
      vehicleType: routeType.VehicleType,
    }));
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: routeTypeData,
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

async function CreateRouteType(
  req: Request,
  model: CreateRouteTypeModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;
    const fromProc = await AppDataSource.getRepository(entities.OrganizationUnitType)
      .createQueryBuilder("fromProc")
      .where("fromProc.Id = :id", { id: model.fromProcUnitType })
      .getOne();

    const toProc = await AppDataSource.getRepository(entities.OrganizationUnitType)
      .createQueryBuilder("toProc")
      .where("toProc.Id = :id", { id: model.toProcOrgUnitType })
      .getOne();

    const repository = AppDataSource.getRepository(entities.RouteType);
    const routeType = new entities.RouteType();
    routeType.ShortDescription = model.shortDescription ? model.shortDescription : routeType.ShortDescription;
    if (fromProc) {
      routeType.FromProcUnitType = fromProc;
    } if (toProc) {
      routeType.ToProcOrgUnitType = toProc;
    }
    routeType.VehicleType = model.vehicleType ? model.vehicleType : routeType.VehicleType;
    routeType.CreatedAt = new Date();
    routeType.CreatedBy = userId;
    await repository.save(routeType);

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

async function UpdateRouteType(
  req: Request,
  model: UpdateRouteTypeModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.RouteType);
    const routeType = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    const fromProc = await AppDataSource.getRepository(entities.OrganizationUnitType)
      .createQueryBuilder("fromProc")
      .where("fromProc.Id = :id", { id: model.fromProcUnitType })
      .getOne();

    const toProc = await AppDataSource.getRepository(entities.OrganizationUnitType)
      .createQueryBuilder("toProc")
      .where("toProc.Id = :id", { id: model.toProcOrgUnitType })
      .getOne();
    if (routeType) {
      routeType.ShortDescription = model.shortDescription ?? routeType.ShortDescription;
      if (fromProc) {
        routeType.FromProcUnitType = fromProc;
      } if (toProc) {
        routeType.ToProcOrgUnitType = toProc;
      }
      routeType.VehicleType = model.vehicleType ?? routeType.VehicleType;
      routeType.CreatedAt = new Date();
      routeType.CreatedBy = userId;
      await repository.save(routeType);

      return {
        status: 200,
        message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
        data: null,
      };
    } else {
      return {
        status: 404,
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

async function DeleteRouteType(
  req: Request,
  model: DeleteRouteTypeModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.RouteType);
    const routeType = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (routeType) {
      routeType.IsActive = false;
      routeType.DeletedAt = new Date();
      routeType.DeletedBy = userId;
      await repository.save(routeType);

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

export { GetRouteTypes, CreateRouteType, UpdateRouteType, DeleteRouteType };
