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
  AllFarmerMilkCollectionsModel,
  CreateFarmerMilkCollectionModel,
  DeleteFarmerMilkCollectionModel,
  FarmerMilkCollectionModelPortal,
  UpdateFarmerMilkCollectionModel,
} from "../models/FarmerMilkCollectionsModel";
import { aggregateData, smsAggregateData } from "../utils/AggregateCollectionData";
import moment from "moment";
dotenv.config();
import * as https from 'https';
import * as http from 'http';
import { In } from "typeorm";

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

async function calculateTotalWeight(milkCollectionId: string) {
  const totalWeightResult = await AppDataSource.getRepository(entities.FarmerMilkCollectionDetails)
    .createQueryBuilder("farmermilkcollectiondetails")
    .select("SUM(farmermilkcollectiondetails.weight)", "totalWeight")
    .where("farmermilkcollectiondetails.MilkCollectionId = :id", { id: milkCollectionId })
    .getRawOne();

  return totalWeightResult.totalWeight || 0;
}

async function calculateGt(milkCollectionId: string) {
  const farmerMilkCollectionDetails = await AppDataSource.getRepository(entities.FarmerMilkCollectionDetails)
    .createQueryBuilder("farmermilkcollectiondetails")
    .where("farmermilkcollectiondetails.MilkCollectionId = :id", { id: milkCollectionId })
    .getMany();

  let aggregatedData = {
    Fat: 0,
    Snf: 0,
    Weight: 0,
    KGFat: 0,
    KGSnf: 0,
    count: 0,
  };
  farmerMilkCollectionDetails.forEach((collection) => {
    aggregatedData.Weight += collection.Weight;
    aggregatedData.Fat += collection.Fat;
    aggregatedData.Snf += collection.Snf;
    aggregatedData.KGFat += (collection.Weight / 100) * collection.Fat;
    aggregatedData.KGSnf += (collection.Weight / 100) * collection.Snf;
    aggregatedData.count++;
  })

  let result = {
    Fat: 0,
    Snf: 0,
    Weight: 0,
    KGFat: 0,
    KGSnf: 0,
    count: 0,
  };
  result.Fat = (aggregatedData.KGFat / aggregatedData.Weight) * 100;
  result.Snf = (aggregatedData.KGSnf / aggregatedData.Weight) * 100;
  result.Weight = aggregatedData.Weight;
  result.KGFat = aggregatedData.KGFat;
  result.KGSnf = aggregatedData.KGSnf;

  return result;
}

