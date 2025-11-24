import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllRolesModel,
  CreateRoleModel,
  DeleteRoleModel,
  EntityAndRolesModel,
  PermissionModel,
  UpdateRoleModel,
} from "../models/RolesModel";
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

async function GetAllRoles(
  model?: any
): Promise<ServiceResponse<AllRolesModel[]>> {
  try {
    let role;
    if (model.id) {
      role = await AppDataSource.getRepository(entities.Roles)
        .createQueryBuilder("role")
        .where("role.Id = :id", { id: model.id })
        .andWhere("role.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      role = await AppDataSource.getRepository(entities.Roles)
        .createQueryBuilder("role")
        .where("role.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const roleData: AllRolesModel[] = role.map((role) => ({
      id: role.Id,
      name: role.Name,
      description: role.Description,
    }));
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: roleData,
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

async function GetEntityAndPermissions(
  model?: any
): Promise<ServiceResponse<EntityAndRolesModel[]>> {
  try {
    const entity = await AppDataSource.getRepository(entities.EntityList)
      .createQueryBuilder("entity")
      .where("entity.IsActive = :isActive", { isActive: true })
      .getMany();

    const permissions = await AppDataSource.getRepository(entities.Permissions)
      .createQueryBuilder("permissions")
      .leftJoinAndSelect("permissions.EntityList", "entity")
      .where("permissions.IsActive = :isActive", { isActive: true })
      .getMany();

    const roleHasPermissions = await AppDataSource.getRepository(
      entities.RoleHasPermissions
    )
      .createQueryBuilder("roleHasPermissions")
      .leftJoinAndSelect("roleHasPermissions.Roles", "role")
      .leftJoinAndSelect("roleHasPermissions.Permissions", "permission")
      .where("roleHasPermissions.IsActive = :isActive", { isActive: true })
      .andWhere("role.IsActive = :isActive", { isActive: true })
      .getMany();

    const entityPermissions: EntityAndRolesModel[] = entity.map((entity) => {
      const entityPermissions: PermissionModel[] = permissions
        .filter((permission) => permission.EntityList?.Id === entity.Id)
        .map((permission) => {
          let valid = false;
          if (model?.id) {
            const matchingPermission = roleHasPermissions.find(
              (rolePermission) =>
                rolePermission.Roles?.Id === +model.id &&
                rolePermission.Permissions?.Id === permission.Id
            );
            valid = !!matchingPermission;
          }

          return {
            id: permission.Id,
            name: permission.ShortName,
            action: permission.Action,
            description: permission.Description,
            valid: valid,
          };
        });

      return {
        id: entity.Id,
        name: entity.Name,
        permissions: entityPermissions,
      };
    });

    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: entityPermissions,
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

async function CreateRole(
  req: Request,
  model: CreateRoleModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Roles);
    const role = new entities.Roles();
    role.Name = model.name ? model.name : role.Name;
    role.Description = model.description ? model.description : role.Description;
    role.CreatedAt = new Date();
    role.CreatedBy = userId;
    const savedRole = await repository.save(role);

    const rolePermissionPromises = model.permissionIds.map(
      async (permissionId) => {
        const rolePermission = new entities.RoleHasPermissions();
        rolePermission.Roles = savedRole;
        rolePermission.Permissions = permissionId;
        rolePermission.CreatedAt = new Date();
        rolePermission.CreatedBy = userId;
        return AppDataSource.getRepository(entities.RoleHasPermissions).save(
          rolePermission
        );
      }
    );

    await Promise.all(rolePermissionPromises);

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

async function UpdateRole(req: Request, model: UpdateRoleModel) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Roles);
    const role = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    // console.log(role);
    if (role) {
      role.Id = model.id ? model.id : role.Id;
      role.Name = model.name ? model.name : role.Name;
      role.Description = model.description
        ? model.description
        : role.Description;
      role.ModifiedAt = new Date();
      role.ModifiedBy = userId;
      const savedRole = await repository.save(role);

      const permissionIds = model.permissionIds;
      const getRolesHasPermission = await AppDataSource.getRepository(
        entities.RoleHasPermissions
      )
        .createQueryBuilder("rolesHasPermission")
        .innerJoinAndSelect("rolesHasPermission.Permissions", "permission")
        .innerJoinAndSelect("rolesHasPermission.Roles", "role")
        .where("rolesHasPermission.IsActive =:cond", { cond: true })
        .andWhere("role.Id =:id", { id: model.id })
        .getMany();
      const permissionIdDB = getRolesHasPermission.map((roles) => {
        return roles.Permissions.Id;
      });
      // console.log(permissionIdDB);
      const commonPermissions: number[] = [];
      for (let i = 0; i < permissionIds.length; i++) {
        if (permissionIdDB.includes(permissionIds[i])) {
          commonPermissions.push(permissionIds[i]);
        } else {
          const permission = await AppDataSource.getRepository(
            entities.Permissions
          ).findOne({
            where: { Id: permissionIds[i], IsActive: true },
          });
          // console.log(permission);
          if (permission) {
            const rolePermission = new entities.RoleHasPermissions();
            rolePermission.Roles = savedRole;
            rolePermission.Permissions = permission;
            rolePermission.ModifiedAt = new Date();
            rolePermission.ModifiedBy = userId;
            rolePermission.IsActive = true;
            await AppDataSource.getRepository(entities.RoleHasPermissions).save(
              rolePermission
            );
          }
        }
      }
      // console.log(commonPermissions);
      const filteredPermissions: number[] = permissionIdDB.filter(
        (element) => !commonPermissions.includes(element)
      );
      // console.log(filteredPermissions);
      if (filteredPermissions.length !== 0) {
        const roleHasPermissions = await AppDataSource.getRepository(
          entities.RoleHasPermissions
        )
          .createQueryBuilder("roleHasPermission")
          .innerJoin("roleHasPermission.Roles", "roles")
          .innerJoin("roleHasPermission.Permissions", "permission")
          .where("roles.Id=:id", { id: model.id })
          .andWhere("permission.Id IN(:...pid)", { pid: filteredPermissions })
          .andWhere("roleHasPermission.IsActive=:cond", { cond: true })
          .getMany();

        const roleHasPermissionsIds = roleHasPermissions.map((element) => {
          return element.Id;
        });
        for (let i = 0; i < roleHasPermissionsIds.length; i++) {
          const repositoryRole = AppDataSource.getRepository(
            entities.RoleHasPermissions
          );
          const role = await repositoryRole.findOne({
            where: { Id: roleHasPermissionsIds[i] },
          });
          if (role) {
            role.IsActive = false;
            await repositoryRole.save(role);
          }
        }
      }

      return {
        status: 200,
        message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
        data: null,
      };
    } else {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }
  } catch (error: any) {
    console.log(error);
    return {
      status: 400,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

async function DeleteRole(
  req: Request,
  model: DeleteRoleModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Roles);
    const role = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (role) {
      role.IsActive = false;
      role.DeletedAt = new Date();
      role.DeletedBy = userId;
      await repository.save(role);

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
  GetAllRoles,
  CreateRole,
  UpdateRole,
  DeleteRole,
  GetEntityAndPermissions,
};