import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllBrnkBranchModel,
  CreateBankBranchModel,
  UpdateBankBranchModel,
  DeleteBankBranchModel,
} from "../models/BankBranchModel";
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

async function GetAllBankBranches(
  model?: any
): Promise<ServiceResponse<AllBrnkBranchModel[]>> {
  try {
    let bankBranch;
    if (model.BankId) {
      bankBranch = await AppDataSource.getRepository(entities.BankBranch)
        .createQueryBuilder("bankBranch")
        .leftJoinAndSelect("bankBranch.BankId", "bank")
        .where("bank.Id = :id", { id: model.BankId })
        .andWhere("bankBranch.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    else if (model.id) {
      bankBranch = await AppDataSource.getRepository(entities.BankBranch)
        .createQueryBuilder("bankBranch")
        .leftJoinAndSelect("bankBranch.BankId", "bank")
        .where("bankBranch.Id = :id", { id: model.id })
        .andWhere("bankBranch.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      bankBranch = await AppDataSource.getRepository(entities.BankBranch)
        .createQueryBuilder("bankBranch")
        .leftJoinAndSelect("bankBranch.BankId", "banks")
        .where("bankBranch.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const bankBranchData: AllBrnkBranchModel[] = bankBranch.map((bankBranch) => ({
      id: bankBranch?.Id,
      bankId: bankBranch.BankId,
      branchName: bankBranch?.BranchName,
      ifscCode: bankBranch?.IfscCode,
      address: bankBranch?.Address,
      isActive: bankBranch?.IsActive
    }));
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: bankBranchData,
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

async function CreateBankBranch(
  req: Request,
  model: CreateBankBranchModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const bank = await AppDataSource.getRepository(entities.Bank)
    .createQueryBuilder("bank")
    .where("bank.Id = :id", { id: model.bankId })
    .getOne();

    const repository = AppDataSource.getRepository(entities.BankBranch);
    const bankBranch = new entities.BankBranch();
    if (bank) {
        bankBranch.BankId = bank;
      }
    bankBranch.BranchName = model.branchName ? model.branchName : bankBranch.BranchName;
    bankBranch.IfscCode = model.ifscCode ? model.ifscCode : bankBranch.IfscCode;
    bankBranch.Address = model.address ? model.address : bankBranch.Address;
    bankBranch.IsActive = model.isActive ? model.isActive : bankBranch.IsActive;
    bankBranch.CreatedAt = new Date();
    bankBranch.CreatedBy = userId;
    await repository.save(bankBranch);

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

async function UpdateBankBranch(
  req: Request,
  model: UpdateBankBranchModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const bank = await AppDataSource.getRepository(entities.Bank)
    .createQueryBuilder("bank")
    .where("bank.Id = :id", { id: model.bankId })
    .getOne();

    const repository = AppDataSource.getRepository(entities.BankBranch);
    const bankBranch = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (bankBranch) {
        if (bank) {
            bankBranch.BankId = bank;
          }
        bankBranch.BranchName = model.branchName ? model.branchName : bankBranch.BranchName;
        bankBranch.IfscCode = model.ifscCode ? model.ifscCode : bankBranch.IfscCode;
        bankBranch.Address = model.address ? model.address : bankBranch.Address;
        bankBranch.IsActive = model.isActive ? model.isActive : bankBranch.IsActive;
        bankBranch.CreatedAt = new Date();
        bankBranch.CreatedBy = userId;
      await repository.save(bankBranch);
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

async function DeleteBankBranch(
  req: Request,
  model: DeleteBankBranchModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.BankBranch);
    const bankBranch = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (bankBranch) {
      bankBranch.IsActive = false;
      bankBranch.DeletedAt = new Date();
      bankBranch.DeletedBy = userId;
      await repository.save(bankBranch);

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

export { GetAllBankBranches, CreateBankBranch, UpdateBankBranch, DeleteBankBranch };
