import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllMilkCollectionDetailsModel,
  CreateMilkCollectionDetailsModel,
  DeleteMilkCollectionDetailsModel,
  UpdateMilkCollectionDetailsModel,
} from "../models/MilkCollectionDetailsModel";
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

async function GetAllMilkCollectionDetails(
  model?: any
): Promise<ServiceResponse<AllMilkCollectionDetailsModel[]>> {
  try {
    let milkCollectionDetails;
    if (model.id) {
      milkCollectionDetails = await AppDataSource.getRepository(
        entities.MilkCollectionDetails
      )
        .createQueryBuilder("milkCollectionDetails")
        .leftJoinAndSelect(
          "milkCollectionDetails.MilkCollectionId",
          "MilkCollectionId"
        )
        .leftJoinAndSelect(
          "milkCollectionDetails.OrganizationUnitId",
          "organization"
        )
        .leftJoinAndSelect(
          "milkCollectionDetails.TransporterVehicleId",
          "vehicle"
        )
        .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
        .leftJoinAndSelect("milkCollectionDetails.CollectedBy", "collectedBy")
        .leftJoinAndSelect("milkCollectionDetails.CreatedBy", "CreatedBy")
        .leftJoinAndSelect("milkCollectionDetails.ModifiedBy", "ModifiedBy")
        .leftJoinAndSelect("milkCollectionDetails.DeletedBy", "deletedBy")
        .where("milkCollectionDetails.Id = :id", { id: model.id })
        .andWhere("milkCollectionDetails.IsActive = :isActive", {
          isActive: true,
        })
        .getMany();
    } else if (model.milkCollectionId) {
      milkCollectionDetails = await AppDataSource.getRepository(
        entities.MilkCollectionDetails
      )
        .createQueryBuilder("milkCollectionDetails")
        .leftJoinAndSelect(
          "milkCollectionDetails.MilkCollectionId",
          "MilkCollectionId"
        )
        .leftJoinAndSelect(
          "milkCollectionDetails.OrganizationUnitId",
          "organization"
        )
        .leftJoinAndSelect(
          "milkCollectionDetails.TransporterVehicleId",
          "vehicle"
        )
        .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
        .leftJoinAndSelect("milkCollectionDetails.CreatedBy", "CreatedBy")
        .leftJoinAndSelect("milkCollectionDetails.ModifiedBy", "ModifiedBy")
        .leftJoinAndSelect("milkCollectionDetails.DeletedBy", "deletedBy")
        .where("milkCollectionDetails.MilkCollectionId = :milkCollectionId", {
          milkCollectionId: model.milkCollectionId,
        })
        .andWhere("milkCollectionDetails.IsActive = :isActive", {
          isActive: true,
        })
        .orderBy("milkCollectionDetails.SampleNumber")
        .getMany();
    } else if (model.milkType) {
      milkCollectionDetails = await AppDataSource.getRepository(
        entities.MilkCollectionDetails
      )
        .createQueryBuilder("milkCollectionDetails")
        .leftJoinAndSelect(
          "milkCollectionDetails.MilkCollectionId",
          "MilkCollectionId"
        )
        .leftJoinAndSelect(
          "milkCollectionDetails.OrganizationUnitId",
          "organization"
        )
        .leftJoinAndSelect(
          "milkCollectionDetails.TransporterVehicleId",
          "vehicle"
        )
        .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
        .leftJoinAndSelect("milkCollectionDetails.CreatedBy", "CreatedBy")
        .leftJoinAndSelect("milkCollectionDetails.ModifiedBy", "ModifiedBy")
        .leftJoinAndSelect("milkCollectionDetails.DeletedBy", "deletedBy")
        .leftJoinAndSelect("milkCollectionDetails.CollectedBy", "collectedBy")
        .where("milkCollectionDetails.MilkType = :milkType", {
          milkType: model.milkType,
        })
        .andWhere("milkCollectionDetails.IsActive = :isActive", {
          isActive: true,
        })
        .getMany();
    } else if (model.operationType) {
      milkCollectionDetails = await AppDataSource.getRepository(
        entities.MilkCollectionDetails
      )
        .createQueryBuilder("milkCollectionDetails")
        .leftJoinAndSelect(
          "milkCollectionDetails.MilkCollectionId",
          "MilkCollectionId"
        )
        .leftJoinAndSelect(
          "milkCollectionDetails.OrganizationUnitId",
          "organization"
        )
        .leftJoinAndSelect(
          "milkCollectionDetails.TransporterVehicleId",
          "vehicle"
        )
        .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
        .leftJoinAndSelect("milkCollectionDetails.CollectedBy", "collectedBy")
        .where("milkCollectionDetails.OperationType = :operationType", {
          operationType: model.operationType,
        })
        .andWhere("milkCollectionDetails.IsActive = :isActive", {
          isActive: true,
        })
        .getMany();
    } else if (model.startDate && model.endDate && model.minFatLimit && model.minSnfLimit && model.bmcId) {
      milkCollectionDetails = await AppDataSource.getRepository(
        entities.MilkCollectionDetails
      )
        .createQueryBuilder("milkCollectionDetails")
        .leftJoin("milkCollectionDetails.OrganizationUnitId", "agent")
        .where("agent.ParentId =:parentId", { parentId: model.bmcId })
        .andWhere("milkCollectionDetails.fat >= :minFatLimit", {
          minFatLimit: model.minFatLimit,
        })
        .andWhere("milkCollectionDetails.snf >= :minSnfLimit", {
          minSnfLimit: model.minSnfLimit,
        })
        .andWhere("DATE(milkCollectionDetails.CollectedAt) > :startDate", { startDate: model.startDate })
        .andWhere("DATE(milkCollectionDetails.CollectedAt) < :endDate", { endDate: model.endDate })
        .getMany();
    } else {
      milkCollectionDetails = await AppDataSource.getRepository(
        entities.MilkCollectionDetails
      )
        .createQueryBuilder("milkCollectionDetails")
        .leftJoinAndSelect(
          "milkCollectionDetails.MilkCollectionId",
          "MilkCollectionId"
        )
        .leftJoinAndSelect(
          "milkCollectionDetails.OrganizationUnitId",
          "organization"
        )
        .leftJoinAndSelect(
          "milkCollectionDetails.TransporterVehicleId",
          "vehicle"
        )
        .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
        .leftJoinAndSelect("milkCollectionDetails.CreatedBy", "CreatedBy")
        .leftJoinAndSelect("milkCollectionDetails.ModifiedBy", "ModifiedBy")
        .leftJoinAndSelect("milkCollectionDetails.DeletedBy", "deletedBy")
        .leftJoinAndSelect("milkCollectionDetails.CollectedBy", "collectedBy")
        .where("milkCollectionDetails.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const milkCollectionDetailsData: AllMilkCollectionDetailsModel[] =
      milkCollectionDetails.map((milkCollectionDetails) => ({
        id: milkCollectionDetails?.Id,
        milkCollectionId: milkCollectionDetails?.MilkCollectionId
          ? milkCollectionDetails?.MilkCollectionId.Id
          : "",
        milkType: milkCollectionDetails?.MilkType,
        collectionOperationType: milkCollectionDetails?.CollectionOperationType,
        testingOperationType: milkCollectionDetails?.TestingOperationType,
        fat: milkCollectionDetails?.Fat,
        snf: milkCollectionDetails?.Snf,
        clr: milkCollectionDetails?.Clr,
        protein: milkCollectionDetails?.Protein,
        lactose: milkCollectionDetails?.Lactose,
        salt: milkCollectionDetails?.Salt,
        water: milkCollectionDetails?.Water,
        temperature: milkCollectionDetails?.Temperature,
        sampleNumber: milkCollectionDetails?.SampleNumber,
        weight: milkCollectionDetails?.Weight,
        canCount: milkCollectionDetails?.CanCount,
        organizationUnitId: milkCollectionDetails?.OrganizationUnitId
          ? milkCollectionDetails?.OrganizationUnitId.Id
          : 0,
        organizationUnitName: milkCollectionDetails?.OrganizationUnitId
          ? milkCollectionDetails?.OrganizationUnitId.Name
          : "",
        transporterVehicleId: milkCollectionDetails?.TransporterVehicleId
          ? milkCollectionDetails?.TransporterVehicleId.Id
          : 0,
        transporterVehicleName: milkCollectionDetails?.TransporterVehicleId
          ? milkCollectionDetails?.TransporterVehicleId.VehicleType
          : "",
        routeId: milkCollectionDetails.RouteId
          ? milkCollectionDetails.RouteId.Id
          : 0,
        routeName: milkCollectionDetails.RouteId
          ? milkCollectionDetails.RouteId.RouteName
          : "",
        collectedBy: milkCollectionDetails.CollectedBy ? milkCollectionDetails.CollectedBy.Id : 0,
        createdBy: milkCollectionDetails.CreatedBy ? milkCollectionDetails.CreatedBy.Id : 0,
        modifiedBy: milkCollectionDetails.ModifiedBy ? milkCollectionDetails.ModifiedBy.Id : 0,
        deletedBy: milkCollectionDetails.CollectedBy ? milkCollectionDetails.CollectedBy.Id : 0,
        collectedAt: milkCollectionDetails?.CollectedAt,
        testedAt: milkCollectionDetails?.TestedAt,
        createdAt: milkCollectionDetails.CreatedAt,
        updatedAt: milkCollectionDetails.ModifiedAt,
        deletedAt: milkCollectionDetails.DeletedAt,
      }));
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: milkCollectionDetailsData,
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

async function CreateMilkCollectionDetails(
  req: Request,
  model: CreateMilkCollectionDetailsModel[]
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
      const milkCollection = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollection")
        .where("milkCollection.Id = :id", { id: record.milkCollectionId })
        .getOne();

      if(!milkCollection) {
        return {
          status: 400,
          message: "MILK COLLECTION DOESN'T EXIST",
          data: null,
        };
      }
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
        entities.MilkCollectionDetails
      );
      const milkCollectionDetails = new entities.MilkCollectionDetails();
      milkCollectionDetails.Id = record.id;
      if (milkCollection) {
        milkCollectionDetails.MilkCollectionId = milkCollection;
      }
      if (record.fat > 5.4) {
        milkCollectionDetails.MilkType = "buffalo"
      } else {
        milkCollectionDetails.MilkType = "cow"
      }
      milkCollectionDetails.CollectionOperationType =
        record.collectionOperationType ??
        milkCollectionDetails.CollectionOperationType;
      milkCollectionDetails.TestingOperationType =
        record.testingOperationType ?? milkCollectionDetails.TestingOperationType;
      milkCollectionDetails.Fat = record.fat ?? milkCollectionDetails.Fat;
      milkCollectionDetails.Snf = record.snf ?? milkCollectionDetails.Snf;
      milkCollectionDetails.Clr = record.clr ?? milkCollectionDetails.Clr;
      milkCollectionDetails.Protein = record.protein ?? milkCollectionDetails.Protein;
      milkCollectionDetails.Lactose = record.lactose ?? milkCollectionDetails.Lactose;
      milkCollectionDetails.Salt = record.salt ?? milkCollectionDetails.Salt;
      milkCollectionDetails.Water = record.water ?? milkCollectionDetails.Water;
      milkCollectionDetails.Temperature = record.temperature ?? milkCollectionDetails.Temperature;
      milkCollectionDetails.SampleNumber = record.sampleNumber ?? milkCollectionDetails.SampleNumber;

      milkCollectionDetails.Weight = record.weight ?? milkCollectionDetails.Weight;
      milkCollectionDetails.CanCount =
        record.canCount ?? milkCollectionDetails.CanCount;
      if (created) {
        milkCollectionDetails.CreatedBy = created;
      }
      if (updated) {
        milkCollectionDetails.ModifiedBy = updated;
      }
      if (deleted) {
        milkCollectionDetails.DeletedBy = deleted;
      }
      if (organizationUnit) {
        milkCollectionDetails.OrganizationUnitId = organizationUnit;
      }
      if (vehicle) {
        milkCollectionDetails.TransporterVehicleId = vehicle;
      }
      if (route) {
        milkCollectionDetails.RouteId = route;
      }
      milkCollectionDetails.CollectedAt =
        record.collectedAt ?? milkCollectionDetails.CollectedAt;
      milkCollectionDetails.TestedAt =
        record.testedAt ?? milkCollectionDetails.TestedAt;
      milkCollectionDetails.CreatedAt =
        record.createdAt ?? milkCollectionDetails.CreatedAt;
      milkCollectionDetails.ModifiedAt =
        record.updatedAt ?? milkCollectionDetails.ModifiedAt;
      milkCollectionDetails.DeletedAt =
        record.deletedAt ?? milkCollectionDetails.DeletedAt;
      milkCollectionDetails.CreatedBy = userId;
      await repository.save(milkCollectionDetails);
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

async function UpdateMilkCollectionDetails(
  req: Request,
  model: UpdateMilkCollectionDetailsModel[]
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

      const repository = AppDataSource.getRepository(
        entities.MilkCollectionDetails
      );
      const milkCollectionDetails = await repository.findOne({
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

      if (milkCollectionDetails) {
        if (milkCollection) {
          milkCollectionDetails.MilkCollectionId = milkCollection;
        }
        if (record.fat > 5.4) {
          milkCollectionDetails.MilkType = "buffalo"
        } else {
          milkCollectionDetails.MilkType = "cow"
        }
        // milkCollectionDetails.CollectionOperationType =
        //   record.collectionOperationType ??
        //   milkCollectionDetails.CollectionOperationType;
        milkCollectionDetails.TestingOperationType =
          record.testingOperationType ??
          milkCollectionDetails.TestingOperationType;
        milkCollectionDetails.Fat = record.fat ?? milkCollectionDetails.Fat;
        //milkCollectionDetails.Snf = parseFloat(record?.snf?.toFixed(1)) ?? milkCollectionDetails.Snf;
        milkCollectionDetails.Snf = Math.trunc((Math.round(record?.snf * 100) / 100) * 10) / 10 ?? milkCollectionDetails.Snf;
        milkCollectionDetails.Clr = record.clr ?? milkCollectionDetails.Clr;
        milkCollectionDetails.Protein = record.protein ?? milkCollectionDetails.Protein;
        milkCollectionDetails.Lactose = record.lactose ?? milkCollectionDetails.Lactose;
        milkCollectionDetails.Salt = record.salt ?? milkCollectionDetails.Salt;
        milkCollectionDetails.Water = record.water ?? milkCollectionDetails.Water;
        milkCollectionDetails.Temperature = record.temperature ?? milkCollectionDetails.Temperature;
        milkCollectionDetails.SampleNumber = record.sampleNumber ?? milkCollectionDetails.SampleNumber;
        milkCollectionDetails.Weight =
          record.weight ?? milkCollectionDetails.Weight;
        milkCollectionDetails.CanCount =
          record.canCount ?? milkCollectionDetails.CanCount;
        if (created) {
          milkCollectionDetails.CreatedBy = created;
        }
        if (updated) {
          milkCollectionDetails.ModifiedBy = updated;
        }
        if (deleted) {
          milkCollectionDetails.DeletedBy = deleted;
        }
        if (organizationUnit) {
          milkCollectionDetails.OrganizationUnitId = organizationUnit;
        }
        if (vehicle) {
          milkCollectionDetails.TransporterVehicleId = vehicle;
        }
        if (route) {
          milkCollectionDetails.RouteId = route;
        }
        milkCollectionDetails.CollectedAt =
          record.collectedAt ?? milkCollectionDetails.CollectedAt;
        milkCollectionDetails.TestedAt =
          record.testedAt ?? milkCollectionDetails.TestedAt;
        milkCollectionDetails.CreatedAt =
          record.createdAt ?? milkCollectionDetails.CreatedAt;
        milkCollectionDetails.ModifiedAt =
          record.updatedAt ?? milkCollectionDetails.ModifiedAt;
        milkCollectionDetails.DeletedAt =
          record.deletedAt ?? milkCollectionDetails.DeletedAt;
        milkCollectionDetails.ModifiedBy = userId;
        await repository.save(milkCollectionDetails);

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

async function DeleteMilkCollectionDetails(
  req: Request,
  model: DeleteMilkCollectionDetailsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(
      entities.MilkCollectionDetails
    );
    const milkCollectionDetail = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (milkCollectionDetail) {
      milkCollectionDetail.IsActive = false;
      milkCollectionDetail.DeletedAt = new Date();
      milkCollectionDetail.DeletedBy = userId;
      await repository.remove(milkCollectionDetail);

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
  GetAllMilkCollectionDetails,
  CreateMilkCollectionDetails,
  UpdateMilkCollectionDetails,
  DeleteMilkCollectionDetails,
};