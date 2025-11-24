"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMilkCollectionDetailsModel = exports.UpdateMilkCollectionDetailsModel = exports.CreateMilkCollectionDetailsModel = exports.AllMilkCollectionDetailsModel = void 0;
class AllMilkCollectionDetailsModel {
    constructor(data) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.id = data.id;
        this.milkCollectionId = (_a = data.milkCollectionId) !== null && _a !== void 0 ? _a : null;
        this.milkType = data.milkType;
        this.collectionOperationType = data.collectionOperationType;
        this.testingOperationType = data.testingOperationType;
        this.fat = data.fat;
        this.snf = data.snf;
        this.clr = data.clr;
        this.protein = data.protein;
        this.lactose = data.lactose;
        this.salt = data.salt;
        this.water = data.water;
        this.temperature = data.temperature;
        this.sampleNumber = data.sampleNumber;
        this.weight = data.weight;
        this.canCount = data.canCount;
        this.organizationUnitId = (_b = data.organizationUnitId) !== null && _b !== void 0 ? _b : null;
        this.organizationUnitName = (_c = data.organizationUnitName) !== null && _c !== void 0 ? _c : null;
        this.transporterVehicleId = (_d = data.transporterVehicleId) !== null && _d !== void 0 ? _d : null;
        this.transporterVehicleName = (_e = data.transporterVehicleName) !== null && _e !== void 0 ? _e : null;
        this.routeId = (_f = data.routeId) !== null && _f !== void 0 ? _f : null;
        this.routeName = (_g = data.routeName) !== null && _g !== void 0 ? _g : null;
        this.collectedAt = data.collectedAt;
        this.collectedBy = data.collectedBy;
        this.createdBy = data.createdBy;
        this.modifiedBy = data.updatedBy;
        this.deletedBy = data.deletedBy;
        this.testedAt = data.testedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
}
exports.AllMilkCollectionDetailsModel = AllMilkCollectionDetailsModel;
class CreateMilkCollectionDetailsModel {
    constructor(data) {
        this.id = data.id;
        this.milkCollectionId = data.milkCollectionId;
        this.milkType = data.milkType;
        this.collectionOperationType = data.collectionOperationType;
        this.testingOperationType = data.testingOperationType;
        this.fat = data.fat;
        this.snf = data.snf;
        this.clr = data.clr;
        this.protein = data.protein;
        this.lactose = data.lactose;
        this.salt = data.salt;
        this.water = data.water;
        this.temperature = data.temperature;
        this.sampleNumber = data.sampleNumber;
        this.weight = data.weight;
        this.canCount = data.canCount;
        this.organizationUnitId = data.organizationUnitId;
        this.transporterVehicleId = data.transporterVehicleId;
        this.routeId = data.routeId;
        this.sampleNumber = data.sampleNumber;
        this.collectedAt = data.collectedAt;
        this.testedAt = data.testedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.collectedBy = data.collectedBy;
        this.createdBy = data.createdBy;
        this.modifiedBy = data.updatedBy;
        this.deletedBy = data.deletedBy;
    }
}
exports.CreateMilkCollectionDetailsModel = CreateMilkCollectionDetailsModel;
class UpdateMilkCollectionDetailsModel {
    constructor(data) {
        this.id = data.id;
        this.milkCollectionId = data.milkCollectionId;
        this.milkType = data.milkType;
        this.collectionOperationType = data.collectionOperationType;
        this.testingOperationType = data.testingOperationType;
        this.fat = data.fat;
        this.snf = data.snf;
        this.clr = data.clr;
        this.protein = data.protein;
        this.lactose = data.lactose;
        this.salt = data.salt;
        this.water = data.water;
        this.temperature = data.temperature;
        this.sampleNumber = data.sampleNumber;
        this.weight = data.weight;
        this.canCount = data.canCount;
        this.organizationUnitId = data.organizationUnitId;
        this.transporterVehicleId = data.transporterVehicleId;
        this.routeId = data.routeId;
        this.sampleNumber = data.sampleNumber;
        this.collectedAt = data.collectedAt;
        this.testedAt = data.testedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.collectedBy = data.collectedBy;
        this.createdBy = data.createdBy;
        this.modifiedBy = data.updatedBy;
        this.deletedBy = data.deletedBy;
    }
}
exports.UpdateMilkCollectionDetailsModel = UpdateMilkCollectionDetailsModel;
class DeleteMilkCollectionDetailsModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteMilkCollectionDetailsModel = DeleteMilkCollectionDetailsModel;
