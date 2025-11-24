"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductCategoryModel = exports.UpdateProductCategoryModel = exports.CreateProductCategoryModel = exports.AllProductCategoryModel = void 0;
class AllProductCategoryModel {
    constructor(data) {
        this.id = data.id;
        this.categoryName = data.categoryName;
        this.shortDescription = data.shortDescription;
        this.isActive = data.isActive;
    }
}
exports.AllProductCategoryModel = AllProductCategoryModel;
class CreateProductCategoryModel {
    constructor(data) {
        this.categoryName = data.categoryName;
        this.shortDescription = data.shortDescription;
        this.isActive = data.isActive;
    }
}
exports.CreateProductCategoryModel = CreateProductCategoryModel;
class UpdateProductCategoryModel {
    constructor(data) {
        this.id = data.id;
        this.categoryName = data.categoryName;
        this.shortDescription = data.shortDescription;
        this.isActive = data.isActive;
    }
}
exports.UpdateProductCategoryModel = UpdateProductCategoryModel;
class DeleteProductCategoryModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteProductCategoryModel = DeleteProductCategoryModel;
