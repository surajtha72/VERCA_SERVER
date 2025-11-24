import { Bank } from "../entities/Bank";
import { States } from "../entities/States";

class AllBrnkBranchModel {
  constructor(data: any) {
    this.id = data.id;
    this.bankId = data.bankId;
    this.branchName = data.branchName;
    this.ifscCode = data.ifscCode;
    this.address = data.address;
    this.isActive = data.isActive;
  }
  public id: number;
  public bankId: Bank;
  public branchName: string;
  public ifscCode: string;
  public address: string;
  public isActive: boolean;
}

class CreateBankBranchModel {
  constructor(data: any) {
    this.bankId = data.bankId;
    this.branchName = data.branchName;
    this.ifscCode = data.ifscCode;
    this.address = data.address;
    this.isActive = data.isActive;
  }
  public bankId: Bank;
  public branchName: string;
  public ifscCode: string;
  public address: string;
  public isActive: boolean;
}

class UpdateBankBranchModel {
  constructor(data: any) {
    this.id = data.id;
    this.bankId = data.bankId;
    this.branchName = data.branchName;
    this.ifscCode = data.ifscCode;
    this.address = data.address;
    this.isActive = data.isActive;
  }
  public id: number;
  public bankId: Bank;
  public branchName: string;
  public ifscCode: string;
  public address: string;
  public isActive: boolean;
}

class DeleteBankBranchModel {
  constructor(data: any) {
    this.id = data.id;
  }
  public id: number;
}

export {
  AllBrnkBranchModel,
  CreateBankBranchModel,
  UpdateBankBranchModel,
  DeleteBankBranchModel,
};
