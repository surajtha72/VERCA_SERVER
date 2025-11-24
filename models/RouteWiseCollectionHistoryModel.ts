class AllRouteWiseCollectionHistoryModel {
  constructor(data: any) {
    this.histId = data.histId;
    this.cycleId = data.cycleId;
    this.id = data.id;
    this.routeName = data.routeName;
    this.routeOwner = data.routeOwner;
  }
  public histId: number;
  public id: number;
  public cycleId: number;
  public routeName: string;
  public routeOwner: number;
}

class CreateRouteWiseCollectionHistoryModel {
  constructor(data: any) {
    this.cycleId = data.cycleId;
    this.id = data.id;
    this.routeName = data.routeName;
    this.routeOwner = data.routeOwner;
  }
  public id: number;
  public cycleId: number;
  public routeName: string;
  public routeOwner: number;
}

class UpdateRouteWiseCollectionHistoryModel {
  constructor(data: any) {
    this.cycleId = data.cycleId;
    this.id = data.id;
    this.routeName = data.routeName;
    this.routeOwner = data.routeOwner;
  }
  public id: number;
  public cycleId: number;
  public routeName: string;
  public routeOwner: number;
}

class DeleteRouteWiseCollectionHistoryModel {
  constructor(data: any) {
    this.histId = data.histId;
  }
  public histId: number;
}

export {
  AllRouteWiseCollectionHistoryModel,
  CreateRouteWiseCollectionHistoryModel,
  UpdateRouteWiseCollectionHistoryModel,
  DeleteRouteWiseCollectionHistoryModel,
};
