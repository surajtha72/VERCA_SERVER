"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRouteMasterModel = exports.UpdateRouteMasterModel = exports.CreateRouteMasterModel = exports.AllRouteMasterModel = void 0;
class AllRouteMasterModel {
    constructor(data) {
        var _a, _b, _c, _d;
        this.id = data.id;
        this.routeTypeId = (_a = data.routeTypeId.Id) !== null && _a !== void 0 ? _a : null;
        this.routeTypeName = (_b = data.routeTypeName.Name) !== null && _b !== void 0 ? _b : null;
        this.routeOwnerId = (_c = data.routeOwnerId.Id) !== null && _c !== void 0 ? _c : null;
        this.routeOwnerName = (_d = data.routeOwnerName.Name) !== null && _d !== void 0 ? _d : null;
        this.routeName = data.routeName;
        this.routeCode = data.routeCode;
        this.tripType = data.tripType;
        this.morningShiftSchTime = data.morningShiftSchTime;
        this.eveningShiftSchTime = data.eveningShiftSchTime;
    }
}
exports.AllRouteMasterModel = AllRouteMasterModel;
class CreateRouteMasterModel {
    constructor(data) {
        this.routeTypeId = data.routeTypeId;
        this.routeOwner = data.routeOwner;
        this.routeName = data.routeName;
        this.routeCode = data.routeCode;
        this.tripType = data.tripType;
        this.morningShiftSchTime = data.morningShiftSchTime;
        this.eveningShiftSchTime = data.eveningShiftSchTime;
    }
}
exports.CreateRouteMasterModel = CreateRouteMasterModel;
class UpdateRouteMasterModel {
    constructor(data) {
        this.id = data.id;
        this.routeTypeId = data.routeTypeId;
        this.routeOwner = data.routeOwner;
        this.routeName = data.routeName;
        this.routeCode = data.routeCode;
        this.tripType = data.tripType;
        this.morningShiftSchTime = data.morningShiftSchTime;
        this.eveningShiftSchTime = data.eveningShiftSchTime;
    }
}
exports.UpdateRouteMasterModel = UpdateRouteMasterModel;
class DeleteRouteMasterModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteRouteMasterModel = DeleteRouteMasterModel;
