class AllRouteTypesModel {
  constructor(data: any) {
    this.id = data.id;
    this.shortDescription = data.shortDescription;
    this.fromProcUnitType = data.fromProcUnitType.Id ?? null;
    this.fromProcUnitTypeName = data.fromProcUnitTypeName.Name ?? null;
    this.toProcOrgUnitType = data.toProcOrgUnitType.Id ?? null;
    this.toProcOrgUnitTypeName = data.toProcOrgUnitTypeName.Name ?? null;
    this.vehicleType = data.vehicleType;
  }
  public id: number;
  public shortDescription: string;
  public fromProcUnitType: number;
  public fromProcUnitTypeName: string;
  public toProcOrgUnitType: number;
  public toProcOrgUnitTypeName: string;
  public vehicleType: string;
}

class CreateRouteTypeModel {
  constructor(data: any) {
    this.shortDescription = data.shortDescription;
    this.fromProcUnitType = data.fromProcUnitType;
    this.toProcOrgUnitType = data.toProcOrgUnitType;
    this.vehicleType = data.vehicleType;
  }
  public shortDescription: string;
  public fromProcUnitType: number;
  public toProcOrgUnitType: number;
  public vehicleType: string;
}

class UpdateRouteTypeModel {
  constructor(data: any) {
    this.id = data.id;
    this.shortDescription = data.shortDescription;
    this.fromProcUnitType = data.fromProcUnitType;
    this.toProcOrgUnitType = data.toProcOrgUnitType;
    this.vehicleType = data.vehicleType;
  }
  public id: number;
  public shortDescription: string;
  public fromProcUnitType: number;
  public toProcOrgUnitType: number;
  public vehicleType: string;
}

class DeleteRouteTypeModel {
  constructor(data: any) {
    this.id = data.id;
  }
  public id: number;
}

export { AllRouteTypesModel, CreateRouteTypeModel, UpdateRouteTypeModel, DeleteRouteTypeModel };
