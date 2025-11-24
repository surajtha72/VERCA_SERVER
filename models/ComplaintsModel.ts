import { BillingCycleMaster } from "../entities/BillingCycleMaster";
import { Organization } from "../entities/Organization";

class GetComplaintsModel {
    constructor(data: any){
        this.id = data.id;
        this.agentId = data.id;
        this.billingCycleId = data.billingCycleId;
        this.settlementAmount = data.settlementAmount;
        this.complaint = data.complaint;
        this.toBeSettledStartDate = data.toBeSettledStartDate;
        this.toBeSettledEndDate = data.toBeSettledEndDate
    }
    public id: number;
    public agentId: Organization;
    public billingCycleId: BillingCycleMaster;
    public settlementAmount: number;
    public complaint: string;
    public toBeSettledStartDate: Date;
    public toBeSettledEndDate: Date;
}

class CreateComplaintModel {
    constructor(data: any){
        this.agentId = data.agentId;
        this.billingCycleId = data.billingCycleId;
        this.settlementAmount = data.settlementAmount;
        this.complaint = data.complaint;
        this.toBeSettledStartDate = data.toBeSettledStartDate;
        this.toBeSettledEndDate = data.toBeSettledEndDate;
    }
    public agentId: number;
    public billingCycleId: number;
    public settlementAmount: number;
    public complaint: string;
    public toBeSettledStartDate: Date;
    public toBeSettledEndDate: Date;
}

class UpdateComplaintModel {
    constructor(data: any){
        this.id = data.id;
        this.agentId = data.agentId;
        this.billingCycleId = data.billingCycleId;
        this.settlementAmount = data.settlementAmount;
        this.complaint = data.complaint;
        this.toBeSettledStartDate = data.toBeSettledStartDate;
        this.toBeSettledEndDate = data.toBeSettledEndDate
    }
    public id: number;
    public agentId: number;
    public billingCycleId: number;
    public settlementAmount: number;
    public complaint: string;
    public toBeSettledStartDate: Date;
    public toBeSettledEndDate: Date;
}

class DeleteComplaintModel {
    constructor(id: number){
        this.id = id;
    }
    public id: number;
}

export { GetComplaintsModel, CreateComplaintModel, UpdateComplaintModel, DeleteComplaintModel }