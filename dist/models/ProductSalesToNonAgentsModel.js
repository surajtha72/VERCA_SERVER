"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductSalesToNonAgentsModel = exports.UpdateProductSalesToNonAgentsModel = exports.CreateProductSalesToNonAgentsModel = exports.GetProductSalesToNonAgentsModel = void 0;
class GetProductSalesToNonAgentsModel {
    constructor(data) {
        this.id = data.id;
        this.invoiceNumber = data.invoiceNumber;
        this.soldToNonAgents = data.soldToNonAgents;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
    }
}
exports.GetProductSalesToNonAgentsModel = GetProductSalesToNonAgentsModel;
class CreateProductSalesToNonAgentsModel {
    constructor(data) {
        this.invoiceNumber = data.invoiceNumber;
        this.soldToNonAgents = data.soldToNonAgents;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
        this.soldProducts = data.soldProducts;
        this.createdAt = data.createdAt;
    }
}
exports.CreateProductSalesToNonAgentsModel = CreateProductSalesToNonAgentsModel;
class UpdateProductSalesToNonAgentsModel {
    constructor(data) {
        this.id = data.id;
        this.invoiceNumber = data.invoiceNumber;
        this.soldToNonAgents = data.soldToNonAgents;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
        this.soldProducts = data.soldProducts;
    }
}
exports.UpdateProductSalesToNonAgentsModel = UpdateProductSalesToNonAgentsModel;
class DeleteProductSalesToNonAgentsModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteProductSalesToNonAgentsModel = DeleteProductSalesToNonAgentsModel;
