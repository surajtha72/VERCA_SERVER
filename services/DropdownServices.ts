import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import {
  DefaultCollectionModel,
  OrganizationUnitTypesModel,
  PayrollModel,
  ShiftsModel,
  procurementCenterTypeModel,
} from "../models/DropdownModels";
import { ServiceResponse } from "../models/ApiResponse";
dotenv.config();

const ERROR_MESSAGES = {
  INTERNAL_SERVER: "Internal Server Error",
};

const SUCCESS_MESSAGES = {
  SUCCESS: "Success",
};

async function GetPayrollTypes(): Promise<ServiceResponse<PayrollModel[]>> {
  try {
    const payroll = await AppDataSource.getRepository(entities.PayrollTypes)
      .createQueryBuilder("payrollTypes")
      .where("payrollTypes.IsActive = :isActive", { isActive: true })
      .getMany();

    const payrollData: PayrollModel[] = payroll.map((payroll) => ({
      id: payroll.Id,
      name: payroll.Name,
      shortName: payroll.ShortName,
    }));
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: payrollData,
    };
  } catch (error) {
    return {
      status: 500,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

async function GetDefaultCollectionType(): Promise<
  ServiceResponse<DefaultCollectionModel[]>
> {
  try {
    const defaultCollection = await AppDataSource.getRepository(
      entities.DefaultCollectionType
    )
      .createQueryBuilder("defaultCollection")
      .where("defaultCollection.IsActive = :isActive", { isActive: true })
      .getMany();

    const defaultCollectionData: DefaultCollectionModel[] = defaultCollection.map(
      (defaultCollection) => ({
        id: defaultCollection.Id,
        name: defaultCollection.Name,
        shortName: defaultCollection.ShortName,
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: defaultCollectionData,
    };
  } catch (error) {
    return {
      status: 500,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

async function GetOrganizationUnitTypes(model?: any): Promise<
  ServiceResponse<OrganizationUnitTypesModel[]>
> {
  try {
    let organizationTypes;
    const isProcurementCenter = model.isProcurementCenter === 'true';

    if (model.isProcurementCenter) {
      organizationTypes = await AppDataSource.getRepository(entities.OrganizationUnitType)
        .createQueryBuilder("organization")
        .where("organization.IsActive = :isActive", { isActive: true })
        .andWhere("organization.IsProcurementCenter = :isProcurementCenter", { isProcurementCenter })
        .getMany();
    } else {
      organizationTypes = await AppDataSource.getRepository(
        entities.OrganizationUnitType
      )
        .createQueryBuilder("organization")
        .where("organization.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    
    const organizationTypesData: OrganizationUnitTypesModel[] = organizationTypes.map(
      (organizationTypes) => ({
        id: organizationTypes.Id,
        name: organizationTypes.Name,
        shortName: organizationTypes.ShortName,
        isProcurementCenter: organizationTypes.IsProcurementCenter
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: organizationTypesData,
    };
  } catch (error) {
    return {
      status: 500,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

async function GetShifts(): Promise<
  ServiceResponse<ShiftsModel[]>
> {
  try {
    const shifts = await AppDataSource.getRepository(
      entities.Shifts
    )
      .createQueryBuilder("shifts")
      .where("shifts.IsActive = :isActive", { isActive: true })
      .getMany();

    const shiftData: ShiftsModel[] = shifts.map(
      (shifts) => ({
        id: shifts.Id,
        name: shifts.Name,
        index: shifts.Index,
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: shiftData,
    };
  } catch (error) {
    return {
      status: 500,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}
export { GetPayrollTypes, GetOrganizationUnitTypes, GetDefaultCollectionType, GetShifts };
