"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductStockModel = exports.UpdateProductStockModel = exports.CreateProductStockModel = exports.AllProductStockModel = void 0;
class AllProductStockModel {
    constructor(data) {
        this.id = data.id;
        this.indentId = data.indentId;
        this.productMaster = data.productMaster;
        this.organizationUnit = data.organizationUnit;
        this.availableQty = data.availableQty;
        this.dispatchQty = data.dispatchQty;
        this.totalQty = data.totalQty;
        this.isComplete = data.isComplete;
    }
}
exports.AllProductStockModel = AllProductStockModel;
class CreateProductStockModel {
    constructor(data) {
        this.id = data.id;
        this.indentId = data.indentId;
        this.productMaster = data.productMaster;
        this.organizationUnit = data.organizationUnit;
        this.availableQty = data.availableQty;
        this.dispatchQty = data.dispatchQty;
        this.totalQty = data.totalQty;
        this.isComplete = data.isComplete;
    }
}
exports.CreateProductStockModel = CreateProductStockModel;
class UpdateProductStockModel {
    constructor(data) {
        this.id = data.id;
        this.indentId = data.indentId;
        this.productMaster = data.productMaster;
        this.organizationUnit = data.organizationUnit;
        this.availableQty = data.availableQty;
        this.dispatchQty = data.dispatchQty;
        this.totalQty = data.totalQty;
        this.isComplete = data.isComplete;
    }
}
exports.UpdateProductStockModel = UpdateProductStockModel;
class DeleteProductStockModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteProductStockModel = DeleteProductStockModel;
