import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllFarmerMilkCollectionDetailsModel,
  CreateFarmerMilkCollectionDetailsModel,
  DeleteFarmerMilkCollectionDetailsModel,
  UpdateFarmerMilkCollectionDetailsModel,
} from "../models/FarmerMilkCollectionDetailsModel";
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

async function GetAllFarmerMilkCollectionDetails(
  model?: any
): Promise<ServiceResponse<AllFarmerMilkCollectionDetailsModel[]>> {
  try {
    let farmerMilkCollectionDetails;
    if (model.id) {
      farmerMilkCollectionDetails = await AppDataSource.getRepository(
        entities.MilkCollectionDetails
      )
        .createQueryBuilder("farmerMilkCollectionDetails")
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.MilkCollectionId",
          "MilkCollectionId"
        )
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.OrganizationUnitId",
          "organization"
        )
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.TransporterVehicleId",
          "vehicle"
        )
        .leftJoinAndSelect("farmerMilkCollectionDetails.RouteId", "route")
        .leftJoinAndSelect("farmerMilkCollectionDetails.CollectedBy", "collectedBy")
        .leftJoinAndSelect("farmerMilkCollectionDetails.CreatedBy", "CreatedBy")
        .leftJoinAndSelect("farmerMilkCollectionDetails.ModifiedBy", "ModifiedBy")
        .leftJoinAndSelect("farmerMilkCollectionDetails.DeletedBy", "deletedBy")
        .where("farmerMilkCollectionDetails.Id = :id", { id: model.id })
        .andWhere("farmerMilkCollectionDetails.IsActive = :isActive", {
          isActive: true,
        })
        .getMany();
    } else if (model.milkCollectionId) {
      farmerMilkCollectionDetails = await AppDataSource.getRepository(
        entities.FarmerMilkCollectionDetails
      )
        .createQueryBuilder("farmerMilkCollectionDetails")
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.MilkCollectionId",
          "MilkCollectionId"
        )
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.OrganizationUnitId",
          "organization"
        )
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.TransporterVehicleId",
          "vehicle"
        )
        .leftJoinAndSelect("farmerMilkCollectionDetails.RouteId", "route")
        .leftJoinAndSelect("farmerMilkCollectionDetails.CreatedBy", "CreatedBy")
        .leftJoinAndSelect("farmerMilkCollectionDetails.ModifiedBy", "ModifiedBy")
        .leftJoinAndSelect("farmerMilkCollectionDetails.DeletedBy", "deletedBy")
        .where("farmerMilkCollectionDetails.MilkCollectionId = :milkCollectionId", {
          milkCollectionId: model.milkCollectionId,
        })
        .andWhere("farmerMilkCollectionDetails.IsActive = :isActive", {
          isActive: true,
        })
        .orderBy("farmerMilkCollectionDetails.SampleNumber")
        .getMany();
    } else if (model.milkType) {
      farmerMilkCollectionDetails = await AppDataSource.getRepository(
        entities.FarmerMilkCollectionDetails
      )
        .createQueryBuilder("farmerMilkCollectionDetails")
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.MilkCollectionId",
          "MilkCollectionId"
        )
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.OrganizationUnitId",
          "organization"
        )
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.TransporterVehicleId",
          "vehicle"
        )
        .leftJoinAndSelect("farmerMilkCollectionDetails.RouteId", "route")
        .leftJoinAndSelect("farmerMilkCollectionDetails.CreatedBy", "CreatedBy")
        .leftJoinAndSelect("farmerMilkCollectionDetails.ModifiedBy", "ModifiedBy")
        .leftJoinAndSelect("farmerMilkCollectionDetails.DeletedBy", "deletedBy")
        .leftJoinAndSelect("farmerMilkCollectionDetails.CollectedBy", "collectedBy")
        .where("farmerMilkCollectionDetails.MilkType = :milkType", {
          milkType: model.milkType,
        })
        .andWhere("farmerMilkCollectionDetails.IsActive = :isActive", {
          isActive: true,
        })
        .getMany();
    } else if (model.operationType) {
      farmerMilkCollectionDetails = await AppDataSource.getRepository(
        entities.FarmerMilkCollectionDetails
      )
        .createQueryBuilder("farmerMilkCollectionDetails")
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.MilkCollectionId",
          "MilkCollectionId"
        )
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.OrganizationUnitId",
          "organization"
        )
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.TransporterVehicleId",
          "vehicle"
        )
        .leftJoinAndSelect("farmerMilkCollectionDetails.RouteId", "route")
        .leftJoinAndSelect("farmerMilkCollectionDetails.CollectedBy", "collectedBy")
        .where("farmerMilkCollectionDetails.OperationType = :operationType", {
          operationType: model.operationType,
        })
        .andWhere("farmerMilkCollectionDetails.IsActive = :isActive", {
          isActive: true,
        })
        .getMany();
    } else if (model.startDate && model.endDate && model.minFatLimit && model.minSnfLimit && model.bmcId) {
      farmerMilkCollectionDetails = await AppDataSource.getRepository(
        entities.MilkCollectionDetails
      )
        .createQueryBuilder("farmerMilkCollectionDetails")
        .leftJoin("farmerMilkCollectionDetails.OrganizationUnitId", "agent")
        .where("agent.ParentId =:parentId", { parentId: model.bmcId })
        .andWhere("farmerMilkCollectionDetails.fat >= :minFatLimit", {
          minFatLimit: model.minFatLimit,
        })
        .andWhere("farmerMilkCollectionDetails.snf >= :minSnfLimit", {
          minSnfLimit: model.minSnfLimit,
        })
        .andWhere("DATE(farmerMilkCollectionDetails.CollectedAt) > :startDate", { startDate: model.startDate })
        .andWhere("DATE(farmerMilkCollectionDetails.CollectedAt) < :endDate", { endDate: model.endDate })
        .getMany();
    } else {
      farmerMilkCollectionDetails = await AppDataSource.getRepository(
        entities.MilkCollectionDetails
      )
        .createQueryBuilder("farmerMilkCollectionDetails")
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.MilkCollectionId",
          "MilkCollectionId"
        )
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.OrganizationUnitId",
          "organization"
        )
        .leftJoinAndSelect(
          "farmerMilkCollectionDetails.TransporterVehicleId",
          "vehicle"
        )
        .leftJoinAndSelect("farmerMilkCollectionDetails.RouteId", "route")
        .leftJoinAndSelect("farmerMilkCollectionDetails.CreatedBy", "CreatedBy")
        .leftJoinAndSelect("farmerMilkCollectionDetails.ModifiedBy", "ModifiedBy")
        .leftJoinAndSelect("farmerMilkCollectionDetails.DeletedBy", "deletedBy")
        .leftJoinAndSelect("farmerMilkCollectionDetails.CollectedBy", "collectedBy")
        .where("farmerMilkCollectionDetails.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const farmerMilkCollectionDetailsData: AllFarmerMilkCollectionDetailsModel[] =
      farmerMilkCollectionDetails.map((farmerMilkCollectionDetails) => ({
        id: farmerMilkCollectionDetails?.Id,
        milkCollectionId: farmerMilkCollectionDetails?.MilkCollectionId
          ? farmerMilkCollectionDetails?.MilkCollectionId.Id
          : "",
        milkType: farmerMilkCollectionDetails?.MilkType,
        collectionOperationType: farmerMilkCollectionDetails?.CollectionOperationType,
        testingOperationType: farmerMilkCollectionDetails?.TestingOperationType,
        fat: farmerMilkCollectionDetails?.Fat,
        snf: farmerMilkCollectionDetails?.Snf,
        clr: farmerMilkCollectionDetails?.Clr,
        protein: farmerMilkCollectionDetails?.Protein,
        lactose: farmerMilkCollectionDetails?.Lactose,
        salt: farmerMilkCollectionDetails?.Salt,
        water: farmerMilkCollectionDetails?.Water,
        temperature: farmerMilkCollectionDetails?.Temperature,
        sampleNumber: farmerMilkCollectionDetails?.SampleNumber,
        weight: farmerMilkCollectionDetails?.Weight,
        canCount: farmerMilkCollectionDetails?.CanCount,
        organizationUnitId: farmerMilkCollectionDetails?.OrganizationUnitId
          ? farmerMilkCollectionDetails?.OrganizationUnitId.Id
          : 0,
        organizationUnitName: farmerMilkCollectionDetails?.OrganizationUnitId
          ? farmerMilkCollectionDetails?.OrganizationUnitId.Name
          : "",
        transporterVehicleId: farmerMilkCollectionDetails?.TransporterVehicleId
          ? farmerMilkCollectionDetails?.TransporterVehicleId.Id
          : 0,
        transporterVehicleName: farmerMilkCollectionDetails?.TransporterVehicleId
          ? farmerMilkCollectionDetails?.TransporterVehicleId.VehicleType
          : "",
        routeId: farmerMilkCollectionDetails.RouteId
          ? farmerMilkCollectionDetails.RouteId.Id
          : 0,
        routeName: farmerMilkCollectionDetails.RouteId
          ? farmerMilkCollectionDetails.RouteId.RouteName
          : "",
        collectedBy: farmerMilkCollectionDetails.CollectedBy ? farmerMilkCollectionDetails.CollectedBy.Id : 0,
        createdBy: farmerMilkCollectionDetails.CreatedBy ? farmerMilkCollectionDetails.CreatedBy.Id : 0,
        modifiedBy: farmerMilkCollectionDetails.ModifiedBy ? farmerMilkCollectionDetails.ModifiedBy.Id : 0,
        deletedBy: farmerMilkCollectionDetails.CollectedBy ? farmerMilkCollectionDetails.CollectedBy.Id : 0,
        collectedAt: farmerMilkCollectionDetails?.CollectedAt,
        testedAt: farmerMilkCollectionDetails?.TestedAt,
        createdAt: farmerMilkCollectionDetails.CreatedAt,
        updatedAt: farmerMilkCollectionDetails.ModifiedAt,
        deletedAt: farmerMilkCollectionDetails.DeletedAt,
      }));
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: farmerMilkCollectionDetailsData,
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

async function CreateFarmerMilkCollectionDetails(
  req: Request,
  model: CreateFarmerMilkCollectionDetailsModel[]
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    for (const record of model) {
      const created = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.createdBy })
        .getOne();
      const updated = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.modifiedBy })
        .getOne();
      const deleted = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.deletedBy })
        .getOne();
      const farmerMilkCollection = await AppDataSource.getRepository(
        entities.FarmerMilkCollections
      )
        .createQueryBuilder("farmerMilkCollection")
        .where("farmerMilkCollection.Id = :id", { id: record.milkCollectionId })
        .getOne();
      const organizationUnit = await AppDataSource.getRepository(
        entities.Organization
      )
        .createQueryBuilder("organizationUnit")
        .where("organizationUnit.Id = :id", { id: record.organizationUnitId })
        .getOne();
      const vehicle = await AppDataSource.getRepository(
        entities.TransporterVehicles
      )
        .createQueryBuilder("vehcile")
        .where("vehcile.Id = :id", { id: record.transporterVehicleId })
        .getOne();
      const route = await AppDataSource.getRepository(entities.RouteMaster)
        .createQueryBuilder("route")
        .where("route.Id = :id", { id: record.routeId })
        .getOne();
      const repository = AppDataSource.getRepository(
        entities.FarmerMilkCollectionDetails
      );
      const farmerMilkCollectionDetails = new entities.FarmerMilkCollectionDetails();
      farmerMilkCollectionDetails.Id = record.id ?? farmerMilkCollectionDetails.Id;
      if (farmerMilkCollection) {
        farmerMilkCollectionDetails.MilkCollectionId = farmerMilkCollection;
      }
      farmerMilkCollectionDetails.MilkType =
        record.milkType ?? farmerMilkCollectionDetails.MilkType;
      farmerMilkCollectionDetails.CollectionOperationType =
        record.collectionOperationType ??
        farmerMilkCollectionDetails.CollectionOperationType;
      farmerMilkCollectionDetails.TestingOperationType =
        record.testingOperationType ?? farmerMilkCollectionDetails.TestingOperationType;
      farmerMilkCollectionDetails.Fat = record.fat ?? farmerMilkCollectionDetails.Fat;
      farmerMilkCollectionDetails.Snf = record.snf ?? farmerMilkCollectionDetails.Snf;
      farmerMilkCollectionDetails.Clr = record.clr ?? farmerMilkCollectionDetails.Clr;
      farmerMilkCollectionDetails.Protein = record.protein ?? farmerMilkCollectionDetails.Protein;
      farmerMilkCollectionDetails.Lactose = record.lactose ?? farmerMilkCollectionDetails.Lactose;
      farmerMilkCollectionDetails.Salt = record.salt ?? farmerMilkCollectionDetails.Salt;
      farmerMilkCollectionDetails.Water = record.water ?? farmerMilkCollectionDetails.Water;
      farmerMilkCollectionDetails.Temperature = record.temperature ?? farmerMilkCollectionDetails.Temperature;
      farmerMilkCollectionDetails.SampleNumber = record.sampleNumber ?? farmerMilkCollectionDetails.SampleNumber;

      farmerMilkCollectionDetails.Weight = record.weight ?? farmerMilkCollectionDetails.Weight;
      farmerMilkCollectionDetails.CanCount =
        record.canCount ?? farmerMilkCollectionDetails.CanCount;
      if (created) {
        farmerMilkCollectionDetails.CreatedBy = created;
      }
      if (updated) {
        farmerMilkCollectionDetails.ModifiedBy = updated;
      }
      if (deleted) {
        farmerMilkCollectionDetails.DeletedBy = deleted;
      }
      if (organizationUnit) {
        farmerMilkCollectionDetails.OrganizationUnitId = organizationUnit;
      }
      if (vehicle) {
        farmerMilkCollectionDetails.TransporterVehicleId = vehicle;
      }
      if (route) {
        farmerMilkCollectionDetails.RouteId = route;
      }
      farmerMilkCollectionDetails.CollectedAt =
        record.collectedAt ?? farmerMilkCollectionDetails.CollectedAt;
      farmerMilkCollectionDetails.TestedAt =
        record.testedAt ?? farmerMilkCollectionDetails.TestedAt;
      farmerMilkCollectionDetails.CreatedAt =
        record.createdAt ?? farmerMilkCollectionDetails.CreatedAt;
      farmerMilkCollectionDetails.ModifiedAt =
        record.updatedAt ?? farmerMilkCollectionDetails.ModifiedAt;
      farmerMilkCollectionDetails.DeletedAt =
        record.deletedAt ?? farmerMilkCollectionDetails.DeletedAt;
      farmerMilkCollectionDetails.CreatedBy = userId;
      await repository.save(farmerMilkCollectionDetails);
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

