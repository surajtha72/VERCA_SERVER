import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import {
  AllFinancialYearModel,
  CreateFinancialYearModel,
  UpdateFinancialYearModel,
  DeleteFinancialYearModel,
} from "../models/FinancialYearModel";
import {
  APIResponse,
  ServiceResponse,
  PagedResponse,
} from "../models/ApiResponse";
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


async function GetAllFinancialYear(
  model?: any
): Promise<ServiceResponse<AllFinancialYearModel[]>> {
  try {
    let financialYear;
    if (model.id) {
      financialYear= await AppDataSource.getRepository(
        entities.FinancialYear
      )
        .createQueryBuilder("financialYear")
        .where("financialYear.Id = :id", { id: model.id })
        .andWhere("financialYear.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      financialYear = await AppDataSource.getRepository(
        entities.FinancialYear
      )
        .createQueryBuilder("financialYear")
        .where("financialYear.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const financialYearData: AllFinancialYearModel[] = financialYear.map(
      (financialYear) => ({
        id: financialYear.Id,
        startDate: financialYear.StartDate,
        endDate: financialYear.EndDate,
      })
    );

    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: financialYearData,
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

async function CreateFinancialYear(
  req: Request,
  model: CreateFinancialYearModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.FinancialYear);
    const financialYear = new entities.FinancialYear();
    financialYear.StartDate = model.startDate ?? financialYear.StartDate;
    financialYear.EndDate = model.endDate ?? financialYear.EndDate;
    financialYear.CreatedAt = new Date();
    financialYear.CreatedBy = userId;
    financialYear.IsActive = true;
    await repository.save(financialYear);
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

async function UpdateFinancialYear(
  req: Request,
  model: UpdateFinancialYearModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.FinancialYear);
    const financialYear = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (financialYear) {
      financialYear.StartDate = model.startDate ?? financialYear.StartDate;
      financialYear.EndDate = model.endDate ?? financialYear.EndDate;
      financialYear.ModifiedAt = new Date();
      financialYear.ModifiedBy = userId;
      await repository.save(financialYear);

      return {
        status: 200,
        message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
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

async function DeleteFinancialYear(
  req: Request,
  model: DeleteFinancialYearModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.FinancialYear);
    const financialYear = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (financialYear) {
      financialYear.IsActive = false;
      financialYear.DeletedAt = new Date();
      financialYear.DeletedBy = userId;
      await repository.save(financialYear);

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
  GetAllFinancialYear,
  CreateFinancialYear,
  UpdateFinancialYear,
  DeleteFinancialYear,
};
