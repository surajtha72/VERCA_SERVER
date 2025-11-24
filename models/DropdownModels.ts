class PayrollModel {
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.shortName = data.shortName;
  }
  public id: number;
  public name: string;
  public shortName: string;
}

class procurementCenterTypeModel {
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.shortName = data.shortName;
  }
  public id: number;
  public name: string;
  public shortName: string;
}

class DefaultCollectionModel {
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.shortName = data.shortName;
  }
  public id: number;
  public name: string;
  public shortName: string;
}

class OrganizationUnitTypesModel {
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.shortName = data.shortName;
    this.isProcurementCenter = data.isProcurementCenter;
  }
  public id: number;
  public name: string;
  public shortName: string;
  public isProcurementCenter: boolean;
}

class ShiftsModel {
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.index = data.index;
  }
  public id: number;
  public name: string;
  public index: number;
}

export { PayrollModel, procurementCenterTypeModel, DefaultCollectionModel,OrganizationUnitTypesModel, ShiftsModel };
