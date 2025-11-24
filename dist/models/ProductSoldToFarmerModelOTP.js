"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductsSoldToFarmerOTPModel = exports.CreateProductsSoldToFarmerOTPModel = exports.GetProductsSoldToFarmerOTPModel = void 0;
class GetProductsSoldToFarmerOTPModel {
    constructor(data) {
        this.soldToFarmerId = data.soldToFarmerId;
        this.otp = data.otp;
    }
}
exports.GetProductsSoldToFarmerOTPModel = GetProductsSoldToFarmerOTPModel;
class CreateProductsSoldToFarmerOTPModel {
    constructor(data) {
        this.soldToFarmerId = data.soldToFarmerId;
        this.otp = data.otp;
        this.amount = data.amount;
    }
}
exports.CreateProductsSoldToFarmerOTPModel = CreateProductsSoldToFarmerOTPModel;
class DeleteProductsSoldToFarmerOTPModel {
    constructor(data) {
        this.soldToFarmerId = data.soldToFarmerId;
    }
}
exports.DeleteProductsSoldToFarmerOTPModel = DeleteProductsSoldToFarmerOTPModel;
