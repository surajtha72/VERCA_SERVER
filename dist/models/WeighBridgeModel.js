"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteWeighBridgeModel = exports.UpdateWeighBridgeModel = exports.CreateWeighBridgeModel = exports.AllWeighBridgeModel = void 0;
class AllWeighBridgeModel {
    constructor(data) {
        this.id = data.id;
        this.weighbridgeNo = data.weighbridgeNo;
        this.vehicleNo = data.vehicleNo;
        this.contractorName = data.contractorName;
        this.challanNo = data.challanNo;
        this.destination = data.destination;
        this.purpose = data.purpose;
        this.supplierName = data.supplierName;
        this.routeId = data.routeId;
        this.productCategory = data.productCategory;
        this.productName = data.productName;
        this.weightMode = data.weightMode;
        this.tareWeight = data.tareWeight;
        this.tareDate = data.tareDate;
        this.grossWeight = data.grossWeight;
        this.grossDate = data.grossDate;
        this.netWeightKg = data.netWeightKg;
        this.supplyQty = data.supplyQty;
        this.remarks = data.remarks;
        this.isActive = data.isActive;
        this.createdAt = data.createdAt;
        this.modifiedAt = data.modifiedAt;
    }
}
exports.AllWeighBridgeModel = AllWeighBridgeModel;
class CreateWeighBridgeModel {
    constructor(data) {
        this.weighbridgeNo = data.weighbridgeNo;
        this.vehicleNo = data.vehicleNo;
        this.contractorName = data.contractorName;
        this.challanNo = data.challanNo;
        this.destination = data.destination;
        this.purpose = data.purpose;
        this.supplierName = data.supplierName;
        this.routeId = data.routeId;
        this.productCategory = data.productCategory;
        this.productName = data.productName;
        this.weightMode = data.weightMode;
        this.tareWeight = data.tareWeight;
        this.tareDate = data.tareDate;
        this.grossWeight = data.grossWeight;
        this.grossDate = data.grossDate;
        this.netWeightKg = data.netWeightKg;
        this.supplyQty = data.supplyQty;
        this.remarks = data.remarks;
        this.isActive = data.isActive;
    }
}
exports.CreateWeighBridgeModel = CreateWeighBridgeModel;
class UpdateWeighBridgeModel {
    constructor(data) {
        this.id = data.id;
        this.weighbridgeNo = data.weighbridgeNo;
        this.vehicleNo = data.vehicleNo;
        this.contractorName = data.contractorName;
        this.challanNo = data.challanNo;
        this.destination = data.destination;
        this.purpose = data.purpose;
        this.supplierName = data.supplierName;
        this.routeId = data.routeId;
        this.productCategory = data.productCategory;
        this.productName = data.productName;
        this.weightMode = data.weightMode;
        this.tareWeight = data.tareWeight;
        this.tareDate = data.tareDate;
        this.grossWeight = data.grossWeight;
        this.grossDate = data.grossDate;
        this.netWeightKg = data.netWeightKg;
        this.supplyQty = data.supplyQty;
        this.remarks = data.remarks;
        this.isActive = data.isActive;
    }
}
exports.UpdateWeighBridgeModel = UpdateWeighBridgeModel;
class DeleteWeighBridgeModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteWeighBridgeModel = DeleteWeighBridgeModel;
