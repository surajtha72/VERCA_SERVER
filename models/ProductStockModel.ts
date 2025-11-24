import { Organization } from "../entities/Organization";
import { ProductMaster } from "../entities/ProductMaster";
import { ProductSupply } from "../entities/ProductSupply";

class AllProductStockModel {
    constructor(data: any) {
        this.id = data.id;
        this.indentId = data.indentId;
        this.productMaster = data.productMaster;
        this.organizationUnit = data.organizationUnit;
        this.availableQty = data.availableQty;
        this.dispatchQty = data.dispatchQty;
        this.totalQty = data.totalQty;
        this.isComplete = data.isComplete;
    }
    public id: string;
    public indentId: ProductSupply
    public productMaster: ProductMaster;
    public organizationUnit: Organization;
    public availableQty: number;
    public dispatchQty: number;
    public totalQty: number;
    public isComplete: boolean;
}

class CreateProductStockModel {
    constructor(data: any) {
        this.id = data.id;
        this.indentId = data.indentId;
        this.productMaster = data.productMaster;
        this.organizationUnit = data.organizationUnit;
        this.availableQty = data.availableQty;
        this.dispatchQty = data.dispatchQty;
        this.totalQty = data.totalQty;
        this.isComplete = data.isComplete;
    }
    public id: string;
    public indentId: ProductSupply
    public productMaster: ProductMaster;
    public organizationUnit: Organization;
    public availableQty: number;
    public dispatchQty: number;
    public totalQty: number;
    public isComplete: boolean;
}

class UpdateProductStockModel {
    constructor(data: any) {
        this.id = data.id;
        this.indentId = data.indentId;
        this.productMaster = data.productMaster;
        this.organizationUnit = data.organizationUnit;
        this.availableQty = data.availableQty;
        this.dispatchQty = data.dispatchQty;
        this.totalQty = data.totalQty;
        this.isComplete = data.isComplete;
    }
    public id: string;
    public indentId: ProductSupply
    public productMaster: ProductMaster;
    public organizationUnit: Organization;
    public availableQty: number;
    public dispatchQty: number;
    public totalQty: number;
    public isComplete: boolean;
}

class DeleteProductStockModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: string;
}

export { AllProductStockModel, CreateProductStockModel, UpdateProductStockModel, DeleteProductStockModel };