"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DCNumberModel = exports.DeleteProductSupplyModel = exports.UpdateProductSupplyModel = exports.CreateProductSupplyModel = exports.AllProductSupplyModel = void 0;
class AllProductSupplyModel {
    constructor(data) {
        this.id = data.id;
        this.indentStatus = data.indentStatus;
        this.indentRaisedBy = data.indentRaisedBy;
        this.indentRaisedFor = data.indentRaisedFor;
        this.indentRaisedOnDate = data.indentRaisedOnDate;
        this.indentApprovedBy = data.indentApprovedBy;
        this.indentRejectedBy = data.indentRejectedBy;
        this.approvedOnDate = data.approvedOnDate;
        this.dispatchByEmployee = data.dispatchByEmployee;
        this.dispatchDate = data.dispatchDate;
        this.receivedByUserId = data.receivedByUserId;
        this.receivedOn = data.receivedOn;
        this.isActive = data.isActive;
        this.dcNumber = data.dcNumber;
        this.rejectReason = data.rejectReason;
    }
}
exports.AllProductSupplyModel = AllProductSupplyModel;
class DCNumberModel {
    constructor(data) {
        this.id = data.id;
        this.dcNumber = data.dcNumber;
    }
}
exports.DCNumberModel = DCNumberModel;
class CreateProductSupplyModel {
    constructor(data) {
        this.id = data.id;
        this.indentStatus = data.indentStatus;
        this.indentRaisedBy = data.indentRaisedBy;
        this.indentRaisedFor = data.indentRaisedFor;
        this.indentRaisedOnDate = data.indentRaisedOnDate;
        this.isActive = data.isActive;
        this.indentProducts = data.indentProducts;
    }
}
exports.CreateProductSupplyModel = CreateProductSupplyModel;
class UpdateProductSupplyModel {
    constructor(data) {
        this.id = data.id;
        this.indentStatus = data.indentStatus;
        this.indentRaisedBy = data.indentRaisedBy;
        this.indentRaisedFor = data.indentRaisedFor;
        this.indentRaisedOnDate = data.indentRaisedOnDate;
        this.indentApprovedBy = data.indentApprovedBy;
        this.indentRejectedBy = data.indentRejectedBy;
        this.approvedOnDate = data.approvedOnDate;
        this.dispatchByEmployee = data.dispatchByEmployee;
        this.dispatchDate = data.dispatchDate;
        this.receivedByUserId = data.receivedByUserId;
        this.receivedOn = data.receivedOn;
        this.isActive = data.isActive;
        this.rejectReason = data.rejectReason;
        this.dcNumber = data.dcNumber;
        this.indentProducts = data.indentProducts;
    }
}
exports.UpdateProductSupplyModel = UpdateProductSupplyModel;
class DeleteProductSupplyModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteProductSupplyModel = DeleteProductSupplyModel;
