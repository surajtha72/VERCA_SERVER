"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBankBranchModel = exports.UpdateBankBranchModel = exports.CreateBankBranchModel = exports.AllBrnkBranchModel = void 0;
class AllBrnkBranchModel {
    constructor(data) {
        this.id = data.id;
        this.bankId = data.bankId;
        this.branchName = data.branchName;
        this.ifscCode = data.ifscCode;
        this.address = data.address;
        this.isActive = data.isActive;
    }
}
exports.AllBrnkBranchModel = AllBrnkBranchModel;
class CreateBankBranchModel {
    constructor(data) {
        this.bankId = data.bankId;
        this.branchName = data.branchName;
        this.ifscCode = data.ifscCode;
        this.address = data.address;
        this.isActive = data.isActive;
    }
}
exports.CreateBankBranchModel = CreateBankBranchModel;
class UpdateBankBranchModel {
    constructor(data) {
        this.id = data.id;
        this.bankId = data.bankId;
        this.branchName = data.branchName;
        this.ifscCode = data.ifscCode;
        this.address = data.address;
        this.isActive = data.isActive;
    }
}
exports.UpdateBankBranchModel = UpdateBankBranchModel;
class DeleteBankBranchModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteBankBranchModel = DeleteBankBranchModel;
