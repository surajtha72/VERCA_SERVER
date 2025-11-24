import { BillingCycleMaster } from "../entities/BillingCycleMaster";

class AllIncentiveMasterModel {
    constructor(data: any) {
        this.id = data.id;
        this.incentiveName = data.incentiveName;
        this.incentiveType = data.incentiveType;
        this.effectiveFrom = data.effectiveFrom;
        this.billingCycleRef = data.billingCycleRef;
        this.minFatLimit = data.minFatLimit;
        this.minSnfLimit = data.minSnfLimit;
        this.shiftsApplicable = data.shiftsApplicable;
        this.isActive = data.isActive;
    }
    public id: number;
    public incentiveName: string;
    public incentiveType: number;
    public effectiveFrom: Date;
    public billingCycleRef: BillingCycleMaster;
    public minFatLimit: number;
    public minSnfLimit: number;
    public shiftsApplicable: number;
    public isActive: boolean;
}

class CreateIncentiveMasterModel {
    constructor(data: any) {
        this.incentiveName = data.incentiveName;
        this.incentiveType = data.incentiveType;
        this.effectiveFrom = data.effectiveFrom;
        this.billingCycleRef = data.billingCycleRef;
        this.minFatLimit = data.minFatLimit;
        this.minSnfLimit = data.minSnfLimit;
        this.shiftsApplicable = data.shiftsApplicable;
        this.isActive = data.isActive;
    }
    public incentiveName: string;
    public incentiveType: number;
    public effectiveFrom: Date;
    public billingCycleRef: BillingCycleMaster;
    public minFatLimit: number;
    public minSnfLimit: number;
    public shiftsApplicable: number;
    public isActive: boolean;
}

class UpdateIncentiveMasterModel {
    constructor(data: any) {
        this.id = data.id;
        this.incentiveName = data.incentiveName;
        this.incentiveType = data.incentiveType;
        this.effectiveFrom = data.effectiveFrom;
        this.billingCycleRef = data.billingCycleRef;
        this.minFatLimit = data.minFatLimit;
        this.minSnfLimit = data.minSnfLimit;
        this.shiftsApplicable = data.shiftsApplicable;
        this.isActive = data.isActive;
    }
    public id: number;
    public incentiveName: string;
    public incentiveType: number;
    public effectiveFrom: Date;
    public billingCycleRef: BillingCycleMaster;
    public minFatLimit: number;
    public minSnfLimit: number;
    public shiftsApplicable: number;
    public isActive: boolean;
}

class DeleteIncentiveMasterModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export { AllIncentiveMasterModel, UpdateIncentiveMasterModel, CreateIncentiveMasterModel, DeleteIncentiveMasterModel };
