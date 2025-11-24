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

async function GetAllStates(
  model?: any
): Promise<ServiceResponse<AllStatesModel[]>> {
  try {
    let states;
    if (model.id) {
      states = await AppDataSource.getRepository(entities.States)
        .createQueryBuilder("states")
        .where("states.Id = :id", { id: model.id })
        .andWhere("states.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      states = await AppDataSource.getRepository(entities.States)
        .createQueryBuilder("states")
        .where("states.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const statesData: AllStatesModel[] = states.map((states) => ({
      id: states.Id,
      name: states.Name,
      stateCode: states.StateCode,

    }));
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: statesData,
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

async function CreateState(
  req: Request,
  model: CreateStateModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.States);
    const states = new entities.States();
    states.Name = model.name ? model.name : states.Name;
    states.StateCode = model.stateCode ? model.stateCode : states.StateCode;
    states.CreatedAt = new Date();
    states.CreatedBy = userId;
    const savedRole = await repository.save(states);

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

async function UpdateState(
  req: Request,
  model: UpdateStateModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.States);
    const state = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (state) {
      state.Name = model.name ? model.name : state.Name;
      state.StateCode = model.stateCode ? model.stateCode : state.StateCode;
      state.ModifiedAt = new Date();
      state.ModifiedBy = userId;
      await repository.save(state);
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

async function DeleteState(
  req: Request,
  model: DeleteStateModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.States);
    const state = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (state) {
      state.IsActive = false;
      state.DeletedAt = new Date();
      state.DeletedBy = userId;
      await repository.save(state);

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

export { GetAllStates, CreateState, UpdateState, DeleteState };
