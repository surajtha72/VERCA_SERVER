import { Bank } from "../entities/Bank";

class AllBankModel {
  constructor(data: any) {
    this.id = data.id;
    this.bankName = data.bankName;
    this.isActive = data.isActive;
  }
  public id: number;
  public bankName: string;
  public isActive: boolean;
}

class CreateBankModel {
  constructor(data: any) {
    this.bankName = data.bankName;
    this.isActive = data.isActive
  }
  public bankName: string;
  public isActive: boolean;
}

class UpdateBankModel {
  constructor(data: any) {
    this.id = data.id;
    this.bankName = data.bankName;
    this.isActive = data.isActive;
  }
  public id: number;
  public bankName: string;
  public isActive: boolean;
}

class DeleteBankModel {
  constructor(data: any) {
    this.id = data.id;
  }
  public id: number;
}

export {
  AllBankModel,
  CreateBankModel,
  UpdateBankModel,
  DeleteBankModel,
};
