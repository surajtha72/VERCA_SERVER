import { Bank } from "../entities/Bank";

class AllTransportersModel {
  constructor(data: any) {
    this.id = data.id;
    this.firmName = data.firmName;
    this.code = data.code;
    this.contactPersonName = data.contactPersonName;
    this.mobileNo = data.mobileNo;
    this.emailId = data.emailId;
    this.addressLine1 = data.addressLine1;
    this.addressLine2 = data.addressLine2;
    this.state = data.state;
    this.district = data.district;
    this.vtc = data.vtc;
    this.pincode = data.pincode;
    this.geocode = data.geocode;
    this.aadhaarNo = data.aadhaarNo;
    this.panNo = data.panNo;
    this.bankId = data.bankId;
    this.bankAcNo = data.bankAcNo;
    this.bankAcName = data.bankAcName;
    this.bankIfscCode = data.bankIfscCode;
    this.isActive = data.isActive;
  }
  public id: number;
  public firmName: string;
  public code: string;
  public contactPersonName: string;
  public mobileNo: string;
  public emailId: string;
  public addressLine1: string;
  public addressLine2: string;
  public state: number;
  public district: number;
  public vtc: number;
  public pincode: string;
  public geocode: string;
  public aadhaarNo: string;
  public panNo: string;
  public bankId : number;
  public bankAcNo: string;
  public bankAcName: string;
  public bankIfscCode: string;
  public isActive: boolean;
}

class CreateTransportersModel {
  constructor(data: any) {
    this.firmName = data.firmName;
    this.code = data.code;
    this.contactPersonName = data.contactPersonName;
    this.mobileNo = data.mobileNo;
    this.emailId = data.emailId;
    this.addressLine1 = data.addressLine1;
    this.addressLine2 = data.addressLine2;
    this.state = data.state;
    this.district = data.district;
    this.vtc = data.vtc;
    this.pincode = data.pincode;
    this.geocode = data.geocode;
    this.aadhaarNo = data.aadhaarNo;
    this.panNo = data.panNo;
    this.bankId = data.bankId;
    this.bankAcNo = data.bankAcNo;
    this.bankAcName = data.bankAcName;
    this.bankIfscCode = data.bankIfscCode;
    this.isActive = data.isActive;
  }
  public firmName: string;
  public code: string;
  public contactPersonName: string;
  public mobileNo: string;
  public emailId: string;
  public addressLine1: string;
  public addressLine2: string;
  public state: number;
  public district: number;
  public vtc: number;
  public pincode: string;
  public geocode: string;
  public aadhaarNo: string;
  public panNo: string;
  public bankId : Bank
  public bankAcNo: string;
  public bankAcName: string;
  public bankIfscCode: string;
  public isActive: boolean;
}

class UpdateTransportersModel {
  constructor(data: any) {
    this.id = data.id;
    this.firmName = data.firmName;
    this.code = data.code;
    this.contactPersonName = data.contactPersonName;
    this.mobileNo = data.mobileNo;
    this.emailId = data.emailId;
    this.addressLine1 = data.addressLine1;
    this.addressLine2 = data.addressLine2;
    this.state = data.state;
    this.district = data.district;
    this.vtc = data.vtc;
    this.pincode = data.pincode;
    this.geocode = data.geocode;
    this.aadhaarNo = data.aadhaarNo;
    this.panNo = data.panNo;
    this.bankId = data.bankId;
    this.bankAcNo = data.bankAcNo;
    this.bankAcName = data.bankAcName;
    this.bankIfscCode = data.bankIfscCode;
    this.isActive = data.isActive;
  }
  public id: number;
  public firmName: string;
  public code: string;
  public contactPersonName: string;
  public mobileNo: string;
  public emailId: string;
  public addressLine1: string;
  public addressLine2: string;
  public state: number;
  public district: number;
  public vtc: number;
  public pincode: string;
  public geocode: string;
  public aadhaarNo: string;
  public panNo: string;
  public bankId : Bank;
  public bankAcNo: string;
  public bankAcName: string;
  public bankIfscCode: string;
  public isActive: boolean;
}

class DeleteTransporterModel {
  constructor(data: any) {
    this.id = data.id;
  }
  public id: number;
}

export {
  AllTransportersModel,
  DeleteTransporterModel,
  UpdateTransportersModel,
  CreateTransportersModel,
};
