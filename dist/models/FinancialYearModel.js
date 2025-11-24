"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFinancialYearModel = exports.UpdateFinancialYearModel = exports.CreateFinancialYearModel = exports.AllFinancialYearModel = void 0;
class AllFinancialYearModel {
    constructor(data) {
        this.id = data.id;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    }
}
exports.AllFinancialYearModel = AllFinancialYearModel;
class CreateFinancialYearModel {
    constructor(data) {
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    }
}
exports.CreateFinancialYearModel = CreateFinancialYearModel;
class UpdateFinancialYearModel {
    constructor(data) {
        this.id = data.id;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    }
}
exports.UpdateFinancialYearModel = UpdateFinancialYearModel;
class DeleteFinancialYearModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteFinancialYearModel = DeleteFinancialYearModel;
