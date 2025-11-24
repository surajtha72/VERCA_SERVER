import { DefaultCollectionType } from "../entities/DefaultCollectionType";
import { Districts } from "../entities/Districts";
import { Organization } from "../entities/Organization";
import { OrganizationUnitType } from "../entities/OrganizationUnitType";
import { PayrollTypes } from "../entities/PayrollTypes";
import { ProcurementCenterType } from "../entities/ProcurementCenterType";
import { RouteType } from "../entities/RouteType";
import { States } from "../entities/States";
import { Vct } from "../entities/Vct";

class AllOrganizationsModel {
  constructor(data: any) {
    this.id = data.id;
    this.organizationType = data.organizationType;
    this.organizationName = data.organizationName;
    this.parentId = data.parentId.Id ?? null;
    this.parentName = data.parentId.Name ?? null;
    this.name = data.name;
    this.businessRegnNo = data.businessRegnNo;
    this.gstNo = data.gstNo;
    this.addressLine1 = data.addressLine1;
    this.addressLine2 = data.addressLine2;
    this.vctId = data.vctId;
    this.vctName = data.vctName;
    this.geocode = data.geocode;
    this.capacity = data.capacity;
    this.morningShiftStartTime = data.morningShiftStartTime;
    this.morningShiftEndTime = data.morningShiftEndTime;
    this.eveningShiftStartTime = data.eveningShiftStartTime;
    this.eveningShiftEndTime = data.eveningShiftEndTime;
    this.defaultCollectionTypeName = data.defaultCollectionTypeName;
    this.defaultCollectionTypeId = data.defaultCollectionTypeId.Id ?? null;
    this.payrollTypeId = data.payrollTypeId.Id ?? null;
    this.payrollTypeName = data.payrollTypeName;
    this.enforceStrictTiming = data.enforceStrictTiming;
    this.enforceNoDueCollection = data.enforceNoDueCollection;
    this.headload = data.headload;
    this.commission = data.commission;
    this.stateId = data.stateId;
    this.districtId = data.districtId;
    this.accHolderName = data.accHolderName;
    this.accountNumber = data.accountNumber;
    this.ifscCode = data.ifscCode;
    this.phoneNumber = data.phoneNumber;
    this.ouCode = data.ouCode;
    this.allowCan = data.allowCan ?? false;              // ⬅️ new
    this.milkCollectionUom = data.milkCollectionUom;     // ⬅️ new
    this.milkDispatchUom = data.milkDispatchUom;       
  }
  public id: number;
  public organizationType: number;
  public organizationName: string;
  public parentId: number;
  public parentName: string;
  public name: string;
  public businessRegnNo: string;
  public gstNo: string;
  public addressLine1: string;
  public addressLine2: string;
  public vctId: number;
  public vctName: string;
  public geocode: string;
  public capacity: number;
  public morningShiftStartTime: string;
  public morningShiftEndTime: string;
  public eveningShiftStartTime: string;
  public eveningShiftEndTime: string;
  public defaultCollectionTypeId: number;
  public defaultCollectionTypeName: string;
  public payrollTypeId: number;
  public payrollTypeName: string;
  public enforceStrictTiming: boolean;
  public enforceNoDueCollection: boolean;
  public headload: number;
  public commission: number;
  public stateId: number;
  public districtId: number;
  public accHolderName: string;
  public accountNumber:  string;
  public ifscCode: string;
  public phoneNumber: string;
  public ouCode: string;
  public allowCan: boolean;            // ⬅️ new
  public milkCollectionUom: string;    // ⬅️ new
  public milkDispatchUom: string;  
}

