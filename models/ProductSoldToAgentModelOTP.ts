import { ProductMaster } from "../entities/ProductMaster";
import { ProductSalesToAgent } from "../entities/ProductSalesToAgent";

class GetProductsSoldToAgentOTPModel {
    public soldToAgentId: number;
    public otp: number;
    constructor(data: any) {
        this.soldToAgentId = data.soldToAgentId;
        this.otp = data.otp;
    }
}

class CreateProductsSoldToAgentOTPModel {
    public soldToAgentId: number;
    public otp: number;
    public amount: number;
    constructor(data: any) {
        this.soldToAgentId = data.soldToAgentId;
        this.otp = data.otp;
        this.amount = data.amount;
    }
}

class DeleteProductsSoldToAgentOTPModel {
    constructor(data: any) {
        this.soldToAgentId = data.soldToAgentId;
    }
    public soldToAgentId: number;
}

export { GetProductsSoldToAgentOTPModel, CreateProductsSoldToAgentOTPModel, DeleteProductsSoldToAgentOTPModel }