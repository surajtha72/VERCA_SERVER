import { ProductCategory } from "../entities/ProductCategory";
import { TransporterVehicles } from "../entities/TransporterVehicles";
import { RouteMaster } from "../entities/RouteMaster";

class AllCompositeSampleTestModel {
    constructor(data: any) {
        this.id = data.id;
        this.vehicleNo = data.vehicleNo;
        this.productCategory = data.productCategory;
        this.productName = data.productName;
        this.routeId = data.routeId;
        this.testDate = data.testDate;
        this.temperature = data.temparature;
        this.fat = data.fat;
        this.snf = data.snf;
        this.clr = data.clr;
        this.protein = data.protein;
        this.lactose = data.lactose;
        this.salt = data.salt;
        this.water = data.water;
        this.temperature = data.temperature;
        this.analyst = data.analyst;
        // this.sampledBy = data.sampledBy;
        this.status = data.status;
        this.remarks = data.remarks;
        this.isActive = data.isActive;
    }
    public id: number;
    public vehicleNo: TransporterVehicles;
    public productCategory: ProductCategory;
    public productName: string;
    public routeId: RouteMaster;
    public testDate: Date;
    public fat: number;
    public snf: number;
    public clr: number;
    public protein: number;
    public lactose: number;
    public salt: number;
    public water: number;
    public temperature: number;
    public analyst: string;
    // public sampledBy: string;
    public status: string;
    public remarks: string;
    public isActive: boolean;
}

class CreateCompositeSampleTestModel {
    constructor(data: any) {
        this.vehicleNo = data.vehicleNo;
        this.productCategory = data.productCategory;
        this.productName = data.productName;
        this.routeId = data.routeId;
        this.testDate = data.testDate;
        this.fat = data.fat;
        this.snf = data.snf;
        this.clr = data.clr;
        this.protein = data.protein;
        this.lactose = data.lactose;
        this.salt = data.salt;
        this.water = data.water;
        this.temperature = data.temperature;
        this.analyst = data.analyst;
        // this.sampledBy = data.sampledBy;
        this.status = data.status;
        this.remarks = data.remarks;
        this.isActive = data.isActive;
    }
    public vehicleNo: TransporterVehicles;
    public productCategory: ProductCategory;
    public productName: string;
    public routeId: RouteMaster;
    public testDate: Date;
    public fat: number;
    public snf: number;
    public clr: number;
    public protein: number;
    public lactose: number;
    public salt: number;
    public water: number;
    public temperature: number;
    public analyst: string;
    // public sampledBy: string;
    public status: string;
    public remarks: string;
    public isActive: boolean;
}

class UpdateCompositeSampleTestModel {
    constructor(data: any) {
        this.id = data.id;
        this.vehicleNo = data.vehicleNo;
        this.productCategory = data.productCategory;
        this.productName = data.productName;
        this.routeId = data.routeId;
        this.testDate = data.testDate;
        this.fat = data.fat;
        this.snf = data.snf;
        this.clr = data.clr;
        this.protein = data.protein;
        this.lactose = data.lactose;
        this.salt = data.salt;
        this.water = data.water;
        this.temperature = data.temperature;
        this.analyst = data.analyst;
        // this.sampledBy = data.sampledBy;
        this.status = data.status;
        this.remarks = data.remarks;
        this.isActive = data.isActive;
    }
    public id: number;
    public vehicleNo: TransporterVehicles;
    public productCategory: ProductCategory;
    public productName: string;
    public routeId: RouteMaster;
    public testDate: Date;
    public fat: number;
    public snf: number;
    public clr: number;
    public protein: number;
    public lactose: number;
    public salt: number;
    public water: number;
    public temperature: number;
    public analyst: string;
    // public sampledBy: string;
    public status: string;
    public remarks: string;
    public isActive: boolean;
}

class DeleteCompositeSampleTestModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export { AllCompositeSampleTestModel, CreateCompositeSampleTestModel, UpdateCompositeSampleTestModel, DeleteCompositeSampleTestModel };