class CreateOrganizationsModel {
  constructor(data: any) {
    this.organizationType = data.organizationType;
    this.parentId = data.parentId;
    this.name = data.name;
    this.businessRegnNo = data.businessRegnNo;
    this.gstNo = data.gstNo;
    this.addressLine1 = data.addressLine1;
    this.addressLine2 = data.addressLine2;
    this.vctId = data.vctId;
    this.geocode = data.geocode;
    this.capacity = data.capacity;
    this.morningShiftStartTime = data.morningShiftStartTime;
    this.morningShiftEndTime = data.morningShiftEndTime;
    this.eveningShiftStartTime = data.eveningShiftStartTime;
    this.eveningShiftEndTime = data.eveningShiftEndTime;
    this.defaultCollectionType = data.defaultCollectionType;
    this.payrollTypes = data.payrollTypes;
    this.enforceStrictTiming = data.enforceStrictTiming;
    this.enforceNoDueCollection = data.enforceNoDueCollection;
    this.headload = data.headload;
    this.commission = data.commission;
    this.stateId = data.stateId;
    this.districtId = data.districtId;
    this.accHolderName = data.accHolderName;
    this.accountNumber = data.accountNumber;
    this.ifscCode = data.ifscCode ?? null;
    this.phoneNumber = data.phoneNumber;
        this.ouCode = data.ouCode;   // <--- add this
        this.allowCan = data.allowCan ?? false;              // ⬅️ new
    this.milkCollectionUom = data.milkCollectionUom;     // ⬅️ new
    this.milkDispatchUom = data.milkDispatchUom;       

  }
  public organizationType: OrganizationUnitType;
  public parentId: Organization;
  public name: string;
  public businessRegnNo: string;
  public gstNo: string;
  public addressLine1: string;
  public addressLine2: string;
  public vctId: Vct;
  public geocode: string;
  public capacity: number;
  public morningShiftStartTime: string;
  public morningShiftEndTime: string;
  public eveningShiftStartTime: string;
  public eveningShiftEndTime: string;
  public defaultCollectionType: DefaultCollectionType;
  public payrollTypes: PayrollTypes;
  public enforceStrictTiming: boolean;
  public enforceNoDueCollection: boolean;
  public headload: number;
  public commission: number;
  public stateId: States;
  public districtId: Districts;
  public accHolderName: string;
  public accountNumber:  string;
  public ifscCode: string;
  public phoneNumber: string;
    public ouCode: string;         // <---
    public allowCan: boolean;            // ⬅️ new
  public milkCollectionUom: string;    // ⬅️ new
  public milkDispatchUom: string;  

}

class UpdateOrganizationsModel {
  constructor(data: any) {
    this.id = data.id;
    this.organizationType = data.organizationType;
    this.parentId = data.parentId;
    this.name = data.name;
    this.businessRegnNo = data.businessRegnNo;
    this.gstNo = data.gstNo;
    this.addressLine1 = data.addressLine1;
    this.addressLine2 = data.addressLine2;
    this.vctId = data.vctId;
    this.geocode = data.geocode;
    this.capacity = data.capacity;
    this.morningShiftStartTime = data.morningShiftStartTime;
    this.morningShiftEndTime = data.morningShiftEndTime;
    this.eveningShiftStartTime = data.eveningShiftStartTime;
    this.eveningShiftEndTime = data.eveningShiftEndTime;
    this.defaultCollectionType = data.defaultCollectionType;
    this.payrollTypes = data.payrollTypes;
    this.enforceStrictTiming = data.enforceStrictTiming;
    this.enforceNoDueCollection = data.enforceNoDueCollection;
    this.headload = data.headload;
    this.commission = data.commission;
    this.stateId = data.stateId;
    this.districtId = data.districtId;
    this.accHolderName = data.accHolderName;
    this.accountNumber = data.accountNumber;
    this.ifscCode = data.ifscCode ?? null;
    this.phoneNumber = data.phoneNumber;
          this.ouCode = data.ouCode;   // <---
          this.allowCan = data.allowCan ?? false;              // ⬅️ new
    this.milkCollectionUom = data.milkCollectionUom;     // ⬅️ new
    this.milkDispatchUom = data.milkDispatchUom;       

  }
  public id: number;
  public organizationType: OrganizationUnitType;
  public parentId: Organization;
  public name: string;
  public businessRegnNo: string;
  public gstNo: string;
  public addressLine1: string;
  public addressLine2: string;
  public vctId: Vct;
  public geocode: string;
  public capacity: number;
  public morningShiftStartTime: string;
  public morningShiftEndTime: string;
  public eveningShiftStartTime: string;
  public eveningShiftEndTime: string;
  public defaultCollectionType: DefaultCollectionType;
  public payrollTypes: number;;
  public enforceStrictTiming: boolean;
  public enforceNoDueCollection: boolean;
  public headload: number;
  public commission: number;
  public stateId: States;
  public districtId: Districts;
  public accHolderName: string;
  public accountNumber:  string;
  public ifscCode: string;
  public phoneNumber: string;
    public ouCode: string;         // <---
    public allowCan: boolean;            // ⬅️ new
  public milkCollectionUom: string;    // ⬅️ new
  public milkDispatchUom: string;  


}

class DeleteOrganizationsModel {
  constructor(data: any) {
    this.id = data.id;
  }
  public id: number;
}

export {
  AllOrganizationsModel,
  CreateOrganizationsModel,
  UpdateOrganizationsModel,
  DeleteOrganizationsModel,
};
