"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteIndentProductsModel = exports.UpdateIndentProductsModel = exports.CreateIndentProductsModel = exports.AllIndentProductsModel = void 0;
class AllIndentProductsModel {
    constructor(data) {
        this.id = data.id;
        this.indentId = data.indentId;
        this.productId = data.productId;
        this.availableQty = data.availableQty;
        this.rate = data.rate;
        this.requestedQty = data.requestedQty;
        this.approvedQty = data.approvedQty;
        this.dispatchQty = data.dispatchQty;
        this.reveivedQty = data.reveivedQty;
        this.isActive = data.isActive;
        this.createdBy = data.createdBy;
    }
}
exports.AllIndentProductsModel = AllIndentProductsModel;
class CreateIndentProductsModel {
    constructor(data) {
        this.id = data.id;
        this.indentId = data.indentId;
        this.productId = data.productId;
        this.availableQty = data.availableQty;
        this.rate = data.rate;
        this.requestedQty = data.requestedQty;
        this.approvedQty = data.approvedQty;
        this.dispatchQty = data.dispatchQty;
        this.reveivedQty = data.reveivedQty;
        this.isActive = data.isActive;
    }
}
exports.CreateIndentProductsModel = CreateIndentProductsModel;
class UpdateIndentProductsModel {
    constructor(data) {
        this.id = data.id;
        this.indentId = data.indentId;
        this.productId = data.productId;
        this.availableQty = data.availableQty;
        this.rate = data.rate;
        this.requestedQty = data.requestedQty;
        this.approvedQty = data.approvedQty;
        this.receivedQty = data.receivedQty;
        this.dispatchQty = data.dispatchQty;
        this.reveivedQty = data.reveivedQty;
        this.isActive = data.isActive;
    }
}
exports.UpdateIndentProductsModel = UpdateIndentProductsModel;
class DeleteIndentProductsModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteIndentProductsModel = DeleteIndentProductsModel;
