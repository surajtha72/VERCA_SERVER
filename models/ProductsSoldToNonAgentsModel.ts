import { ProductMaster } from "../entities/ProductMaster";
import { ProductSalesToNonAgents } from "../entities/ProductSalesToNonAgents";

class GetProductsSoldToNonAgentsModel{
    public id:number;
    public productSalesToNonAgents: ProductSalesToNonAgents;
    public productId: ProductMaster
    public quantity: number;
    public rate: number;
    constructor(data: any){
        this.id = data.id;
        this.productSalesToNonAgents = data.productSalesToNonAgents;
        this.productId = data.productId;
        this.quantity = data.quantity;
        this.rate = data.rate;
    }
}

class CreateProductsSoldToNonAgentsModel{

    public productSalesToNonAgents: ProductSalesToNonAgents;
    public productId: number
    public quantity: number;
    public rate: number;
    constructor(data: any){
        this.productSalesToNonAgents = data.productSalesToNonAgents;
        this.productId = data.productId;
        this.quantity = data.quantity;
        this.rate = data.rate;
    }
    
}

export { GetProductsSoldToNonAgentsModel, CreateProductsSoldToNonAgentsModel }