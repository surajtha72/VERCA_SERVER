import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
    AllTRateAppliedModel,
    CreateRateAppliedModel,
    DeleteRateAppliedModel,
    UpdateRateAppliedModel,
} from "../models/RateAppliedModel";
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

async function GetRateApplied(
    model?: any
): Promise<ServiceResponse<AllTRateAppliedModel[]>> {
    try {
        let rateApplied;
        if (model.id) {
            rateApplied = await AppDataSource.getRepository(entities.RateApplied)
                .createQueryBuilder("rateApplied")
                .leftJoinAndSelect("rateApplied.ProductCategId", "rate_master")
                .where("rateApplied.Id = :id", { id: model.id })
                .andWhere("rateApplied.IsActive = :isActive", { isActive: true })
                .getMany();
        } else {
            rateApplied = await AppDataSource.getRepository(entities.RateApplied)
                .createQueryBuilder("rateApplied")
                .leftJoinAndSelect("rateApplied.RateId", "rate_master")
                .where("rateApplied.IsActive = :isActive", { isActive: true })
                .getMany();
        }
        const rateAppliedData: AllTRateAppliedModel[] = rateApplied.map(
            (rateApplied) => ({
                id: rateApplied.Id,
                rateId: rateApplied.RateId?.Id,
                appliedTo: rateApplied.AppliedTo,
                appliedOn: rateApplied.AppliedOn,
                isActive: rateApplied.IsActive

            })
        );
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: rateAppliedData,
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

async function CreateRateApplied(
    req: Request,
    model: CreateRateAppliedModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const ratemaster = await AppDataSource.getRepository(entities.RateMaster)
        .createQueryBuilder("ratemaster")
        .where("ratemaster.Id = :id", { id: model.rateId })
        .getOne();

        const repository = AppDataSource.getRepository(entities.RateApplied);
        const rateApplied = new entities.RateApplied();

        if (ratemaster) {
            rateApplied.RateId = ratemaster;
          }

        // rateApplied.RateId = new entities.RateMaster();
        rateApplied.AppliedTo = model.appliedTo ? model.appliedTo : rateApplied.AppliedTo;
        rateApplied.AppliedOn = model.appliedOn ? model.appliedOn : rateApplied.AppliedOn;
        rateApplied.IsActive = true;
        rateApplied.CreatedAt = new Date();
        rateApplied.CreatedBy = userId;
        await repository.save(rateApplied);

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

async function UpdateRateApplied(
    req: Request,
    model: UpdateRateAppliedModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const ratemaster = await AppDataSource.getRepository(entities.RateMaster)
        .createQueryBuilder("ratemaster")
        .where("ratemaster.Id = :id", { id: model.rateId })
        .getOne();

        const repository = AppDataSource.getRepository(entities.RateApplied);
        const rateApplied = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });
        if (rateApplied) {
            if (ratemaster) {
                rateApplied.RateId = ratemaster;
              }
            // rateApplied.RateId.Id = model.rateId ? model.rateId : rateApplied.RateId.Id;
            rateApplied.AppliedTo = model.appliedTo || rateApplied.AppliedTo;
            rateApplied.AppliedOn = model.appliedOn || rateApplied.AppliedOn;
            rateApplied.ModifiedAt = new Date();
            rateApplied.ModifiedBy = userId;
            await repository.save(rateApplied);

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

async function DeleteRateApplied(
    req: Request,
    model: DeleteRateAppliedModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const repository = AppDataSource.getRepository(entities.RateApplied);
        // console.log("repository: ", repository);
        const rateApplied = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });
        // console.log("ratemaster: ", rateApplied, model.id);
        if (rateApplied) {
            rateApplied.IsActive = false;
            rateApplied.DeletedAt = new Date();
            rateApplied.DeletedBy = userId;
            await repository.save(rateApplied);

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

export { GetRateApplied, CreateRateApplied, UpdateRateApplied, DeleteRateApplied };
