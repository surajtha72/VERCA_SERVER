"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAgentLedgerModel = exports.GetSnfReconcillationModel = exports.GetBankLetterAmountModel = exports.GetBankAdviceModel = exports.RateChartModel = exports.GetBillModelByBMCRoutes = exports.GetBillModelByBMC = exports.GetBillModel = exports.DeleteCycleMasterModel = exports.UpdateCycleMasterModel = exports.CreateCycleMasterModel = exports.AllCycleMasterModel = void 0;
class AllCycleMasterModel {
    constructor(data) {
        var _a;
        this.id = data.Id;
        this.financialYearId = (_a = data.financialYearId) !== null && _a !== void 0 ? _a : null;
        this.cycleNo = data.cycleNo;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.isFrozen = data.isFrozen;
    }
}
exports.AllCycleMasterModel = AllCycleMasterModel;
class GetBillModel {
    constructor(data) {
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    }
}
exports.GetBillModel = GetBillModel;
class CreateCycleMasterModel {
    constructor(data) {
        this.financialYearId = data.financialYearId;
        this.cycleNo = data.cycleNo;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    }
}
exports.CreateCycleMasterModel = CreateCycleMasterModel;
class GetBillModelByBMC {
    constructor(data) {
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.bmcId = data.bmcId;
        this.shift = data.shift;
        this.nextStartDate = data.nextStartDate;
        this.nextEndDate = data.nextEndDate;
    }
}
exports.GetBillModelByBMC = GetBillModelByBMC;
class GetAgentLedgerModel {
    constructor(data) {
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.agentId = data.agentId;
    }
}
exports.GetAgentLedgerModel = GetAgentLedgerModel;
class GetSnfReconcillationModel {
    constructor(data) {
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.shift = data.shift;
        this.bmcId = data.bmcId;
    }
}
exports.GetSnfReconcillationModel = GetSnfReconcillationModel;
class GetBillModelByBMCRoutes {
    constructor(data) {
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.bmcId = data.bmcId;
        this.routeId = data.routeId;
    }
}
exports.GetBillModelByBMCRoutes = GetBillModelByBMCRoutes;
class GetBankLetterAmountModel {
    constructor(data) {
        this.bmcId = data.bmcId;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    }
}
exports.GetBankLetterAmountModel = GetBankLetterAmountModel;
class GetBankAdviceModel {
    constructor(data) {
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.bmcId = data.bmcId;
    }
}
exports.GetBankAdviceModel = GetBankAdviceModel;
class UpdateCycleMasterModel {
    constructor(data) {
        this.id = data.id;
        this.financialYearId = data.financialYearId;
        this.cycleNo = data.cycleNo;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    }
}
exports.UpdateCycleMasterModel = UpdateCycleMasterModel;
class DeleteCycleMasterModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteCycleMasterModel = DeleteCycleMasterModel;
class RateChartModel {
    constructor(data) {
        this.rates = data.rate;
    }
}
exports.RateChartModel = RateChartModel;
