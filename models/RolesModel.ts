import { Permissions } from "../entities/Permissions";

class AllRolesModel {
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
  }
  public id: number;
  public name: string;
  public description: string;
}

class CreateRoleModel {
  constructor(data: any) {
    this.name = data.name;
    this.description = data.description;
    this.permissionIds = data.permissionIds;
  }
  public name: string;
  public description: string;
  public permissionIds: Permissions[];
}

class UpdateRoleModel {
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.permissionIds = data.permissionIds;
  }
  public id: number;
  public name: string;
  public description: string;
  public permissionIds: number[];
}

class DeleteRoleModel {
  constructor(data: any) {
    this.id = data.id;
  }
  public id: number;
}

interface EntityAndRolesModel {
  id: number;
  name: string;
  permissions: PermissionModel[];
}

interface PermissionModel {
  id: number;
  name: string;
  action: string;
  description: string;
  valid: boolean;
}

export {
  AllRolesModel,
  CreateRoleModel,
  UpdateRoleModel,
  DeleteRoleModel,
  EntityAndRolesModel,
  PermissionModel,
};
