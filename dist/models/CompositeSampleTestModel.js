"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCompositeSampleTestModel = exports.UpdateCompositeSampleTestModel = exports.CreateCompositeSampleTestModel = exports.AllCompositeSampleTestModel = void 0;
class AllCompositeSampleTestModel {
    constructor(data) {
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
}
exports.AllCompositeSampleTestModel = AllCompositeSampleTestModel;
class CreateCompositeSampleTestModel {
    constructor(data) {
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
}
exports.CreateCompositeSampleTestModel = CreateCompositeSampleTestModel;
class UpdateCompositeSampleTestModel {
    constructor(data) {
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
}
exports.UpdateCompositeSampleTestModel = UpdateCompositeSampleTestModel;
class DeleteCompositeSampleTestModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteCompositeSampleTestModel = DeleteCompositeSampleTestModel;
