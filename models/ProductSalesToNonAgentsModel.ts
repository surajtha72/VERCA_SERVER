import { Organization } from "../entities/Organization";
import { ProductMaster } from "../entities/ProductMaster";
import { ProductsSoldToNonAgents } from "../entities/ProductsSoldToNonAgents";
import { CreateProductsSoldToNonAgentsModel } from "./ProductsSoldToNonAgentsModel";


class GetProductSalesToNonAgentsModel {
    public id: number;
    public invoiceNumber: string;
    public soldToNonAgents: Organization;
    public totalAmount: number;
    public paymentMode: string;
    public paidAmount: number;
    public balance: number;

    constructor(data: any) {
        this.id = data.id;
        this.invoiceNumber = data.invoiceNumber;
        this.soldToNonAgents = data.soldToNonAgents;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
    }
}

class CreateProductSalesToNonAgentsModel {
    public invoiceNumber: string;
    public soldToNonAgents: Organization;
    public totalAmount: number;
    public paymentMode: string;
    public paidAmount: number;
    public balance: number;
    public soldProducts: CreateProductsSoldToNonAgentsModel[];
    public createdAt: Date;
    constructor(data: any) {
        this.invoiceNumber = data.invoiceNumber;
        this.soldToNonAgents = data.soldToNonAgents;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
        this.soldProducts = data.soldProducts;
        this.createdAt = data.createdAt;
    }
}

class UpdateProductSalesToNonAgentsModel {
    public id: number;
    public invoiceNumber: string;
    public soldToNonAgents: Organization;
    public totalAmount: number;
    public paymentMode: string;
    public paidAmount: number;
    public balance: number;
    public soldProducts: CreateProductsSoldToNonAgentsModel[];
    constructor(data: any) {
        this.id = data.id;
        this.invoiceNumber = data.invoiceNumber;
        this.soldToNonAgents = data.soldToNonAgents;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
        this.soldProducts = data.soldProducts;
    }
}

class DeleteProductSalesToNonAgentsModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export  { GetProductSalesToNonAgentsModel, CreateProductSalesToNonAgentsModel, UpdateProductSalesToNonAgentsModel, DeleteProductSalesToNonAgentsModel }