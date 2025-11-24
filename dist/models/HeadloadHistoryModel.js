"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteHeadloadHistoryModel = exports.UpdateHeadloadHistoryModel = exports.CreateHeadloadHistoryModel = exports.AllHeadloadHistoryModel = void 0;
class AllHeadloadHistoryModel {
    constructor(data) {
        this.id = data.id;
        this.agentId = data.agentId.Id;
        this.headload = data.headload;
        this.cycleId = data.cycleId;
        this.accountNumber = data.accountNumber;
        this.routeId = data.routeId;
        this.routeName = data.routeName;
    }
}
exports.AllHeadloadHistoryModel = AllHeadloadHistoryModel;
class CreateHeadloadHistoryModel {
    constructor(data) {
        this.agentId = data.agentId.Id;
        this.headload = data.headload;
        this.cycleId = data.cycleId;
        this.accountNumber = data.accountNumber;
        this.routeId = data.routeId;
        this.routeName = data.routeName;
    }
}
exports.CreateHeadloadHistoryModel = CreateHeadloadHistoryModel;
class UpdateHeadloadHistoryModel {
    constructor(data) {
        this.agentId = data.agentId.Id;
        this.headload = data.headload;
        this.cycleId = data.cycleId;
        this.accountNumber = data.accountNumber;
        this.routeId = data.routeId;
        this.routeName = data.routeName;
    }
}
exports.UpdateHeadloadHistoryModel = UpdateHeadloadHistoryModel;
class DeleteHeadloadHistoryModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteHeadloadHistoryModel = DeleteHeadloadHistoryModel;
