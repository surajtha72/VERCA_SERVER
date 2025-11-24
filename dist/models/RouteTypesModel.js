"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRouteTypeModel = exports.UpdateRouteTypeModel = exports.CreateRouteTypeModel = exports.AllRouteTypesModel = void 0;
class AllRouteTypesModel {
    constructor(data) {
        var _a, _b, _c, _d;
        this.id = data.id;
        this.shortDescription = data.shortDescription;
        this.fromProcUnitType = (_a = data.fromProcUnitType.Id) !== null && _a !== void 0 ? _a : null;
        this.fromProcUnitTypeName = (_b = data.fromProcUnitTypeName.Name) !== null && _b !== void 0 ? _b : null;
        this.toProcOrgUnitType = (_c = data.toProcOrgUnitType.Id) !== null && _c !== void 0 ? _c : null;
        this.toProcOrgUnitTypeName = (_d = data.toProcOrgUnitTypeName.Name) !== null && _d !== void 0 ? _d : null;
        this.vehicleType = data.vehicleType;
    }
}
exports.AllRouteTypesModel = AllRouteTypesModel;
class CreateRouteTypeModel {
    constructor(data) {
        this.shortDescription = data.shortDescription;
        this.fromProcUnitType = data.fromProcUnitType;
        this.toProcOrgUnitType = data.toProcOrgUnitType;
        this.vehicleType = data.vehicleType;
    }
}
exports.CreateRouteTypeModel = CreateRouteTypeModel;
class UpdateRouteTypeModel {
    constructor(data) {
        this.id = data.id;
        this.shortDescription = data.shortDescription;
        this.fromProcUnitType = data.fromProcUnitType;
        this.toProcOrgUnitType = data.toProcOrgUnitType;
        this.vehicleType = data.vehicleType;
    }
}
exports.UpdateRouteTypeModel = UpdateRouteTypeModel;
class DeleteRouteTypeModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteRouteTypeModel = DeleteRouteTypeModel;
