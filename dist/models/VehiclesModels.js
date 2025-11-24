"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteVehicleModel = exports.UpdateVehicleModel = exports.CreateVehicleModel = exports.AllVehiclesModel = void 0;
class AllVehiclesModel {
    constructor(data) {
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
}
exports.AllVehiclesModel = AllVehiclesModel;
class CreateVehicleModel {
    constructor(data) {
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
}
exports.CreateVehicleModel = CreateVehicleModel;
class UpdateVehicleModel {
    constructor(data) {
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
}
exports.UpdateVehicleModel = UpdateVehicleModel;
class DeleteVehicleModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteVehicleModel = DeleteVehicleModel;
