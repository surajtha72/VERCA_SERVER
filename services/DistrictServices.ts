import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllDistrictModel,
  CreateDistrictModel,
  DeleteDistrictModel,
  UpdateDistrictModel,
} from "../models/DistrictModel";
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

async function GetAllDistricts(
  model?: any
): Promise<ServiceResponse<AllDistrictModel[]>> {
  try {
    let district;
    if (model.StateId) {
      district = await AppDataSource.getRepository(entities.Districts)
        .createQueryBuilder("district")
        .leftJoinAndSelect("district.StateId", "states")
        .where("district.StateId = :id", { id: model.StateId })
        .andWhere("district.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    else if (model.id) {
      district = await AppDataSource.getRepository(entities.Districts)
        .createQueryBuilder("district")
        .leftJoinAndSelect("district.StateId", "states")
        .where("district.Id = :id", { id: model.id })
        .andWhere("district.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      district = await AppDataSource.getRepository(entities.Districts)
        .createQueryBuilder("district")
        .leftJoinAndSelect("district.StateId", "states")
        .where("district.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const districtData: AllDistrictModel[] = district.map((district) => ({
      id: district?.Id,
      stateId: district?.StateId ? district?.StateId?.Id : 0,
      stateName: district?.StateId ? district?.StateId?.Name : "",
      name: district?.Name,
    }));
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: districtData,
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

async function CreateDistrict(
  req: Request,
  model: CreateDistrictModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Districts);
    const district = new entities.Districts();
    district.StateId = model.stateId ? model.stateId : district.StateId;
    district.Name = model.name ? model.name : district.Name;
    district.CreatedAt = new Date();
    district.CreatedBy = userId;
    await repository.save(district);

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

async function UpdateDistrict(
  req: Request,
  model: UpdateDistrictModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Districts);
    const district = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (district) {
      district.StateId = model.stateId ? model.stateId : district.StateId;
      district.Name = model.name ? model.name : district.Name;
      district.ModifiedAt = new Date();
      district.ModifiedBy = userId;
      await repository.save(district);
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

async function DeleteDistrict(
  req: Request,
  model: DeleteDistrictModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Districts);
    const district = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (district) {
      district.IsActive = false;
      district.DeletedAt = new Date();
      district.DeletedBy = userId;
      await repository.save(district);

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

export { GetAllDistricts, CreateDistrict, UpdateDistrict, DeleteDistrict };
