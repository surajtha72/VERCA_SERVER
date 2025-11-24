
import { User } from "../entities/User";
import { Organization } from "../entities/Organization";
import { IndentProducts } from "../entities/IndentProducts";
import { CreateIndentProductsModel, UpdateIndentProductsModel } from "./IndentProductsModel";

class AllProductSupplyModel {
    constructor(data: any) {
        this.id = data.id;
        this.indentStatus = data.indentStatus;
        this.indentRaisedBy = data.indentRaisedBy;
        this.indentRaisedFor = data.indentRaisedFor;
        this.indentRaisedOnDate = data.indentRaisedOnDate;
        this.indentApprovedBy = data.indentApprovedBy;
        this.indentRejectedBy = data.indentRejectedBy;
        this.approvedOnDate = data.approvedOnDate;
        this.dispatchByEmployee = data.dispatchByEmployee;
        this.dispatchDate = data.dispatchDate;
        this.receivedByUserId = data.receivedByUserId;
        this.receivedOn = data.receivedOn;
        this.isActive = data.isActive;
        this.dcNumber = data.dcNumber;
        this.rejectReason = data.rejectReason;
    }
    public id: String;
    public indentStatus: number;
    public indentRaisedBy: Organization;
    public indentRaisedFor: Organization;
    public indentRaisedOnDate: Date;
    public indentApprovedBy: Organization;
    public indentRejectedBy: Organization;
    public approvedOnDate: Date;
    public dispatchByEmployee: User;
    public dispatchDate: Date;
    public receivedByUserId: User;
    public receivedOn: Date;
    public isActive: boolean;
    public rejectReason: string;
    public dcNumber: string
}
class DCNumberModel {
    constructor(data: any) {
        this.id = data.id;
        this.dcNumber = data.dcNumber;
    }
    public id: string;
    public dcNumber: string
}

class CreateProductSupplyModel {
    constructor(data: any) {
        this.id = data.id;
        this.indentStatus = data.indentStatus;
        this.indentRaisedBy = data.indentRaisedBy;
        this.indentRaisedFor = data.indentRaisedFor;
        this.indentRaisedOnDate = data.indentRaisedOnDate;
        this.isActive = data.isActive;
        this.indentProducts = data.indentProducts;
    }
    public id: string;
    public indentStatus: number;
    public indentRaisedBy: Organization;
    public indentRaisedFor: Organization;
    public indentRaisedOnDate: Date;
    public isActive: boolean;
    public indentProducts: CreateIndentProductsModel[];
}

class UpdateProductSupplyModel {
    constructor(data: any) {
        this.id = data.id;
        this.indentStatus = data.indentStatus;
        this.indentRaisedBy = data.indentRaisedBy;
        this.indentRaisedFor = data.indentRaisedFor;
        this.indentRaisedOnDate = data.indentRaisedOnDate;
        this.indentApprovedBy = data.indentApprovedBy;
        this.indentRejectedBy = data.indentRejectedBy;
        this.approvedOnDate = data.approvedOnDate;
        this.dispatchByEmployee = data.dispatchByEmployee;
        this.dispatchDate = data.dispatchDate;
        this.receivedByUserId = data.receivedByUserId;
        this.receivedOn = data.receivedOn;
        this.isActive = data.isActive;
        this.rejectReason = data.rejectReason;
        this.dcNumber = data.dcNumber;
        this.indentProducts = data.indentProducts;
    }
    public id: string;
    public indentStatus: number;
    public indentRaisedBy: Organization;
    public indentRaisedFor: Organization;
    public indentRaisedOnDate: Date;
    public indentApprovedBy: Organization;
    public indentRejectedBy: Organization;
    public approvedOnDate: Date;
    public dispatchByEmployee: User;
    public dispatchDate: Date;
    public receivedByUserId: User;
    public receivedOn: Date;
    public isActive: boolean;
    public rejectReason: string;
    public dcNumber: string
    public indentProducts: UpdateIndentProductsModel[];
}

class DeleteProductSupplyModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: string;
}

export { AllProductSupplyModel, CreateProductSupplyModel, UpdateProductSupplyModel, DeleteProductSupplyModel, DCNumberModel };