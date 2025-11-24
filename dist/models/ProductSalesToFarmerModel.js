"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductSalesToFarmerModel = exports.UpdateProductSalesToFarmerModel = exports.CreateProductSalesToFarmerModel = exports.GetProductSalesToFarmerModel = void 0;
class GetProductSalesToFarmerModel {
    constructor(data) {
        this.id = data.id;
        this.invoiceNumber = data.invoiceNumber;
        this.soldToFarmer = data.soldToFarmer;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
    }
}
exports.GetProductSalesToFarmerModel = GetProductSalesToFarmerModel;
class CreateProductSalesToFarmerModel {
    constructor(data) {
        this.invoiceNumber = data.invoiceNumber;
        this.soldToFarmer = data.soldToFarmer;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
        this.soldProducts = data.soldProducts;
        this.createdAt = data.createdAt;
    }
}
exports.CreateProductSalesToFarmerModel = CreateProductSalesToFarmerModel;
class UpdateProductSalesToFarmerModel {
    constructor(data) {
        this.id = data.id;
        this.invoiceNumber = data.invoiceNumber;
        this.soldToFarmer = data.soldToFarmer;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
        this.soldProducts = data.soldProducts;
    }
}
exports.UpdateProductSalesToFarmerModel = UpdateProductSalesToFarmerModel;
class DeleteProductSalesToFarmerModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteProductSalesToFarmerModel = DeleteProductSalesToFarmerModel;
