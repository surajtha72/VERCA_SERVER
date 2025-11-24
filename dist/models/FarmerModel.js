"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFarmersModel = exports.UpdateFarmersModel = exports.CreateFarmersModel = exports.AllFarmersModel = void 0;
class AllFarmersModel {
    constructor(data) {
        var _a, _b;
        this.id = data.id;
        // this.parentId = data.parentId.Id ?? null;
        if (data.parentId && typeof data.parentId === "object") {
            // in case frontend ever sends { Id: 5, Name: '...' }
            this.parentId = (_a = data.parentId.Id) !== null && _a !== void 0 ? _a : null;
        }
        else {
            // usual case: frontend sends parentId: 5 or null
            this.parentId = (_b = data.parentId) !== null && _b !== void 0 ? _b : null;
        }
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
exports.AllFarmersModel = AllFarmersModel;
class CreateFarmersModel {
    constructor(data) {
        // this.parentId = data.parentId.Id ?? null;
        var _a, _b;
        // parentId can be object or number
        if (data.parentId && typeof data.parentId === "object") {
            this.parentId = (_a = data.parentId.Id) !== null && _a !== void 0 ? _a : null;
        }
        else {
            this.parentId = (_b = data.parentId) !== null && _b !== void 0 ? _b : null;
        }
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
exports.CreateFarmersModel = CreateFarmersModel;
class UpdateFarmersModel {
    constructor(data) {
        var _a, _b;
        this.id = data.id;
        // this.parentId = data.parentId.Id ?? null;
        // parentId can be object or number
        if (data.parentId && typeof data.parentId === "object") {
            this.parentId = (_a = data.parentId.Id) !== null && _a !== void 0 ? _a : null;
        }
        else {
            this.parentId = (_b = data.parentId) !== null && _b !== void 0 ? _b : null;
        }
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
exports.UpdateFarmersModel = UpdateFarmersModel;
class DeleteFarmersModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteFarmersModel = DeleteFarmersModel;
