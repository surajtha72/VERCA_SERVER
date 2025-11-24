import { ProductCategory } from "../entities/ProductCategory";

class AllProductMasterModel {
    constructor(data: any) {
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
    public id: number;
    public productCategId: ProductCategory;
    public productName: string;
    public description: string;
    public supplierMake: string;
    public batchNo: string;
    public mfgDate: Date;
    public expDate: Date;
    public recorderLevel: number;
    public leadTimeInDelay: number;
    public unitQtyUomId: number;
    public unitQtyPurchasePrice: number;
    public unitQtySupplyPrice: number;
    public taxOnSupply: number;
    public unitQtyIncentiveAmount: number;
    public openingBalanceQty: number;
    public openingBalanceDate: Date;
    public isActive: boolean;
}

class CreateProductMasterModel {
    constructor(data: any) {
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
    public productCategId: ProductCategory;
    public productName: string;
    public description: string;
    public supplierMake: string;
    public batchNo: string;
    public mfgDate: Date;
    public expDate: Date;
    public recorderLevel: number;
    public leadTimeInDelay: number;
    public unitQtyUomId: number;
    public unitQtyPurchasePrice: number;
    public unitQtySupplyPrice: number;
    public taxOnSupply: number;
    public unitQtyIncentiveAmount: number;
    public openingBalanceQty: number;
    public openingBalanceDate: Date;
    public isActive: boolean;
}

class UpdateProductMasterModel {
    constructor(data: any) {
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
    public id: number;
    public productCategId: ProductCategory;
    public productName: string;
    public description: string;
    public supplierMake: string;
    public batchNo: string;
    public mfgDate: Date;
    public expDate: Date;
    public recorderLevel: number;
    public leadTimeInDelay: number;
    public unitQtyUomId: number;
    public unitQtyPurchasePrice: number;
    public unitQtySupplyPrice: number;
    public taxOnSupply: number;
    public unitQtyIncentiveAmount: number;
    public openingBalanceQty: number;
    public openingBalanceDate: Date;
    public isActive: boolean;
}

class DeleteProductMasterModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export { AllProductMasterModel, CreateProductMasterModel, UpdateProductMasterModel, DeleteProductMasterModel };