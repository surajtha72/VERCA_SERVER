import { User } from "../entities/User";

class AllFarmerMilkCollectionDetailsModel {
    constructor(data: any) {
      this.id = data.id;
      this.milkCollectionId = data.milkCollectionId ?? null;
      this.milkType = data.milkType;
      this.collectionOperationType = data.collectionOperationType;
      this.testingOperationType = data.testingOperationType;
      this.fat = data.fat;
      this.snf = data.snf;
      this.clr = data.clr;
      this.protein = data.protein;
      this.lactose = data.lactose;
      this.salt = data.salt;
      this.water = data.water;
      this.temperature = data.temperature;
      this.sampleNumber = data.sampleNumber;
      this.weight = data.weight;
      this.canCount = data.canCount;
      this.organizationUnitId = data.organizationUnitId ?? null;
      this.organizationUnitName = data.organizationUnitName ?? null;
      this.transporterVehicleId = data.transporterVehicleId ?? null;
      this.transporterVehicleName = data.transporterVehicleName ?? null;
      this.routeId = data.routeId ?? null;
      this.routeName = data.routeName ?? null;
      this.collectedAt = data.collectedAt;
      this.collectedBy = data.collectedBy;
      this.createdBy = data.createdBy;
      this.modifiedBy = data.updatedBy;
      this.deletedBy = data.deletedBy;
      this.testedAt = data.testedAt;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.deletedAt = data.deletedAt;
    }
    public id: string;
    public milkCollectionId: string;
    public milkType: string;
    public collectionOperationType: string;
    public testingOperationType: string;
    public fat: number;
    public snf: number;
    public clr: number;
    public protein: number;
    public lactose: number;
    public salt: number;
    public water: number;
    public temperature: number;
    public sampleNumber: number;
    public weight: number;
    public canCount: number;
    public organizationUnitId: number;
    public organizationUnitName: string;
    public transporterVehicleId: number;
    public transporterVehicleName: string;
    public routeId: number;
    public collectedBy: number;
    public routeName: string;
    public collectedAt: Date;
    public testedAt: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
    public createdBy: number;
    public modifiedBy: number;
    public deletedBy: number;
  }
  
  class CreateFarmerMilkCollectionDetailsModel {
    constructor(data: any) {
      this.id = data.id;
      this.milkCollectionId = data.milkCollectionId;
      this.milkType = data.milkType;
      this.collectionOperationType = data.collectionOperationType;
      this.testingOperationType = data.testingOperationType;
      this.fat = data.fat;
      this.snf = data.snf;
      this.clr = data.clr;
      this.protein = data.protein;
      this.lactose = data.lactose;
      this.salt = data.salt;
      this.water = data.water;
      this.temperature = data.temperature;
      this.sampleNumber = data.sampleNumber;
      this.weight = data.weight;
      this.canCount = data.canCount;
      this.organizationUnitId = data.organizationUnitId;
      this.transporterVehicleId = data.transporterVehicleId;
      this.routeId = data.routeId;
      this.sampleNumber = data.sampleNumber;
      this.collectedAt = data.collectedAt;
      this.testedAt = data.testedAt;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.deletedAt = data.deletedAt;
      this.collectedBy = data.collectedBy;
      this.createdBy = data.createdBy;
      this.modifiedBy = data.updatedBy;
      this.deletedBy = data.deletedBy;
    }
    public id: string;
    public milkCollectionId: string;
    public milkType: string;
    public collectionOperationType: string;
    public testingOperationType: string;
    public fat: number;
    public snf: number;
    public clr: number;
    public protein: number;
    public lactose: number;
    public salt: number;
    public water: number;
    public temperature: number;
    public sampleNumber: number;
    public weight: number;
    public canCount: number;
    public organizationUnitId: number;
    public transporterVehicleId: number;
    public collectedBy: number;
    public routeId: number;
    public collectedAt: Date;
    public testedAt: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
    public createdBy: number;
    public modifiedBy: number;
    public deletedBy: number;
  }
  
  class UpdateFarmerMilkCollectionDetailsModel {
    constructor(data: any) {
      this.id = data.id;
      this.milkCollectionId = data.milkCollectionId;
      this.milkType = data.milkType;
      this.collectionOperationType = data.collectionOperationType;
      this.testingOperationType = data.testingOperationType;
      this.fat = data.fat;
      this.snf = data.snf;
      this.clr = data.clr;
      this.protein = data.protein;
      this.lactose = data.lactose;
      this.salt = data.salt;
      this.water = data.water;
      this.temperature = data.temperature;
      this.sampleNumber = data.sampleNumber;
      this.weight = data.weight;
      this.canCount = data.canCount;
      this.organizationUnitId = data.organizationUnitId;
      this.transporterVehicleId = data.transporterVehicleId;
      this.routeId = data.routeId;
      this.sampleNumber = data.sampleNumber;
      this.collectedAt = data.collectedAt;
      this.testedAt = data.testedAt;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.deletedAt = data.deletedAt;
      this.collectedBy = data.collectedBy;
      this.createdBy = data.createdBy;
      this.modifiedBy = data.updatedBy;
      this.deletedBy = data.deletedBy;
    }
    public id: string;
    public milkCollectionId: string;
    public milkType: string;
    public collectionOperationType: string;
    public testingOperationType: string;
    public fat: number;
    public snf: number;
    public clr: number;
    public protein: number;
    public lactose: number;
    public salt: number;
    public water: number;
    public temperature: number;
    public sampleNumber: number;
    public weight: number;
    public canCount: number;
    public organizationUnitId: number;
    public transporterVehicleId: number;
    public routeId: number;
    public collectedBy: number;
    public collectedAt: Date;
    public testedAt: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
    public createdBy: number;
    public modifiedBy: number;
    public deletedBy: number;
  }
  
  class DeleteFarmerMilkCollectionDetailsModel {
    constructor(data: any) {
      this.id = data.id;
    }
    public id: string;
  }
  
  export {
    AllFarmerMilkCollectionDetailsModel,
    CreateFarmerMilkCollectionDetailsModel,
    UpdateFarmerMilkCollectionDetailsModel,
    DeleteFarmerMilkCollectionDetailsModel,
  };
  