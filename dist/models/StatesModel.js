"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteStateModel = exports.CreateStateModel = exports.UpdateStateModel = exports.AllStatesModel = void 0;
class AllStatesModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.stateCode = data.stateCode;
    }
}
exports.AllStatesModel = AllStatesModel;
class CreateStateModel {
    constructor(data) {
        this.name = data.name;
        this.stateCode = data.stateCode;
    }
}
exports.CreateStateModel = CreateStateModel;
class UpdateStateModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.stateCode = data.stateCode;
    }
}
exports.UpdateStateModel = UpdateStateModel;
class DeleteStateModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteStateModel = DeleteStateModel;
