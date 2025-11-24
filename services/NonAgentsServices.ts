import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllNonAgentsModel,
  CreateNonAgentsModel,
  DeleteNonAgentsModel,
  UpdateNonAgentsModel,
} from "../models/NonAgentsModel";
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

async function GetAllNonAgents(
  model?: any
): Promise<ServiceResponse<AllNonAgentsModel[]>> {
  try {
    let nonAgents;
    if (model.id) {
      nonAgents = await AppDataSource.getRepository(
        entities.NonAgents
      )
        .createQueryBuilder("nonAgents")
        .where("nonAgents.Id = :id", { id: model.id })
        .andWhere("nonAgents.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      nonAgents = await AppDataSource.getRepository(
        entities.NonAgents
      )
        .createQueryBuilder("nonAgents")
        .where("nonAgents.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const famrmersData: AllNonAgentsModel[] = nonAgents.map(
      (nonAgents) => ({
        id: nonAgents.Id,
        parentId: nonAgents.ParentId ? nonAgents.ParentId.Id : 0,
        name: nonAgents.Name,
        addressLine1: nonAgents.AddressLine1,
        addressLine2: nonAgents.AddressLine2,
        stateId: nonAgents.State ? nonAgents.State.Id : 0,
        districtId: nonAgents.District ? nonAgents.District.Id : 0,
        vctId: nonAgents.VctId ? nonAgents.VctId.Id : 0,
        accountNumber: nonAgents.AccountNumber ? nonAgents.AccountNumber : "",
        phoneNumber: nonAgents.PhoneNumber ? nonAgents.PhoneNumber : "",
        ifscCode: nonAgents.IfscCode ? nonAgents.IfscCode : "",
        adhharNumber: nonAgents.AadharNumber ? nonAgents.AadharNumber : "",
        isCurrentrate: nonAgents.IsCurrentRate
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

async function CreateNonAgents(
  req: Request,
  model: CreateNonAgentsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const parent = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("parent")
      .where("parent.Id = :id", { id: model.parentId })
      .getOne();

    const repository = AppDataSource.getRepository(entities.NonAgents);
    const nonAgents = new entities.NonAgents();

    if (parent) {
      nonAgents.ParentId = parent;
    }
    nonAgents.Name = model.name,
    nonAgents.AddressLine1 = model.addressLine1,
    nonAgents.AddressLine2 = model.addressLine2,
    nonAgents.State = model.stateId,
    nonAgents.District = model.districtId,
    nonAgents.AccountNumber = model.accountNumber,
    nonAgents.PhoneNumber = model.phoneNumber,
    nonAgents.IfscCode = model.ifscCode,
    nonAgents.AadharNumber = model.adhharNumber,
    nonAgents.IsCurrentRate = model.isCurrentrate,
    nonAgents.CreatedAt = new Date();
    nonAgents.CreatedBy = userId;
    await repository.save(nonAgents);

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

async function UpdateNonAgents(
  req: Request,
  model: UpdateNonAgentsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    console.log("model : ", model)
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.NonAgents);
    const nonAgents = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    const parent = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("parent")
      .where("parent.Id = :id", { id: model.parentId })
      .getOne();

    if (nonAgents) {

      if (parent) {
        nonAgents.ParentId = parent;
      }
      nonAgents.Name = model.name,
        nonAgents.AddressLine1 = model.addressLine1,
        nonAgents.AddressLine2 = model.addressLine2,
        nonAgents.State = model.stateId,
        nonAgents.District = model.districtId,
        nonAgents.VctId = model.vctId,
        nonAgents.AccountNumber = model.accountNumber,
        nonAgents.PhoneNumber = model.phoneNumber,
        nonAgents.IfscCode = model.ifscCode,
        nonAgents.AadharNumber = model.adhharNumber,
        nonAgents.IsCurrentRate = model.isCurrentrate,
        nonAgents.ModifiedAt = new Date();
      nonAgents.ModifiedBy = userId;
      await repository.save(nonAgents);
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

async function DeleteNonAgents(
  req: Request,
  model: DeleteNonAgentsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.NonAgents);
    const nonAgents = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });

    if (nonAgents) {
      nonAgents.IsActive = false;
      nonAgents.DeletedAt = new Date();
      nonAgents.DeletedBy = userId;
      await repository.save(nonAgents);

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
  GetAllNonAgents,
  CreateNonAgents,
  UpdateNonAgents,
  DeleteNonAgents,
};
