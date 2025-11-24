import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllStatesModel,
  CreateStateModel,
  DeleteStateModel,
  UpdateStateModel,
} from "../models/StatesModel";
import {
  AllTalukasModel,
  CreateTalukasModel,
  DeleteTalukasModel,
  UpdateTalukasModel,
} from "../models/TalukasModel";
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

async function GetAllTalukas(
  model?: any
): Promise<ServiceResponse<AllTalukasModel[]>> {
  try {
    let talukas;
    if (model && model.DistrictId) {
      talukas = await AppDataSource.getRepository(entities.Vct)
        .createQueryBuilder("talukas")
        .leftJoinAndSelect("talukas.DistrictId", "district")
        .where("talukas.DistrictId = :id", { id: model.DistrictId })
        .andWhere("talukas.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    else if (model && model.id) {
      talukas = await AppDataSource.getRepository(entities.Vct)
        .createQueryBuilder("talukas")
        .leftJoinAndSelect("talukas.DistrictId", "district")
        .where("talukas.Id = :id", { id: model.id })
        .andWhere("talukas.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      talukas = await AppDataSource.getRepository(entities.Vct)
        .createQueryBuilder("talukas")
        .leftJoinAndSelect("talukas.DistrictId", "district")
        .where("talukas.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const talukasData: AllTalukasModel[] = talukas.map((talukas) => ({
      id: talukas.Id,
      districtId: talukas.DistrictId ? talukas.DistrictId.Id : null,
      stateId: talukas.StateId ? talukas.StateId.Id : null,
      districtName: talukas.DistrictId ? talukas.DistrictId.Name : null,
      name: talukas.Name,
      pincode: talukas.Pincode,
    }));
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: talukasData,
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

async function CreateTaluk(
  req: Request,
  model: CreateTalukasModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Vct);
    const taluk = new entities.Vct();
    taluk.DistrictId = model.districtId ? model.districtId : taluk.DistrictId;
    taluk.StateId = model.stateId ? model.stateId : taluk.StateId;
    taluk.Name = model.name ? model.name : taluk.Name;
    taluk.Pincode = model.pincode ? model.pincode : taluk.Pincode;
    taluk.CreatedAt = new Date();
    taluk.CreatedBy = userId;
    await repository.save(taluk);

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

async function UpdateTaluk(
  req: Request,
  model: UpdateTalukasModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Vct);
    const taluk = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (taluk) {
      taluk.DistrictId = model.districtId ? model.districtId : taluk.DistrictId;
      taluk.StateId = model.stateId ? model.stateId : taluk.StateId;
      taluk.Name = model.name ? model.name : taluk.Name;
      taluk.Pincode = model.pincode ? model.pincode : taluk.Pincode;
      taluk.ModifiedAt = new Date();
      taluk.ModifiedBy = userId;
      await repository.save(taluk);
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

async function DeleteTaluk(
  req: Request,
  model: DeleteTalukasModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Vct);
    const taluk = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (taluk) {
      taluk.IsActive = false;
      taluk.DeletedAt = new Date();
      taluk.DeletedBy = userId;
      await repository.save(taluk);

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

export { GetAllTalukas, CreateTaluk, UpdateTaluk, DeleteTaluk };
