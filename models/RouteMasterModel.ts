import { RouteType } from "../entities/RouteType";
import { Organization } from "../entities/Organization";

class AllRouteMasterModel {
    constructor(data: any) {
        this.id = data.id;

        this.routeTypeId = data.routeTypeId.Id ?? null;
        this.routeTypeName = data.routeTypeName.Name ?? null;
        this.routeOwnerId = data.routeOwnerId.Id ?? null;
        this.routeOwnerName = data.routeOwnerName.Name ?? null;
        this.routeName = data.routeName;
        this.routeCode = data.routeCode;
        this.tripType = data.tripType;
        this.morningShiftSchTime = data.morningShiftSchTime;
        this.eveningShiftSchTime = data.eveningShiftSchTime;
    }
    public id: number;
    public routeTypeId: number;
    public routeTypeName: string;

    public routeOwnerId: number;
    public routeOwnerName: string;

    public routeName: string;
    public routeCode: string;
    public tripType: string;
    public morningShiftSchTime: string;
    public eveningShiftSchTime: string;
}

class CreateRouteMasterModel {
    constructor(data: any) {
        this.routeTypeId = data.routeTypeId;
        this.routeOwner = data.routeOwner;
        this.routeName = data.routeName;
        this.routeCode = data.routeCode;
        this.tripType = data.tripType;
        this.morningShiftSchTime = data.morningShiftSchTime;
        this.eveningShiftSchTime = data.eveningShiftSchTime;
    }
    public routeTypeId: RouteType;
    public routeOwner: number;
    public routeName: string;
    public routeCode: string;
    public tripType: string;
    public morningShiftSchTime: string;
    public eveningShiftSchTime: string;
}

class UpdateRouteMasterModel {
    constructor(data: any) {
        this.id = data.id;
        this.routeTypeId = data.routeTypeId;
        this.routeOwner = data.routeOwner;
        this.routeName = data.routeName;
        this.routeCode = data.routeCode;
        this.tripType = data.tripType;
        this.morningShiftSchTime = data.morningShiftSchTime;
        this.eveningShiftSchTime = data.eveningShiftSchTime;
    }
    public id: number;
    public routeTypeId: number;
    public routeOwner: number;
    public routeName: string;
    public routeCode: string;
    public tripType: string;
    public morningShiftSchTime: string;
    public eveningShiftSchTime: string;
}

class DeleteRouteMasterModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export { AllRouteMasterModel, CreateRouteMasterModel, UpdateRouteMasterModel, DeleteRouteMasterModel }