import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { ServiceResponse } from "../models/ApiResponse";
import { AllPermissionsModel } from "../models/PermissionsModel";
dotenv.config();

const ERROR_MESSAGES = {
  INTERNAL_SERVER: "Internal Server Error",
};

const SUCCESS_MESSAGES = {
  SUCCESS: "Success",
};

async function GetAllPermissions(): Promise<
  ServiceResponse<AllPermissionsModel[]>
> {
  try {
    const permissions = await AppDataSource.getRepository(entities.Permissions)
      .createQueryBuilder("permissions")
      .leftJoinAndSelect("permissions.EntityList", "EntityList")
      .where("permissions.IsActive = :isActive", { isActive: true })
      .getMany();

    const permissionsData: AllPermissionsModel[] = permissions.map(
      (permissions) => ({
        id: permissions.Id,
        shortName: permissions.ShortName,
        description: permissions.Description,
        action: permissions.Action,
        entityId: permissions.EntityList,
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: permissionsData,
    };
  } catch (error) {
    return {
      status: 500,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

export { GetAllPermissions };