async function GetAllFarmerMilkCollections(
  req: Request,
  model?: any
): Promise<ServiceResponse<AllFarmerMilkCollectionsModel[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    // console.log(decode)
    const user = await AppDataSource.getRepository(entities.User)
      .createQueryBuilder("user")
      .innerJoinAndSelect("user.OrganizationUnitId", "orgUnit")
      .where("user.Id = :id", { id: decode.userId })
      .getOne();

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    // console.log(user)
    let farmerMilkCollections;
    if (model.id) {
      farmerMilkCollections = await AppDataSource.getRepository(
        entities.FarmerMilkCollections
      )
        .createQueryBuilder("farmerMilkCollections")
        .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
        .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
        .where("farmerMilkCollections.Id = :id", { id: model.id })
        .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.organizationUnitId && model.startDate && model.endDate) {
      // console.log('inside this function')
      farmerMilkCollections = await AppDataSource.getRepository(
        entities.FarmerMilkCollections
      )
        .createQueryBuilder("farmerMilkCollections")
        .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
        .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
        .innerJoin("farmerMilkCollections.CreatedBy", "createdByUser")
        .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
        .where("createdByOrganization.Id = :organizationUnitId", {
          organizationUnitId: model.organizationUnitId,
        })
        .andWhere("DATE(farmerMilkCollections.CollectionDateTime) >= :startDate", { startDate: model.startDate })
        .andWhere("DATE(farmerMilkCollections.CollectionDateTime) <= :endDate", { endDate: model.endDate })
        .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
        .orderBy("farmerMilkCollections.CreatedAt", "ASC")
        .getMany();
    }
    else if (model.organizationUnitId && model.filterDate) {
      // console.log("inside orgId and filterdate model")
      farmerMilkCollections = await AppDataSource.getRepository(
        entities.FarmerMilkCollections
      )
        .createQueryBuilder("farmerMilkCollections")
        .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
        .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
        .innerJoin("farmerMilkCollections.CreatedBy", "createdByUser")
        .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
        .where("createdByOrganization.Id = :organizationUnitId", {
          organizationUnitId: model.organizationUnitId,
        })
        .andWhere("DATE(farmerMilkCollections.CollectionDateTime) = :filterDate", { filterDate: model.filterDate })
        .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.shift) {
      farmerMilkCollections = await AppDataSource.getRepository(
        entities.FarmerMilkCollections
      )
        .createQueryBuilder("farmerMilkCollections")
        .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
        .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
        .where("farmerMilkCollections.Shift = :shift", { shift: model.shift })
        .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.status) {
      // console.log("model.status is being called")
      farmerMilkCollections = await AppDataSource.getRepository(
        entities.FarmerMilkCollections
      )
        .createQueryBuilder("farmerMilkCollections")
        .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
        .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
        .where("farmerMilkCollections.Status = :status", { status: model.status })
        .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.organizationUnitId > 0) {
      // console.log("model.orgunitid is being called")
      farmerMilkCollections = await AppDataSource.getRepository(
        entities.FarmerMilkCollections
      )
        .createQueryBuilder("farmerMilkCollections")
        .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
        .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
        .innerJoin("farmerMilkCollections.CreatedBy", "createdByUser")
        .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
        .where("createdByOrganization.Id = :organizationUnitId", {
          organizationUnitId: model.organizationUnitId,
        })
        .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
        .orderBy("farmerMilkCollections.CollectionDateTime", "ASC")
        .getMany();
    } else {
      // console.log("else is being called")
      farmerMilkCollections = await AppDataSource.getRepository(
        entities.FarmerMilkCollections
      )
        .createQueryBuilder("farmerMilkCollections")
        .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
        .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
        .innerJoin("farmerMilkCollections.CreatedBy", "createdByUser")
        .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
        .where("createdByOrganization.Id =:organizationUnitId", {
          organizationUnitId: user?.OrganizationUnitId.Id,
        })
        .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
        .andWhere("farmerMilkCollections.CollectionDateTime >:sevenDaysAgo", { sevenDaysAgo: sevenDaysAgo })
        .orderBy("farmerMilkCollections.CollectionDateTime", "ASC")
        .getMany();
    }
    const totalWeightPromises = farmerMilkCollections.map(async (farmerMilkCollection) => {
      const totalWeight = await calculateTotalWeight(farmerMilkCollection?.Id);
      // console.log("total weight : ", totalWeight)
      return totalWeight;
    });

    const totalWeights = await Promise.all(totalWeightPromises);
    const farmerMilkCollectionsData: AllFarmerMilkCollectionsModel[] = farmerMilkCollections.map(
      (farmerMilkCollections, index) => ({
        id: farmerMilkCollections?.Id,
        shift: farmerMilkCollections?.Shift,
        status: farmerMilkCollections?.Status,
        collectionDateTime: farmerMilkCollections.CollectionDateTime,
        startedAt: farmerMilkCollections?.StartedAt,
        completedAt: farmerMilkCollections?.CompletedAt,
        createdAt: farmerMilkCollections.CreatedAt,
        updatedAt: farmerMilkCollections.ModifiedAt,
        deletedAt: farmerMilkCollections.DeletedAt,
        createdBy: farmerMilkCollections.CreatedBy ? farmerMilkCollections.CreatedBy.Id : 0,
        updatedBy: farmerMilkCollections.ModifiedBy ? farmerMilkCollections.ModifiedBy.Id : 0,
        deletedBy: farmerMilkCollections.DeletedBy ? farmerMilkCollections.DeletedBy.Id : 0,
        milkDispatchId: farmerMilkCollections?.MilkDispatchId
          ? farmerMilkCollections?.MilkDispatchId
          : "",
        totalWeight: totalWeights[index],
        dispatchedQuantity: farmerMilkCollections.DispatchedQuantity,
        remainingQuantity: farmerMilkCollections.RemainingQuantity,
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: farmerMilkCollectionsData,
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

async function GetFarmerMilkCollectionsPortal(
  req: Request,
  model?: any
): Promise<ServiceResponse<AllFarmerMilkCollectionsModel[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    // console.log(decode)
    const user = await AppDataSource.getRepository(entities.User)
      .createQueryBuilder("user")
      .innerJoinAndSelect("user.OrganizationUnitId", "orgUnit")
      .where("user.Id = :id", { id: decode.userId })
      .getOne();

    // console.log(user)
    let farmerMilkCollections;
    if (model.id) {
      farmerMilkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("farmerMilkCollections")
        .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
        .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
        .where("farmerMilkCollections.Id = :id", { id: model.id })
        .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.organizationUnitId && model.startDate && model.endDate) {
      // console.log('inside this function')
      farmerMilkCollections = await AppDataSource.getRepository(
        entities.FarmerMilkCollections
      )
        .createQueryBuilder("farmerMilkCollections")
        .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
        .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
        .innerJoin("farmerMilkCollections.CreatedBy", "createdByUser")
        .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
        .where("createdByOrganization.Id = :organizationUnitId", {
          organizationUnitId: model.organizationUnitId,
        })
        .andWhere("DATE(farmerMilkCollections.CollectionDateTime) >= :startDate", { startDate: model.startDate })
        .andWhere("DATE(farmerMilkCollections.CollectionDateTime) <= :endDate", { endDate: model.endDate })
        .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
        .orderBy("farmerMilkCollections.CreatedAt", "ASC")
        .getMany();
    } else {
      // console.log("else is being called")
      farmerMilkCollections = await AppDataSource.getRepository(
        entities.FarmerMilkCollections
      )
        .createQueryBuilder("farmerMilkCollections")
        .leftJoinAndSelect("farmerMilkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("farmerMilkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("farmerMilkCollections.DeletedBy", "deletedBy")
        .leftJoinAndSelect("farmerMilkCollections.MilkDispatchId", "milkDispatchId")
        .innerJoin("farmerMilkCollections.CreatedBy", "createdByUser")
        .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
        .where("createdByOrganization.Id =:organizationUnitId", {
          organizationUnitId: user?.OrganizationUnitId.Id,
        })
        .andWhere("farmerMilkCollections.IsActive = :isActive", { isActive: true })
        .orderBy("farmerMilkCollections.CollectionDateTime", "ASC")
        .getMany();
    }
    const milkCollectionGtData = farmerMilkCollections.map(async (farmerMilkCollection) => {
      const totalWeight = await calculateGt(farmerMilkCollection?.Id);
      // console.log("total weight : ", totalWeight)
      return totalWeight;
    });

    const calculatedGt = await Promise.all(milkCollectionGtData);

    const farmerMilkCollectionsData: FarmerMilkCollectionModelPortal[] = farmerMilkCollections.map(
      (farmerMilkCollections, index) => ({
        id: farmerMilkCollections?.Id,
        shift: farmerMilkCollections?.Shift,
        status: farmerMilkCollections?.Status,
        collectionDateTime: farmerMilkCollections.CollectionDateTime,
        startedAt: farmerMilkCollections?.StartedAt,
        completedAt: farmerMilkCollections?.CompletedAt,
        createdAt: farmerMilkCollections.CreatedAt,
        updatedAt: farmerMilkCollections.ModifiedAt,
        deletedAt: farmerMilkCollections.DeletedAt,
        createdBy: farmerMilkCollections.CreatedBy ? farmerMilkCollections.CreatedBy.Id : 0,
        updatedBy: farmerMilkCollections.ModifiedBy ? farmerMilkCollections.ModifiedBy.Id : 0,
        deletedBy: farmerMilkCollections.DeletedBy ? farmerMilkCollections.DeletedBy.Id : 0,
        milkDispatchId: farmerMilkCollections?.MilkDispatchId
          ? farmerMilkCollections?.MilkDispatchId
          : "",
        totalWeight: calculatedGt[index].Weight,
        dispatchedQuantity: farmerMilkCollections.DispatchedQuantity,
        remainingQuantity: farmerMilkCollections.RemainingQuantity,
        gtFat: farmerMilkCollections.Fat,
        gtSnf: farmerMilkCollections.Snf,
        calculatedFat: parseFloat((calculatedGt[index].Fat).toFixed(2)),
        calculatedSnf: parseFloat((calculatedGt[index].Snf).toFixed(2)),
        totalKgFat: parseFloat((calculatedGt[index].KGFat).toFixed(2)),
        totalKgSnf: parseFloat((calculatedGt[index].KGSnf).toFixed(2)),
        isMilkBillLocked: farmerMilkCollections.IsMilkBillLocked,
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: farmerMilkCollectionsData,
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

async function GetMilkRoutes(
  model?: any
): Promise<ServiceResponse<MilkCollectionRoutesResponse[]>> {
  try {
    const contracts = await AppDataSource.getRepository(
      entities.TransporterContracts
    )
      .createQueryBuilder("contracts")
      .leftJoinAndSelect("contracts.RouteId", "route")
      .leftJoinAndSelect("contracts.TransporterId", "transporter")
      .leftJoinAndSelect("contracts.VehicleId", "vehicle")
      .leftJoinAndSelect("vehicle.TransporterId", "TransporterId")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      // .where("routeOwner.Id = :routeOwnerId", {
      //   routeOwnerId: model.routeOwnerId,
      // })
      .where("route.IsActive = :isActive", { isActive: true })
      .getMany();

    // console.log(contracts.length);
    if (contracts.length === 0) {
      return {
        status: 404,
        message: "No data found for the particular Route Owner Id",
        data: null,
      };
    }

    const contractsData: MilkCollectionRoutesResponse[] = contracts.map(
      (contract) => ({
        vehicle: {
          id: contract.VehicleId ? contract.VehicleId?.Id : null,
          transporterId: contract.VehicleId.TransporterId
            ? contract.VehicleId.TransporterId.Id
            : null,
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
          routeOwner: contract.RouteId.RouteOwner
            ? contract.RouteId.RouteOwner.Id
            : null,
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

async function CreateFarmerMilkCollection(
  req: Request,
  model: CreateFarmerMilkCollectionModel[]
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const uuid: string = uuidv4();

    for (const record of model) {
      const created = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.createdBy })
        .getOne();
      const updated = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.updatedBy })
        .getOne();
      const deleted = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.deletedBy })
        .getOne();
      const milkDispatch = await AppDataSource.getRepository(entities.MilkDispatch)
        .createQueryBuilder("milkDispatch")
        .where("milkDispatch.Id = :id", { id: record.milkDispatchId })
        .getOne();

      const billingCycle = await AppDataSource.getRepository(entities.BillingCycleMaster)
        .createQueryBuilder("billingCycle")
        .where("billingCycle.StartDate <=:startDate", { startDate: record.collectionDateTime })
        .andWhere("billingCycle.EndDate >=:endDate", { endDate: record.collectionDateTime })
        .getOne();

      // console.log('billing cycle', billingCycle)
      const repository = AppDataSource.getRepository(entities.FarmerMilkCollections);
      const farmerMilkCollection = new entities.FarmerMilkCollections();
      farmerMilkCollection.Id = record.id ?? farmerMilkCollection.Id;
      farmerMilkCollection.Shift = record.shift ?? farmerMilkCollection.Shift;
      farmerMilkCollection.Status = record.status ?? farmerMilkCollection.Status;
      farmerMilkCollection.StartedAt = record.startedAt ?? farmerMilkCollection.StartedAt;
      farmerMilkCollection.CollectionDateTime =
        record.collectionDateTime ?? farmerMilkCollection.CollectionDateTime;
      farmerMilkCollection.CompletedAt =
        record.completedAt ?? farmerMilkCollection.CompletedAt;
      farmerMilkCollection.CreatedAt = record.createdAt ?? farmerMilkCollection.CreatedAt;
      farmerMilkCollection.ModifiedAt = record.updatedAt ?? farmerMilkCollection.ModifiedAt;
      farmerMilkCollection.DeletedAt = record.deletedAt ?? farmerMilkCollection.DeletedAt;
      if (milkDispatch) {
        farmerMilkCollection.MilkDispatchId = milkDispatch.Id;
      }
      if (created) {
        farmerMilkCollection.CreatedBy = created;
      }
      if (updated) {
        farmerMilkCollection.ModifiedBy = updated;
      }
      if (deleted) {
        farmerMilkCollection.DeletedBy = deleted;
      }
      if (billingCycle) {
        farmerMilkCollection.BillingCycle = billingCycle;
      }
      await repository.save(farmerMilkCollection);
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

async function UpdateFarmerMilkCollection(
  req: Request,
  model: UpdateFarmerMilkCollectionModel[]
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const milkCollectionIdsToUpdate: number[] = [1, 2, 3];
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;
    const uuid: string = uuidv4();

    for (const record of model) {
      const repository = AppDataSource.getRepository(entities.FarmerMilkCollections);
      const farmerMilkCollection = await repository.findOne({
        where: { Id: record.id ?? 0 },
      });

      const created = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.createdBy })
        .getOne();
      const updated = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.updatedBy })
        .getOne();
      const deleted = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.deletedBy })
        .getOne();
      const milkDispatch = await AppDataSource.getRepository(entities.MilkDispatch)
        .createQueryBuilder("milkDispatch")
        .where("milkDispatch.Id = :id", { id: record.milkDispatchId })
        .getOne();
      if (farmerMilkCollection) {
        farmerMilkCollection.Shift = record.shift ? record.shift : farmerMilkCollection.Shift;
        farmerMilkCollection.Status = record.status
          ? record.status
          : farmerMilkCollection.Status;
        farmerMilkCollection.CollectionDateTime =
          record.collectionDateTime ?? farmerMilkCollection.CollectionDateTime;
        farmerMilkCollection.StartedAt = record.startedAt
          ? record.startedAt
          : farmerMilkCollection.StartedAt;
        farmerMilkCollection.CompletedAt = record.completedAt
          ? record.completedAt
          : farmerMilkCollection.CompletedAt;
        farmerMilkCollection.CreatedAt = record.createdAt
          ? record.createdAt
          : farmerMilkCollection.CreatedAt;
        farmerMilkCollection.ModifiedAt = record.updatedAt
          ? record.updatedAt
          : farmerMilkCollection.ModifiedAt;
        farmerMilkCollection.DeletedAt = record.deletedAt
          ? record.deletedAt
          : farmerMilkCollection.DeletedAt;
        if (milkDispatch) {
          farmerMilkCollection.MilkDispatchId = milkDispatch.Id;
        }
        farmerMilkCollection.DispatchedQuantity = record.dispatchedQuantity ? record.dispatchedQuantity : farmerMilkCollection.DispatchedQuantity;
        farmerMilkCollection.RemainingQuantity = record.remainingQuantity ? record.remainingQuantity : farmerMilkCollection.RemainingQuantity;
        farmerMilkCollection.Fat = record.fat ? record.fat : farmerMilkCollection.Fat;
        farmerMilkCollection.Clr = record.clr ? record.clr : farmerMilkCollection.Clr;
        if (record.fat && record.clr) {
          farmerMilkCollection.Snf = parseFloat((record.clr / 4 + 0.20 * record.fat + 0.66).toFixed(1));
        }
        if (created) {
          farmerMilkCollection.CreatedBy = created;
        }
        if (updated) {
          farmerMilkCollection.ModifiedBy = updated;
        }
        if (deleted) {
          farmerMilkCollection.DeletedBy = deleted;
        }
        await repository.save(farmerMilkCollection);
        if (record.status == 'completed') {
          SendSms(record.id);
        }
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

async function LockMilkBill(
  req: Request,
  model: any
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;
    const uuid: string = uuidv4();

    const farmerMilkCollections = await AppDataSource.getRepository(entities.FarmerMilkCollections)
      .createQueryBuilder("milkCollection")
      .where("DATE(milkCollection.CollectionDateTime) >=:startDate", { startDate: model.startDate })
      .andWhere("DATE(milkCollection.CollectionDateTime) <=:endDate", { endDate: model.endDate })
      .getMany();

    const milkCollectionIds = farmerMilkCollections.map((milk) => milk.Id);

    if (farmerMilkCollections) {
      await AppDataSource.getRepository(entities.FarmerMilkCollections)
        .createQueryBuilder()
        .update(entities.FarmerMilkCollections)
        .set({ IsMilkBillLocked: true })
        .where({ Id: In(milkCollectionIds) })
        .execute();
      return {
        status: 200,
        message: "Milk Payroll Finalized Succefully",
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

async function GetUnlockedBillingCycles(
  model?: any
): Promise<ServiceResponse<any[]>> {
  try {
    let billingCycles;
    const farmerMilkCollections = await AppDataSource.getRepository(entities.FarmerMilkCollections)
      .createQueryBuilder("farmerMilkCollection")
      .leftJoinAndSelect("farmerMilkCollection.BillingCycle", "billingCycle")
      .where("farmerMilkCollection.IsMilkBillLocked =:flag", { flag: false })
      .getMany();

    // const billingCycles:any[] = [];
    const billingCycleIds: any[] = [];
    farmerMilkCollections.map((milk) => {
      if (milk.BillingCycle) {
        if (!billingCycleIds.includes(milk.BillingCycle.Id)) {
          billingCycleIds.push(milk.BillingCycle.Id);
        }
      }
    });
    if (billingCycleIds.length > 0) {
      billingCycles = await AppDataSource.getRepository(entities.BillingCycleMaster)
        .createQueryBuilder("billingcycle")
        .where("billingcycle.Id IN (:...billingCycleIds)", { billingCycleIds })
        .getMany();
    }

    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: billingCycles ?? null,
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


async function SendSms(milkCollectionId: string) {
  const farmerCollectionDetails = await AppDataSource.getRepository(entities.FarmerMilkCollectionDetails)
    .createQueryBuilder("farmerCollectionDetails")
    .leftJoinAndSelect("farmerCollectionDetails.OrganizationUnitId", "organizationUnitId")
    .leftJoinAndSelect("farmerCollectionDetails.MilkCollectionId", "milkCollectionId")
    .where("farmerCollectionDetails.MilkCollectionId =:milkCollectionId", { milkCollectionId: milkCollectionId })
    .getMany();

  const farmerMilkCollectionDetails = smsAggregateData(farmerCollectionDetails);

  let agentIds: any[] = [];

  farmerMilkCollectionDetails.forEach((data) => {
    if (!agentIds.includes(data.OrganizationUnitId.Id)) {
      agentIds.push(data.OrganizationUnitId.Id);
    }
  })

  let smsData: any[] = [];
  agentIds.forEach((id) => {
    let agentCollectionDetail = {
      agentId: 0,
      phoneNumber: '',
      shift: '',
      cWeight: 0,
      cCan: 0,
      cFat: 0,
      cSnf: 0,
      date: '',
      bWeight: 0,
      bFat: 0,
      bSnf: 0,
      bCan: 0
    }
    farmerMilkCollectionDetails.forEach((detail) => {
      if (detail.OrganizationUnitId.Id == id && detail.OrganizationUnitId.PhoneNumber !== null) {
        agentCollectionDetail.phoneNumber = detail.OrganizationUnitId.PhoneNumber;
        agentCollectionDetail.shift = detail.MilkCollectionId.Shift;
        agentCollectionDetail.date = moment(detail.MilkCollectionId.CollectionDateTime).format("YYYY-MM-DD");
        agentCollectionDetail.agentId = detail.OrganizationUnitId.Id;
        if (detail.MilkType == 'cow') {
          agentCollectionDetail.cCan = detail.CanCount;
          agentCollectionDetail.cFat = parseFloat(detail.Fat.toFixed(1));
          agentCollectionDetail.cSnf = parseFloat(detail.Snf.toFixed(1));
          agentCollectionDetail.cWeight = parseFloat(detail.Weight.toFixed(1));
        } else {
          agentCollectionDetail.bCan = detail.CanCount;
          agentCollectionDetail.bFat = parseFloat(detail.Fat.toFixed(1));
          agentCollectionDetail.bSnf = parseFloat(detail.Snf.toFixed(1));
          agentCollectionDetail.bWeight = parseFloat(detail.Weight.toFixed(1));
        }
      }
    })
    console.log("detail : ", agentCollectionDetail);
    smsData.push(agentCollectionDetail);
  })
  // code to send sms if the api can send sms to multiple agents at a time. collection data needs to be structured accordingly.

  smsData.forEach((collection) => {
    const username = 'UVBEkr810UN8QeYybMGW';
    const password = 'aErfm0LJRnlYbVSm72tmdlwkTcRNP1TaYLtJS1GF';
    const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    console.log("collection : ", collection);

    const postData = JSON.stringify({
      "Text": `Dear ${collection.agentId}, Dt: ${collection.date}, ${collection.shift == "morning" ? "MOR" : "EVE"}: COW: C:${collection.cCan !== 0 ? collection.cCan : ""} /Q${collection.cWeight !== 0 ? collection.cWeight : ""} /F:${collection.cFat !== 0 ? collection.cFat : ""} /S:${collection.cSnf !== 0 ? collection.cSnf : ""} BUF: C:${collection.bCan !== 0 ? collection.bCan : ""} /Q:${collection.bWeight !== 0 ? collection.bWeight : ""} /F:${collection.bFat !== 0 ? collection.bFat : ""} /S:${collection.bSnf !== 0 ? collection.bSnf : ""} - Ganga dairy LTD`,
      "Number": `91${collection.phoneNumber}`,
      "SenderId": "GADLTD",
      "DRNotifyUrl": "https://www.domainname.com/notifyurl",
      "DRNotifyHttpMethod": "POST",
      "Tool": "API"
    });

    const options = {
      method: 'POST',
      hostname: 'restapi.smscountry.com',
      path: '/v0.1/Accounts/UVBEkr810UN8QeYybMGW/SMSes/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res: http.IncomingMessage) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        console.log('Response:', responseBody);
      });
    });

    req.on('error', (error) => {
      console.error('Error:', error);
    });

    req.write(postData);
    req.end();
  });

}

async function DeleteFarmerMilkCollection(
  req: Request,
  model: DeleteFarmerMilkCollectionModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.FarmerMilkCollections);
    const farmerMilkCollection = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (farmerMilkCollection) {
      farmerMilkCollection.IsActive = false;
      farmerMilkCollection.DeletedAt = new Date();
      farmerMilkCollection.DeletedBy = userId;
      await repository.save(farmerMilkCollection);

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
  GetAllFarmerMilkCollections,
  CreateFarmerMilkCollection,
  UpdateFarmerMilkCollection,
  DeleteFarmerMilkCollection,
  GetMilkRoutes,
  GetFarmerMilkCollectionsPortal,
  LockMilkBill,
  GetUnlockedBillingCycles,
};