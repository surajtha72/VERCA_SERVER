"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsSoldToFarmerModel = exports.GetProductsSoldToFarmerModel = void 0;
class GetProductsSoldToFarmerModel {
    constructor(data) {
        this.id = data.id;
        this.productSalesToFarmer = data.productSalesToFarmer;
        this.productId = data.productId;
        this.quantity = data.quantity;
        this.rate = data.rate;
    }
}
exports.GetProductsSoldToFarmerModel = GetProductsSoldToFarmerModel;
class CreateProductsSoldToFarmerModel {
    constructor(data) {
        this.productSalesToFarmer = data.productSalesToFarmer;
        this.productId = data.productId;
        this.quantity = data.quantity;
        this.rate = data.rate;
    }
}
exports.CreateProductsSoldToFarmerModel = CreateProductsSoldToFarmerModel;
