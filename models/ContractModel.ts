import { Transporters } from "../entities/Transporters";
import { RouteMaster } from "../entities/RouteMaster";
import { TransporterVehicles } from "../entities/TransporterVehicles";

class AllContractModel{
    constructor(data:any){
        this.id= data.Id;
        this.transporterId= data?.transporterId;
        this.routeId = data?.routeId;
        this.vehicleId = data?.vehicleId;
        this.startDate = data?.startDate;
        this.endDate = data?.endDate;
        this.payTerms = data?.payTerms;
        this.payAmount = data?.payAmount;
        this.addlChargeType = data?.addlChargeType;
        this.addlChargeAmount = data?.addlChargeAmount;
        this.status = data?.status;
        this.isActive = data?.isActive;
    }
    public id: number;
    public transporterId: number;
    public routeId: RouteMaster;
    public vehicleId: TransporterVehicles;
    public startDate: Date;
    public endDate: Date;
    public payTerms: string;
    public payAmount: bigint;
    public addlChargeType: string;
    public addlChargeAmount: bigint;
    public status: string;
    public isActive: boolean;
}

class CreateContractModel{
    constructor(data:any){
        this.transporterId= data.transporterId;
        this.routeId = data.routeId;
        this.vehicleId = data.vehicleId;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.payTerms = data.payTerms;
        this.payAmount = data.payAmount;
        this.addlChargeType = data.addlChargeType;
        this.addlChargeAmount = data.addlChargeAmount;
        this.status = data.status;
        this.isActive = data.isActive;
    }
    public transporterId: Transporters;
    public routeId: RouteMaster;
    public vehicleId: TransporterVehicles;
    public startDate: Date;
    public endDate: Date;
    public payTerms: string;
    public payAmount: bigint;
    public addlChargeType: string;
    public addlChargeAmount: bigint;
    public status: string;
    public isActive: boolean;
}

class UpdateContractModel{
    constructor(data:any){
        this.id= data.id;
        this.transporterId= data.transporterId;
        this.routeId = data.routeId;
        this.vehicleId = data.vehicleId;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.payTerms = data.payTerms;
        this.payAmount = data.payAmount;
        this.addlChargeType = data.addlChargeType;
        this.addlChargeAmount = data.addlChargeAmount;
        this.status = data.status;
        this.isActive = data.isActive;
    }
    public id: number;
    public transporterId: Transporters;
    public routeId: RouteMaster;
    public vehicleId: TransporterVehicles;
    public startDate: Date;
    public endDate: Date;
    public payTerms: string;
    public payAmount: bigint;
    public addlChargeType: string;
    public addlChargeAmount: bigint;
    public status: string;
    public isActive: boolean;
}

class DeleteContractModel {
    constructor(data: any) {
      this.id = data.id;
    }
    public id: number;
}

export{
    AllContractModel,
    CreateContractModel,
    UpdateContractModel,
    DeleteContractModel
}
