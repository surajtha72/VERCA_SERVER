"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductsSoldToNonAgentsOTPModel = exports.CreateProductsSoldToNonAgentsOTPModel = exports.GetProductsSoldToNonAgentsOTPModel = void 0;
class GetProductsSoldToNonAgentsOTPModel {
    constructor(data) {
        this.soldToNonAgentsId = data.soldToNonAgentsId;
        this.otp = data.otp;
    }
}
exports.GetProductsSoldToNonAgentsOTPModel = GetProductsSoldToNonAgentsOTPModel;
class CreateProductsSoldToNonAgentsOTPModel {
    constructor(data) {
        this.soldToNonAgentsId = data.soldToNonAgentsId;
        this.otp = data.otp;
        this.amount = data.amount;
    }
}
exports.CreateProductsSoldToNonAgentsOTPModel = CreateProductsSoldToNonAgentsOTPModel;
class DeleteProductsSoldToNonAgentsOTPModel {
    constructor(data) {
        this.soldToNonAgentsId = data.soldToNonAgentsId;
    }
}
exports.DeleteProductsSoldToNonAgentsOTPModel = DeleteProductsSoldToNonAgentsOTPModel;
