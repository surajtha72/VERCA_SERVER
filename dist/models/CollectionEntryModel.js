"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCollectionEntryModel = exports.UpdateCollectionEntryModel = exports.CreateCollectionEntryModel = exports.AllowCollectionEntryModel = void 0;
class AllowCollectionEntryModel {
    constructor(data) {
        this.id = data.id;
        this.organizationUnitId = data.organizationUnitId;
        this.requestFor = data.requestFor;
        this.status = data.status;
        this.createdBy = data.createdBy;
        this.createdAt = data.createdAt;
    }
}
exports.AllowCollectionEntryModel = AllowCollectionEntryModel;
class CreateCollectionEntryModel {
    constructor(data) {
        this.organizationUnitId = data.organizationUnitId;
        this.status = data.status;
        this.requestFor = data.requestFor;
        this.createdBy = data.createdBy;
    }
}
exports.CreateCollectionEntryModel = CreateCollectionEntryModel;
class UpdateCollectionEntryModel {
    constructor(data) {
        this.id = data.id;
        this.organizationUnitId = data.organizationUnitId;
        this.status = data.status;
        this.requestFor = data.requestFor;
        this.createdBy = data.createdBy;
    }
}
exports.UpdateCollectionEntryModel = UpdateCollectionEntryModel;
class DeleteCollectionEntryModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteCollectionEntryModel = DeleteCollectionEntryModel;
