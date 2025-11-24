"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRoleModel = exports.UpdateRoleModel = exports.CreateRoleModel = exports.AllRolesModel = void 0;
class AllRolesModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
    }
}
exports.AllRolesModel = AllRolesModel;
class CreateRoleModel {
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
        this.permissionIds = data.permissionIds;
    }
}
exports.CreateRoleModel = CreateRoleModel;
class UpdateRoleModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.permissionIds = data.permissionIds;
    }
}
exports.UpdateRoleModel = UpdateRoleModel;
class DeleteRoleModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteRoleModel = DeleteRoleModel;
