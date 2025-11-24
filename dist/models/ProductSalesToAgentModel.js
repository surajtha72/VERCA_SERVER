"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductSalesToAgentModel = exports.UpdateProductSalesToAgentModel = exports.CreateProductSalesToAgentModel = exports.GetProductSalesToAgentModel = void 0;
class GetProductSalesToAgentModel {
    constructor(data) {
        this.id = data.id;
        this.invoiceNumber = data.invoiceNumber;
        this.soldToAgent = data.soldToAgent;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
    }
}
exports.GetProductSalesToAgentModel = GetProductSalesToAgentModel;
class CreateProductSalesToAgentModel {
    constructor(data) {
        this.invoiceNumber = data.invoiceNumber;
        this.soldToAgent = data.soldToAgent;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
        this.soldProducts = data.soldProducts;
        this.createdAt = data.createdAt;
    }
}
exports.CreateProductSalesToAgentModel = CreateProductSalesToAgentModel;
class UpdateProductSalesToAgentModel {
    constructor(data) {
        this.id = data.id;
        this.invoiceNumber = data.invoiceNumber;
        this.soldToAgent = data.soldToAgent;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
        this.soldProducts = data.soldProducts;
    }
}
exports.UpdateProductSalesToAgentModel = UpdateProductSalesToAgentModel;
class DeleteProductSalesToAgentModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteProductSalesToAgentModel = DeleteProductSalesToAgentModel;
