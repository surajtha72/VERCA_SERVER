"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllPermissionsModel = void 0;
class AllPermissionsModel {
    constructor(data) {
        this.id = data.id;
        this.shortName = data.shortName;
        this.description = data.description;
        this.action = data.action;
        this.entityId = data.entityId;
    }
}
exports.AllPermissionsModel = AllPermissionsModel;
