"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeateProductsSoldToAgentModel = exports.GetProductsSoldToAgentModel = void 0;
class GetProductsSoldToAgentModel {
    constructor(data) {
        this.id = data.id;
        this.productSalesToAgent = data.productSalesToAgent;
        this.productId = data.productId;
        this.quantity = data.quantity;
        this.rate = data.rate;
    }
}
exports.GetProductsSoldToAgentModel = GetProductsSoldToAgentModel;
class CeateProductsSoldToAgentModel {
    constructor(data) {
        this.productSalesToAgent = data.productSalesToAgent;
        this.productId = data.productId;
        this.quantity = data.quantity;
        this.rate = data.rate;
    }
}
exports.CeateProductsSoldToAgentModel = CeateProductsSoldToAgentModel;
