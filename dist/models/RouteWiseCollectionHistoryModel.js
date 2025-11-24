"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRouteWiseCollectionHistoryModel = exports.UpdateRouteWiseCollectionHistoryModel = exports.CreateRouteWiseCollectionHistoryModel = exports.AllRouteWiseCollectionHistoryModel = void 0;
class AllRouteWiseCollectionHistoryModel {
    constructor(data) {
        this.histId = data.histId;
        this.cycleId = data.cycleId;
        this.id = data.id;
        this.routeName = data.routeName;
        this.routeOwner = data.routeOwner;
    }
}
exports.AllRouteWiseCollectionHistoryModel = AllRouteWiseCollectionHistoryModel;
class CreateRouteWiseCollectionHistoryModel {
    constructor(data) {
        this.cycleId = data.cycleId;
        this.id = data.id;
        this.routeName = data.routeName;
        this.routeOwner = data.routeOwner;
    }
}
exports.CreateRouteWiseCollectionHistoryModel = CreateRouteWiseCollectionHistoryModel;
class UpdateRouteWiseCollectionHistoryModel {
    constructor(data) {
        this.cycleId = data.cycleId;
        this.id = data.id;
        this.routeName = data.routeName;
        this.routeOwner = data.routeOwner;
    }
}
exports.UpdateRouteWiseCollectionHistoryModel = UpdateRouteWiseCollectionHistoryModel;
class DeleteRouteWiseCollectionHistoryModel {
    constructor(data) {
        this.histId = data.histId;
    }
}
exports.DeleteRouteWiseCollectionHistoryModel = DeleteRouteWiseCollectionHistoryModel;
