import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { ServiceResponse } from "../models/ApiResponse";
import { AllRolePermissionsModel } from "../models/RoleHasPermissionsModel";
dotenv.config();

const ERROR_MESSAGES = {
  INTERNAL_SERVER: "Internal Server Error",
};

const SUCCESS_MESSAGES = {
  SUCCESS: "Success",
};

async function GetAllRoleHasPermissions(): Promise<
  ServiceResponse<AllRolePermissionsModel[]>
> {
  try {
    const roleHasPermissions = await AppDataSource.getRepository(
      entities.RoleHasPermissions
    )
      .createQueryBuilder("rolePermissions")
      .leftJoinAndSelect("rolePermissions.Roles", "Roles")
      .leftJoinAndSelect("rolePermissions.Permissions", "Permissions")
      .where("rolePermissions.IsActive = :isActive", { isActive: true })
      .getMany();

    const roleHasPermissionsData: AllRolePermissionsModel[] =
      roleHasPermissions.map((rolesPermissions) => ({
        id: rolesPermissions.Id,
        roleId: rolesPermissions.Roles,
        permissionsId: rolesPermissions.Permissions,
      }));
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: roleHasPermissionsData,
    };
  } catch (error) {
    return {
      status: 500,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

export { GetAllRoleHasPermissions };
