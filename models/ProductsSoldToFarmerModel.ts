import { ProductMaster } from "../entities/ProductMaster";
import { ProductSalesToFarmer } from "../entities/ProductSalesToFarmer";

class GetProductsSoldToFarmerModel{
    public id:number;
    public productSalesToFarmer: ProductSalesToFarmer;
    public productId: ProductMaster
    public quantity: number;
    public rate: number;
    constructor(data: any){
        this.id = data.id;
        this.productSalesToFarmer = data.productSalesToFarmer;
        this.productId = data.productId;
        this.quantity = data.quantity;
        this.rate = data.rate;
    }
}

class CreateProductsSoldToFarmerModel{

    public productSalesToFarmer: ProductSalesToFarmer;
    public productId: number
    public quantity: number;
    public rate: number;
    constructor(data: any){
        this.productSalesToFarmer = data.productSalesToFarmer;
        this.productId = data.productId;
        this.quantity = data.quantity;
        this.rate = data.rate;
    }
    
}

export { GetProductsSoldToFarmerModel, CreateProductsSoldToFarmerModel }