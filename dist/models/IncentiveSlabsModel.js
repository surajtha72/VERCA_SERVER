"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteIncentiveSlabsModel = exports.UpdateIncentiveSlabsModel = exports.CreateIncentiveSlabsModel = exports.AllIncentiveSlabsModel = void 0;
class AllIncentiveSlabsModel {
    constructor(data) {
        this.id = data.id;
        this.incentiveId = data.incentiveId;
        this.slabType = data.slabType;
        this.slabFrom = data.slabFrom;
        this.slabTo = data.slabTo;
        this.incentivePerKg = data.incentivePerKg;
        this.isActive = data.isActive;
    }
}
exports.AllIncentiveSlabsModel = AllIncentiveSlabsModel;
class CreateIncentiveSlabsModel {
    constructor(data) {
        this.incentiveId = data.incentiveId;
        this.slabType = data.slabType;
        this.slabFrom = data.slabFrom;
        this.slabTo = data.slabTo;
        this.incentivePerKg = data.incentivePerKg;
        this.isActive = data.isActive;
    }
}
exports.CreateIncentiveSlabsModel = CreateIncentiveSlabsModel;
class UpdateIncentiveSlabsModel {
    constructor(data) {
        this.id = data.id;
        this.incentiveId = data.incentiveId;
        this.slabType = data.slabType;
        this.slabFrom = data.slabFrom;
        this.slabTo = data.slabTo;
        this.incentivePerKg = data.incentivePerKg;
        this.isActive = data.isActive;
    }
}
exports.UpdateIncentiveSlabsModel = UpdateIncentiveSlabsModel;
class DeleteIncentiveSlabsModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteIncentiveSlabsModel = DeleteIncentiveSlabsModel;
