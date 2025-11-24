"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteIncentiveMasterModel = exports.CreateIncentiveMasterModel = exports.UpdateIncentiveMasterModel = exports.AllIncentiveMasterModel = void 0;
class AllIncentiveMasterModel {
    constructor(data) {
        this.id = data.id;
        this.incentiveName = data.incentiveName;
        this.incentiveType = data.incentiveType;
        this.effectiveFrom = data.effectiveFrom;
        this.billingCycleRef = data.billingCycleRef;
        this.minFatLimit = data.minFatLimit;
        this.minSnfLimit = data.minSnfLimit;
        this.shiftsApplicable = data.shiftsApplicable;
        this.isActive = data.isActive;
    }
}
exports.AllIncentiveMasterModel = AllIncentiveMasterModel;
class CreateIncentiveMasterModel {
    constructor(data) {
        this.incentiveName = data.incentiveName;
        this.incentiveType = data.incentiveType;
        this.effectiveFrom = data.effectiveFrom;
        this.billingCycleRef = data.billingCycleRef;
        this.minFatLimit = data.minFatLimit;
        this.minSnfLimit = data.minSnfLimit;
        this.shiftsApplicable = data.shiftsApplicable;
        this.isActive = data.isActive;
    }
}
exports.CreateIncentiveMasterModel = CreateIncentiveMasterModel;
class UpdateIncentiveMasterModel {
    constructor(data) {
        this.id = data.id;
        this.incentiveName = data.incentiveName;
        this.incentiveType = data.incentiveType;
        this.effectiveFrom = data.effectiveFrom;
        this.billingCycleRef = data.billingCycleRef;
        this.minFatLimit = data.minFatLimit;
        this.minSnfLimit = data.minSnfLimit;
        this.shiftsApplicable = data.shiftsApplicable;
        this.isActive = data.isActive;
    }
}
exports.UpdateIncentiveMasterModel = UpdateIncentiveMasterModel;
class DeleteIncentiveMasterModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteIncentiveMasterModel = DeleteIncentiveMasterModel;
