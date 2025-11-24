import { States } from "../entities/States";

class AllDistrictModel {
  constructor(data: any) {
    this.id = data.id;
    this.stateId = data.stateId;
    this.stateName = data.stateName;
    this.name = data.name;
  }
  public id: number;
  public stateId: number;
  public stateName: string;
  public name: string;
}

class CreateDistrictModel {
  constructor(data: any) {
    this.stateId = data.stateId;
    this.name = data.name;
  }
  public stateId: States;
  public name: string;
}

class UpdateDistrictModel {
  constructor(data: any) {
    this.id = data.id;
    this.stateId = data.stateId;
    this.name = data.name;
  }
  public id: number;
  public stateId: States;
  public name: string;
}

class DeleteDistrictModel {
  constructor(data: any) {
    this.id = data.id;
  }
  public id: number;
}

export {
  AllDistrictModel,
  CreateDistrictModel,
  UpdateDistrictModel,
  DeleteDistrictModel,
};
