import { Any } from "typeorm";
import { Organization } from "../entities/Organization";

interface APIResponse {
  status: number;
  message: string;
}
interface GetTotalBalanceAPIResponse {
  balance: any;
}

interface ServiceResponse<T> extends APIResponse {
  data: T | null;
}

interface LoginResponse {
  userDetails: {
    id: number;
    username: string;
    accessToken: string | null;
    roleId: number;
    roleName: string;
    expiryTime: number;
  };
  permissions: {
    [entityName: string]: string[];
  }[];
}

interface JWTResponse {
  username: string;
  accessToken: string | null;
  roleId: number;
  roleName: string;
}

interface AppLoginResponse {
  authorization: {
    accessToken: string | null;
  };
  ou: {
    id: number | null;
    name: string | null;
    parentId: number | null;
    organizationTypeName: string | null;
    organizationType: number | null;
    businessRegnNo: string | null;
    gstNo: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    vctId: number | null;
    geocode: string | null;
    capacity: number | null;
    morningShiftStartTime: string | null;
    morningShiftEndTime: string | null;
    eveningShiftStartTime: string | null;
    eveningShiftEndTime: string | null;
    defaultCollectionType: number | null;
    payrollTypes: number | null;
    enforceStrictTiming: boolean | null;
    enforceNoDueCollection: boolean | null;
    isDcs: boolean | null;
    isFarmer: boolean | null;
  };
  user: {
    id: number;
    name: string;
    organizationId: number | null;
    address: string;
    contactNumber: string;
    emailAddress: string;
    username: string;
  };
}

interface MilkCollectionRoutesResponse {
  vehicle: {
    id: number | null;
    transporterId: number | null;
    isFoodTransportVehicle: boolean | null;
    vehicleType: string | null;
    registrationNo: string | null;
    make: string | null;
    model: string | null;
    capacity: bigint | null;
    fSSAILicNo: string | null;
    fSSAILicExpiryDate: Date | null;
    insurance: string | null;
    insuranceExpiryDate: Date | null;
    isActive: boolean | null;
    createdAt: Date | null;
    modifiedAt: Date | null;
    deletedAt: Date | null;
  };
  route: {
    id: number | null;
    routeOwner: number | null;
    routeName: string | null;
    routeCode: string | null;
    tripType: string | null;
    morningShiftSchTime: string | null;
    eveningShiftSchTime: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    modifiedAt: Date | null;
    deletedAt: Date | null;
  };
  transporter: {
    id: number | null;
    firmName: string | null;
    code: string | null;
    contactPersonName: string | null;
    mobileNo: string | null;
    emailId: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    state: number | null;
    district: number | null;
    vtc: number | null;
    pincode: string | null;
    geocode: string | null;
    aadhaarNo: string | null;
    panNo: string | null;
    bankAcNo: string | null;
    bankAcName: string | null;
    bankIfscCode: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    modifiedAt: Date | null;
    deletedAt: Date | null;
  };
}

// Define the model for the collection detailsz
interface CollectionDetail {
  Id: string;
  MilkType: string;
  CollectionOperationType: string | null;
  TestingOperationType: string | null;
  KGFat: number | null;
  Snf: number;
  KGSnf: number | null;
  Clr: number;
  Weight: number;
  CanCount: number;
  CollectedAt: string | null;
  TestedAt: string | null;
  IsActive: boolean;
  CreatedAt: string | null;
  ModifiedAt: string | null;
  DeletedAt: string | null;
  OrganizationUnitId: {
    Id: number;
    Name: string;
  };
  OrganizationId: Organization;
  OrganizationName: string;
  Shift: string;
  Value: number;
}

interface BillResponseModel {
  organization: {
    id: number;
    name: string;
    headload: number;
    commision: number;
    routeId: number;
    routeName: string;
  };
  settlementAmount: number;
  collectionDetails: CollectionDetail[];
}

interface SnfReconcillationCollectionDetail {
  organization: {
    id: number;
    name: string;
  };
  collectionDetails: CollectionDetail[];
}

interface ParentOu {
  parentOuId: number;
  parentOuName: string;
}
interface SnfReconcillationModel {
  parentOu: ParentOu;
  organization: {
    id: number;
    name: string;
  };
  snfReconcillationCollectionDetail: SnfReconcillationCollectionDetail[];
}

interface BankLetterAmountModel {
  totalAmount: number;
}

interface BankAdviceModel {
  organization: {
    id: number;
    name: string;
    accNumber: string;
    ifscCode: string;
    accHolderName: string;
    routeName: string;
  };
  amount: number;
}

interface DateWiseBmcCollectionDetails {
  collectedAt: Date;
  cowMilk: {
    qtyInKg: number;
    avgFat: number;
    avgSnf: number;
    kgFat: number;
    kgSnf: number;
  };
  buffMilk: {
    qtyInKg: number;
    avgFat: number;
    avgSnf: number;
    kgFat: number;
    kgSnf: number;
  };
}
interface BmcSnfReconcillationModel {
  bmcId: number;
  bmcName: string;
  collectionDetails: DateWiseBmcCollectionDetails[];
}
class PagedResponse<T> {
  public pageIndex: number;
  public totalPages: number;
  public totalRecords: number;
  public data: T[];

  constructor(items: T[], count: number, pageIndex: number, pageSize: number) {
    this.pageIndex = pageIndex;
    this.totalPages = Math.ceil(count / pageSize);
    this.totalRecords = count;
    this.data = items;
  }
}

interface AgentWiseMilkCollectionDetails {
  agentId: number;
  agentName: string;
  cowMilkDetail: {
    totalQuantity: number;
    avgFat: number;
    avgSnf: number;
    kgFat: number;
    kgSnf: number;
  };
  buffMilkDetail: {
    totalQuantity: number;
    avgFat: number;
    avgSnf: number;
    kgFat: number;
    kgSnf: number;
  };
}

interface AgentWiseMilkCollectionModel {
  parentOu: {
    ouId: number;
    ouName: string;
  };
  agentWiseMilkCollectionDetails: AgentWiseMilkCollectionDetails[];
}

export {
  LoginResponse,
  ServiceResponse,
  APIResponse,
  AppLoginResponse,
  MilkCollectionRoutesResponse,
  JWTResponse,
  BillResponseModel,
  CollectionDetail,
  PagedResponse,
  BankAdviceModel,
  BankLetterAmountModel,
  SnfReconcillationModel,
  ParentOu,
  SnfReconcillationCollectionDetail,
  BmcSnfReconcillationModel,
  AgentWiseMilkCollectionModel,
  AgentWiseMilkCollectionDetails,
  GetTotalBalanceAPIResponse,
};
