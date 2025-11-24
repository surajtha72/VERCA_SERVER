import { Transporters } from "../entities/Transporters";

class AllVehiclesModel {
    constructor(data: any) {
        this.id = data.id;
        this.transporterId = data.transporterId;
        this.isFoodTransferVehicle = data.isFoodTransferVehicle;
        this.vehicleType = data.vehicleType;
        this.registrationNumber = data.registrationNumber;
        this.make = data.make;
        this.model = data.model;
        this.capacity = data.capacity;
        this.FSSAILicNo = data.FSSAILicNo;
        this.FSSAILicExpiryDate = data.FSSAILicExpiryDate;
        this.insurance = data.insurance;
        this.insuranceExpiryDate = data.insuranceExpiryDate;
        this.isActive = data.isActive;
    }
    public id: number;
    public transporterId: Transporters;
    public isFoodTransferVehicle: boolean;
    public vehicleType: string;
    public registrationNumber: string;
    public make: string;
    public model: string;
    public capacity: number;
    public FSSAILicNo: string;
    public FSSAILicExpiryDate: Date;
    public insurance: string;
    public insuranceExpiryDate: Date;
    public isActive: boolean;
}

class CreateVehicleModel {
    constructor(data: any) {
        this.transporterId = data.transporterId;
        this.isFoodTransferVehicle = data.isFoodTransferVehicle;
        this.vehicleType = data.vehicleType;
        this.registrationNumber = data.registrationNumber;
        this.make = data.make;
        this.model = data.model;
        this.capacity = data.capacity;
        this.FSSAILicNo = data.FSSAILicNo;
        this.FSSAILicExpiryDate = data.FSSAILicExpiryDate;
        this.insurance = data.insurance;
        this.insuranceExpiryDate = data.insuranceExpiryDate;
        this.isActive = data.isActive;

    }
    public transporterId: Transporters;
    public isFoodTransferVehicle: boolean;
    public vehicleType: string;
    public registrationNumber: string;
    public make: string;
    public model: string;
    public capacity: bigint;
    public FSSAILicNo: string;
    public FSSAILicExpiryDate: Date;
    public insurance: string;
    public insuranceExpiryDate: Date;
    public isActive: boolean;
}

class UpdateVehicleModel {
    constructor(data: any) {
        this.id = data.id;
        this.transporterId = data.transporterId;
        this.isFoodTransferVehicle = data.isFoodTransferVehicle;
        this.vehicleType = data.vehicleType;
        this.registrationNumber = data.registrationNumber;
        this.make = data.make;
        this.model = data.model;
        this.capacity = data.capacity;
        this.FSSAILicNo = data.FSSAILicNo;
        this.FSSAILicExpiryDate = data.FSSAILicExpiryDate;
        this.insurance = data.insurance;
        this.insuranceExpiryDate = data.insuranceExpiryDate;
        this.isActive = data.isActive;

    }
    public id: number;
    public transporterId: Transporters;
    public isFoodTransferVehicle: boolean;
    public vehicleType: string;
    public registrationNumber: string;
    public make: string;
    public model: string;
    public capacity: bigint;
    public FSSAILicNo: string;
    public FSSAILicExpiryDate: Date;
    public insurance: string;
    public insuranceExpiryDate: Date;
    public isActive: boolean;

}

class DeleteVehicleModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export {
    AllVehiclesModel,
    CreateVehicleModel,
    UpdateVehicleModel,
    DeleteVehicleModel
}