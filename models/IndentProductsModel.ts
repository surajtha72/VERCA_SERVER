import { ProductSupply } from "../entities/ProductSupply";
import { ProductMaster } from "../entities/ProductMaster";
import { User } from "../entities/User";

class AllIndentProductsModel {
    constructor(data: any) {
        this.id = data.id;
        this.indentId = data.indentId;
        this.productId = data.productId;
        this.availableQty = data.availableQty;
        this.rate = data.rate;
        this.requestedQty = data.requestedQty;
        this.approvedQty = data.approvedQty;
        this.dispatchQty = data.dispatchQty;
        this.reveivedQty = data.reveivedQty;
        this.isActive = data.isActive;
        this.createdBy = data.createdBy;
    }
    public id: string;
    public indentId: ProductSupply;
    public productId: ProductMaster;
    public availableQty: number;
    public rate: number;
    public requestedQty: number;
    public approvedQty: number;
    public dispatchQty: number;
    public reveivedQty: number;
    public isActive: boolean;
    public createdBy: number;
}

class CreateIndentProductsModel {
    constructor(data: any) {
        this.id = data.id;
        this.indentId = data.indentId;
        this.productId = data.productId;
        this.availableQty = data.availableQty;
        this.rate = data.rate;
        this.requestedQty = data.requestedQty;
        this.approvedQty = data.approvedQty;
        this.dispatchQty = data.dispatchQty;
        this.reveivedQty = data.reveivedQty;
        this.isActive = data.isActive;
    }
    public id: string;
    public indentId: ProductSupply;
    public productId: ProductMaster;
    public availableQty: number;
    public rate: number;
    public requestedQty: number;
    public approvedQty: number;
    public dispatchQty: number;
    public reveivedQty: number;
    public isActive: boolean;
}

class UpdateIndentProductsModel {
    constructor(data: any) {
        this.id = data.id;
        this.indentId = data.indentId;
        this.productId = data.productId;
        this.availableQty = data.availableQty;
        this.rate = data.rate;
        this.requestedQty = data.requestedQty;
        this.approvedQty = data.approvedQty;
        this.receivedQty = data.receivedQty;
        this.dispatchQty = data.dispatchQty;
        this.reveivedQty = data.reveivedQty;
        this.isActive = data.isActive;
    }
    public id: string;
    public indentId: ProductSupply;
    public productId: ProductMaster;
    public availableQty: number;
    public rate: number;
    public requestedQty: number;
    public approvedQty: number;
    public receivedQty: number;
    public dispatchQty: number;
    public reveivedQty: number;
    public isActive: boolean;
}

class DeleteIndentProductsModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: string;
}

export { AllIndentProductsModel, CreateIndentProductsModel, UpdateIndentProductsModel, DeleteIndentProductsModel };