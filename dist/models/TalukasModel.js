"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTalukasModel = exports.UpdateTalukasModel = exports.CreateTalukasModel = exports.AllTalukasModel = void 0;
class AllTalukasModel {
    constructor(data) {
        this.id = data.id;
        this.districtId = data.districtId;
        this.stateId = data.stateId;
        this.districtName = data.districtName;
        this.name = data.name;
        this.pincode = data.pincode;
    }
}
exports.AllTalukasModel = AllTalukasModel;
class CreateTalukasModel {
    constructor(data) {
        this.districtId = data.districtId;
        this.stateId = data.stateId;
        this.name = data.name;
        this.pincode = data.pincode;
    }
}
exports.CreateTalukasModel = CreateTalukasModel;
class UpdateTalukasModel {
    constructor(data) {
        this.id = data.id;
        this.districtId = data.districtId;
        this.stateId = data.stateId;
        this.name = data.name;
        this.pincode = data.pincode;
    }
}
exports.UpdateTalukasModel = UpdateTalukasModel;
class DeleteTalukasModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteTalukasModel = DeleteTalukasModel;
