import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
    AllIncentiveSlabsModel,
    CreateIncentiveSlabsModel,
    DeleteIncentiveSlabsModel,
    UpdateIncentiveSlabsModel,
} from "../models/IncentiveSlabsModel";
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

async function GetAllIncentiveSlabs(
    model?: any
): Promise<ServiceResponse<AllIncentiveSlabsModel[]>> {
    try {
        let slab;
        if (model.incentiveId) {
            slab = await AppDataSource.getRepository(entities.IncentiveSlabs)
                .createQueryBuilder("slab")
                .leftJoinAndSelect("slab.IncentiveId", "incentive")
                .where("incentive.Id = :id", { id: model.incentiveId })
                .andWhere("slab.IsActive = :isActive", { isActive: true })
                .getMany();
        } else {
            slab = await AppDataSource.getRepository(entities.IncentiveSlabs)
                .createQueryBuilder("slab")
                .where("slab.IsActive = :isActive", { isActive: true })
                .getMany();
        }
        const slabData: AllIncentiveSlabsModel[] = slab.map((slab) => ({
            id: slab.Id,
            incentiveId: slab.IncentiveId?.Id,
            slabType: slab.SlabType,
            slabFrom: slab.SlabFrom,
            slabTo: slab.SlabTo,
            incentivePerKg: slab.IncentivePerKg,
            isActive: slab.IsActive

        }));
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: slabData,
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

async function CreateIncentiveSlabs(
    req: Request,
    model: CreateIncentiveSlabsModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        // console.log(model);

        const repository = AppDataSource.getRepository(entities.IncentiveSlabs);
        const slab = new entities.IncentiveSlabs();
        slab.IncentiveId = new entities.IncentiveMaster();
        slab.IncentiveId.Id = model.incentiveId ? model.incentiveId : slab.IncentiveId?.Id;
        slab.SlabType = model.slabType ? model.slabType : slab.SlabType;
        slab.SlabFrom = model.slabFrom ? model.slabFrom : slab.SlabFrom;
        slab.SlabTo = model.slabTo ? model.slabTo : slab.SlabTo;
        slab.IncentivePerKg = model.incentivePerKg ? model.incentivePerKg : slab.IncentivePerKg;
        slab.IsActive = true;
        slab.CreatedAt = new Date();
        slab.CreatedBy = userId;
        const savedRole = await repository.save(slab);

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

async function UpdateIncentiveSlabs(
    req: Request,
    model: UpdateIncentiveSlabsModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        // console.log('payload data-->',model);

        const incentive = await AppDataSource.getRepository(entities.IncentiveMaster)
            .createQueryBuilder("incentive")
            .where("incentive.Id = :id", { id: model.incentiveId })
            .getOne();

        const repository = AppDataSource.getRepository(entities.IncentiveSlabs);
        const slab = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });

        if (slab) {
            if (incentive) {
                slab.IncentiveId = incentive;
            }
            slab.SlabType = model.slabType ? model.slabType : slab.SlabType;
            slab.SlabFrom = model.slabFrom ? model.slabFrom : slab.SlabFrom;
            slab.SlabTo = model.slabTo ? model.slabTo : slab.SlabTo;
            slab.IncentivePerKg = model.incentivePerKg ? model.incentivePerKg : slab.IncentivePerKg;
            slab.ModifiedAt = new Date();
            slab.ModifiedBy = userId;

            await repository.save(slab);
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

async function DeleteIncentiveSlabs(
    req: Request,
    model: DeleteIncentiveSlabsModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const repository = AppDataSource.getRepository(entities.IncentiveSlabs);
        // console.log("repository: ", repository);
        const slab = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });
        // console.log("incentive: ", slab, model.id);
        if (slab) {
            slab.IsActive = false;
            slab.DeletedAt = new Date();
            slab.DeletedBy = userId;
            await repository.save(slab);

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

export { GetAllIncentiveSlabs, CreateIncentiveSlabs, UpdateIncentiveSlabs, DeleteIncentiveSlabs };
