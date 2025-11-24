"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWeighbridgeLabDataModel = exports.GetWeighbridgeLabDataModel = exports.GetWeighbridgeDataModel = exports.UpdateWeighbridgeData = void 0;
class UpdateWeighbridgeData {
    constructor(data) {
        this.id = data.id;
        this.weight = data.weight;
    }
}
exports.UpdateWeighbridgeData = UpdateWeighbridgeData;
class GetWeighbridgeDataModel {
    constructor(data) {
        this.id = data.id;
        this.weight = data.weight;
    }
}
exports.GetWeighbridgeDataModel = GetWeighbridgeDataModel;
class UpdateWeighbridgeLabDataModel {
    constructor(data) {
        this.id = data.id;
        this.fat = data.fat;
        this.snf = data.snf;
        this.clr = data.clr;
        this.protein = data.protein;
        this.lactose = data.lactose;
        this.salt = data.salt;
        this.water = data.water;
        this.temperature = data.temperature;
    }
}
exports.UpdateWeighbridgeLabDataModel = UpdateWeighbridgeLabDataModel;
class GetWeighbridgeLabDataModel {
    constructor(data) {
        this.id = data.id;
        this.fat = data.fat;
        this.snf = data.snf;
        this.clr = data.clr;
        this.protein = data.protein;
        this.lactose = data.lactose;
        this.salt = data.salt;
        this.water = data.water;
        this.temperature = data.temperature;
    }
}
exports.GetWeighbridgeLabDataModel = GetWeighbridgeLabDataModel;
