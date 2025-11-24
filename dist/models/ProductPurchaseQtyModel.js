"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductPurchaseQtyModel = exports.UpdateProductPurchaseQtyModel = exports.CreateProductPurchaseQtyModel = exports.AllProductPurchaseQtyModel = void 0;
class AllProductPurchaseQtyModel {
    constructor(data) {
        this.id = data.id;
        this.productId = data.productId;
        this.invoiceNo = data.invoiceNo;
        this.purchaseDate = data.purchaseDate;
        this.quantity = data.quantity;
        this.isActive = data.isActive;
    }
}
exports.AllProductPurchaseQtyModel = AllProductPurchaseQtyModel;
class CreateProductPurchaseQtyModel {
    constructor(data) {
        this.productId = data.productId;
        this.invoiceNo = data.invoiceNo;
        this.purchaseDate = data.purchaseDate;
        this.quantity = data.quantity;
        this.isActive = data.isActive;
    }
}
exports.CreateProductPurchaseQtyModel = CreateProductPurchaseQtyModel;
class UpdateProductPurchaseQtyModel {
    constructor(data) {
        this.id = data.id;
        this.productId = data.productId;
        this.purchaseDate = data.purchaseDate;
        this.invoiceNo = data.invoiceNo;
        this.quantity = data.quantity;
        this.isActive = data.isActive;
    }
}
exports.UpdateProductPurchaseQtyModel = UpdateProductPurchaseQtyModel;
class DeleteProductPurchaseQtyModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteProductPurchaseQtyModel = DeleteProductPurchaseQtyModel;
