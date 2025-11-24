import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllTRateMasterModel,
  CreateRateMasterModel,
  DeleteRateMasterModel,
  UpdateRateMasterModel,
} from "../models/RateMasterModel";
dotenv.config();

const ERROR_MESSAGES = {
  NO_DATA: "No Data",
  INTERNAL_SERVER: "Internal Server Error",
};

const SUCCESS_MESSAGES = {
  SUCCESS: "Success",
  ADD_SUCCESS: "Added Successfully",
  UPDATE_SUCCESS: "Updated Successfully",
  DELETE_SUCCESS: "Deleted Successfully",
};

async function GetRateMaster(
  model?: any
): Promise<ServiceResponse<AllTRateMasterModel[]>> {
  try {
    let rateMaster;
    if (model.id) {
      rateMaster = await AppDataSource.getRepository(entities.RateMaster)
        .createQueryBuilder("rateMaster")
        .leftJoinAndSelect("rateMaster.ShiftsApplicable", "shifts")
        .where("rateMaster.Id = :id", { id: model.id })
        .andWhere("rateMaster.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      rateMaster = await AppDataSource.getRepository(entities.RateMaster)
        .createQueryBuilder("rateMaster")
        .leftJoinAndSelect("rateMaster.ShiftsApplicable", "shifts")
        .where("rateMaster.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const rateMasterData: AllTRateMasterModel[] = rateMaster.map(
      (rateMaster) => ({
        id: rateMaster.Id,
        effectiveFrom: rateMaster.EffectiveFrom,
        cowFatRate: rateMaster.CowFatRate,
        cowSnfRate: rateMaster.CowSnfRate,
        buffFatRate: rateMaster.BuffFatRate,
        buffSnfRate: rateMaster.BuffSnfRate,
        shiftsApplicableId: rateMaster.ShiftsApplicable.Id,
        shiftsApplicable: rateMaster.ShiftsApplicable.Name,
        shortDesc: rateMaster.ShortDesc,
        fatRangeMin: rateMaster.FatRangeMin,
        fatRangeMax: rateMaster.FatRangeMax,
        snfRangeMin: rateMaster.SnfRangeMin,
        snfRangeMax: rateMaster.SnfRangeMax,
        wef: rateMaster.Wef,
        cowMinFat: rateMaster.CowMinFat,
        cowMinSnf: rateMaster.CowMinSnf,
        buffMinFat: rateMaster.BuffMinFat,
        buffMinSnf: rateMaster.BuffMinSnf,
        seqNo: rateMaster.SeqNo
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: rateMasterData,
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

async function CreateRateMaster(
  req: Request,
  model: CreateRateMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.RateMaster);
    const rateMaster = new entities.RateMaster();

    rateMaster.EffectiveFrom = model.effectiveFrom || rateMaster.EffectiveFrom;
    rateMaster.CowFatRate = model.cowFatRate || rateMaster.CowFatRate;
    rateMaster.CowSnfRate = model.cowSnfRate || rateMaster.CowSnfRate;
    rateMaster.BuffFatRate = model.buffFatRate || rateMaster.BuffFatRate;
    rateMaster.BuffSnfRate = model.buffSnfRate || rateMaster.BuffSnfRate;
    rateMaster.CowMinFat = model.cowMinFat || rateMaster.CowMinFat;
    rateMaster.CowMinSnf = model.cowMinSnf || rateMaster.CowMinSnf;
    rateMaster.BuffMinFat = model.buffMinFat || rateMaster.BuffMinFat;
    rateMaster.BuffMinSnf = model.buffMinSnf || rateMaster.BuffMinSnf;
    rateMaster.FatRangeMax = model.fatRangeMax || rateMaster.FatRangeMax;
    rateMaster.FatRangeMin = model.fatRangeMin || rateMaster.FatRangeMin;
    rateMaster.SnfRangeMax = model.snfRangeMax || rateMaster.SnfRangeMax;
    rateMaster.SnfRangeMin = model.snfRangeMin || rateMaster.SnfRangeMin;
    rateMaster.ShiftsApplicable = new entities.Shifts();
    rateMaster.ShiftsApplicable.Id = model.shiftsApplicable || rateMaster.ShiftsApplicable.Id;
    rateMaster.ShortDesc = model.shortDesc || rateMaster.ShortDesc;
    rateMaster.SeqNo = model.seqNo || rateMaster.SeqNo;
    rateMaster.CreatedAt = new Date();
    rateMaster.CreatedBy = userId;
    await repository.save(rateMaster);

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

async function UpdateRateMaster(
  req: Request,
  model: UpdateRateMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.RateMaster);
    const rateMaster = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    // console.log(model)
    if (rateMaster) {
      rateMaster.EffectiveFrom = model.effectiveFrom || rateMaster.EffectiveFrom;
      rateMaster.CowFatRate = model.cowFatRate;
      rateMaster.CowSnfRate = model.cowSnfRate;
      rateMaster.BuffFatRate = model.buffFatRate;
      rateMaster.BuffSnfRate = model.buffSnfRate;
      rateMaster.ShortDesc = model.shortDesc || rateMaster.ShortDesc;
      rateMaster.CowMinFat = model.cowMinFat || rateMaster.CowMinFat;
      rateMaster.CowMinSnf = model.cowMinSnf || rateMaster.CowMinSnf;
      rateMaster.BuffMinFat = model.buffMinFat || rateMaster.BuffMinFat;
      rateMaster.BuffMinSnf = model.buffMinSnf || rateMaster.BuffMinSnf;
      rateMaster.FatRangeMax = model.fatRangeMax || rateMaster.FatRangeMax;
      rateMaster.FatRangeMin = model.fatRangeMin || rateMaster.FatRangeMin;
      rateMaster.SnfRangeMax = model.snfRangeMax || rateMaster.SnfRangeMax;
      rateMaster.SnfRangeMin = model.snfRangeMin || rateMaster.SnfRangeMin;
      rateMaster.SeqNo = model.seqNo || rateMaster.SeqNo;

      if (model.shiftsApplicable) {
        const shiftsRepository = AppDataSource.getRepository(entities.Shifts);
        const shiftsApplicable = await shiftsRepository.findOne({
          where: { Id: model.shiftsApplicable },
        });
        if (shiftsApplicable) {
          rateMaster.ShiftsApplicable = shiftsApplicable;
        }
      }

      rateMaster.ModifiedAt = new Date();
      rateMaster.ModifiedBy = userId;
      // console.log(rateMaster.BuffSnfRate)
      await repository.save(rateMaster);

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

async function DeleteRateMaster(
  req: Request,
  model: DeleteRateMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.RateMaster);
    // console.log("repository: ",repository);
    const rateMaster = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    // console.log("ratemaster: ",rateMaster,model.id);
    if (rateMaster) {
      rateMaster.IsActive = false;
      rateMaster.DeletedAt = new Date();
      rateMaster.DeletedBy = userId;
      await repository.save(rateMaster);

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

export { GetRateMaster, CreateRateMaster, UpdateRateMaster, DeleteRateMaster };
