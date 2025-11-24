"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductsSoldToAgentOTPModel = exports.CreateProductsSoldToAgentOTPModel = exports.GetProductsSoldToAgentOTPModel = void 0;
class GetProductsSoldToAgentOTPModel {
    constructor(data) {
        this.soldToAgentId = data.soldToAgentId;
        this.otp = data.otp;
    }
}
exports.GetProductsSoldToAgentOTPModel = GetProductsSoldToAgentOTPModel;
class CreateProductsSoldToAgentOTPModel {
    constructor(data) {
        this.soldToAgentId = data.soldToAgentId;
        this.otp = data.otp;
        this.amount = data.amount;
    }
}
exports.CreateProductsSoldToAgentOTPModel = CreateProductsSoldToAgentOTPModel;
class DeleteProductsSoldToAgentOTPModel {
    constructor(data) {
        this.soldToAgentId = data.soldToAgentId;
    }
}
exports.DeleteProductsSoldToAgentOTPModel = DeleteProductsSoldToAgentOTPModel;
