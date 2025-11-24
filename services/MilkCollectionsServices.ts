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
  AllMilkCollectionsModel,
  CreateMilkCollectionModel,
  DeleteMilkCollectionModel,
  MilkCollectionModelPortal,
  UpdateMilkCollectionModel,
} from "../models/MilkCollectionsModel";
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
  const totalWeightResult = await AppDataSource.getRepository(entities.MilkCollectionDetails)
    .createQueryBuilder("milkcollectiondetails")
    .select("SUM(milkcollectiondetails.weight)", "totalWeight")
    .where("milkcollectiondetails.MilkCollectionId = :id", { id: milkCollectionId })
    .getRawOne();

  return totalWeightResult.totalWeight || 0;
}

async function calculateGt(milkCollectionId: string) {
  const milkCollectionDetails = await AppDataSource.getRepository(entities.MilkCollectionDetails)
    .createQueryBuilder("milkcollectiondetails")
    .where("milkcollectiondetails.MilkCollectionId = :id", { id: milkCollectionId })
    .getMany();

  let aggregatedData = {
    Fat: 0,
    Snf: 0,
    Weight: 0,
    KGFat: 0,
    KGSnf: 0,
    count: 0,
  };
  milkCollectionDetails.forEach((collection) => {
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

async function GetAllMilkCollections(
  req: Request,
  model?: any
): Promise<ServiceResponse<AllMilkCollectionsModel[]>> {
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
    let milkCollections;
    if (model.id) {
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .leftJoinAndSelect("milkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("milkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("milkCollections.DeletedBy", "deletedBy")
        //.leftJoinAndSelect("milkCollections.MilkDispatchId", "milkDispatchId")
        .where("milkCollections.Id = :id", { id: model.id })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.organizationUnitId && model.startDate && model.endDate) {
      // console.log('inside this function')
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .leftJoinAndSelect("milkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("milkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("milkCollections.DeletedBy", "deletedBy")
        //.leftJoinAndSelect("milkCollections.MilkDispatchId", "milkDispatchId")
        .innerJoin("milkCollections.CreatedBy", "createdByUser")
        .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
        .where("createdByOrganization.Id = :organizationUnitId", {
          organizationUnitId: model.organizationUnitId,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) >= :startDate", { startDate: model.startDate })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", { endDate: model.endDate })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .orderBy("milkCollections.CreatedAt", "ASC")
        .getMany();
    }
    else if (model.organizationUnitId && model.filterDate) {
      console.log("inside orgId and filterdate model")
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .leftJoinAndSelect("milkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("milkCollections.ModifiedBy", "modifiedBy")
        //.leftJoinAndSelect("milkCollections.MilkDispatchId", "milkDispatchId")
        .leftJoinAndSelect("milkCollections.DeletedBy", "deletedBy")
        .innerJoin("milkCollections.CreatedBy", "createdByUser")
        .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
        .where("createdByOrganization.Id = :organizationUnitId", {
          organizationUnitId: model.organizationUnitId,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) = :filterDate", { filterDate: model.filterDate })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.shift) {
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .leftJoinAndSelect("milkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("milkCollections.ModifiedBy", "modifiedBy")
        //.leftJoinAndSelect("milkCollections.MilkDispatchId", "milkDispatchId")
        .leftJoinAndSelect("milkCollections.DeletedBy", "deletedBy")
        .where("milkCollections.Shift = :shift", { shift: model.shift })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.status) {
      console.log("model.status is being called")
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .leftJoinAndSelect("milkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("milkCollections.ModifiedBy", "modifiedBy")
        //.leftJoinAndSelect("milkCollections.MilkDispatchId", "milkDispatchId")
        .leftJoinAndSelect("milkCollections.DeletedBy", "deletedBy")
        .where("milkCollections.Status = :status", { status: model.status })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.organizationUnitId > 0) {
      // console.log("model.orgunitid is being called")
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .leftJoinAndSelect("milkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("milkCollections.ModifiedBy", "modifiedBy")
        //.leftJoinAndSelect("milkCollections.MilkDispatchId", "milkDispatchId")
        .leftJoinAndSelect("milkCollections.DeletedBy", "deletedBy")
        .innerJoin("milkCollections.CreatedBy", "createdByUser")
        .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
        .where("createdByOrganization.Id = :organizationUnitId", {
          organizationUnitId: model.organizationUnitId,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .orderBy("milkCollections.CollectionDateTime", "ASC")
        .getMany();
    } else {
      console.log("else is being called")
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .leftJoinAndSelect("milkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("milkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("milkCollections.DeletedBy", "deletedBy")
        //.leftJoinAndSelect("milkCollections.MilkDispatchId", "milkDispatchId")
        .innerJoin("milkCollections.CreatedBy", "createdByUser")
        .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
        .where("createdByOrganization.Id =:organizationUnitId", {
          organizationUnitId: user?.OrganizationUnitId.Id,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .andWhere("milkCollections.CollectionDateTime >:sevenDaysAgo", { sevenDaysAgo: sevenDaysAgo })
        .orderBy("milkCollections.CollectionDateTime", "ASC")
        .getMany();
    }
    const totalWeightPromises = milkCollections.map(async (milkCollection) => {
      const totalWeight = await calculateTotalWeight(milkCollection?.Id);
      // console.log("total weight : ", totalWeight)
      return totalWeight;
    });

    const totalWeights = await Promise.all(totalWeightPromises);
    const milkCollectionsData: AllMilkCollectionsModel[] = milkCollections.map(
      (milkCollections, index) => ({
        id: milkCollections?.Id,
        shift: milkCollections?.Shift,
        status: milkCollections?.Status,
        collectionDateTime: milkCollections.CollectionDateTime,
        startedAt: milkCollections?.StartedAt,
        completedAt: milkCollections?.CompletedAt,
        createdAt: milkCollections.CreatedAt,
        updatedAt: milkCollections.ModifiedAt,
        deletedAt: milkCollections.DeletedAt,
        createdBy: milkCollections.CreatedBy ? milkCollections.CreatedBy.Id : 0,
        updatedBy: milkCollections.ModifiedBy ? milkCollections.ModifiedBy.Id : 0,
        deletedBy: milkCollections.DeletedBy ? milkCollections.DeletedBy.Id : 0,
        milkDispatchId: milkCollections?.MilkDispatchId
          ? milkCollections?.MilkDispatchId
          : "",
        totalWeight: totalWeights[index],
        dispatchedQuantity: milkCollections.DispatchedQuantity,
        remainingQuantity: milkCollections.RemainingQuantity,
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: milkCollectionsData,
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

async function GetMilkCollectionsPortal(
  req: Request,
  model?: any
): Promise<ServiceResponse<AllMilkCollectionsModel[]>> {
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
    let milkCollections;
    if (model.id) {
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .leftJoinAndSelect("milkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("milkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("milkCollections.DeletedBy", "deletedBy")
        //.leftJoinAndSelect("milkCollections.MilkDispatchId", "milkDispatchId")
        .where("milkCollections.Id = :id", { id: model.id })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.organizationUnitId && model.startDate && model.endDate) {
      // console.log('inside this function')
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .leftJoinAndSelect("milkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("milkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("milkCollections.DeletedBy", "deletedBy")
        //.leftJoinAndSelect("milkCollections.MilkDispatchId", "milkDispatchId")
        .innerJoin("milkCollections.CreatedBy", "createdByUser")
        .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
        .where("createdByOrganization.Id = :organizationUnitId", {
          organizationUnitId: model.organizationUnitId,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) >= :startDate", { startDate: model.startDate })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", { endDate: model.endDate })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .orderBy("milkCollections.CreatedAt", "ASC")
        .getMany();
    } else {
      // console.log("else is being called")
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .leftJoinAndSelect("milkCollections.CreatedBy", "createdBy")
        .leftJoinAndSelect("milkCollections.ModifiedBy", "modifiedBy")
        .leftJoinAndSelect("milkCollections.DeletedBy", "deletedBy")
        //.leftJoinAndSelect("milkCollections.MilkDispatchId", "milkDispatchId")
        .innerJoin("milkCollections.CreatedBy", "createdByUser")
        .innerJoin("createdByUser.OrganizationUnitId", "createdByOrganization")
        .where("createdByOrganization.Id =:organizationUnitId", {
          organizationUnitId: user?.OrganizationUnitId.Id,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .orderBy("milkCollections.CollectionDateTime", "ASC")
        .getMany();
    }
    const milkCollectionGtData = milkCollections.map(async (milkCollection) => {
      const totalWeight = await calculateGt(milkCollection?.Id);
      // console.log("total weight : ", totalWeight)
      return totalWeight;
    });

    const calculatedGt = await Promise.all(milkCollectionGtData);

    const milkCollectionsData: MilkCollectionModelPortal[] = milkCollections.map(
      (milkCollections, index) => ({
        id: milkCollections?.Id,
        shift: milkCollections?.Shift,
        status: milkCollections?.Status,
        collectionDateTime: milkCollections.CollectionDateTime,
        startedAt: milkCollections?.StartedAt,
        completedAt: milkCollections?.CompletedAt,
        createdAt: milkCollections.CreatedAt,
        updatedAt: milkCollections.ModifiedAt,
        deletedAt: milkCollections.DeletedAt,
        createdBy: milkCollections.CreatedBy ? milkCollections.CreatedBy.Id : 0,
        updatedBy: milkCollections.ModifiedBy ? milkCollections.ModifiedBy.Id : 0,
        deletedBy: milkCollections.DeletedBy ? milkCollections.DeletedBy.Id : 0,
        milkDispatchId: milkCollections?.MilkDispatchId
          ? milkCollections?.MilkDispatchId
          : "",
        totalWeight: calculatedGt[index].Weight,
        dispatchedQuantity: milkCollections.DispatchedQuantity,
        remainingQuantity: milkCollections.RemainingQuantity,
        gtFat: milkCollections.Fat,
        gtSnf: milkCollections.Snf,
        calculatedFat: parseFloat((calculatedGt[index].Fat).toFixed(2)),
        calculatedSnf: parseFloat((calculatedGt[index].Snf).toFixed(2)),
        totalKgFat: parseFloat((calculatedGt[index].KGFat).toFixed(2)),
        totalKgSnf: parseFloat((calculatedGt[index].KGSnf).toFixed(2)),
        isMilkBillLocked: milkCollections.IsMilkBillLocked,
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: milkCollectionsData,
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

//original

// async function CreateMilkCollection(
//   req: Request,
//   model: CreateMilkCollectionModel[]
// ): Promise<ServiceResponse<APIResponse[]>> {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     const key = process.env.TOKEN_SECRET;
//     const decode = jwt.verify(token, key);
//     const uuid: string = uuidv4();

//     for (const record of model) {
//       const created = await AppDataSource.getRepository(entities.User)
//         .createQueryBuilder("user")
//         .where("user.Id = :id", { id: record.createdBy })
//         .getOne();
//       const updated = await AppDataSource.getRepository(entities.User)
//         .createQueryBuilder("user")
//         .where("user.Id = :id", { id: record.updatedBy })
//         .getOne();
//       const deleted = await AppDataSource.getRepository(entities.User)
//         .createQueryBuilder("user")
//         .where("user.Id = :id", { id: record.deletedBy })
//         .getOne();
//       const milkDispatch = await AppDataSource.getRepository(entities.MilkDispatch)
//         .createQueryBuilder("milkDispatch")
//         .where("milkDispatch.Id = :id", { id: record.milkDispatchId })
//         .getOne();

//       const billingCycle = await AppDataSource.getRepository(entities.BillingCycleMaster)
//         .createQueryBuilder("billingCycle")
//         .where("billingCycle.StartDate <=:startDate", { startDate: record.collectionDateTime })
//         .andWhere("billingCycle.EndDate >=:endDate", { endDate: record.collectionDateTime })
//         .getOne();

//       const repository = AppDataSource.getRepository(entities.MilkCollections);
//       const milkCollection = new entities.MilkCollections();
//       milkCollection.Id = record.id ?? milkCollection.Id;
//       milkCollection.Shift = record.shift ?? milkCollection.Shift;
//       milkCollection.Status = record.status ?? milkCollection.Status;
//       milkCollection.StartedAt = record.startedAt ?? milkCollection.StartedAt;
//       milkCollection.CollectionDateTime = record.collectionDateTime ?? milkCollection.CollectionDateTime;
//       milkCollection.CompletedAt = record.completedAt ?? milkCollection.CompletedAt;
//       milkCollection.CreatedAt = record.createdAt ?? milkCollection.CreatedAt;
//       milkCollection.ModifiedAt = record.updatedAt ?? milkCollection.ModifiedAt;
//       milkCollection.DeletedAt = record.deletedAt ?? milkCollection.DeletedAt;
//       milkCollection.Fat = record.fat ? record.fat : milkCollection.Fat;
//       milkCollection.Clr = record.clr ? record.clr : milkCollection.Clr;
//       if (record.fat && record.clr) {
//         milkCollection.Snf = parseFloat((record.clr / 4 + 0.20 * record.fat + 0.66).toFixed(1));
//       }

//       if (milkDispatch) {
//         milkCollection.MilkDispatchId = milkDispatch;
//       }
//       if (created) {
//         milkCollection.CreatedBy = created;
//       }
//       if (updated) {
//         milkCollection.ModifiedBy = updated;
//       }
//       if (deleted) {
//         milkCollection.DeletedBy = deleted;
//       }
//       if (billingCycle) {
//         milkCollection.BillingCycle = billingCycle;
//       }
//       await repository.save(milkCollection);
//       if (record.status == 'completed') {
//         SendSms(record.id);
//         //console.log('SMS FUNCTION CALLED');
//       }
//     };

//     return {
//       status: 200,
//       message: SUCCESS_MESSAGES.ADD_SUCCESS,
//       data: null,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       status: 400,
//       message: ERROR_MESSAGES.INTERNAL_SERVER,
//       data: null,
//     };
//   }
// }


async function CreateMilkCollection(
  req: Request,
  model: CreateMilkCollectionModel[]
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);

    console.log("create milk model: ",model);
    for (const record of model) {
      const repository = AppDataSource.getRepository(entities.MilkCollections);
      let milkCollection = await repository.findOneBy({ Id: record.id });

      if (!milkCollection) {
        // If no record exists, create a new one
        milkCollection = new entities.MilkCollections();
        milkCollection.Id = record.id ?? milkCollection.Id;
        milkCollection.CreatedAt = record.createdAt ?? new Date();
      } else {
        // If record exists, update the modified timestamp
        milkCollection.ModifiedAt = record.updatedAt ?? new Date();
      }

      // Update milkDispatchId, dispatchQuantity, and remainingQuantity
      milkCollection.DispatchedQuantity = record.dispatchedQuantity ?? milkCollection.DispatchedQuantity;
      milkCollection.RemainingQuantity = record.remainingQuantity ?? milkCollection.RemainingQuantity;
      milkCollection.MilkDispatchId = record.milkDispatchId ?? milkCollection.MilkDispatchId;

      // Common fields to update
      milkCollection.Shift = record.shift ?? milkCollection.Shift;
      milkCollection.Status = record.status ?? milkCollection.Status;
      milkCollection.StartedAt = record.startedAt ?? milkCollection.StartedAt;
      milkCollection.CollectionDateTime = record.collectionDateTime ?? milkCollection.CollectionDateTime;
      milkCollection.CompletedAt = record.completedAt ?? milkCollection.CompletedAt;
      milkCollection.DeletedAt = record.deletedAt ?? milkCollection.DeletedAt;
      milkCollection.Fat = record.fat ? record.fat : milkCollection.Fat;
      milkCollection.Clr = record.clr ? record.clr : milkCollection.Clr;

      //if (record.fat && record.clr) {
      //  milkCollection.Snf = parseFloat((record.clr / 4 + 0.20 * record.fat + 0.66).toFixed(1));
      //}

      if (record.fat && record.clr) {
         let snfValue = record.clr / 4 + 0.2 * record.fat + 0.66;
         milkCollection.Snf = Math.floor(snfValue * 10) / 10;
      }

      // Fetch related entities
      //const milkDispatch = await AppDataSource.getRepository(entities.MilkDispatch)
      //  .createQueryBuilder("milkDispatch")
      //  .where("milkDispatch.Id = :id", { id: record.milkDispatchId })
      //  .getOne();

      console.log("milk dispatch id: ", record.milkDispatchId);
      //console.log("milk dispatch fetched: ", milkDispatch);

      const billingCycle = await AppDataSource.getRepository(entities.BillingCycleMaster)
        .createQueryBuilder("billingCycle")
        .where("billingCycle.StartDate <= :startDate", { startDate: record.collectionDateTime })
        .andWhere("billingCycle.EndDate >= :endDate", { endDate: record.collectionDateTime })
        .getOne();

      const createdBy = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.createdBy })
        .getOne();

      const updatedBy = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.updatedBy })
        .getOne();

      const deletedBy = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.deletedBy })
        .getOne();

      // Update relationships
      //if (milkDispatch) {
      //  milkCollection.MilkDispatchId = milkDispatch;
      //}
      if (billingCycle) {
        milkCollection.BillingCycle = billingCycle;
      }
      if (createdBy) {
        milkCollection.CreatedBy = createdBy;
      }
      if (updatedBy) {
        milkCollection.ModifiedBy = updatedBy;
      }
      if (deletedBy) {
        milkCollection.DeletedBy = deletedBy;
      }

      await repository.save(milkCollection);

     console.log("save milkCollection: ",milkCollection)

      if (record.status === 'completed') {
        setTimeout(function() {
    	  SendSms(record.id);
  	}, 120000);
      }
    }

    return {
      status: 200,
      message: SUCCESS_MESSAGES.ADD_SUCCESS,
      data: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

async function UpdateMilkCollection(
  req: Request,
  model: UpdateMilkCollectionModel[]
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const milkCollectionIdsToUpdate: number[] = [1, 2, 3];
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;
    const uuid: string = uuidv4();

    console.log("update milk model: ",model);
    for (const record of model) {
      const repository = AppDataSource.getRepository(entities.MilkCollections);
      const milkCollection = await repository.findOne({
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
      //const milkDispatch = await AppDataSource.getRepository(entities.MilkDispatch)
      //  .createQueryBuilder("milkDispatch")
      //  .where("milkDispatch.Id = :id", { id: record.milkDispatchId })
      //  .getOne();
      //console.log("milkdispatch: ",milkDispatch);
      if (milkCollection) {
        milkCollection.Shift = record.shift ? record.shift : milkCollection.Shift;
        milkCollection.Status = record.status
          ? record.status
          : milkCollection.Status;
        milkCollection.CollectionDateTime =
          record.collectionDateTime ?? milkCollection.CollectionDateTime;
        milkCollection.StartedAt = record.startedAt
          ? record.startedAt
          : milkCollection.StartedAt;
        milkCollection.CompletedAt = record.completedAt
          ? record.completedAt
          : milkCollection.CompletedAt;
        milkCollection.CreatedAt = record.createdAt
          ? record.createdAt
          : milkCollection.CreatedAt;
        milkCollection.ModifiedAt = record.updatedAt
          ? record.updatedAt
          : milkCollection.ModifiedAt;
        milkCollection.DeletedAt = record.deletedAt
          ? record.deletedAt
          : milkCollection.DeletedAt;
        //if (milkDispatch) {
        //  milkCollection.MilkDispatchId = milkDispatch;
        //}
        milkCollection.DispatchedQuantity = record.dispatchedQuantity ? record.dispatchedQuantity : milkCollection.DispatchedQuantity;
        milkCollection.RemainingQuantity = record.remainingQuantity ? record.remainingQuantity : milkCollection.RemainingQuantity;
        milkCollection.MilkDispatchId = record.milkDispatchId ?? milkCollection.MilkDispatchId;
        milkCollection.Fat = record.fat ? record.fat : milkCollection.Fat;
        milkCollection.Clr = record.clr ? record.clr : milkCollection.Clr;
        //if (record.fat && record.clr) {
        //  milkCollection.Snf = parseFloat((record.clr / 4 + 0.20 * record.fat + 0.66).toFixed(1));
        //}

        if (record.fat && record.clr) {
         let snfValue = record.clr / 4 + 0.2 * record.fat + 0.66;
         milkCollection.Snf = Math.floor(snfValue * 10) / 10;
        }

        if (created) {
          milkCollection.CreatedBy = created;
        }
        if (updated) {
          milkCollection.ModifiedBy = updated;
        }
        if (deleted) {
          milkCollection.DeletedBy = deleted;
        }
        await repository.save(milkCollection);
        if (record.status == 'completed') {
          setTimeout(function() {
    	    SendSms(record.id);
  	  }, 120000);
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

    const milkCollections = await AppDataSource.getRepository(entities.MilkCollections)
      .createQueryBuilder("milkCollection")
      .where("DATE(milkCollection.CollectionDateTime) >=:startDate", { startDate: model.startDate })
      .andWhere("DATE(milkCollection.CollectionDateTime) <=:endDate", { endDate: model.endDate })
      .getMany();

    const milkCollectionIds = milkCollections.map((milk) => milk.Id);

    if (milkCollections) {
      await AppDataSource.getRepository(entities.MilkCollections)
        .createQueryBuilder()
        .update(entities.MilkCollections)
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
    const milkCollections = await AppDataSource.getRepository(entities.MilkCollections)
      .createQueryBuilder("milkCollection")
      .leftJoinAndSelect("milkCollection.BillingCycle", "billingCycle")
      .where("milkCollection.IsMilkBillLocked =:flag", { flag: false })
      .getMany();

    // const billingCycles:any[] = [];
    const billingCycleIds: any[] = [];
    milkCollections.map((milk) => {
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
  console.log("inside send sms",milkCollectionId);
  const collectionDetails = await AppDataSource.getRepository(entities.MilkCollectionDetails)
    .createQueryBuilder("collectionDetails")
    .leftJoinAndSelect("collectionDetails.OrganizationUnitId", "organizationUnitId")
    .leftJoinAndSelect("collectionDetails.MilkCollectionId", "milkCollectionId")
    .where("collectionDetails.MilkCollectionId =:milkCollectionId", { milkCollectionId: milkCollectionId })
    .getMany();

  const milkCollectionDetails = smsAggregateData(collectionDetails);

  let agentIds: any[] = [];

  milkCollectionDetails.forEach((data) => {
    if (!agentIds.includes(data.OrganizationUnitId.Id)) {
      agentIds.push(data.OrganizationUnitId.Id);
    }
  })

  console.log("milk collection details: ",collectionDetails,milkCollectionDetails,agentIds);

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
    milkCollectionDetails.forEach((detail) => {
      if (detail.OrganizationUnitId.Id == id && detail.OrganizationUnitId.PhoneNumber !== null) {
        agentCollectionDetail.phoneNumber = detail.OrganizationUnitId.PhoneNumber;
        agentCollectionDetail.shift = detail.MilkCollectionId.Shift;
        agentCollectionDetail.date = moment(detail.MilkCollectionId.CollectionDateTime).format("DD-MM-YYYY");
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
  console.log("smsdata",smsData);
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

async function DeleteMilkCollection(
  req: Request,
  model: DeleteMilkCollectionModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.MilkCollections);
    const milkCollection = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (milkCollection) {
      milkCollection.IsActive = false;
      milkCollection.DeletedAt = new Date();
      milkCollection.DeletedBy = userId;
      await repository.save(milkCollection);

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
  GetAllMilkCollections,
  CreateMilkCollection,
  UpdateMilkCollection,
  DeleteMilkCollection,
  GetMilkRoutes,
  GetMilkCollectionsPortal,
  LockMilkBill,
  GetUnlockedBillingCycles,
};