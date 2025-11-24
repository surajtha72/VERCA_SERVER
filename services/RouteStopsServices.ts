import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllRouteStopsModel,
  CreateRouteStopsModel,
  DeleteRouteStopsModel,
  UpdateRouteStopsModel,
} from "../models/RouteStopsModel";
dotenv.config();
import moment from "moment";

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

async function GetRouteStops(
  model?: any
): Promise<ServiceResponse<AllRouteStopsModel[]>> {
  try {
    let routeStops;
    if (model.id) {
      routeStops = await AppDataSource.getRepository(entities.RouteStops)
        .createQueryBuilder("routeStops")
        .leftJoinAndSelect("routeStops.RouteId", "RouteId")
        .leftJoinAndSelect("routeStops.StopId", "StopId")
        .where("routeStops.Id = :id", { id: model.id })
        .andWhere("routeStops.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.routeMasterId) {
      routeStops = await AppDataSource.getRepository(entities.RouteStops)
        .createQueryBuilder("routeStops")
        .leftJoinAndSelect("routeStops.RouteId", "RouteId")
        .leftJoinAndSelect("routeStops.StopId", "StopId")
        .where("routeStops.RouteId = :id", { id: model.routeMasterId })
        .andWhere("routeStops.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      routeStops = await AppDataSource.getRepository(entities.RouteStops)
        .createQueryBuilder("routeStops")
        .leftJoinAndSelect("routeStops.RouteId", "RouteId")
        .leftJoinAndSelect("routeStops.StopId", "StopId")
        .where("routeStops.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const routeStopsData: AllRouteStopsModel[] = routeStops.map(
      (routeStops) => ({
        id: routeStops.Id,
        routeId: routeStops.RouteId ? routeStops.RouteId.Id : 0,
        routeName: routeStops.RouteId ? routeStops.RouteId.RouteName : "",
        sequenceNo: routeStops.SequenceNo,
        stopId: routeStops.StopId ? routeStops.StopId.Id : 0,
        stopName: routeStops.StopId ? routeStops.StopId.Name : "",
        travelKms: routeStops.TravelKms,
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: routeStopsData,
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

async function CreateRouteStop(
  req: Request,
  model: CreateRouteStopsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const route = await AppDataSource.getRepository(entities.RouteMaster)
      .createQueryBuilder("route")
      .where("route.Id = :id", { id: model.routeId })
      .getOne();

    const stop = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("stop")
      .where("stop.Id = :id", { id: model.stopId })
      .getOne();

    const repository = AppDataSource.getRepository(entities.RouteStops);
    const routeStops = new entities.RouteStops();
    if (route) {
      routeStops.RouteId = route;
    }
    routeStops.SequenceNo = model.sequenceNo ?? routeStops.SequenceNo;

    if (stop) {
      routeStops.StopId = stop;
    }

    routeStops.TravelKms = model.travelKms ?? routeStops.TravelKms;

    routeStops.CreatedAt = new Date();
    routeStops.CreatedBy = userId;
    await repository.save(routeStops);

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

async function UpdateRouteStop(
  req: Request,
  model: UpdateRouteStopsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const route = await AppDataSource.getRepository(entities.RouteMaster)
      .createQueryBuilder("route")
      .where("route.Id = :id", { id: model.routeId })
      .getOne();

    const stop = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("stop")
      .where("stop.Id = :id", { id: model.stopId })
      .getOne();

    const repository = AppDataSource.getRepository(entities.RouteStops);
    const routeStops = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (routeStops) {
      if (route) {
        routeStops.RouteId = route;
      }
      routeStops.SequenceNo = model.sequenceNo ?? routeStops.SequenceNo;

      if (stop) {
        routeStops.StopId = stop;
      }

      routeStops.TravelKms = model.travelKms ?? routeStops.TravelKms;

      routeStops.ModifiedAt = new Date();
      routeStops.ModifiedBy = userId;
      await repository.save(routeStops);

      const currentDate = new Date();

      // Fetch the cycle startDate and endDate
      const cycle = await AppDataSource.getRepository(
        entities.BillingCycleMaster
      )
        .createQueryBuilder("cycle")
        .where(":currentDate BETWEEN cycle.StartDate AND cycle.EndDate", {
          currentDate,
        })
        .getOne();

      // console.log("cycle: ", cycle);
      if (!cycle) {
        throw new Error("No active billing cycle found for the current date.");
      }

      // Format startDate and endDate to 'YYYY-MM-DD HH:mm:ss'
      const startDate = moment(cycle.StartDate).format("YYYY-MM-DD HH:mm:ss");
      const endDate = moment(cycle.EndDate).format("YYYY-MM-DD HH:mm:ss");

      console.log(startDate,endDate);

      // Fetch milk collection details within the date range
      const milkCollectionDetails = await AppDataSource.getRepository(
        entities.MilkCollectionDetails
      )
        .createQueryBuilder("milkCollectionDetails")
        .leftJoinAndSelect(
          "milkCollectionDetails.OrganizationUnitId",
          "organization"
        )
        .leftJoinAndSelect("organization.ParentId", "organizationParent")
        .leftJoinAndSelect("organization.OrganizationType", "organizationType")
        .leftJoinAndSelect(
          "milkCollectionDetails.MilkCollectionId",
          "collections"
        )
        .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
        .andWhere("milkCollectionDetails.IsActive = :isActive", { isActive: true })
        .andWhere("organizationType.Id = :id", { id: 5 })
        .andWhere("milkCollectionDetails.Fat IS NOT NULL")
        .andWhere("milkCollectionDetails.Snf IS NOT NULL")
        .andWhere("milkCollectionDetails.Clr IS NOT NULL")
        .andWhere("milkCollectionDetails.CollectedAt BETWEEN :startDate AND :endDate",
          { startDate, endDate}
        ).andWhere("milkCollectionDetails.OrganizationUnitId = :orgunitid",
          { orgunitid: model.stopId })
        .orderBy("milkCollectionDetails.OrganizationUnitId")
        .getMany();

      console.log("milkcollection details: ", milkCollectionDetails.length);
      
      if (milkCollectionDetails.length > 0) {
        // console.log("milkcollection details before update: ", milkCollectionDetails);
      
        // Update each milk collection detail's RouteId with routeStops.RouteId
        for (const detail of milkCollectionDetails) {
          detail.RouteId = routeStops.RouteId;
        }
      
        // console.log("milkcollection details after update: ", milkCollectionDetails);
      
        // Optionally, save the updated details back to the database
        for (const detail of milkCollectionDetails) {
          await AppDataSource.getRepository(entities.MilkCollectionDetails).save(detail);
        }
      }

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

async function DeleteRouteStop(
  req: Request,
  model: DeleteRouteStopsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.RouteStops);
    const routeStops = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (routeStops) {
      routeStops.IsActive = false;
      routeStops.DeletedAt = new Date();
      routeStops.DeletedBy = userId;
      await repository.save(routeStops);

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

export { GetRouteStops, CreateRouteStop, UpdateRouteStop, DeleteRouteStop };
