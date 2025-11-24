"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRateAppliedModel = exports.UpdateRateAppliedModel = exports.CreateRateAppliedModel = exports.AllTRateAppliedModel = void 0;
class AllTRateAppliedModel {
    constructor(data) {
        this.id = data.id;
        this.rateId = data.rateId;
        this.appliedTo = data.appliedTo;
        this.appliedOn = data.appliedOn;
        this.isActive = data.isActive;
    }
}
exports.AllTRateAppliedModel = AllTRateAppliedModel;
class CreateRateAppliedModel {
    constructor(data) {
        this.rateId = data.rateId;
        this.appliedTo = data.appliedTo;
        this.appliedOn = data.appliedOn;
        this.isActive = data.isActive;
    }
}
exports.CreateRateAppliedModel = CreateRateAppliedModel;
class UpdateRateAppliedModel {
    constructor(data) {
        this.id = data.id;
        this.rateId = data.rateId;
        this.appliedTo = data.appliedTo;
        this.appliedOn = data.appliedOn;
        this.isActive = data.isActive;
    }
}
exports.UpdateRateAppliedModel = UpdateRateAppliedModel;
class DeleteRateAppliedModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteRateAppliedModel = DeleteRateAppliedModel;
