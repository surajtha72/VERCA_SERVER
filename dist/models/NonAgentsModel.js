"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNonAgentsModel = exports.UpdateNonAgentsModel = exports.CreateNonAgentsModel = exports.AllNonAgentsModel = void 0;
class AllNonAgentsModel {
    constructor(data) {
        var _a;
        this.id = data.id;
        this.parentId = (_a = data.parentId.Id) !== null && _a !== void 0 ? _a : null;
        this.name = data.name;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.stateId = data.stateId;
        this.districtId = data.districtId;
        this.vctId = data.vctId;
        this.accountNumber = data.accountNumber;
        this.phoneNumber = data.phoneNumber;
        this.ifscCode = data.ifscCode;
        this.adhharNumber = data.adhharNumber;
        this.isCurrentrate = data.isCurrentrate;
    }
}
exports.AllNonAgentsModel = AllNonAgentsModel;
class CreateNonAgentsModel {
    constructor(data) {
        var _a;
        this.parentId = (_a = data.parentId.Id) !== null && _a !== void 0 ? _a : null;
        this.name = data.name;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.stateId = data.stateId;
        this.districtId = data.districtId;
        this.vctId = data.vctId;
        this.accountNumber = data.accountNumber;
        this.phoneNumber = data.phoneNumber;
        this.ifscCode = data.ifscCode;
        this.adhharNumber = data.adhharNumber;
        this.isCurrentrate = data.isCurrentrate;
    }
}
exports.CreateNonAgentsModel = CreateNonAgentsModel;
class UpdateNonAgentsModel {
    constructor(data) {
        var _a;
        this.id = data.id;
        this.parentId = (_a = data.parentId.Id) !== null && _a !== void 0 ? _a : null;
        this.name = data.name;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.stateId = data.stateId;
        this.districtId = data.districtId;
        this.vctId = data.vctId;
        this.accountNumber = data.accountNumber;
        this.phoneNumber = data.phoneNumber;
        this.ifscCode = data.ifscCode;
        this.adhharNumber = data.adhharNumber;
        this.isCurrentrate = data.isCurrentrate;
    }
}
exports.UpdateNonAgentsModel = UpdateNonAgentsModel;
class DeleteNonAgentsModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteNonAgentsModel = DeleteNonAgentsModel;
