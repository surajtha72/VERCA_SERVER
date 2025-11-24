class AllMilkDispatchModel {
    constructor(data: any) {
        this.id = data.id;
        this.transporterVehicleId = data.transporterVehicleId ?? null;
        this.transporterVehicleType = data.transporterVehicleType ?? null;
        this.routeId = data.routeId ?? null;
        this.routeName = data.routeName ?? null;
        this.startFat = data.startFat;
        this.startSnf = data.startSnf;
        this.startClr = data.startClr;
        this.endFat = data.endFat;
        this.endSnf = data.endSnf;
        this.endClr = data.endClr;
        this.weight = data.weight;
        this.dispatchedAt = data.dispatchedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
    public id: string;
    public transporterVehicleId: number;
    public transporterVehicleType: string;
    public routeId: number;
    public routeName: string;
    public startFat: number;
    public startSnf: number;
    public startClr: number;
    public endFat: number;
    public endSnf: number;
    public endClr: number;
    public weight: number;
    public dispatchedAt: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
}

class MilkCollection{
    public milkCollectionId: string;
    public dispatchedQuantity: number;
    public remainingQuantity: number;
    public milkDispatchId : String;

    constructor(data: any){
        this.milkCollectionId = data.milkCollectionId;
        this.dispatchedQuantity = data.dispatchedQuantity;
        this.remainingQuantity = data.remainingQuantity;
        this.milkDispatchId = data.milkDispatchId;
    }
}
class CreateMilkDispatchModel {
    constructor(data: any) {
        this.id = data.id;
        this.transporterVehicleId = data.transporterVehicleId ?? null;
        this.routeId = data.routeId ?? null;
        this.startFat = data.startFat;
        this.startSnf = data.startSnf;
        this.startClr = data.startClr;
        this.endFat = data.endFat;
        this.endSnf = data.endSnf;
        this.endClr = data.endClr;
        this.weight = data.weight;
        this.dispatchedAt = data.dispatchedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.milkCollections = data.milkCollections;
    }
    public id: string;
    public transporterVehicleId: number;
    public routeId: number;
    public startFat: number;
    public startSnf: number;
    public startClr: number;
    public endFat: number;
    public endSnf: number;
    public endClr: number;
    public weight: number;
    public dispatchedAt: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
    public milkCollections: MilkCollection[];
}

class UpdateMilkDispatchModel {
    constructor(data: any) {
        this.id = data.id;
        this.transporterVehicleId = data.transporterVehicleId ?? null;
        this.routeId = data.routeId ?? null;
        this.startFat = data.startFat;
        this.startSnf = data.startSnf;
        this.startClr = data.startClr;
        this.endFat = data.endFat;
        this.endSnf = data.endSnf;
        this.endClr = data.endClr;
        this.weight = data.weight;
        this.dispatchedAt = data.dispatchedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
    public id: string;
    public transporterVehicleId: number;
    public routeId: number;
    public startFat: number;
    public startSnf: number;
    public startClr: number;
    public endFat: number;
    public endSnf: number;
    public endClr: number;
    public weight: number;
    public dispatchedAt: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
}

class DeleteMilkDispatchModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: string;
}


export {AllMilkDispatchModel, CreateMilkDispatchModel, UpdateMilkDispatchModel, DeleteMilkDispatchModel }