import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllFarmersModel,
  CreateFarmersModel,
  DeleteFarmersModel,
  UpdateFarmersModel,
} from "../models/FarmerModel";
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

async function GetAllFarmers(
  model?: any
): Promise<ServiceResponse<AllFarmersModel[]>> {
  try {
    let farmers;
    if (model.id) {
      farmers = await AppDataSource.getRepository(
        entities.Farmer
      )
        .createQueryBuilder("farmers")
        .where("farmers.Id = :id", { id: model.id })
        .andWhere("farmers.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      farmers = await AppDataSource.getRepository(
        entities.Farmer
      )
        .createQueryBuilder("farmers")
        .where("farmers.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const famrmersData: AllFarmersModel[] = farmers.map(
      (farmers) => ({
        id: farmers.Id,
        parentId: farmers.ParentId ? farmers.ParentId.Id : 0,
        name: farmers.Name,
        addressLine1: farmers.AddressLine1,
        addressLine2: farmers.AddressLine2,
        stateId: farmers.State ? farmers.State.Id : 0,
        districtId: farmers.District ? farmers.District.Id : 0,
        vctId: farmers.VctId ? farmers.VctId.Id : 0,
        accountNumber: farmers.AccountNumber ? farmers.AccountNumber : "",
        phoneNumber: farmers.PhoneNumber ? farmers.PhoneNumber : "",
        ifscCode: farmers.IfscCode ? farmers.IfscCode : "",
        adhharNumber: farmers.AadharNumber ? farmers.AadharNumber : "",
        isCurrentrate: farmers.IsCurrentRate
      })
    );

    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: famrmersData,
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

async function CreateFarmers(
  req: Request,
  model: CreateFarmersModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    // const parent = await AppDataSource.getRepository(entities.Organization)
    //   .createQueryBuilder("parent")
    //   .where("parent.Id = :id", { id: model.parentId })
    //   .getOne();
let parent = null;
if (model.parentId) {
  parent = await AppDataSource.getRepository(entities.Organization)
    .createQueryBuilder("parent")
    .where("parent.Id = :id", { id: model.parentId })
    .getOne();
}

    const repository = AppDataSource.getRepository(entities.Farmer);
    const farmers = new entities.Farmer();

    if (parent) {
      farmers.ParentId = parent;
    }
    farmers.Name = model.name,
    farmers.AddressLine1 = model.addressLine1,
    farmers.AddressLine2 = model.addressLine2,
    farmers.State = model.stateId,
    farmers.District = model.districtId,
    farmers.AccountNumber = model.accountNumber,
    farmers.PhoneNumber = model.phoneNumber,
    farmers.IfscCode = model.ifscCode,
    farmers.AadharNumber = model.adhharNumber,
    farmers.IsCurrentRate = model.isCurrentrate,
    farmers.CreatedAt = new Date();
    farmers.CreatedBy = userId;
    await repository.save(farmers);

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

async function UpdateFarmers(
  req: Request,
  model: UpdateFarmersModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    console.log("model : ", model)
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Farmer);
    const farmers = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    const parent = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("parent")
      .where("parent.Id = :id", { id: model.parentId })
      .getOne();

    if (farmers) {

      if (parent) {
        farmers.ParentId = parent;
      }
      farmers.Name = model.name,
        farmers.AddressLine1 = model.addressLine1,
        farmers.AddressLine2 = model.addressLine2,
        farmers.State = model.stateId,
        farmers.District = model.districtId,
        farmers.VctId = model.vctId,
        farmers.AccountNumber = model.accountNumber,
        farmers.PhoneNumber = model.phoneNumber,
        farmers.IfscCode = model.ifscCode,
        farmers.AadharNumber = model.adhharNumber,
        farmers.IsCurrentRate = model.isCurrentrate,
        farmers.ModifiedAt = new Date();
      farmers.ModifiedBy = userId;
      await repository.save(farmers);
      // console.log(organizations)
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

async function DeleteFarmers(
  req: Request,
  model: DeleteFarmersModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Farmer);
    const farmers = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });

    if (farmers) {
      farmers.IsActive = false;
      farmers.DeletedAt = new Date();
      farmers.DeletedBy = userId;
      await repository.save(farmers);

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
  GetAllFarmers,
  CreateFarmers,
  UpdateFarmers,
  DeleteFarmers,
};
