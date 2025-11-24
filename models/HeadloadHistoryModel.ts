class AllHeadloadHistoryModel {
    constructor(data: any) {
        this.id = data.id;
        this.agentId = data.agentId.Id;
        this.headload = data.headload;
        this.cycleId = data.cycleId;
        this.accountNumber = data.accountNumber;
        this.routeId = data.routeId;
        this.routeName = data.routeName;
    }
    public id: number;
    public agentId: number;
    public headload: number;
    public cycleId : number;
    public accountNumber : string;
    public routeId : number;
    public routeName : string;
}

class CreateHeadloadHistoryModel {
    constructor(data: any) {
        this.agentId = data.agentId.Id;
        this.headload = data.headload;
        this.cycleId = data.cycleId;
        this.accountNumber = data.accountNumber;
        this.routeId = data.routeId;
        this.routeName = data.routeName;
    }
    public agentId: number;
    public headload: number;
    public cycleId : number;
    public accountNumber : string;
    public routeId : number;
    public routeName : string;
}

class UpdateHeadloadHistoryModel {
    constructor(data: any) {
        this.agentId = data.agentId.Id;
        this.headload = data.headload;
        this.cycleId = data.cycleId;
        this.accountNumber = data.accountNumber;
        this.routeId = data.routeId;
        this.routeName = data.routeName;
    }
    public agentId: number;
    public headload: number;
    public cycleId : number;
    public accountNumber : string;
    public routeId : number;
    public routeName : string;
}

class DeleteHeadloadHistoryModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export{AllHeadloadHistoryModel,CreateHeadloadHistoryModel, UpdateHeadloadHistoryModel, DeleteHeadloadHistoryModel}