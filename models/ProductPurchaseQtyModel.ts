import { ProductMaster } from "../entities/ProductMaster";

class AllProductPurchaseQtyModel {
    constructor(data: any) {
        this.id = data.id;
        this.productId = data.productId;
        this.invoiceNo = data.invoiceNo;
        this.purchaseDate = data.purchaseDate
        this.quantity = data.quantity;
        this.isActive = data.isActive;
    }
    public id: number;
    public productId: ProductMaster;
    public invoiceNo: string;
    public purchaseDate: Date;
    public quantity: number;
    public isActive: boolean;
}

class CreateProductPurchaseQtyModel {
    constructor(data: any) {
        this.productId = data.productId;
        this.invoiceNo = data.invoiceNo;
        this.purchaseDate = data.purchaseDate
        this.quantity = data.quantity;
        this.isActive = data.isActive;
    }
    public productId: ProductMaster;
    public invoiceNo: string;
    public purchaseDate: Date;
    public quantity: number;
    public isActive: boolean;
}

class UpdateProductPurchaseQtyModel {
    constructor(data: any) {
        this.id = data.id;
        this.productId = data.productId;
        this.purchaseDate = data.purchaseDate
        this.invoiceNo = data.invoiceNo;
        this.quantity = data.quantity;
        this.isActive = data.isActive;
    }
    public id: number;
    public productId: ProductMaster;
    public invoiceNo: string;
    public purchaseDate: Date;
    public quantity: number;
    public isActive: boolean;
}

class DeleteProductPurchaseQtyModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export { AllProductPurchaseQtyModel, CreateProductPurchaseQtyModel, UpdateProductPurchaseQtyModel, DeleteProductPurchaseQtyModel };