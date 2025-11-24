class AllRouteStopsModel {
    constructor(data: any) {
        this.id = data.id;
        this.routeId = data.routeId.Id ?? null;
        this.routeName = data.routeName.Name ?? null;
        this.sequenceNo = data.sequenceNo;
        this.stopId = data.stopId.Id ?? null;
        this.stopId = data.stopId.Name ?? null;
        this.stopName = data.stopName;
        this.travelKms = data.travelKms;
    }
    public id: number;
    public routeId: number;
    public routeName: string;
    public sequenceNo: number;
    public stopId: number;
    public stopName: string;
    public travelKms: number;
}

class CreateRouteStopsModel {
    constructor(data: any) {
        this.routeId = data.routeId;
        this.sequenceNo = data.sequenceNo;
        this.stopId = data.stopId;
        this.travelKms = data.travelKms;
    }
    public routeId: number;
    public sequenceNo: number;
    public stopId: number;
    public travelKms: number;
}

class UpdateRouteStopsModel {
    constructor(data: any) {
        this.id = data.id;
        this.routeId = data.routeId;
        this.sequenceNo = data.sequenceNo;
        this.stopId = data.stopId;
        this.travelKms = data.travelKms;
    }
    public id: number;
    public routeId: number;
    public sequenceNo: number;
    public stopId: number;
    public travelKms: number;
}

class DeleteRouteStopsModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export{AllRouteStopsModel,CreateRouteStopsModel, UpdateRouteStopsModel, DeleteRouteStopsModel}