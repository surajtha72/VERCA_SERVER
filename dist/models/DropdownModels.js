"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftsModel = exports.OrganizationUnitTypesModel = exports.DefaultCollectionModel = exports.procurementCenterTypeModel = exports.PayrollModel = void 0;
class PayrollModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.shortName = data.shortName;
    }
}
exports.PayrollModel = PayrollModel;
class procurementCenterTypeModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.shortName = data.shortName;
    }
}
exports.procurementCenterTypeModel = procurementCenterTypeModel;
class DefaultCollectionModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.shortName = data.shortName;
    }
}
exports.DefaultCollectionModel = DefaultCollectionModel;
class OrganizationUnitTypesModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.shortName = data.shortName;
        this.isProcurementCenter = data.isProcurementCenter;
    }
}
exports.OrganizationUnitTypesModel = OrganizationUnitTypesModel;
class ShiftsModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.index = data.index;
    }
}
exports.ShiftsModel = ShiftsModel;
