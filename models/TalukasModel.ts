import { Districts } from "../entities/Districts";
import { States } from "../entities/States";

class AllTalukasModel {
  constructor(data: any) {
    this.id = data.id;
    this.districtId = data.districtId;
    this.stateId = data.stateId;
    this.districtName = data.districtName;
    this.name = data.name;
    this.pincode = data.pincode;
  }
  public id: number;

  public districtId: number | null;
  public stateId: number | null;

  public districtName: string | null;
  public name: string;
  public pincode: string;
}

class CreateTalukasModel {
  constructor(data: any) {
    this.districtId = data.districtId;
    this.stateId = data.stateId;
    this.name = data.name;
    this.pincode = data.pincode;
  }
  public districtId: Districts;
  public stateId : States;
  public name: string;
  public pincode: string;
}

class UpdateTalukasModel {
  constructor(data: any) {
    this.id = data.id;
    this.districtId = data.districtId;
    this.stateId = data.stateId;
    this.name = data.name;
    this.pincode = data.pincode;
  }
  public id: number;
  public districtId: Districts;
  public stateId : States;
  public name: string;
  public pincode: string;
}

class DeleteTalukasModel {
  constructor(data: any) {
    this.id = data.id;
  }
  public id: number;
}

export { AllTalukasModel, CreateTalukasModel, UpdateTalukasModel, DeleteTalukasModel };
