"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBankModel = exports.UpdateBankModel = exports.CreateBankModel = exports.AllBankModel = void 0;
class AllBankModel {
    constructor(data) {
        this.id = data.id;
        this.bankName = data.bankName;
        this.isActive = data.isActive;
    }
}
exports.AllBankModel = AllBankModel;
class CreateBankModel {
    constructor(data) {
        this.bankName = data.bankName;
        this.isActive = data.isActive;
    }
}
exports.CreateBankModel = CreateBankModel;
class UpdateBankModel {
    constructor(data) {
        this.id = data.id;
        this.bankName = data.bankName;
        this.isActive = data.isActive;
    }
}
exports.UpdateBankModel = UpdateBankModel;
class DeleteBankModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteBankModel = DeleteBankModel;
