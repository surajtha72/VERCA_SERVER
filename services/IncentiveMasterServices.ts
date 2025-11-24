import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
    AllIncentiveMasterModel,
    CreateIncentiveMasterModel,
    DeleteIncentiveMasterModel,
    UpdateIncentiveMasterModel,
} from "../models/IncentiveMasterModel";
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

async function GetAllIncentiveMaster(
    model?: any
): Promise<ServiceResponse<AllIncentiveMasterModel[]>> {
    try {
        let incentive;
        if (model.currentDate) {
            incentive = await AppDataSource.getRepository(entities.IncentiveMaster)
                .createQueryBuilder("incentive")
                .leftJoinAndSelect("incentive.BillingCycleRef", "billingCycleRef")
                .where("incentive.EffectiveFrom < :currentDate", { currentDate: model.currentDate })
                .andWhere("incentive.IsActive = :isActive", { isActive: true })
                .orderBy("incentive.EffectiveFrom", "DESC")
                .getMany();
        }
        else if (model.id) {
            incentive = await AppDataSource.getRepository(entities.IncentiveMaster)
                .createQueryBuilder("incentive")
                .leftJoinAndSelect("incentive.BillingCycleRef", "billingCycleRef")
                .where("incentive.IncentiveId = :id", { id: model.id })
                .andWhere("incentive.IsActive = :isActive", { isActive: true })
                .orderBy("incentive.EffectiveFrom", "DESC")
                .getMany();
        } else {
            incentive = await AppDataSource.getRepository(entities.IncentiveMaster)
                .createQueryBuilder("incentive")
                .leftJoinAndSelect("incentive.BillingCycleRef", "billingCycleRef")
                .where("incentive.IsActive = :isActive", { isActive: true })
                .orderBy("incentive.EffectiveFrom", "DESC")
                .getMany();
        }
        const incentiveData: AllIncentiveMasterModel[] = incentive.map((incentive) => ({
            id: incentive.Id,
            incentiveName: incentive.IncentiveName,
            incentiveType: incentive.IncentiveType,
            effectiveFrom: incentive.EffectiveFrom,
            billingCycleRef: incentive.BillingCycleRef,
            minFatLimit: incentive.MinFatLimit,
            minSnfLimit: incentive.MinSnfLimit,
            shiftsApplicable: incentive.ShiftsApplicable,
            isActive: incentive.IsActive

        }));
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: incentiveData,
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

async function CreateIncentiveMaster(
    req: Request,
    model: CreateIncentiveMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        console.log("model: ",model);
        const repository = AppDataSource.getRepository(entities.IncentiveMaster);
        const incentive = new entities.IncentiveMaster();
        incentive.IncentiveName = model.incentiveName ? model.incentiveName : incentive.IncentiveName;
        incentive.IncentiveType = model.incentiveType ? model.incentiveType : incentive.IncentiveType;
        incentive.EffectiveFrom = model.effectiveFrom ? model.effectiveFrom : incentive.EffectiveFrom;
        incentive.BillingCycleRef = model.billingCycleRef ? model.billingCycleRef : incentive.BillingCycleRef;
        incentive.MinFatLimit = model.minFatLimit ? model.minFatLimit : incentive.MinFatLimit;
        incentive.MinSnfLimit = model.minSnfLimit ? model.minSnfLimit : incentive.MinSnfLimit;
        incentive.ShiftsApplicable = model.shiftsApplicable ? model.shiftsApplicable : incentive.ShiftsApplicable;
        incentive.IsActive = true;
        incentive.CreatedAt = new Date();
        incentive.CreatedBy = userId;
        const savedRole = await repository.save(incentive);

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

async function UpdateIncentiveMaster(
    req: Request,
    model: UpdateIncentiveMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const repository = AppDataSource.getRepository(entities.IncentiveMaster);
        const incentive = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });
        if (incentive) {
            incentive.IncentiveName = model.incentiveName ? model.incentiveName : incentive.IncentiveName;
            incentive.IncentiveType = model.incentiveType ? model.incentiveType : incentive.IncentiveType;
            incentive.EffectiveFrom = model.effectiveFrom ? model.effectiveFrom : incentive.EffectiveFrom;
            incentive.BillingCycleRef = model.billingCycleRef ? model.billingCycleRef : incentive.BillingCycleRef;
            incentive.MinFatLimit = model.minFatLimit ? model.minFatLimit : incentive.MinFatLimit;
            incentive.MinSnfLimit = model.minSnfLimit ? model.minSnfLimit : incentive.MinSnfLimit;
            incentive.ShiftsApplicable = model.shiftsApplicable ? model.shiftsApplicable : incentive.ShiftsApplicable;
            incentive.ModifiedAt = new Date();
            incentive.ModifiedBy = userId;
            await repository.save(incentive);
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

async function DeleteIncentiveMaster(
    req: Request,
    model: DeleteIncentiveMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const repository = AppDataSource.getRepository(entities.IncentiveMaster);
        // console.log("repository: ", repository);
        const incentive = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });
        // console.log("incentive: ",incentive,model.id);
        if (incentive) {
            incentive.IsActive = false;
            incentive.DeletedAt = new Date();
            incentive.DeletedBy = userId;
            await repository.save(incentive);

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

export { GetAllIncentiveMaster, CreateIncentiveMaster, UpdateIncentiveMaster, DeleteIncentiveMaster };
