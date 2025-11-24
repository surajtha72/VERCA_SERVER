import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import {
  ChangePasswordModel,
  JWTModel,
  LoginModel,
} from "../models/LoginModel";
import {
  APIResponse,
  AppLoginResponse,
  JWTResponse,
  LoginResponse,
  ServiceResponse,
} from "../models/ApiResponse";
dotenv.config();

const ERROR_MESSAGES = {
  USER_EXISTS: "User already exists",
  USER_DOES_NOT_EXISTS: "User does not exists",
  INCORRECT_PASSWORD: "Incorrect Password",
  USER_DISABLED: "The User is Disabled",
  INVALID_BEARER: "Invalid bearer",
  NO_DATA: "No Data",
  INTERNAL_SERVER: "Internal Server Error",
};

const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: "Registration successful",
  SUCCESS: "Success",
};

async function Login(
  model: LoginModel
): Promise<ServiceResponse<LoginResponse>> {
  try {
    if (model?.username && model?.password) {
      const user = await AppDataSource.getRepository(entities.User).findOne({
        where: { Username: model.username, IsActive: true},
        relations: ["Role"],
      });
      if (user) {
        const isMatch = await bcrypt.compare(model.password, user.Password);
        if (isMatch) {
          if (user.IsActive == true) {
            const userData = {
              userId: user.Id,
              username: user.Username,
              roleId: user.Role.Id,
              roleName: user.Role.Name,
            };
            const jwtReturn = await CreateJWTToken(userData);
            const permissionsData = await permissions(userData?.roleId);

            return {
              status: 200,
              message: SUCCESS_MESSAGES.SUCCESS,
              data: {
                userDetails: {
                  id: user.Id,
                  username: model.username,
                  accessToken: jwtReturn?.data?.accessToken || null,
                  roleId: user.Role.Id,
                  roleName: user.Role.Name,
                  expiryTime: 360000,
                },
                permissions: permissionsData,
              },
            };
          } else {
            return {
              status: 401,
              message: ERROR_MESSAGES.USER_DISABLED,
              data: null,
            };
          }
        } else {
          return {
            status: 401,
            message: ERROR_MESSAGES.INCORRECT_PASSWORD,
            data: null,
          };
        }
      } else {
        return {
          status: 404,
          message: ERROR_MESSAGES.USER_DOES_NOT_EXISTS,
          data: null,
        };
      }
    } else {
      return { status: 400, message: ERROR_MESSAGES.NO_DATA, data: null };
    }
  } catch (error) {
    return { status: 500, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
  }
}

async function permissions(role: number) {
  try {
    const roleHasPermission = await AppDataSource.getRepository(
      entities.RoleHasPermissions
    )
      .createQueryBuilder("roleHasPermission")
      .leftJoinAndSelect("roleHasPermission.Permissions", "permissions")
      .leftJoinAndSelect("permissions.EntityList", "entities")
      .where("roleHasPermission.Roles = :id", { id: role })
      .andWhere("roleHasPermission.IsActive = :isActive", { isActive: true })
      .andWhere("permissions.IsActive = :isActive", { isActive: true })
      .andWhere("entities.IsActive = :isActive", { isActive: true })
      .orderBy("entities.id", "ASC")
      .getMany();

    const roleHasPermissionData = roleHasPermission?.map(
      (roleHasPermission) => ({
        id: roleHasPermission.Id,
        permissionId: roleHasPermission.Permissions.Id,
        permissionAction: roleHasPermission.Permissions.Action,
        entityid: roleHasPermission.Permissions.EntityList.Id,
        entityname: roleHasPermission.Permissions.EntityList.Name,
      })
    );

    const entityActionsMap: { [entityName: string]: string[] } = {};

    roleHasPermissionData.forEach((permission) => {
      const { entityname, permissionAction } = permission;

      if (entityActionsMap[entityname]) {
        entityActionsMap[entityname].push(permissionAction);
      } else {
        entityActionsMap[entityname] = [permissionAction];
      }
    });

    const permissionsArray = Object.keys(entityActionsMap).map(
      (entityname) => ({
        [entityname]: entityActionsMap[entityname],
      })
    );

    return permissionsArray;
  } catch (error) {
    return [];
  }
}

async function ChangePassword(
  model: ChangePasswordModel
): Promise<ServiceResponse<APIResponse>> {
  try {
    if (model?.username && model?.oldPassword && model?.newPassword) {
      const user = await AppDataSource.getRepository(entities.User).findOne({
        where: { Username: model.username },
        relations: ["Role"],
      });
      if (user) {
        const isMatch = await bcrypt.compare(model.oldPassword, user.Password);
        if (isMatch) {
          const hashedPassword = await bcrypt.hash(model.newPassword, 10);
          const repository = AppDataSource.getRepository(entities.User);
          user.Password = hashedPassword;
          user.ModifiedAt = new Date();
          await repository.save(user);
          return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: null,
          };
        } else {
          return {
            status: 401,
            message: ERROR_MESSAGES.INCORRECT_PASSWORD,
            data: null,
          };
        }
      } else {
        return {
          status: 404,
          message: ERROR_MESSAGES.USER_DOES_NOT_EXISTS,
          data: null,
        };
      }
    } else {
      return { status: 400, message: ERROR_MESSAGES.NO_DATA, data: null };
    }
  } catch (error) {
    return { status: 500, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
  }
}

async function CreateJWTToken(
  model: JWTModel
): Promise<ServiceResponse<JWTResponse>> {
  try {
    const accessToken = jwt.sign(
      {
        userId: model?.userId,
        username: model?.username,
        role: model.roleId,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 60000000,
      }
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: {
        username: model.username,
        accessToken,
        roleId: model.roleId,
        roleName: model.roleName,
      },
    };
  } catch (error) {
    return { status: 500, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
  }
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function AppLogin(
  model: LoginModel
): Promise<ServiceResponse<AppLoginResponse>> {
  try {
    if (model?.username && model?.password) {
      const user = await AppDataSource.getRepository(entities.User).findOne({
        where: { Username: model.username, OrganizationUnitTypeId: { Id: 4 } },
        relations: ["Role", "OrganizationUnitId"],
      });

      if (user) {
        const isMatch = await bcrypt.compare(model.password, user.Password);
        if (isMatch) {
          const existingData = await AppDataSource.getRepository(
            entities.ImpsOneAppClients
          )
            .createQueryBuilder("data")
            .where("data.UserId = :userId", { userId: user.Id })
            .getOne();

          console.log('existing data', existingData);
          if (!existingData) {
            const repository = AppDataSource.getRepository(
              entities.ImpsOneAppClients
            );
            const device = new entities.ImpsOneAppClients();
            device.UserId = user;
            device.DeviceId = model.deviceId;
            device.CreatedAt = new Date();
            device.CreatedBy = user;
            await repository.save(device);
          } else if (existingData.DeviceId !== model.deviceId) {
            return {
              status: 401,
              message: "Device ID does not match",
              data: null,
            };
          }

          const userData = {
            userId: user.Id,
            username: user.Username,
            roleId: user.Role.Id,
            roleName: user.Role.Name,
          };

          const jwtReturn = await CreateJWTToken(userData);

          const organization = await AppDataSource.getRepository(
            entities.Organization
          )
            .createQueryBuilder("organization")
            .leftJoinAndSelect("organization.ParentId", "ParentId")
            .leftJoinAndSelect(
              "organization.OrganizationType",
              "OrganizationType"
            )
            .leftJoinAndSelect("organization.VctId", "VctId")
            .leftJoinAndSelect(
              "organization.DefaultCollectionType",
              "DefaultCollectionType"
            )
            .leftJoinAndSelect("organization.PayrollTypes", "PayrollTypes")
            .where("organization.Id = :id", { id: user.OrganizationUnitId.Id })
            .andWhere("organization.IsActive = :isActive", { isActive: true })
            .getOne();

		        const isFarmer  = await AppDataSource.getRepository(entities.Farmer)
            .createQueryBuilder("Farmer")
            .where('Farmer.ParentId = :bmcid', { bmcid: organization === null || organization === void 0 ? void 0 : organization.Id })
            .getCount()


            const isDCS = await AppDataSource.getRepository(entities.Organization)
            .createQueryBuilder("Organization")
            .where('Organization.ParentId = :bmcid', { bmcid: organization === null || organization === void 0 ? void 0 : organization.Id })
            .getCount()

            console.log("org:",organization);
            console.log("isDcs:",isDCS);
            console.log("isFarmer:",isFarmer);

          return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: {
              authorization: {
                accessToken: jwtReturn.data?.accessToken || null,
              },
              ou: {
                id: organization?.Id || null,
                name: organization?.Name || null,
                parentId: organization?.ParentId
                  ? organization?.ParentId?.Id
                  : null,
                organizationType: organization?.OrganizationType
                  ? organization?.OrganizationType.Id
                  : null,
                organizationTypeName: organization?.OrganizationType
                  ? organization?.OrganizationType.ShortName
                  : null,
                businessRegnNo: organization?.BusinessRegnNo || null,
                gstNo: organization?.GstNo || null,
                addressLine1: organization?.AddressLine1 || null,
                addressLine2: organization?.AddressLine2 || null,
                vctId: organization?.VctId ? organization?.VctId.Id : null,
                geocode: organization?.Geocode || null,
                capacity: organization?.Capacity || null,
                morningShiftStartTime:
                  organization?.MorningShiftStartTime || null,
                morningShiftEndTime: organization?.MorningShiftEndTime || null,
                eveningShiftStartTime:
                  organization?.EveningShiftStartTime || null,
                eveningShiftEndTime: organization?.EveningShiftEndTime || null,
                defaultCollectionType: organization?.DefaultCollectionType
                  ? organization?.DefaultCollectionType.Id
                  : null,
                payrollTypes: organization?.PayrollTypes
                  ? organization?.PayrollTypes?.Id
                  : null,
                enforceStrictTiming: organization?.EnforceStrictTiming || null,
                enforceNoDueCollection:
                  organization?.EnforceStrictTiming || null,
                  isDcs: isDCS == 0 ? false : true,
                  isFarmer: isFarmer == 0 ? false : true,
              },
              user: {
                id: user.Id,
                name: user.Name,
                organizationId: user.OrganizationUnitId
                  ? user.OrganizationUnitId.Id
                  : 0,
                address: user.Address,
                contactNumber: user.MobileNo,
                emailAddress: user.EmailId,
                username: user.Username,
              },
            },
          };
        } else {
          return {
            status: 401,
            message: ERROR_MESSAGES.INCORRECT_PASSWORD,
            data: null,
          };
        }
      } else {
        return {
          status: 404,
          message: ERROR_MESSAGES.USER_DOES_NOT_EXISTS,
          data: null,
        };
      }
    } else {
      return { status: 400, message: ERROR_MESSAGES.NO_DATA, data: null };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
  }
}
async function ChangeAppLoginPassword(
  model: ChangePasswordModel
): Promise<ServiceResponse<APIResponse>> {
  try {
    if (model?.username && model?.oldPassword && model?.newPassword) {
      const user = await AppDataSource.getRepository(entities.User).findOne({
        where: { Username: model.username, Role: { Id: 1 } },
        relations: ["Role"],
      });
      if (user) {
        const isMatch = await bcrypt.compare(model.oldPassword, user.Password);
        if (isMatch) {
          const hashedPassword = await bcrypt.hash(model.newPassword, 10);
          const repository = AppDataSource.getRepository(entities.User);
          user.Password = hashedPassword;
          user.ModifiedAt = new Date();
          await repository.save(user);
          return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: null,
          };
        } else {
          return {
            status: 401,
            message: ERROR_MESSAGES.INCORRECT_PASSWORD,
            data: null,
          };
        }
      } else {
        return {
          status: 404,
          message: ERROR_MESSAGES.USER_DOES_NOT_EXISTS,
          data: null,
        };
      }
    } else {
      return { status: 400, message: ERROR_MESSAGES.NO_DATA, data: null };
    }
  } catch (error) {
    return { status: 500, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
  }
}

export { Login, ChangePassword, AppLogin, ChangeAppLoginPassword };
