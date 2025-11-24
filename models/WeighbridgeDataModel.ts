class UpdateWeighbridgeData{
    constructor(data: any){
        this.id = data.id;
        this.weight = data.weight;
    }
    public id: number;
    public weight: number;
}

class GetWeighbridgeDataModel{
    public id: number;
    public weight: number;
    constructor(data: any){
        this.id = data.id;
        this.weight = data.weight;
    }
}

class UpdateWeighbridgeLabDataModel{
    constructor(data: any){
        this.id = data.id;
        this.fat = data.fat;
        this.snf = data.snf;
        this.clr = data.clr;
        this.protein = data.protein;
        this.lactose = data.lactose;
        this.salt = data.salt;
        this.water = data.water;
        this.temperature = data.temperature;
    }
    public id: number;
    public fat: number;
    public snf: number;
    public clr: number;
    public protein: number;
    public lactose: number;
    public salt: number;
    public water: number;
    public temperature: number;
}

class GetWeighbridgeLabDataModel{
    constructor(data: any){
        this.id = data.id;
        this.fat = data.fat;
        this.snf = data.snf;
        this.clr = data.clr;
        this.protein = data.protein;
        this.lactose = data.lactose;
        this.salt = data.salt;
        this.water = data.water;
        this.temperature = data.temperature;
    }
    public id: number;
    public fat: number;
    public snf: number;
    public clr: number;
    public protein: number;
    public lactose: number;
    public salt: number;
    public water: number;
    public temperature: number;
}

export { UpdateWeighbridgeData, GetWeighbridgeDataModel, GetWeighbridgeLabDataModel, UpdateWeighbridgeLabDataModel }