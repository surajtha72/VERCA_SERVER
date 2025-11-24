import { Organization } from "../entities/Organization";
import { ProductMaster } from "../entities/ProductMaster";
import { ProductsSoldToFarmer } from "../entities/ProductsSoldToFarmer";
import { CreateProductsSoldToFarmerModel } from "./ProductsSoldToFarmerModel";


class GetProductSalesToFarmerModel {
    public id: number;
    public invoiceNumber: string;
    public soldToFarmer: Organization;
    public totalAmount: number;
    public paymentMode: string;
    public paidAmount: number;
    public balance: number;

    constructor(data: any) {
        this.id = data.id;
        this.invoiceNumber = data.invoiceNumber;
        this.soldToFarmer = data.soldToFarmer;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
    }
}

class CreateProductSalesToFarmerModel {
    public invoiceNumber: string;
    public soldToFarmer: Organization;
    public totalAmount: number;
    public paymentMode: string;
    public paidAmount: number;
    public balance: number;
    public soldProducts: CreateProductsSoldToFarmerModel[];
    public createdAt: Date;
    constructor(data: any) {
        this.invoiceNumber = data.invoiceNumber;
        this.soldToFarmer = data.soldToFarmer;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
        this.soldProducts = data.soldProducts;
        this.createdAt = data.createdAt;
    }
}

class UpdateProductSalesToFarmerModel {
    public id: number;
    public invoiceNumber: string;
    public soldToFarmer: Organization;
    public totalAmount: number;
    public paymentMode: string;
    public paidAmount: number;
    public balance: number;
    public soldProducts: CreateProductsSoldToFarmerModel[];
    constructor(data: any) {
        this.id = data.id;
        this.invoiceNumber = data.invoiceNumber;
        this.soldToFarmer = data.soldToFarmer;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
        this.soldProducts = data.soldProducts;
    }
}

class DeleteProductSalesToFarmerModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export  { GetProductSalesToFarmerModel, CreateProductSalesToFarmerModel, UpdateProductSalesToFarmerModel, DeleteProductSalesToFarmerModel }