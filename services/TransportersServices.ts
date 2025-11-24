import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, PagedResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllTransportersModel,
  CreateTransportersModel,
  DeleteTransporterModel,
  UpdateTransportersModel,
} from "../models/TransportersModel";
dotenv.config();

const ERROR_MESSAGES = {
  NO_DATA: "No Data",
  INTERNAL_SERVER: "Internal Server Error",
};

const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: "Registration successful",
  SUCCESS: "Success",
  ADD_SUCCESS: "Added Successfully",
  UPDATE_SUCCESS: "Updated Successfully",
  DELETE_SUCCESS: "Deleted Successfully",
};

async function GetTransporters(
  model?: any
): Promise<ServiceResponse<AllTransportersModel[]>> {
  try {
    let transporters;
    if (model.id) {
      transporters = await AppDataSource.getRepository(
        entities.Transporters
      )
        .createQueryBuilder("transporters")
        .leftJoinAndSelect("transporters.BankId", "bank")
        .where("transporters.Id = :id", { id: model.id })
        .andWhere("transporters.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      transporters = await AppDataSource.getRepository(
        entities.Transporters
      )
        .createQueryBuilder("transporters")
        .leftJoinAndSelect("transporters.BankId", "bank")
        .where("transporters.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const transportersData: AllTransportersModel[] = transporters.map(
      (transporters) => ({
        id: transporters.Id,
        firmName: transporters.FirmName,
        code: transporters.Code,
        contactPersonName: transporters.ContactPersonName,
        mobileNo: transporters.MobileNo,
        emailId: transporters.EmailId,
        addressLine1: transporters.AddressLine1,
        addressLine2: transporters.AddressLine2,
        state: transporters.State,
        district: transporters.District,
        vtc: transporters.Vtc,
        pincode: transporters.Pincode,
        geocode: transporters.Geocode,
        aadhaarNo: transporters.AadhaarNo,
        panNo: transporters.PanNo,
        bankId: transporters.BankId?.Id,
        bankAcNo: transporters.BankAcNo,
        bankAcName: transporters.BankAcName,
        bankIfscCode: transporters.BankIfscCode,
        isActive: transporters.IsActive,
      })
    );

    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: transportersData,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

async function CreateTransporters(
  req: Request,
  model: CreateTransportersModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const bankId = await AppDataSource.getRepository(entities.Bank)
      .createQueryBuilder("bank")
      .where("bank.Id = :id", { id: model.bankId })
      .getOne();

    const repository = AppDataSource.getRepository(entities.Transporters);
    const transporters = new entities.Transporters();
    transporters.FirmName = model.firmName ? model.firmName : transporters.FirmName;
    transporters.Code = model.code ? model.code : transporters.Code;
    transporters.ContactPersonName = model.contactPersonName ? model.contactPersonName : transporters.ContactPersonName;
    transporters.MobileNo = model.mobileNo ? model.mobileNo : transporters.MobileNo;
    transporters.EmailId = model.emailId ? model.emailId : transporters.EmailId;
    transporters.AddressLine1 = model.addressLine1 ? model.addressLine1 : transporters.AddressLine1;
    transporters.AddressLine2 = model.addressLine2 ? model.addressLine2 : transporters.AddressLine2;
    transporters.State = model.state ? model.state : transporters.State;
    transporters.District = model.district ? model.district : transporters.District;
    transporters.Vtc = model.vtc ? model.vtc : transporters.Vtc;
    transporters.Pincode = model.pincode ? model.pincode : transporters.Pincode;
    transporters.Geocode = model.geocode ? model.geocode : transporters.Geocode;
    transporters.AadhaarNo = model.aadhaarNo ? model.aadhaarNo : transporters.AadhaarNo;
    transporters.PanNo = model.panNo ? model.panNo : transporters.PanNo;
    if (bankId) { transporters.BankId = bankId; }
    transporters.BankId = model.bankId ? model.bankId : transporters.BankId;
    transporters.BankAcNo = model.bankAcNo ? model.bankAcNo : transporters.BankAcNo;
    transporters.BankAcName = model.bankAcName ? model.bankAcName : transporters.BankAcName;
    transporters.BankIfscCode = model.bankIfscCode ? model.bankIfscCode : transporters.BankIfscCode;
    transporters.IsActive = model.isActive ? model.isActive : transporters.IsActive;
    transporters.CreatedAt = new Date();
    transporters.CreatedBy = userId;
    await repository.save(transporters);

    return {
      status: 200,
      message: SUCCESS_MESSAGES.ADD_SUCCESS,
      data: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

async function UpdateTransporters(
  req: Request,
  model: UpdateTransportersModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    console.log('model: ', model);

    const bankId = await AppDataSource.getRepository(entities.Bank)
      .createQueryBuilder("bank")
      .where("bank.Id = :id", { id: model.bankId })
      .getOne();

    const repository = AppDataSource.getRepository(entities.Transporters);
    // console.log(repository);
    const transporters = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    // console.log(model.id)
    if (transporters) {
      transporters.FirmName = model.firmName ? model.firmName : transporters.FirmName;
      transporters.Code = model.code ? model.code : transporters.Code;
      transporters.ContactPersonName = model.contactPersonName ? model.contactPersonName : transporters.ContactPersonName;
      transporters.MobileNo = model.mobileNo ? model.mobileNo : transporters.MobileNo;
      transporters.EmailId = model.emailId ? model.emailId : transporters.EmailId;
      transporters.AddressLine1 = model.addressLine1 ? model.addressLine1 : transporters.AddressLine1;
      transporters.AddressLine2 = model.addressLine2 ? model.addressLine2 : transporters.AddressLine2;
      transporters.State = model.state ? model.state : transporters.State;
      transporters.District = model.district ? model.district : transporters.District;
      transporters.Vtc = model.vtc ? model.vtc : transporters.Vtc;
      transporters.Pincode = model.pincode ? model.pincode : transporters.Pincode;
      transporters.Geocode = model.geocode ? model.geocode : transporters.Geocode;
      transporters.AadhaarNo = model.aadhaarNo ? model.aadhaarNo : transporters.AadhaarNo;
      transporters.PanNo = model.panNo ? model.panNo : transporters.PanNo;
      if (bankId) {
        transporters.BankId = bankId;
      }
      transporters.BankAcNo = model.bankAcNo ? model.bankAcNo : transporters.BankAcNo;
      transporters.BankAcName = model.bankAcName ? model.bankAcName : transporters.BankAcName;
      transporters.BankIfscCode = model.bankIfscCode ? model.bankIfscCode : transporters.BankIfscCode;
      transporters.IsActive = model.isActive ? model.isActive : transporters.IsActive;
      transporters.ModifiedAt = new Date();
      transporters.ModifiedBy = userId;
      await repository.save(transporters);

      return {
        status: 200,
        message: SUCCESS_MESSAGES.ADD_SUCCESS,
        data: null,
      };
    } else {
      return {
        status: 404,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

async function DeleteTransporters(
  req: Request,
  model: DeleteTransporterModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Transporters);
    const transporters = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (transporters) {
      transporters.IsActive = false;
      transporters.DeletedAt = new Date();
      transporters.DeletedBy = userId;
      await repository.save(transporters);

      return {
        status: 200,
        message: SUCCESS_MESSAGES.DELETE_SUCCESS,
        data: null,
      };
    } else {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

export {
  GetTransporters,
  DeleteTransporters,
  UpdateTransporters,
  CreateTransporters,
};
