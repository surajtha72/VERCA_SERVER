
import { Permissions } from "../entities/Permissions";
import { Roles } from "../entities/Roles";

class AllRolePermissionsModel {
    constructor(data: any) {
      this.id = data.id;
      this.roleId = data.roleId;
      this.permissionsId = data.permissionsId;
    }
    public id: number;
    public roleId: Roles;
    public permissionsId: Permissions;
  }
  
  export { AllRolePermissionsModel };
  