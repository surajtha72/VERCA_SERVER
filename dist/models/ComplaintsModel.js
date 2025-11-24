"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteComplaintModel = exports.UpdateComplaintModel = exports.CreateComplaintModel = exports.GetComplaintsModel = void 0;
class GetComplaintsModel {
    constructor(data) {
        this.id = data.id;
        this.agentId = data.id;
        this.billingCycleId = data.billingCycleId;
        this.settlementAmount = data.settlementAmount;
        this.complaint = data.complaint;
        this.toBeSettledStartDate = data.toBeSettledStartDate;
        this.toBeSettledEndDate = data.toBeSettledEndDate;
    }
}
exports.GetComplaintsModel = GetComplaintsModel;
class CreateComplaintModel {
    constructor(data) {
        this.agentId = data.agentId;
        this.billingCycleId = data.billingCycleId;
        this.settlementAmount = data.settlementAmount;
        this.complaint = data.complaint;
        this.toBeSettledStartDate = data.toBeSettledStartDate;
        this.toBeSettledEndDate = data.toBeSettledEndDate;
    }
}
exports.CreateComplaintModel = CreateComplaintModel;
class UpdateComplaintModel {
    constructor(data) {
        this.id = data.id;
        this.agentId = data.agentId;
        this.billingCycleId = data.billingCycleId;
        this.settlementAmount = data.settlementAmount;
        this.complaint = data.complaint;
        this.toBeSettledStartDate = data.toBeSettledStartDate;
        this.toBeSettledEndDate = data.toBeSettledEndDate;
    }
}
exports.UpdateComplaintModel = UpdateComplaintModel;
class DeleteComplaintModel {
    constructor(id) {
        this.id = id;
    }
}
exports.DeleteComplaintModel = DeleteComplaintModel;
