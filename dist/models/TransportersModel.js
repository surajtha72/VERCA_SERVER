"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransportersModel = exports.UpdateTransportersModel = exports.DeleteTransporterModel = exports.AllTransportersModel = void 0;
class AllTransportersModel {
    constructor(data) {
        this.id = data.id;
        this.firmName = data.firmName;
        this.code = data.code;
        this.contactPersonName = data.contactPersonName;
        this.mobileNo = data.mobileNo;
        this.emailId = data.emailId;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.state = data.state;
        this.district = data.district;
        this.vtc = data.vtc;
        this.pincode = data.pincode;
        this.geocode = data.geocode;
        this.aadhaarNo = data.aadhaarNo;
        this.panNo = data.panNo;
        this.bankId = data.bankId;
        this.bankAcNo = data.bankAcNo;
        this.bankAcName = data.bankAcName;
        this.bankIfscCode = data.bankIfscCode;
        this.isActive = data.isActive;
    }
}
exports.AllTransportersModel = AllTransportersModel;
class CreateTransportersModel {
    constructor(data) {
        this.firmName = data.firmName;
        this.code = data.code;
        this.contactPersonName = data.contactPersonName;
        this.mobileNo = data.mobileNo;
        this.emailId = data.emailId;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.state = data.state;
        this.district = data.district;
        this.vtc = data.vtc;
        this.pincode = data.pincode;
        this.geocode = data.geocode;
        this.aadhaarNo = data.aadhaarNo;
        this.panNo = data.panNo;
        this.bankId = data.bankId;
        this.bankAcNo = data.bankAcNo;
        this.bankAcName = data.bankAcName;
        this.bankIfscCode = data.bankIfscCode;
        this.isActive = data.isActive;
    }
}
exports.CreateTransportersModel = CreateTransportersModel;
class UpdateTransportersModel {
    constructor(data) {
        this.id = data.id;
        this.firmName = data.firmName;
        this.code = data.code;
        this.contactPersonName = data.contactPersonName;
        this.mobileNo = data.mobileNo;
        this.emailId = data.emailId;
        this.addressLine1 = data.addressLine1;
        this.addressLine2 = data.addressLine2;
        this.state = data.state;
        this.district = data.district;
        this.vtc = data.vtc;
        this.pincode = data.pincode;
        this.geocode = data.geocode;
        this.aadhaarNo = data.aadhaarNo;
        this.panNo = data.panNo;
        this.bankId = data.bankId;
        this.bankAcNo = data.bankAcNo;
        this.bankAcName = data.bankAcName;
        this.bankIfscCode = data.bankIfscCode;
        this.isActive = data.isActive;
    }
}
exports.UpdateTransportersModel = UpdateTransportersModel;
class DeleteTransporterModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteTransporterModel = DeleteTransporterModel;
