import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import {
  APIResponse,
  MilkCollectionRoutesResponse,
  ServiceResponse,
} from "../models/ApiResponse";
import {
  AllMilkDispatchModel,
  CreateMilkDispatchModel,
  DeleteMilkDispatchModel,
  UpdateMilkDispatchModel,
} from "../models/MilkDispatchModel";
import moment from "moment";
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

async function GetAllMilkDispatch(
  model?: any,
  currentDate: Date = new Date()
): Promise<ServiceResponse<AllMilkDispatchModel[]>> {
  try {
    let milkDispatch;
    const newDate = moment(currentDate).format('YYYY-MM-DD')
    if (model.id) {
      milkDispatch = await AppDataSource.getRepository(entities.MilkDispatch)
        .createQueryBuilder("milkDispatch")
        .leftJoinAndSelect("milkDispatch.RouteId", "RouteId")
        .leftJoinAndSelect(
          "milkDispatch.TransporterVehicleId",
          "TransporterVehicleId"
        )
        .where("milkDispatch.Id = :id", { id: model.id })
        .andWhere("milkDispatch.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    else if (model.orgUnitId) {
      milkDispatch = await AppDataSource.getRepository(entities.MilkDispatch)
        .createQueryBuilder("milkDispatch")
        .leftJoinAndSelect("milkDispatch.CreatedBy", "user")
        .leftJoinAndSelect("milkDispatch.RouteId", "RouteId")
        .leftJoinAndSelect(
          "milkDispatch.TransporterVehicleId",
          "TransporterVehicleId"
        )
        .where("user.OrganizationUnitId = :orgUnitId", { orgUnitId: model.orgUnitId })
        .andWhere("milkDispatch.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    else if (model.vehicleNo) {
      // console.log("inside vehicleNo model")
      milkDispatch = await AppDataSource.getRepository(entities.MilkDispatch)
        .createQueryBuilder("milkdispatch")
        .leftJoinAndSelect("milkdispatch.RouteId", "RouteId")
        .leftJoinAndSelect(
          "milkdispatch.TransporterVehicleId",
          "TransporterVehicleId"
        )
        .where("milkdispatch.TransporterVehicleId =:vehicleNo", { vehicleNo: model.vehicleNo })
        .andWhere("milkdispatch.IsActive =:isActive", { isActive: true })
        .andWhere("DATE(milkdispatch.CreatedAt) =:currentDate", { currentDate: newDate })
        .orderBy("milkdispatch.CreatedAt", "DESC")
        .getMany();
    }
    else if (model.vehicleId && model.fromDate && model.toDate) {
      console.log("inside report model")
      milkDispatch = await AppDataSource.getRepository(entities.MilkDispatch)
        .createQueryBuilder("milkdispatch")
        .leftJoinAndSelect("milkdispatch.RouteId", "RouteId")
        .leftJoinAndSelect(
          "milkdispatch.TransporterVehicleId",
          "TransporterVehicleId"
        )
        .where("milkdispatch.TransporterVehicleId =:vehicleNo", { vehicleNo: model.vehicleId })
        .andWhere("DATE(milkdispatch.DispatchedAt) >=:fromDate", { fromDate: model.fromDate })
        .andWhere("DATE(milkdispatch.DispatchedAt) <=:toDate", { toDate: model.toDate })
        .getMany();
    }
    else if (model.fromDate && model.toDate) {
      console.log("inside form date to date model")
      milkDispatch = await AppDataSource.getRepository(entities.MilkDispatch)
        .createQueryBuilder("milkdispatch")
        .leftJoinAndSelect("milkdispatch.RouteId", "RouteId")
        .leftJoinAndSelect(
          "milkdispatch.TransporterVehicleId",
          "TransporterVehicleId"
        )
        .andWhere("DATE(milkdispatch.DispatchedAt) >=:fromDate", { fromDate: model.fromDate })
        .andWhere("DATE(milkdispatch.DispatchedAt) <=:toDate", { toDate: model.toDate })
        .getMany();
    }
    else {
      milkDispatch = await AppDataSource.getRepository(entities.MilkDispatch)
        .createQueryBuilder("milkDispatch")
        .leftJoinAndSelect("milkDispatch.RouteId", "RouteId")
        .leftJoinAndSelect(
          "milkDispatch.TransporterVehicleId",
          "TransporterVehicleId"
        )
        .where("milkDispatch.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const milkDispatchData: AllMilkDispatchModel[] = milkDispatch.map(
      (milkDispatch) => ({
        id: milkDispatch?.Id,
        transporterVehicleId: milkDispatch?.TransporterVehicleId
          ? milkDispatch?.TransporterVehicleId.Id
          : 0,
        transporterVehicleType: milkDispatch?.TransporterVehicleId
          ? milkDispatch?.TransporterVehicleId.VehicleType
          : "",
        routeId: milkDispatch?.RouteId ? milkDispatch?.RouteId.Id : 0,
        routeName: milkDispatch?.RouteId ? milkDispatch?.RouteId.RouteName : "",
        startFat: milkDispatch?.StartFat,
        startSnf: milkDispatch?.StartSnf,
        startClr: milkDispatch?.StartClr,
        endFat: milkDispatch?.EndFat,
        endSnf: milkDispatch?.EndSnf,
        endClr: milkDispatch?.EndClr,
        weight: milkDispatch?.Weight,
        dispatchedAt: milkDispatch?.DispatchedAt,
        createdAt: milkDispatch.CreatedAt,
        updatedAt: milkDispatch.ModifiedAt,
        deletedAt: milkDispatch.DeletedAt,
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: milkDispatchData,
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

async function GetMilkDipatchRoutes(
  model?: any
): Promise<ServiceResponse<MilkCollectionRoutesResponse[]>> {
  try {
    const routeStops = await AppDataSource.getRepository(entities.RouteStops)
      .createQueryBuilder("stops")
      .leftJoinAndSelect("stops.RouteId", "route")
      // .where("stops.Id = :stopId", {
      //   stopId: model.routeStopId,
      // })
      .where("stops.IsActive = :isActive", { isActive: true })
      .getMany();
    // console.log('routestops', routeStops);
    if (routeStops.length === 0) {
      return {
        status: 404,
        message: "No data found for the particular Route Stops Id",
        data: null,
      };
    }

    const routeMasterIds = routeStops.map((stop) => stop.RouteId.Id);

    const contracts = await AppDataSource.getRepository(
      entities.TransporterContracts
    )
      .createQueryBuilder("contracts")
      .leftJoinAndSelect("contracts.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .leftJoinAndSelect("contracts.TransporterId", "transporter")
      .leftJoinAndSelect("contracts.VehicleId", "vehicle")
      .leftJoinAndSelect("vehicle.TransporterId", "TransporterId")
      .where("contracts.RouteId IN (:...routeMasterIds)", { routeMasterIds })
      .andWhere("contracts.IsActive = :isActive", { isActive: true })
      .getMany();

    if (contracts.length === 0) {
      return {
        status: 404,
        message: "No data found for the particular Route Stops Id",
        data: null,
      };
    }

    const contractsData: MilkCollectionRoutesResponse[] = contracts.map(
      (contract) => ({
        vehicle: {
          id: contract.VehicleId ? contract.VehicleId?.Id : null,
          transporterId: contract.VehicleId.TransporterId ? contract.VehicleId.TransporterId.Id : null,
          isFoodTransportVehicle: contract.VehicleId
            ? contract.VehicleId?.IsFoodTransportVehicle
            : null,
          vehicleType: contract.VehicleId
            ? contract.VehicleId?.VehicleType
            : null,
          registrationNo: contract.VehicleId
            ? contract.VehicleId?.RegistrationNo
            : null,
          make: contract.VehicleId ? contract.VehicleId?.Make : null,
          model: contract.VehicleId ? contract.VehicleId?.Model : null,
          capacity: contract.VehicleId ? contract.VehicleId?.Capacity : null,
          fSSAILicNo: contract.VehicleId
            ? contract.VehicleId?.FSSAILicNo
            : null,
          fSSAILicExpiryDate: contract.VehicleId
            ? contract.VehicleId?.FSSAILicExpiryDate
            : null,
          insurance: contract.VehicleId ? contract.VehicleId?.Insurance : null,
          insuranceExpiryDate: contract.VehicleId
            ? contract.VehicleId?.InsuranceExpiryDate
            : null,
          isActive: contract.VehicleId ? contract.VehicleId?.IsActive : null,
          createdAt: contract.VehicleId ? contract.VehicleId?.CreatedAt : null,
          modifiedAt: contract.VehicleId
            ? contract.VehicleId?.ModifiedAt
            : null,
          deletedAt: contract.VehicleId ? contract.VehicleId?.DeletedAt : null,
        },
        route: {
          id: contract.RouteId ? contract.RouteId?.Id : null,
          routeOwner: contract.RouteId.RouteOwner ? contract.RouteId.RouteOwner.Id : null,
          routeName: contract.RouteId ? contract.RouteId?.RouteName : null,
          routeCode: contract.RouteId ? contract.RouteId?.RouteCode : null,
          tripType: contract.RouteId ? contract.RouteId?.TripType : null,
          morningShiftSchTime: contract.RouteId
            ? contract.RouteId?.MorningShiftSchTime
            : null,
          eveningShiftSchTime: contract.RouteId
            ? contract.RouteId?.EveningShiftSchTime
            : null,
          isActive: contract.RouteId ? contract.RouteId?.IsActive : null,
          createdAt: contract.RouteId ? contract.RouteId?.CreatedAt : null,
          modifiedAt: contract.RouteId ? contract.RouteId?.ModifiedAt : null,
          deletedAt: contract.RouteId ? contract.RouteId?.DeletedAt : null,
        },
        transporter: {
          id: contract?.TransporterId ? contract?.TransporterId?.Id : null,
          firmName: contract?.TransporterId
            ? contract?.TransporterId?.FirmName
            : null,
          code: contract?.TransporterId ? contract?.TransporterId?.Code : null,
          contactPersonName: contract?.TransporterId
            ? contract?.TransporterId?.ContactPersonName
            : null,
          mobileNo: contract?.TransporterId
            ? contract?.TransporterId?.MobileNo
            : null,
          emailId: contract?.TransporterId
            ? contract?.TransporterId?.EmailId
            : null,
          addressLine1: contract?.TransporterId
            ? contract?.TransporterId?.AddressLine1
            : null,
          addressLine2: contract?.TransporterId
            ? contract?.TransporterId?.AddressLine2
            : null,
          state: contract?.TransporterId
            ? contract?.TransporterId?.State
            : null,
          district: contract?.TransporterId
            ? contract?.TransporterId?.District
            : null,
          vtc: contract?.TransporterId ? contract?.TransporterId?.Vtc : null,
          pincode: contract?.TransporterId
            ? contract?.TransporterId?.Pincode
            : null,
          geocode: contract?.TransporterId
            ? contract?.TransporterId?.Geocode
            : null,
          aadhaarNo: contract?.TransporterId
            ? contract?.TransporterId?.AadhaarNo
            : null,
          panNo: contract?.TransporterId
            ? contract?.TransporterId?.PanNo
            : null,
          bankAcNo: contract?.TransporterId
            ? contract?.TransporterId?.BankAcNo
            : null,
          bankAcName: contract?.TransporterId
            ? contract?.TransporterId?.BankAcName
            : null,
          bankIfscCode: contract?.TransporterId
            ? contract?.TransporterId?.BankIfscCode
            : null,
          isActive: contract?.TransporterId
            ? contract?.TransporterId?.IsActive
            : null,
          createdAt: contract?.TransporterId
            ? contract?.TransporterId?.CreatedAt
            : null,
          modifiedAt: contract?.TransporterId
            ? contract?.TransporterId?.ModifiedAt
            : null,
          deletedAt: contract?.TransporterId
            ? contract?.TransporterId?.ModifiedAt
            : null,
        },
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: contractsData,
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

async function CreateMilkDispatch(
  req: Request,
  model: CreateMilkDispatchModel[]
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    for (const record of model) {
      const route = await AppDataSource.getRepository(entities.RouteMaster)
        .createQueryBuilder("route")
        .where("route.Id = :id", { id: record.routeId })
        .getOne();

      const vehicle = await AppDataSource.getRepository(
        entities.TransporterVehicles
      )
        .createQueryBuilder("vehicle")
        .where("vehicle.Id = :id", { id: record.transporterVehicleId })
        .getOne();

      const repository = AppDataSource.getRepository(entities.MilkDispatch);
      const milkDispatch = new entities.MilkDispatch();
      milkDispatch.Id = record.id ?? milkDispatch.Id;
      // console.log(milkDispatch.Id, " -- milk dispatch Id");
      if (route) {
        milkDispatch.RouteId = route;
      }
      if (vehicle) {
        milkDispatch.TransporterVehicleId = vehicle;
      }
      milkDispatch.StartFat = record.startFat ?? milkDispatch.StartFat;
      milkDispatch.StartSnf = record.startSnf ?? milkDispatch.StartSnf;
      milkDispatch.StartClr = record.startClr ?? milkDispatch.StartClr;
      milkDispatch.EndFat = record.endFat ?? milkDispatch.EndFat;
      milkDispatch.EndSnf = record.endSnf ?? milkDispatch.EndSnf;
      milkDispatch.EndClr = record.endClr ?? milkDispatch.EndClr;
      milkDispatch.Weight = record.weight ?? milkDispatch.Weight;
      milkDispatch.DispatchedAt = record.dispatchedAt ?? milkDispatch.DispatchedAt;
      milkDispatch.CreatedAt = record.createdAt ?? milkDispatch.CreatedAt;
      milkDispatch.ModifiedAt = record.updatedAt ?? milkDispatch.ModifiedAt;
      milkDispatch.DeletedAt = record.deletedAt ?? milkDispatch.DeletedAt;
      milkDispatch.CreatedBy = userId;
      await repository.save(milkDispatch);

      console.log("milk collections-->",  record)
      if (record.milkCollections && record.milkCollections.length > 0) {
        const milkCollectionsRepository = AppDataSource.getRepository(entities.MilkCollections);

        for (const milkCollectionData of record.milkCollections) {
          console.log("milkcollection data -->",milkCollectionData)
          const milkCollection = await milkCollectionsRepository.findOne({
            where: { Id: milkCollectionData.milkCollectionId },
          });

          if (milkCollection) {
            milkCollection.MilkDispatchId = milkDispatch.Id;
            milkCollection.DispatchedQuantity = milkCollectionData.dispatchedQuantity;
            milkCollection.RemainingQuantity = milkCollectionData.remainingQuantity;

            await milkCollectionsRepository.save(milkCollection);
          }
        }
      }
    }
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

async function UpdateMilkDispatch(
  req: Request,
  model: UpdateMilkDispatchModel[]
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;
    const uuid: string = uuidv4();

    for (const record of model) {
      const route = await AppDataSource.getRepository(entities.RouteMaster)
        .createQueryBuilder("route")
        .where("route.Id = :id", { id: record.routeId })
        .getOne();

      const vehicle = await AppDataSource.getRepository(
        entities.TransporterVehicles
      )
        .createQueryBuilder("vehicle")
        .where("vehicle.Id = :id", { id: record.transporterVehicleId })
        .getOne();

      const repository = AppDataSource.getRepository(entities.MilkDispatch);
      const milkDispatch = await repository.findOne({
        where: { Id: record.id ?? 0 },
      });
      if (milkDispatch) {
        if (route) {
          milkDispatch.RouteId = route;
        }
        if (vehicle) {
          milkDispatch.TransporterVehicleId = vehicle;
        }
        milkDispatch.StartFat = record.startFat ?? milkDispatch.StartFat;
        milkDispatch.StartSnf = record.startSnf ?? milkDispatch.StartSnf;
        milkDispatch.StartClr = record.startClr ?? milkDispatch.StartClr;
        milkDispatch.EndFat = record.endFat ?? milkDispatch.EndFat;
        milkDispatch.EndSnf = record.endSnf ?? milkDispatch.EndSnf;
        milkDispatch.EndClr = record.endClr ?? milkDispatch.EndClr;
        milkDispatch.Weight = record.weight ?? milkDispatch.Weight;
        milkDispatch.DispatchedAt =
          record.dispatchedAt ?? milkDispatch.DispatchedAt;
        milkDispatch.CreatedAt = record.createdAt ?? milkDispatch.CreatedAt;
        milkDispatch.ModifiedAt = record.updatedAt ?? milkDispatch.ModifiedAt;
        milkDispatch.DeletedAt = record.deletedAt ?? milkDispatch.DeletedAt;
        milkDispatch.ModifiedBy = userId;
        await repository.save(milkDispatch);

      } else {
        return {
          status: 404,
          message: ERROR_MESSAGES.NO_DATA,
          data: null,
        };
      }
    }
    return {
      status: 200,
      message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
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

async function DeleteMilkDispatch(
  req: Request,
  model: DeleteMilkDispatchModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.MilkDispatch);
    const milkDispatch = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (milkDispatch) {
      milkDispatch.IsActive = false;
      milkDispatch.DeletedAt = new Date();
      milkDispatch.DeletedBy = userId;
      await repository.save(milkDispatch);

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
  GetAllMilkDispatch,
  CreateMilkDispatch,
  UpdateMilkDispatch,
  DeleteMilkDispatch,
  GetMilkDipatchRoutes,
};
