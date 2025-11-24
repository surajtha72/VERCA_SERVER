import { ProductCategory } from "../entities/ProductCategory";
import { TransporterVehicles } from "../entities/TransporterVehicles";
import { RouteMaster } from "../entities/RouteMaster";

class AllWeighBridgeModel {
    constructor(data: any) {
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
    public id: number;
    public weighbridgeNo: string;
    public vehicleNo: TransporterVehicles;
    public contractorName: string;
    public challanNo: string;
    public destination: string;
    public purpose: string;
    public supplierName: string;
    public routeId: RouteMaster;
    public productCategory: ProductCategory;
    public productName: string;
    public weightMode: string;
    public tareWeight: number;
    public tareDate: Date;
    public grossWeight: number;
    public grossDate: Date;
    public netWeightKg: number;
    public supplyQty: number;
    public remarks: string;
    public isActive: boolean;
    public createdAt: Date;
    public modifiedAt: Date;
}

class CreateWeighBridgeModel {
    constructor(data: any) {
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
    public weighbridgeNo: string;
    public vehicleNo: TransporterVehicles;
    public contractorName: string;
    public challanNo: string;
    public destination: string;
    public purpose: string;
    public supplierName: string;
    public routeId: RouteMaster;
    public productCategory: ProductCategory;
    public productName: string;
    public weightMode: string;
    public tareWeight: number;
    public tareDate: Date;
    public grossWeight: number;
    public grossDate: Date;
    public netWeightKg: number;
    public supplyQty: number;
    public remarks: string;
    public temparature: number;
    public fat: number;
    public snf: number;
    public acidity: number;
    public isActive: boolean;
}

class UpdateWeighBridgeModel {
    constructor(data: any) {
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
    public id: number;
    public weighbridgeNo: string;
    public vehicleNo: TransporterVehicles;
    public contractorName: string;
    public challanNo: string;
    public destination: string;
    public purpose: string;
    public supplierName: string;
    public routeId: RouteMaster;
    public productCategory: ProductCategory;
    public productName: string;
    public weightMode: string;
    public tareWeight: number;
    public tareDate: Date;
    public grossWeight: number;
    public grossDate: Date;
    public netWeightKg: number;
    public supplyQty: number;
    public remarks: string;
    public isActive: boolean;
}

class DeleteWeighBridgeModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export { AllWeighBridgeModel, CreateWeighBridgeModel, UpdateWeighBridgeModel, DeleteWeighBridgeModel };