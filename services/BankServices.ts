import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllBankModel,
  CreateBankModel,
  DeleteBankModel,
  UpdateBankModel,
} from "../models/BankModel";
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

async function GetAllBanks(
  model?: any
): Promise<ServiceResponse<AllBankModel[]>> {
  try {
    let banks;
    if (model.id) {
      banks = await AppDataSource.getRepository(entities.Bank)
        .createQueryBuilder("banks")
        .where("banks.Id = :id", { id: model.id })
        .andWhere("banks.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      banks = await AppDataSource.getRepository(entities.Bank)
        .createQueryBuilder("banks")
        .where("banks.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const bankData: AllBankModel[] = banks.map((bank) => ({
      id: bank.Id,
      bankName: bank.BankName,
      isActive: bank.IsActive,

    }));
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: bankData,
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

async function CreateBank(
  req: Request,
  model: CreateBankModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Bank);
    const bank = new entities.Bank();
    bank.BankName = model.bankName ? model.bankName : bank.BankName;
    bank.IsActive = model.isActive ? model.isActive : bank.IsActive;
    bank.CreatedAt = new Date();
    bank.CreatedBy = userId;
    const savedRole = await repository.save(bank);

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

async function UpdateBank(
  req: Request,
  model: UpdateBankModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Bank);
    const bank = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    // console.log(model);
    if (bank) {
      bank.BankName = model.bankName ? model.bankName : bank.BankName;
      bank.IsActive = model.isActive ? model.isActive : bank.IsActive;
      bank.ModifiedAt = new Date();
      bank.ModifiedBy = userId;
      await repository.save(bank);
      return {
        status: 200,
        message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
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

async function DeleteBank(
  req: Request,
  model: DeleteBankModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Bank);
    const bank = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (bank) {
      bank.IsActive = false;
      bank.DeletedAt = new Date();
      bank.DeletedBy = userId;
      await repository.save(bank);

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

export { GetAllBanks, CreateBank, UpdateBank, DeleteBank };
