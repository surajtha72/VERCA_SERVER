class AllIncentiveSlabsModel {
    constructor(data: any) {
        this.id = data.id;
        this.incentiveId = data.incentiveId;
        this.slabType = data.slabType;
        this.slabFrom = data.slabFrom;
        this.slabTo = data.slabTo;
        this.incentivePerKg = data.incentivePerKg;
        this.isActive = data.isActive;
    }
    public id: number;
    public incentiveId: number;
    public slabType: number;
    public slabFrom: number;
    public slabTo: number;
    public incentivePerKg: string;
    public isActive: boolean;
}

class CreateIncentiveSlabsModel {
    constructor(data: any) {
        this.incentiveId = data.incentiveId;
        this.slabType = data.slabType;
        this.slabFrom = data.slabFrom;
        this.slabTo = data.slabTo;
        this.incentivePerKg = data.incentivePerKg;
        this.isActive = data.isActive;
    }
    public incentiveId: number;
    public slabType: number;
    public slabFrom: number;
    public slabTo: number;
    public incentivePerKg: string;
    public isActive: boolean;
}

class UpdateIncentiveSlabsModel {
    constructor(data: any) {
        this.id = data.id;
        this.incentiveId = data.incentiveId;
        this.slabType = data.slabType;
        this.slabFrom = data.slabFrom;
        this.slabTo = data.slabTo;
        this.incentivePerKg = data.incentivePerKg;
        this.isActive = data.isActive;
    }
    public id: number;
    public incentiveId: number;
    public slabType: number;
    public slabFrom: number;
    public slabTo: number;
    public incentivePerKg: string;
    public isActive: boolean;
}

class DeleteIncentiveSlabsModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export { AllIncentiveSlabsModel, CreateIncentiveSlabsModel, UpdateIncentiveSlabsModel, DeleteIncentiveSlabsModel };
