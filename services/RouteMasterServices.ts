import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import {
  APIResponse,
  PagedResponse,
  ServiceResponse,
} from "../models/ApiResponse";
import {
  AllRouteMasterModel,
  CreateRouteMasterModel,
  DeleteRouteMasterModel,
  UpdateRouteMasterModel,
} from "../models/RouteMasterModel";
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

async function GetRouteMaster(
  model?: any
): Promise<ServiceResponse<AllRouteMasterModel[]>> {
  try {
    let routeMaster;
    if (model.id) {
      routeMaster = await AppDataSource.getRepository(entities.RouteMaster)
        .createQueryBuilder("routeMaster")
        .leftJoinAndSelect("routeMaster.RouteTypeId", "RouteTypeId")
        .leftJoinAndSelect("routeMaster.RouteOwner", "RouteOwner")
        .where("routeMaster.Id = :id", { id: model.id })
        .andWhere("routeMaster.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      routeMaster = await AppDataSource.getRepository(entities.RouteMaster)
        .createQueryBuilder("routeMaster")
        .leftJoinAndSelect("routeMaster.RouteTypeId", "RouteTypeId")
        .leftJoinAndSelect("routeMaster.RouteOwner", "RouteOwner")
        .where("routeMaster.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const routeMasterData: AllRouteMasterModel[] = routeMaster.map(
      (routeMaster) => ({
        id: routeMaster.Id,

        routeTypeId: routeMaster.RouteTypeId ? routeMaster.RouteTypeId.Id : 0,
        routeTypeName: routeMaster.RouteTypeId
          ? routeMaster.RouteTypeId.ShortDescription
          : "",
        routeOwnerId: routeMaster.RouteOwner ? routeMaster.RouteOwner.Id : 0,
        routeOwnerName: routeMaster.RouteOwner
          ? routeMaster.RouteOwner.Name
          : "",
        routeName: routeMaster.RouteName,
        routeCode: routeMaster.RouteCode,
        tripType: routeMaster.TripType,
        morningShiftSchTime: routeMaster.MorningShiftSchTime,
        eveningShiftSchTime: routeMaster.EveningShiftSchTime,
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: routeMasterData,
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

async function CreateRouteMaster(
  req: Request,
  model: CreateRouteMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const routeType = await AppDataSource.getRepository(entities.RouteType)
      .createQueryBuilder("routeType")
      .where("routeType.Id = :id", { id: model.routeTypeId })
      .getOne();

    const routeOwner = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("routeOwner")
      .where("routeOwner.Id = :id", { id: model.routeOwner })
      .getOne();

    if (!routeOwner) {
      return {
        status: 404,
        message: "Invalid routeOwner id. Organization not found.",
        data: null,
      };
    }

    const existingRouteMaster = await AppDataSource.getRepository(
      entities.RouteMaster
    )
      .createQueryBuilder("routeMaster")
      .where("routeMaster.RouteOwner = :routeOwnerId", {
        routeOwnerId: routeOwner.Id,
      })
      .andWhere("routeMaster.RouteCode = :routeCode", {
        routeCode: model.routeCode,
      })
      .getOne();

    if (existingRouteMaster) {
      return {
        status: 422,
        message: "A RouteMaster with the provided routeOwner and routeCode already exists.",
        data: null,
      };
    }
    const repository = AppDataSource.getRepository(entities.RouteMaster);
    const routeMaster = new entities.RouteMaster();
    if (routeType) {
      routeMaster.RouteTypeId = routeType;
    }
    if (routeOwner) {
      routeMaster.RouteOwner = routeOwner;
    }

    routeMaster.RouteName = model.routeName ?? routeMaster.RouteName;
    routeMaster.RouteCode = model.routeCode ?? routeMaster.RouteCode;
    routeMaster.TripType = model.tripType ?? routeMaster.TripType;
    routeMaster.MorningShiftSchTime =
      model.morningShiftSchTime ?? routeMaster.MorningShiftSchTime;
    routeMaster.EveningShiftSchTime =
      model.eveningShiftSchTime ?? routeMaster.EveningShiftSchTime;

    routeMaster.CreatedAt = new Date();
    routeMaster.CreatedBy = userId;
    await repository.save(routeMaster);

    return {
      status: 200,
      message: SUCCESS_MESSAGES.ADD_SUCCESS,
      data: null,
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

async function UpdateRouteMaster(
  req: Request,
  model: UpdateRouteMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const routeType = await AppDataSource.getRepository(entities.RouteType)
      .createQueryBuilder("routeType")
      .where("routeType.Id = :id", { id: model.routeTypeId })
      .getOne();

    const repository = AppDataSource.getRepository(entities.RouteMaster);
    const routeMaster = await repository
      .createQueryBuilder("routeMaster")
      .leftJoinAndSelect("routeMaster.RouteOwner", "RouteOwner")
      .where("routeMaster.Id = :id", { id: model.id })
      .getOne();

    // console.log("model: ", model.routeOwner, model.routeCode);
    // console.log("routeMaster.RouteOwner: ", routeMaster?.RouteOwner.Id);
    // console.log("routeCode: ", routeMaster);

    if (routeMaster) {
      const existingRouteOwner = routeMaster.RouteOwner;
      // console.log("inside if routemaster");
      if (
        model.routeOwner !== existingRouteOwner.Id
      ) {
        // console.log("inside if routewoner");
        const newRouteOwner = await AppDataSource.getRepository(
          entities.Organization
        )
          .createQueryBuilder("routeOwner")
          .where("routeOwner.Id = :id", { id: model.routeOwner })
          .getOne();

        if (!newRouteOwner) {
          return {
            status: 404,
            message: "Invalid routeOwner id. Organization not found.",
            data: null,
          };
        }

        // console.log("newRouteOwner.Id: ", newRouteOwner.Id);
        // console.log("model.routeCode: ", model.routeCode);
        // console.log("routeMaster.Id: ", routeMaster.Id);

        const existingRouteMaster = await AppDataSource.getRepository(
          entities.RouteMaster
        )
          .createQueryBuilder("routeMaster")
          .where("routeMaster.route_owner = :routeOwnerId", {
            routeOwnerId: newRouteOwner.Id,
          })
          .andWhere("routeMaster.route_code = :routeCode", {
            routeCode: model.routeCode,
          })
          .andWhere("routeMaster.Id != :routeMasterId", {
            routeMasterId: routeMaster.Id,
          })
          .getOne();

        if (existingRouteMaster) {
          return {
            status: 422,
            message:
              "A Route Master with the provided Route Owner and Route Code already exists !",
            data: null,
          };
        }
        routeMaster.RouteOwner = newRouteOwner;
      }

      if (routeType) {
        routeMaster.RouteTypeId = routeType;
      }
      routeMaster.RouteName = model.routeName ?? routeMaster.RouteName;
      routeMaster.RouteCode = model.routeCode ?? routeMaster.RouteCode;
      routeMaster.TripType = model.tripType ?? routeMaster.TripType;
      routeMaster.MorningShiftSchTime = model.morningShiftSchTime ?? routeMaster.MorningShiftSchTime;
      routeMaster.EveningShiftSchTime = model.eveningShiftSchTime ?? routeMaster.EveningShiftSchTime;
      routeMaster.ModifiedAt = new Date();
      routeMaster.ModifiedBy = userId;
      await repository.save(routeMaster);

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
      status: 500,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

async function DeleteRouteMaster(
  req: Request,
  model: DeleteRouteMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.RouteMaster);
    const routeMaster = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (routeMaster) {
      routeMaster.IsActive = false;
      routeMaster.DeletedAt = new Date();
      routeMaster.DeletedBy = userId;
      await repository.save(routeMaster);

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
  GetRouteMaster,
  CreateRouteMaster,
  UpdateRouteMaster,
  DeleteRouteMaster,
};
