"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDistrictModel = exports.UpdateDistrictModel = exports.CreateDistrictModel = exports.AllDistrictModel = void 0;
class AllDistrictModel {
    constructor(data) {
        this.id = data.id;
        this.stateId = data.stateId;
        this.stateName = data.stateName;
        this.name = data.name;
    }
}
exports.AllDistrictModel = AllDistrictModel;
class CreateDistrictModel {
    constructor(data) {
        this.stateId = data.stateId;
        this.name = data.name;
    }
}
exports.CreateDistrictModel = CreateDistrictModel;
class UpdateDistrictModel {
    constructor(data) {
        this.id = data.id;
        this.stateId = data.stateId;
        this.name = data.name;
    }
}
exports.UpdateDistrictModel = UpdateDistrictModel;
class DeleteDistrictModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteDistrictModel = DeleteDistrictModel;
