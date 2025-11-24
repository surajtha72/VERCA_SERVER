import { Organization } from "../entities/Organization";

class AllowCollectionEntryModel{
    constructor(data: any){
        this.id = data.id;
        this.organizationUnitId = data.organizationUnitId;
        this.requestFor = data.requestFor;
        this.status = data.status;
        this.createdBy = data.createdBy;
        this.createdAt = data.createdAt;
    }
    public id: number;
    public organizationUnitId: Organization;
    public status : string;
    public requestFor : string;
    public createdBy: number;
    public createdAt: Date;
}

class CreateCollectionEntryModel{
    constructor(data: any){
        this.organizationUnitId = data.organizationUnitId;
        this.status = data.status;
        this.requestFor = data.requestFor;
        this.createdBy = data.createdBy;
    }
    public organizationUnitId: number;
    public status : string;
    public createdBy: number;
    public requestFor : string;
}

class UpdateCollectionEntryModel{
    constructor(data: any){
        this.id = data.id;
        this.organizationUnitId = data.organizationUnitId;
        this.status = data.status;
        this.requestFor = data.requestFor;
        this.createdBy = data.createdBy;
    }
    public id: number;
    public organizationUnitId: number;
    public status : string;
    public requestFor : string;
    public createdBy: number;
}

class DeleteCollectionEntryModel{
    constructor(data: any){
        this.id = data.id;
    }
    public id: number;
}

export { AllowCollectionEntryModel, CreateCollectionEntryModel, UpdateCollectionEntryModel, DeleteCollectionEntryModel}