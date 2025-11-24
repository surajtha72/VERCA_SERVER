"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserModel = exports.UpdateUserModel = exports.CreateUserModel = exports.AllUsersModel = void 0;
class AllUsersModel {
    constructor(data) {
        this.id = data.id;
        this.organizationUnitTypeId = data.organizationUnitTypeId;
        this.organizationUnitId = data.organizationUnitId;
        this.name = data.name;
        this.address = data.address;
        this.mobileNo = data.mobileNo;
        this.emailId = data.emailId;
        this.roleName = data.role;
        this.roleId = data.roleId;
        this.stateId = data.stateId;
        this.stateName = data.stateName;
        this.districtId = data.districtId;
        this.districtName = data.districtName;
        this.vctId = data.vctId;
        this.vctName = data.vctName;
        this.aadhaarNo = data.aadhaarNo;
        this.panNo = data.panNo;
        this.bankAccNo = data.bankAccNo;
        this.bankAccName = data.bankAccName;
        this.bankBranchId = data.bankBranchId;
        this.isActive = data.isActive;
    }
}
exports.AllUsersModel = AllUsersModel;
class CreateUserModel {
    constructor(data) {
        this.organizationUnitTypeId = data.organizationUnitTypeId;
        this.organizationUnitId = data.organizationUnitId;
        this.name = data.name;
        this.headload = data.headload;
        this.commission = data.commission;
        this.address = data.address;
        this.mobileNo = data.mobileNo;
        this.emailId = data.emailId;
        this.roleId = data.roleId;
        this.stateId = data.stateId;
        this.districtId = data.districtId;
        this.vctId = data.vctId;
        this.aadhaarNo = data.aadhaarNo;
        this.panNo = data.panNo;
        this.bankAccNo = data.bankAccNo;
        this.bankAccName = data.bankAccName;
        this.bankBranchId = data.bankBranchId;
        this.username = data.username;
        this.password = data.password;
        this.isActive = data.isActive;
    }
}
exports.CreateUserModel = CreateUserModel;
class UpdateUserModel {
    constructor(data) {
        this.id = data.id;
        this.organizationUnitTypeId = data.organizationUnitTypeId;
        this.organizationUnitId = data.organizationUnitId;
        this.name = data.name;
        this.headload = data.headload;
        this.commission = data.commission;
        this.address = data.address;
        this.mobileNo = data.mobileNo;
        this.emailId = data.emailId;
        this.roleId = data.roleId;
        this.stateId = data.stateId;
        this.districtId = data.districtId;
        this.vctId = data.vctId;
        this.aadhaarNo = data.aadhaarNo;
        this.panNo = data.panNo;
        this.bankAccNo = data.bankAccNo;
        this.bankAccName = data.bankAccName;
        this.bankBranchId = data.bankBranchId;
        this.username = data.userName;
        this.password = data.password;
        this.isActive = data.isActive;
    }
}
exports.UpdateUserModel = UpdateUserModel;
class DeleteUserModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteUserModel = DeleteUserModel;
