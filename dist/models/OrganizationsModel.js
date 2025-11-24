"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrganizationsModel = exports.UpdateOrganizationsModel = exports.CreateOrganizationsModel = exports.AllOrganizationsModel = void 0;
class AllOrganizationsModel {
    constructor(data) {
        var _a, _b, _c, _d, _e;
        this.id = data.id;
        this.organizationType = data.organizationType;
        this.organizationName = data.organizationName;
        this.parentId = (_a = data.parentId.Id) !== null && _a !== void 0 ? _a : null;
        this.parentName = (_b = data.parentId.Name) !== null && _b !== void 0 ? _b : null;
        this.name = data.name;
        this.businessRegnNo = data.businessRegnNo;
        this.gstNo = data.gstNo;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.vctId = data.vctId;
        this.vctName = data.vctName;
        this.geocode = data.geocode;
        this.capacity = data.capacity;
        this.morningShiftStartTime = data.morningShiftStartTime;
        this.morningShiftEndTime = data.morningShiftEndTime;
        this.eveningShiftStartTime = data.eveningShiftStartTime;
        this.eveningShiftEndTime = data.eveningShiftEndTime;
        this.defaultCollectionTypeName = data.defaultCollectionTypeName;
        this.defaultCollectionTypeId = (_c = data.defaultCollectionTypeId.Id) !== null && _c !== void 0 ? _c : null;
        this.payrollTypeId = (_d = data.payrollTypeId.Id) !== null && _d !== void 0 ? _d : null;
        this.payrollTypeName = data.payrollTypeName;
        this.enforceStrictTiming = data.enforceStrictTiming;
        this.enforceNoDueCollection = data.enforceNoDueCollection;
        this.headload = data.headload;
        this.commission = data.commission;
        this.stateId = data.stateId;
        this.districtId = data.districtId;
        this.accHolderName = data.accHolderName;
        this.accountNumber = data.accountNumber;
        this.ifscCode = data.ifscCode;
        this.phoneNumber = data.phoneNumber;
        this.ouCode = data.ouCode;
        this.allowCan = (_e = data.allowCan) !== null && _e !== void 0 ? _e : false; // ⬅️ new
        this.milkCollectionUom = data.milkCollectionUom; // ⬅️ new
        this.milkDispatchUom = data.milkDispatchUom;
    }
}
exports.AllOrganizationsModel = AllOrganizationsModel;
class CreateOrganizationsModel {
    constructor(data) {
        var _a, _b;
        this.organizationType = data.organizationType;
        this.parentId = data.parentId;
        this.name = data.name;
        this.businessRegnNo = data.businessRegnNo;
        this.gstNo = data.gstNo;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.vctId = data.vctId;
        this.geocode = data.geocode;
        this.capacity = data.capacity;
        this.morningShiftStartTime = data.morningShiftStartTime;
        this.morningShiftEndTime = data.morningShiftEndTime;
        this.eveningShiftStartTime = data.eveningShiftStartTime;
        this.eveningShiftEndTime = data.eveningShiftEndTime;
        this.defaultCollectionType = data.defaultCollectionType;
        this.payrollTypes = data.payrollTypes;
        this.enforceStrictTiming = data.enforceStrictTiming;
        this.enforceNoDueCollection = data.enforceNoDueCollection;
        this.headload = data.headload;
        this.commission = data.commission;
        this.stateId = data.stateId;
        this.districtId = data.districtId;
        this.accHolderName = data.accHolderName;
        this.accountNumber = data.accountNumber;
        this.ifscCode = (_a = data.ifscCode) !== null && _a !== void 0 ? _a : null;
        this.phoneNumber = data.phoneNumber;
        this.ouCode = data.ouCode; // <--- add this
        this.allowCan = (_b = data.allowCan) !== null && _b !== void 0 ? _b : false; // ⬅️ new
        this.milkCollectionUom = data.milkCollectionUom; // ⬅️ new
        this.milkDispatchUom = data.milkDispatchUom;
    }
}
exports.CreateOrganizationsModel = CreateOrganizationsModel;
class UpdateOrganizationsModel {
    constructor(data) {
        var _a, _b;
        this.id = data.id;
        this.organizationType = data.organizationType;
        this.parentId = data.parentId;
        this.name = data.name;
        this.businessRegnNo = data.businessRegnNo;
        this.gstNo = data.gstNo;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.vctId = data.vctId;
        this.geocode = data.geocode;
        this.capacity = data.capacity;
        this.morningShiftStartTime = data.morningShiftStartTime;
        this.morningShiftEndTime = data.morningShiftEndTime;
        this.eveningShiftStartTime = data.eveningShiftStartTime;
        this.eveningShiftEndTime = data.eveningShiftEndTime;
        this.defaultCollectionType = data.defaultCollectionType;
        this.payrollTypes = data.payrollTypes;
        this.enforceStrictTiming = data.enforceStrictTiming;
        this.enforceNoDueCollection = data.enforceNoDueCollection;
        this.headload = data.headload;
        this.commission = data.commission;
        this.stateId = data.stateId;
        this.districtId = data.districtId;
        this.accHolderName = data.accHolderName;
        this.accountNumber = data.accountNumber;
        this.ifscCode = (_a = data.ifscCode) !== null && _a !== void 0 ? _a : null;
        this.phoneNumber = data.phoneNumber;
        this.ouCode = data.ouCode; // <---
        this.allowCan = (_b = data.allowCan) !== null && _b !== void 0 ? _b : false; // ⬅️ new
        this.milkCollectionUom = data.milkCollectionUom; // ⬅️ new
        this.milkDispatchUom = data.milkDispatchUom;
    }
    ;
}
exports.UpdateOrganizationsModel = UpdateOrganizationsModel;
class DeleteOrganizationsModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteOrganizationsModel = DeleteOrganizationsModel;
