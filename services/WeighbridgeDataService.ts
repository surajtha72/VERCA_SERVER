import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
    GetWeighbridgeDataModel,
    GetWeighbridgeLabDataModel,
    UpdateWeighbridgeData,
    UpdateWeighbridgeLabDataModel
} from "../models/WeighbridgeDataModel";
dotenv.config();

const ERROR_MESSAGES = {
    NO_DATA: "No Data",
    INTERNAL_SERVER: "Internal Server Error",
};

const SUCCESS_MESSAGES = {
    SUCCESS: "Success",
    UPDATE_SUCCESS: "Updated Successfully",
};

async function GetWeighbridgeData(model?: any):
    Promise<ServiceResponse<GetWeighbridgeDataModel>> {
    try {
        let weighbridgeData;
        weighbridgeData = await AppDataSource.getRepository(entities.WeighbridgeData)
            .createQueryBuilder("weighbridgeData")
            .where("weighbridgeData.Id =:id", { id: 1 })
            .getOne();

        const weighData: GetWeighbridgeDataModel = {
            id: weighbridgeData?.Id ?? 0,
            weight: weighbridgeData?.weight ?? 0
        }

        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: weighData
        };
    }catch(err){
        console.log(err);
        return{
            status: 500,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null
        }
    }
}

async function GetWeighbridgeLabData(model?: any):
    Promise<ServiceResponse<GetWeighbridgeLabDataModel>> {
    try {
        let weighbridgeLabData;
        weighbridgeLabData = await AppDataSource.getRepository(entities.WeighbridgeLabData)
            .createQueryBuilder("weighbridgeLabData")
            .where("weighbridgeLabData.Id =:id", { id: 1 })
            .getOne();

        const labData: GetWeighbridgeLabDataModel = {
            id: weighbridgeLabData?.Id ?? 0,
            fat: weighbridgeLabData?.Fat ?? 0,
            snf: weighbridgeLabData?.Snf ?? 0,
            clr: weighbridgeLabData?.Clr ?? 0,
            protein: weighbridgeLabData?.Protein ?? 0,
            lactose: weighbridgeLabData?.Lactose ?? 0,
            salt: weighbridgeLabData?.Salt ?? 0,
            water: weighbridgeLabData?.Water ?? 0,
            temperature: weighbridgeLabData?.Temperature ?? 0
        }

        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: labData
        };
    }catch(err){
        console.log(err);
        return{
            status: 500,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null
        }
    }
}

async function UpdateWeighBridgeData(
    req: Request,
    model: UpdateWeighbridgeData
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        // const token = req.headers.authorization?.split(" ")[1];
        // const key = process.env.TOKEN_SECRET;
        // const decode = jwt.verify(token, key);
        // const userId = decode.userId;
        console.log("inside update weighbridge function");


        const repository = AppDataSource.getRepository(entities.WeighbridgeData);
        const weighBridgeData = await repository.findOne({
            where: { Id: 1 },
        });
        if (weighBridgeData) {
            weighBridgeData.weight = model.weight ? model.weight : weighBridgeData.weight;

            weighBridgeData.ModifiedAt = new Date();
            await repository.save(weighBridgeData);

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

async function UpdateWeighBridgeLabData(
    req: Request,
    model: UpdateWeighbridgeLabDataModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        // const token = req.headers.authorization?.split(" ")[1];
        // const key = process.env.TOKEN_SECRET;
        // const decode = jwt.verify(token, key);
        // const userId = decode.userId;

        console.log("inside update lab function");
        const repository = AppDataSource.getRepository(entities.WeighbridgeLabData);
        const labdata = await repository.findOne({
            where: { Id: 1 },
        });
        if (labdata) {
            labdata.Fat = model.fat ? model.fat : labdata.Fat;
            labdata.Snf = model.snf ? model.snf : labdata.Snf;
            labdata.Clr = model.clr ? model.clr : labdata.Clr;
            labdata.Protein = model.protein ? model.protein : labdata.Protein;
            labdata.Lactose = model.lactose ? model.lactose : labdata.Lactose;
            labdata.Salt = model.salt ? model.salt : labdata.Salt;
            labdata.Water = model.water ? model.water : labdata.Water;
            labdata.Temperature = model.temperature ? model.temperature : labdata.Temperature;
            labdata.ModifiedAt = new Date();

            await repository.save(labdata);

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

export { UpdateWeighBridgeData, GetWeighbridgeData, GetWeighbridgeLabData, UpdateWeighBridgeLabData };