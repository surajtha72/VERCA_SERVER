import { ProductMaster } from "../entities/ProductMaster";
import { ProductSalesToNonAgents } from "../entities/ProductSalesToNonAgents";

class GetProductsSoldToNonAgentsOTPModel {
    public soldToNonAgentsId: number;
    public otp: number;
    constructor(data: any) {
        this.soldToNonAgentsId = data.soldToNonAgentsId;
        this.otp = data.otp;
    }
}

class CreateProductsSoldToNonAgentsOTPModel {
    public soldToNonAgentsId: number;
    public otp: number;
    public amount: number;
    constructor(data: any) {
        this.soldToNonAgentsId = data.soldToNonAgentsId;
        this.otp = data.otp;
        this.amount = data.amount;
    }
}

class DeleteProductsSoldToNonAgentsOTPModel {
    constructor(data: any) {
        this.soldToNonAgentsId = data.soldToNonAgentsId;
    }
    public soldToNonAgentsId: number;
}

export { GetProductsSoldToNonAgentsOTPModel, CreateProductsSoldToNonAgentsOTPModel, DeleteProductsSoldToNonAgentsOTPModel }