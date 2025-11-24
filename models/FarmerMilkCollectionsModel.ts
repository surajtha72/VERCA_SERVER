import { BillingCycleMaster } from "../entities/BillingCycleMaster";

class AllFarmerMilkCollectionsModel {
    constructor(data: any) {
        this.id = data.id;
        this.shift = data.shift;
        this.status = data.status;
        this.collectionDateTime = data.collectionDateTime;
        this.startedAt = data.startedAt;
        this.completedAt = data.completedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.createdBy = data.createdBy ?? null;
        this.updatedBy = data.updatedBy ?? null;
        this.deletedBy = data.deletedBy ?? null;
        this.milkDispatchId = data.milkDispatchId ?? null;
        this.dispatchedQuantity = data.dispatchedQuantity ?? null;
        this.remainingQuantity = data.remainingQuantity ?? null;
    }
    public id: string;
    public shift: string;
    public status: string;
    public collectionDateTime: Date;
    public startedAt: Date;
    public completedAt: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
    public createdBy: number;
    public updatedBy: number;
    public deletedBy: number;
    public milkDispatchId: string;
    public dispatchedQuantity: number;
    public remainingQuantity: number;
}

class FarmerMilkCollectionModelPortal {
    constructor(data: any) {
        this.id = data.id;
        this.shift = data.shift;
        this.status = data.status;
        this.collectionDateTime = data.collectionDateTime;
        this.startedAt = data.startedAt;
        this.completedAt = data.completedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.createdBy = data.createdBy ?? null;
        this.updatedBy = data.updatedBy ?? null;
        this.deletedBy = data.deletedBy ?? null;
        this.milkDispatchId = data.milkDispatchId ?? null;
        this.dispatchedQuantity = data.dispatchedQuantity ?? null;
        this.remainingQuantity = data.remainingQuantity ?? null;
        this.gtFat = data.gtFat ?? null;
        this.gtSnf = data.gtSnf ?? null;
        this.calculatedFat = data.calculatedFat ?? null;
        this.calculatedSnf = data ?? null
        this.totalKgFat = data.totalKgFat ?? null;
        this.totalKgSnf = data.totalKgSnf ?? null;
    }
    public id: string;
    public shift: string;
    public status: string;
    public collectionDateTime: Date;
    public startedAt: Date;
    public completedAt: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
    public createdBy: number;
    public updatedBy: number;
    public deletedBy: number;
    public milkDispatchId: string;
    public dispatchedQuantity: number;
    public remainingQuantity: number;
    public gtFat: number;
    public gtSnf: number;
    public calculatedFat: number;
    public calculatedSnf: number;
    public totalKgFat: number;
    public totalKgSnf: number;
}

class CreateFarmerMilkCollectionModel {
    constructor(data: any) {
        this.id = data.id;
        this.shift = data.shift;
        this.status = data.status;
        this.collectionDateTime = data.collectionDateTime;
        this.startedAt = data.startedAt;
        this.completedAt = data.completedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.createdBy = data.createdBy;
        this.updatedBy = data.updatedBy;
        this.deletedBy = data.deletedBy;
        this.milkDispatchId = data.milkDispatchId ?? null;
        this.billingCycle = data.billingCycle;
    }
    public id: string;
    public shift: string;
    public status: string;
    public collectionDateTime: Date;
    public startedAt: Date;
    public completedAt: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
    public createdBy: number;
    public updatedBy: number;
    public deletedBy: number;
    public milkDispatchId: string;
    public billingCycle: BillingCycleMaster;
}

class UpdateFarmerMilkCollectionModel {
    constructor(data: any) {
        this.id = data.id;
        this.shift = data.shift;
        this.status = data.status;
        this.collectionDateTime = data.collectionDateTime;
        this.startedAt = data.startedAt;
        this.completedAt = data.completedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.createdBy = data.createdBy;
        this.updatedBy = data.updatedBy;
        this.deletedBy = data.deletedBy;
        this.milkDispatchId = data.milkDispatchId ?? null;
        this.dispatchedQuantity = data.dispatchedQuantity ?? null;
        this.remainingQuantity = data.remainingQuantity ?? null;
        this.fat = data.fat;
        this.clr =  data.clr;
        this.snf = data.snf;
    }
    public id: string;
    public shift: string;
    public status: string;
    public collectionDateTime: Date;
    public startedAt: Date;
    public completedAt: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
    public createdBy: number;
    public updatedBy: number;
    public deletedBy: number;
    public milkDispatchId: string;
    public dispatchedQuantity: number;
    public remainingQuantity: number;
    public fat: number;
    public clr: number;
    public snf: number;
}

class DeleteFarmerMilkCollectionModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: string;
}

export { AllFarmerMilkCollectionsModel, CreateFarmerMilkCollectionModel, UpdateFarmerMilkCollectionModel, DeleteFarmerMilkCollectionModel, FarmerMilkCollectionModelPortal}