async function UpdateFarmerMilkCollectionDetails(
  req: Request,
  model: UpdateFarmerMilkCollectionDetailsModel[]
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;
    const uuid: string = uuidv4();

    for (const record of model) {
      const created = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.createdBy })
        .getOne();
      const updated = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.modifiedBy })
        .getOne();
      const deleted = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :id", { id: record.deletedBy })
        .getOne();

      const repository = AppDataSource.getRepository(
        entities.FarmerMilkCollectionDetails
      );
      const farmerMilkCollectionDetails = await repository.findOne({
        where: { Id: record.id ?? 0 },
      });

      const milkCollection = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollection")
        .where("milkCollection.Id = :id", { id: record.milkCollectionId })
        .getOne();

      const organizationUnit = await AppDataSource.getRepository(
        entities.Organization
      )
        .createQueryBuilder("organizationUnit")
        .where("organizationUnit.Id = :id", { id: record.organizationUnitId })
        .getOne();
      const vehicle = await AppDataSource.getRepository(
        entities.TransporterVehicles
      )
        .createQueryBuilder("vehcile")
        .where("vehcile.Id = :id", { id: record.transporterVehicleId })
        .getOne();
      const route = await AppDataSource.getRepository(entities.RouteMaster)
        .createQueryBuilder("route")
        .where("route.Id = :id", { id: record.routeId })
        .getOne();

      if (farmerMilkCollectionDetails) {
        if (milkCollection) {
          farmerMilkCollectionDetails.MilkCollectionId = milkCollection;
        }
        if (record.fat > 5.4) {
          farmerMilkCollectionDetails.MilkType = "buffalo"
        } else {
          farmerMilkCollectionDetails.MilkType = "cow"
        }
        // farmerMilkCollectionDetails.CollectionOperationType =
        //   record.collectionOperationType ??
        //   farmerMilkCollectionDetails.CollectionOperationType;
        farmerMilkCollectionDetails.TestingOperationType =
          record.testingOperationType ??
          farmerMilkCollectionDetails.TestingOperationType;
        farmerMilkCollectionDetails.Fat = record.fat ?? farmerMilkCollectionDetails.Fat;
        farmerMilkCollectionDetails.Snf = parseFloat(record?.snf?.toFixed(1)) ?? farmerMilkCollectionDetails.Snf;
        farmerMilkCollectionDetails.Clr = record.clr ?? farmerMilkCollectionDetails.Clr;
        farmerMilkCollectionDetails.Protein = record.protein ?? farmerMilkCollectionDetails.Protein;
        farmerMilkCollectionDetails.Lactose = record.lactose ?? farmerMilkCollectionDetails.Lactose;
        farmerMilkCollectionDetails.Salt = record.salt ?? farmerMilkCollectionDetails.Salt;
        farmerMilkCollectionDetails.Water = record.water ?? farmerMilkCollectionDetails.Water;
        farmerMilkCollectionDetails.Temperature = record.temperature ?? farmerMilkCollectionDetails.Temperature;
        farmerMilkCollectionDetails.SampleNumber = record.sampleNumber ?? farmerMilkCollectionDetails.SampleNumber;
        farmerMilkCollectionDetails.Weight =
          record.weight ?? farmerMilkCollectionDetails.Weight;
        farmerMilkCollectionDetails.CanCount =
          record.canCount ?? farmerMilkCollectionDetails.CanCount;
        if (created) {
          farmerMilkCollectionDetails.CreatedBy = created;
        }
        if (updated) {
          farmerMilkCollectionDetails.ModifiedBy = updated;
        }
        if (deleted) {
          farmerMilkCollectionDetails.DeletedBy = deleted;
        }
        if (organizationUnit) {
          farmerMilkCollectionDetails.OrganizationUnitId = organizationUnit;
        }
        if (vehicle) {
          farmerMilkCollectionDetails.TransporterVehicleId = vehicle;
        }
        if (route) {
          farmerMilkCollectionDetails.RouteId = route;
        }
        farmerMilkCollectionDetails.CollectedAt =
          record.collectedAt ?? farmerMilkCollectionDetails.CollectedAt;
        farmerMilkCollectionDetails.TestedAt =
          record.testedAt ?? farmerMilkCollectionDetails.TestedAt;
        farmerMilkCollectionDetails.CreatedAt =
          record.createdAt ?? farmerMilkCollectionDetails.CreatedAt;
        farmerMilkCollectionDetails.ModifiedAt =
          record.updatedAt ?? farmerMilkCollectionDetails.ModifiedAt;
        farmerMilkCollectionDetails.DeletedAt =
          record.deletedAt ?? farmerMilkCollectionDetails.DeletedAt;
        farmerMilkCollectionDetails.ModifiedBy = userId;
        await repository.save(farmerMilkCollectionDetails);

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

async function DeleteFarmerMilkCollectionDetails(
  req: Request,
  model: DeleteFarmerMilkCollectionDetailsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(
      entities.FarmerMilkCollectionDetails
    );
    const farmerMilkCollectionDetail = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (farmerMilkCollectionDetail) {
      farmerMilkCollectionDetail.IsActive = false;
      farmerMilkCollectionDetail.DeletedAt = new Date();
      farmerMilkCollectionDetail.DeletedBy = userId;
      await repository.remove(farmerMilkCollectionDetail);

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
  GetAllFarmerMilkCollectionDetails,
  CreateFarmerMilkCollectionDetails,
  UpdateFarmerMilkCollectionDetails,
  DeleteFarmerMilkCollectionDetails,
};