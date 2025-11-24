import { ProductMaster } from "../entities/ProductMaster";
import { ProductSalesToFarmer } from "../entities/ProductSalesToFarmer";

class GetProductsSoldToFarmerOTPModel {
    public soldToFarmerId: number;
    public otp: number;
    constructor(data: any) {
        this.soldToFarmerId = data.soldToFarmerId;
        this.otp = data.otp;
    }
}

class CreateProductsSoldToFarmerOTPModel {
    public soldToFarmerId: number;
    public otp: number;
    public amount: number;
    constructor(data: any) {
        this.soldToFarmerId = data.soldToFarmerId;
        this.otp = data.otp;
        this.amount = data.amount;
    }
}

class DeleteProductsSoldToFarmerOTPModel {
    constructor(data: any) {
        this.soldToFarmerId = data.soldToFarmerId;
    }
    public soldToFarmerId: number;
}

export { GetProductsSoldToFarmerOTPModel, CreateProductsSoldToFarmerOTPModel, DeleteProductsSoldToFarmerOTPModel }