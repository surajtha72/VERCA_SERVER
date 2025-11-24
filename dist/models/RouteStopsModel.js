"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRouteStopsModel = exports.UpdateRouteStopsModel = exports.CreateRouteStopsModel = exports.AllRouteStopsModel = void 0;
class AllRouteStopsModel {
    constructor(data) {
        var _a, _b, _c, _d;
        this.id = data.id;
        this.routeId = (_a = data.routeId.Id) !== null && _a !== void 0 ? _a : null;
        this.routeName = (_b = data.routeName.Name) !== null && _b !== void 0 ? _b : null;
        this.sequenceNo = data.sequenceNo;
        this.stopId = (_c = data.stopId.Id) !== null && _c !== void 0 ? _c : null;
        this.stopId = (_d = data.stopId.Name) !== null && _d !== void 0 ? _d : null;
        this.stopName = data.stopName;
        this.travelKms = data.travelKms;
    }
}
exports.AllRouteStopsModel = AllRouteStopsModel;
class CreateRouteStopsModel {
    constructor(data) {
        this.routeId = data.routeId;
        this.sequenceNo = data.sequenceNo;
        this.stopId = data.stopId;
        this.travelKms = data.travelKms;
    }
}
exports.CreateRouteStopsModel = CreateRouteStopsModel;
class UpdateRouteStopsModel {
    constructor(data) {
        this.id = data.id;
        this.routeId = data.routeId;
        this.sequenceNo = data.sequenceNo;
        this.stopId = data.stopId;
        this.travelKms = data.travelKms;
    }
}
exports.UpdateRouteStopsModel = UpdateRouteStopsModel;
class DeleteRouteStopsModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteRouteStopsModel = DeleteRouteStopsModel;
