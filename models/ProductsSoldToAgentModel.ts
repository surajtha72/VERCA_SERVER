import { ProductMaster } from "../entities/ProductMaster";
import { ProductSalesToAgent } from "../entities/ProductSalesToAgent";

class GetProductsSoldToAgentModel{
    public id:number;
    public productSalesToAgent: ProductSalesToAgent;
    public productId: ProductMaster
    public quantity: number;
    public rate: number;
    constructor(data: any){
        this.id = data.id;
        this.productSalesToAgent = data.productSalesToAgent;
        this.productId = data.productId;
        this.quantity = data.quantity;
        this.rate = data.rate;
    }
}

class CeateProductsSoldToAgentModel{
    public productSalesToAgent: ProductSalesToAgent;
    public productId: number
    public quantity: number;
    public rate: number;
    constructor(data: any){
        this.productSalesToAgent = data.productSalesToAgent;
        this.productId = data.productId;
        this.quantity = data.quantity;
        this.rate = data.rate;
    }
}

export { GetProductsSoldToAgentModel, CeateProductsSoldToAgentModel }