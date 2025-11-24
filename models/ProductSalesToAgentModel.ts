import { Organization } from "../entities/Organization";
import { ProductMaster } from "../entities/ProductMaster";
import { ProductsSoldToAgent } from "../entities/ProductsSoldToAgent";
import { CeateProductsSoldToAgentModel, GetProductsSoldToAgentModel } from "./ProductsSoldToAgentModel";

class GetProductSalesToAgentModel {
    public id: number;
    public invoiceNumber: string;
    public soldToAgent: Organization;
    public totalAmount: number;
    public paymentMode: string;
    public paidAmount: number;
    public balance: number;

    constructor(data: any) {
        this.id = data.id;
        this.invoiceNumber = data.invoiceNumber;
        this.soldToAgent = data.soldToAgent;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
    }
}

class CreateProductSalesToAgentModel {
    public invoiceNumber: string;
    public soldToAgent: Organization;
    public totalAmount: number;
    public paymentMode: string;
    public paidAmount: number;
    public balance: number;
    public soldProducts: CeateProductsSoldToAgentModel[];
    public createdAt: Date;
    constructor(data: any) {
        this.invoiceNumber = data.invoiceNumber;
        this.soldToAgent = data.soldToAgent;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
        this.soldProducts = data.soldProducts;
        this.createdAt = data.createdAt;
    }
}

class UpdateProductSalesToAgentModel {
    public id: number;
    public invoiceNumber: string;
    public soldToAgent: Organization;
    public totalAmount: number;
    public paymentMode: string;
    public paidAmount: number;
    public balance: number;
    public soldProducts: CeateProductsSoldToAgentModel[];
    constructor(data: any) {
        this.id = data.id;
        this.invoiceNumber = data.invoiceNumber;
        this.soldToAgent = data.soldToAgent;
        this.totalAmount = data.totalAmount;
        this.paymentMode = data.paymentMode;
        this.paidAmount = data.paidAmount;
        this.balance = data.balance;
        this.soldProducts = data.soldProducts;
    }
}

class DeleteProductSalesToAgentModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export  { GetProductSalesToAgentModel, CreateProductSalesToAgentModel, UpdateProductSalesToAgentModel, DeleteProductSalesToAgentModel }