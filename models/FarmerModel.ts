import { Districts } from "../entities/Districts";
import { Organization } from "../entities/Organization";
import { States } from "../entities/States";
import { Vct } from "../entities/Vct";

class AllFarmersModel {
    constructor(data: any) {
        this.id = data.id;
        // this.parentId = data.parentId.Id ?? null;
         if (data.parentId && typeof data.parentId === "object") {
    // in case frontend ever sends { Id: 5, Name: '...' }
    this.parentId = data.parentId.Id ?? null;
  } else {
    // usual case: frontend sends parentId: 5 or null
    this.parentId = data.parentId ?? null;
  }
        this.name = data.name;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.stateId = data.stateId;
        this.districtId = data.districtId;
        this.vctId = data.vctId;
        this.accountNumber = data.accountNumber;
        this.phoneNumber = data.phoneNumber
        this.ifscCode = data.ifscCode;
        this.adhharNumber = data.adhharNumber;
        this.isCurrentrate = data.isCurrentrate;
    }
    public id: number;
  public parentId: number | null;
    public name: string;
    public addressLine1: string;
    public addressLine2: string;
    public stateId: number;
    public districtId: number;
    public vctId: number;
    public accountNumber: string;
    public phoneNumber: string;
    public ifscCode: string;
    public adhharNumber: string;
    public isCurrentrate: boolean;
}

class CreateFarmersModel {
    constructor(data: any) {
        // this.parentId = data.parentId.Id ?? null;
        
    // parentId can be object or number
    if (data.parentId && typeof data.parentId === "object") {
      this.parentId = data.parentId.Id ?? null;
    } else {
      this.parentId = data.parentId ?? null;
    }
        this.name = data.name;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.stateId = data.stateId;
        this.districtId = data.districtId;
        this.vctId = data.vctId;
        this.accountNumber = data.accountNumber;
        this.phoneNumber = data.phoneNumber
        this.ifscCode = data.ifscCode;
        this.adhharNumber = data.adhharNumber;
        this.isCurrentrate = data.isCurrentrate;
    }
  public parentId: number | null;
    public name: string;
    public addressLine1: string;
    public addressLine2: string;
    public stateId: States;
    public districtId: Districts;
    public vctId: Vct;
    public accountNumber: string;
    public phoneNumber: string;
    public ifscCode: string;
    public adhharNumber: string;
    public isCurrentrate: boolean;
}

class UpdateFarmersModel {
    constructor(data: any) {
        this.id = data.id;
        // this.parentId = data.parentId.Id ?? null;
        
    // parentId can be object or number
    if (data.parentId && typeof data.parentId === "object") {
      this.parentId = data.parentId.Id ?? null;
    } else {
      this.parentId = data.parentId ?? null;
    }
        this.name = data.name;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.stateId = data.stateId;
        this.districtId = data.districtId;
        this.vctId = data.vctId;
        this.accountNumber = data.accountNumber;
        this.phoneNumber = data.phoneNumber
        this.ifscCode = data.ifscCode;
        this.adhharNumber = data.adhharNumber;
        this.isCurrentrate = data.isCurrentrate;
    }
    public id: number;
    public parentId: number | null;
    public name: string;
    public addressLine1: string;
    public addressLine2: string;
    public stateId: States;
    public districtId: Districts;
    public vctId: Vct;
    public accountNumber: string;
    public phoneNumber: string;
    public ifscCode: string;
    public adhharNumber: string;
    public isCurrentrate: boolean;
}

class DeleteFarmersModel {
    constructor(data: any) {
      this.id = data.id;
    }
    public id: number;
  }

export {
    AllFarmersModel,
    CreateFarmersModel,
    UpdateFarmersModel,
    DeleteFarmersModel
};
