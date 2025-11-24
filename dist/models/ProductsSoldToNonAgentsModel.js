"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsSoldToNonAgentsModel = exports.GetProductsSoldToNonAgentsModel = void 0;
class GetProductsSoldToNonAgentsModel {
    constructor(data) {
        this.id = data.id;
        this.productSalesToNonAgents = data.productSalesToNonAgents;
        this.productId = data.productId;
        this.quantity = data.quantity;
        this.rate = data.rate;
    }
}
exports.GetProductsSoldToNonAgentsModel = GetProductsSoldToNonAgentsModel;
class CreateProductsSoldToNonAgentsModel {
    constructor(data) {
        this.productSalesToNonAgents = data.productSalesToNonAgents;
        this.productId = data.productId;
        this.quantity = data.quantity;
        this.rate = data.rate;
    }
}
exports.CreateProductsSoldToNonAgentsModel = CreateProductsSoldToNonAgentsModel;
