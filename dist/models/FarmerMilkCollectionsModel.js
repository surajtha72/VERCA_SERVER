"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerMilkCollectionModelPortal = exports.DeleteFarmerMilkCollectionModel = exports.UpdateFarmerMilkCollectionModel = exports.CreateFarmerMilkCollectionModel = exports.AllFarmerMilkCollectionsModel = void 0;
class AllFarmerMilkCollectionsModel {
    constructor(data) {
        var _a, _b, _c, _d, _e, _f;
        this.id = data.id;
        this.shift = data.shift;
        this.status = data.status;
        this.collectionDateTime = data.collectionDateTime;
        this.startedAt = data.startedAt;
        this.completedAt = data.completedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.createdBy = (_a = data.createdBy) !== null && _a !== void 0 ? _a : null;
        this.updatedBy = (_b = data.updatedBy) !== null && _b !== void 0 ? _b : null;
        this.deletedBy = (_c = data.deletedBy) !== null && _c !== void 0 ? _c : null;
        this.milkDispatchId = (_d = data.milkDispatchId) !== null && _d !== void 0 ? _d : null;
        this.dispatchedQuantity = (_e = data.dispatchedQuantity) !== null && _e !== void 0 ? _e : null;
        this.remainingQuantity = (_f = data.remainingQuantity) !== null && _f !== void 0 ? _f : null;
    }
}
exports.AllFarmerMilkCollectionsModel = AllFarmerMilkCollectionsModel;
class FarmerMilkCollectionModelPortal {
    constructor(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        this.id = data.id;
        this.shift = data.shift;
        this.status = data.status;
        this.collectionDateTime = data.collectionDateTime;
        this.startedAt = data.startedAt;
        this.completedAt = data.completedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.createdBy = (_a = data.createdBy) !== null && _a !== void 0 ? _a : null;
        this.updatedBy = (_b = data.updatedBy) !== null && _b !== void 0 ? _b : null;
        this.deletedBy = (_c = data.deletedBy) !== null && _c !== void 0 ? _c : null;
        this.milkDispatchId = (_d = data.milkDispatchId) !== null && _d !== void 0 ? _d : null;
        this.dispatchedQuantity = (_e = data.dispatchedQuantity) !== null && _e !== void 0 ? _e : null;
        this.remainingQuantity = (_f = data.remainingQuantity) !== null && _f !== void 0 ? _f : null;
        this.gtFat = (_g = data.gtFat) !== null && _g !== void 0 ? _g : null;
        this.gtSnf = (_h = data.gtSnf) !== null && _h !== void 0 ? _h : null;
        this.calculatedFat = (_j = data.calculatedFat) !== null && _j !== void 0 ? _j : null;
        this.calculatedSnf = data !== null && data !== void 0 ? data : null;
        this.totalKgFat = (_k = data.totalKgFat) !== null && _k !== void 0 ? _k : null;
        this.totalKgSnf = (_l = data.totalKgSnf) !== null && _l !== void 0 ? _l : null;
    }
}
exports.FarmerMilkCollectionModelPortal = FarmerMilkCollectionModelPortal;
class CreateFarmerMilkCollectionModel {
    constructor(data) {
        var _a;
        this.id = data.id;
        this.shift = data.shift;
        this.status = data.status;
        this.collectionDateTime = data.collectionDateTime;
        this.startedAt = data.startedAt;
        this.completedAt = data.completedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.createdBy = data.createdBy;
        this.updatedBy = data.updatedBy;
        this.deletedBy = data.deletedBy;
        this.milkDispatchId = (_a = data.milkDispatchId) !== null && _a !== void 0 ? _a : null;
        this.billingCycle = data.billingCycle;
    }
}
exports.CreateFarmerMilkCollectionModel = CreateFarmerMilkCollectionModel;
class UpdateFarmerMilkCollectionModel {
    constructor(data) {
        var _a, _b, _c;
        this.id = data.id;
        this.shift = data.shift;
        this.status = data.status;
        this.collectionDateTime = data.collectionDateTime;
        this.startedAt = data.startedAt;
        this.completedAt = data.completedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.createdBy = data.createdBy;
        this.updatedBy = data.updatedBy;
        this.deletedBy = data.deletedBy;
        this.milkDispatchId = (_a = data.milkDispatchId) !== null && _a !== void 0 ? _a : null;
        this.dispatchedQuantity = (_b = data.dispatchedQuantity) !== null && _b !== void 0 ? _b : null;
        this.remainingQuantity = (_c = data.remainingQuantity) !== null && _c !== void 0 ? _c : null;
        this.fat = data.fat;
        this.clr = data.clr;
        this.snf = data.snf;
    }
}
exports.UpdateFarmerMilkCollectionModel = UpdateFarmerMilkCollectionModel;
class DeleteFarmerMilkCollectionModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteFarmerMilkCollectionModel = DeleteFarmerMilkCollectionModel;
