"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteManualEntryModel = exports.UpdateManualEntryModel = exports.CreateManualEntryModel = exports.AllowManualEntryModel = void 0;
class AllowManualEntryModel {
    constructor(data) {
        this.id = data.id;
        this.organizationUnitId = data.organizationUnitId;
        this.requestFor = data.requestFor;
        this.status = data.status;
        this.createdBy = data.createdBy;
        this.createdAt = data.createdAt;
    }
}
exports.AllowManualEntryModel = AllowManualEntryModel;
class CreateManualEntryModel {
    constructor(data) {
        this.organizationUnitId = data.organizationUnitId;
        this.status = data.status;
        this.requestFor = data.requestFor;
        this.createdBy = data.createdBy;
    }
}
exports.CreateManualEntryModel = CreateManualEntryModel;
class UpdateManualEntryModel {
    constructor(data) {
        this.id = data.id;
        this.organizationUnitId = data.organizationUnitId;
        this.status = data.status;
        this.requestFor = data.requestFor;
        this.createdBy = data.createdBy;
    }
}
exports.UpdateManualEntryModel = UpdateManualEntryModel;
class DeleteManualEntryModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteManualEntryModel = DeleteManualEntryModel;
