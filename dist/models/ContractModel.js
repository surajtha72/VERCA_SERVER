"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteContractModel = exports.UpdateContractModel = exports.CreateContractModel = exports.AllContractModel = void 0;
class AllContractModel {
    constructor(data) {
        this.id = data.Id;
        this.transporterId = data === null || data === void 0 ? void 0 : data.transporterId;
        this.routeId = data === null || data === void 0 ? void 0 : data.routeId;
        this.vehicleId = data === null || data === void 0 ? void 0 : data.vehicleId;
        this.startDate = data === null || data === void 0 ? void 0 : data.startDate;
        this.endDate = data === null || data === void 0 ? void 0 : data.endDate;
        this.payTerms = data === null || data === void 0 ? void 0 : data.payTerms;
        this.payAmount = data === null || data === void 0 ? void 0 : data.payAmount;
        this.addlChargeType = data === null || data === void 0 ? void 0 : data.addlChargeType;
        this.addlChargeAmount = data === null || data === void 0 ? void 0 : data.addlChargeAmount;
        this.status = data === null || data === void 0 ? void 0 : data.status;
        this.isActive = data === null || data === void 0 ? void 0 : data.isActive;
    }
}
exports.AllContractModel = AllContractModel;
class CreateContractModel {
    constructor(data) {
        this.transporterId = data.transporterId;
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
}
exports.CreateContractModel = CreateContractModel;
class UpdateContractModel {
    constructor(data) {
        this.id = data.id;
        this.transporterId = data.transporterId;
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
}
exports.UpdateContractModel = UpdateContractModel;
class DeleteContractModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteContractModel = DeleteContractModel;
