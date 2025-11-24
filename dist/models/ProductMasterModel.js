"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductMasterModel = exports.UpdateProductMasterModel = exports.CreateProductMasterModel = exports.AllProductMasterModel = void 0;
class AllProductMasterModel {
    constructor(data) {
        this.id = data.id;
        this.productCategId = data.productCategId;
        this.productName = data.productName;
        this.description = data.description;
        this.supplierMake = data.supplierMake;
        this.batchNo = data.batchNo;
        this.mfgDate = data.mfgDate;
        this.expDate = data.expDate;
        this.recorderLevel = data.recorderLevel;
        this.leadTimeInDelay = data.leadTimeInDelay;
        this.unitQtyUomId = data.unitQtyUomId;
        this.unitQtyPurchasePrice = data.unitQtyPurchasePrice;
        this.unitQtySupplyPrice = data.unitQtySupplyPrice;
        this.taxOnSupply = data.taxOnSupply;
        this.unitQtyIncentiveAmount = data.unitQtyIncentiveAmount;
        this.openingBalanceQty = data.openingBalanceQty;
        this.openingBalanceDate = data.openingBalanceDate;
        this.isActive = data.isActive;
    }
}
exports.AllProductMasterModel = AllProductMasterModel;
class CreateProductMasterModel {
    constructor(data) {
        this.productCategId = data.productCategId;
        this.productName = data.productName;
        this.description = data.description;
        this.supplierMake = data.supplierMake;
        this.batchNo = data.batchNo;
        this.mfgDate = data.mfgDate;
        this.expDate = data.expDate;
        this.recorderLevel = data.recorderLevel;
        this.leadTimeInDelay = data.leadTimeInDelay;
        this.unitQtyUomId = data.unitQtyUomId;
        this.unitQtyPurchasePrice = data.unitQtyPurchasePrice;
        this.unitQtySupplyPrice = data.unitQtySupplyPrice;
        this.taxOnSupply = data.taxOnSupply;
        this.unitQtyIncentiveAmount = data.unitQtyIncentiveAmount;
        this.openingBalanceQty = data.openingBalanceQty;
        this.openingBalanceDate = data.openingBalanceDate;
        this.isActive = data.isActive;
    }
}
exports.CreateProductMasterModel = CreateProductMasterModel;
class UpdateProductMasterModel {
    constructor(data) {
        this.id = data.id;
        this.productCategId = data.productCategId;
        this.productName = data.productName;
        this.description = data.description;
        this.supplierMake = data.supplierMake;
        this.batchNo = data.batchNo;
        this.mfgDate = data.mfgDate;
        this.expDate = data.expDate;
        this.recorderLevel = data.recorderLevel;
        this.leadTimeInDelay = data.leadTimeInDelay;
        this.unitQtyUomId = data.unitQtyUomId;
        this.unitQtyPurchasePrice = data.unitQtyPurchasePrice;
        this.unitQtySupplyPrice = data.unitQtySupplyPrice;
        this.taxOnSupply = data.taxOnSupply;
        this.unitQtyIncentiveAmount = data.unitQtyIncentiveAmount;
        this.openingBalanceQty = data.openingBalanceQty;
        this.openingBalanceDate = data.openingBalanceDate;
        this.isActive = data.isActive;
    }
}
exports.UpdateProductMasterModel = UpdateProductMasterModel;
class DeleteProductMasterModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteProductMasterModel = DeleteProductMasterModel;
