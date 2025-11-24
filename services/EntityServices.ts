import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { ServiceResponse } from "../models/ApiResponse";
import { AllEntityModel } from "../models/EntityModel";
dotenv.config();

const ERROR_MESSAGES = {
  INTERNAL_SERVER: "Internal Server Error",
};

const SUCCESS_MESSAGES = {
  SUCCESS: "Success",
};

async function GetAllEntities(): Promise<ServiceResponse<AllEntityModel[]>> {
  try {
    const entity = await AppDataSource.getRepository(entities.EntityList)
      .createQueryBuilder("entity")
      .where("entity.IsActive = :isActive", { isActive: true })
      .getMany();

    const entityData: AllEntityModel[] = entity.map((entity) => ({
      id: entity.Id,
      name: entity.Name,
      appId: entity.AppId,
      metadata: entity.MetaData,
    }));
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: entityData,
    };
  } catch (error) {
    return {
      status: 500,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

export { GetAllEntities };
