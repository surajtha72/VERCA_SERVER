import { Roles } from "../entities/Roles";
import { States } from "../entities/States";
import { Districts } from "../entities/Districts";
import { Vct } from "../entities/Vct";
import { OrganizationUnitType } from "../entities/OrganizationUnitType";
import { Organization } from "../entities/Organization";

class AllUsersModel{
    public id: number;
    public organizationUnitTypeId: number;    
    public organizationUnitTypeName: string;    
    public organizationUnitId: number;    
    public organizationUnitName: string;    
    public name: string;
    public address: string;
    public mobileNo: string;
    public emailId: string;
    public roleId: number;
    public stateId: number;
    public stateName: string;
    public districtId: number;
    public districtName: string;
    public vctId: number;
    public vctName: string;
    public roleName: string;
    public aadhaarNo: string;
    public panNo: string;
    public bankAccNo: string;
    public bankAccName: string;
    public bankBranchId: string;
    public isActive: boolean;

    constructor(data: any){
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
        this.isActive = data.isActive
    }
}

class CreateUserModel{
    public organizationUnitTypeId: OrganizationUnitType;   
    public organizationUnitId: Organization;   
    public name: string;
    public headload: number;
    public commission: number;
    public address: string;
    public mobileNo: string;
    public emailId: string;
    public roleId: Roles;
    public stateId: States;
    public districtId: Districts;
    public vctId: Vct;
    public aadhaarNo: string;
    public panNo: string;
    public bankAccNo: string;
    public bankAccName: string;
    public bankBranchId: string;
    public username: string;
    public password: string;
    public isActive: boolean;

    constructor(data: any){
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

class UpdateUserModel{
    public id: number;
    public organizationUnitTypeId: OrganizationUnitType;    
    public organizationUnitId: Organization;    
    public name: string;
    public headload: number;
    public commission: number;
    public address: string;
    public mobileNo: string;
    public emailId: string;
    public roleId: Roles;
    public stateId: States;
    public districtId: Districts;
    public vctId: Vct;
    public aadhaarNo: string;
    public panNo: string;
    public bankAccNo: string;
    public bankAccName: string;
    public bankBranchId: string;
    public username: string;
    public password: string;
    public isActive: boolean;

    constructor(data: any){
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

class DeleteUserModel {
    constructor(data: any) {
      this.id = data.id;
    }
    public id: number;
}

export{
    AllUsersModel,
    CreateUserModel,
    UpdateUserModel,
    DeleteUserModel
}