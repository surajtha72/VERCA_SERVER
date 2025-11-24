"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMilkDispatchModel = exports.UpdateMilkDispatchModel = exports.CreateMilkDispatchModel = exports.AllMilkDispatchModel = void 0;
class AllMilkDispatchModel {
    constructor(data) {
        var _a, _b, _c, _d;
        this.id = data.id;
        this.transporterVehicleId = (_a = data.transporterVehicleId) !== null && _a !== void 0 ? _a : null;
        this.transporterVehicleType = (_b = data.transporterVehicleType) !== null && _b !== void 0 ? _b : null;
        this.routeId = (_c = data.routeId) !== null && _c !== void 0 ? _c : null;
        this.routeName = (_d = data.routeName) !== null && _d !== void 0 ? _d : null;
        this.startFat = data.startFat;
        this.startSnf = data.startSnf;
        this.startClr = data.startClr;
        this.endFat = data.endFat;
        this.endSnf = data.endSnf;
        this.endClr = data.endClr;
        this.weight = data.weight;
        this.dispatchedAt = data.dispatchedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
}
exports.AllMilkDispatchModel = AllMilkDispatchModel;
class MilkCollection {
    constructor(data) {
        this.milkCollectionId = data.milkCollectionId;
        this.dispatchedQuantity = data.dispatchedQuantity;
        this.remainingQuantity = data.remainingQuantity;
        this.milkDispatchId = data.milkDispatchId;
    }
}
class CreateMilkDispatchModel {
    constructor(data) {
        var _a, _b;
        this.id = data.id;
        this.transporterVehicleId = (_a = data.transporterVehicleId) !== null && _a !== void 0 ? _a : null;
        this.routeId = (_b = data.routeId) !== null && _b !== void 0 ? _b : null;
        this.startFat = data.startFat;
        this.startSnf = data.startSnf;
        this.startClr = data.startClr;
        this.endFat = data.endFat;
        this.endSnf = data.endSnf;
        this.endClr = data.endClr;
        this.weight = data.weight;
        this.dispatchedAt = data.dispatchedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.milkCollections = data.milkCollections;
    }
}
exports.CreateMilkDispatchModel = CreateMilkDispatchModel;
class UpdateMilkDispatchModel {
    constructor(data) {
        var _a, _b;
        this.id = data.id;
        this.transporterVehicleId = (_a = data.transporterVehicleId) !== null && _a !== void 0 ? _a : null;
        this.routeId = (_b = data.routeId) !== null && _b !== void 0 ? _b : null;
        this.startFat = data.startFat;
        this.startSnf = data.startSnf;
        this.startClr = data.startClr;
        this.endFat = data.endFat;
        this.endSnf = data.endSnf;
        this.endClr = data.endClr;
        this.weight = data.weight;
        this.dispatchedAt = data.dispatchedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
}
exports.UpdateMilkDispatchModel = UpdateMilkDispatchModel;
class DeleteMilkDispatchModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteMilkDispatchModel = DeleteMilkDispatchModel;
