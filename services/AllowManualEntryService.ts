import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
    AllowManualEntryModel,
    CreateManualEntryModel,
    DeleteManualEntryModel,
    UpdateManualEntryModel
} from "../models/ManualEntryModel"
dotenv.config();

const ERROR_MESSAGES = {
    NO_DATA: "No Data",
    INTERNAL_SERVER: "Internal Server Error"
}

const SUCCESS_MESSAGES = {
    REGISTER_SUCCESS: "Registration Successful",
    SUCCESS: "Success",
    ADD_SUCCESSS: "Add Successfully",
    UPDATE_SUCCESS: "Approved Successfully",
    DELETE_SUCCESS: "Deleted Successfully"
}

async function GetManualEntry(
    model?: any
): Promise<ServiceResponse<AllowManualEntryModel[]>> {
    try {
        let manualEntry;
        if (model.organizationUnitId) {
            manualEntry = await AppDataSource.getRepository(entities.ManualEntry)
                .createQueryBuilder("allowManualEntry")
                .leftJoinAndSelect("allowManualEntry.OrganizationUnitId", "organization")
                .leftJoinAndSelect("allowManualEntry.CreatedBy", "user")
                .where("allowManualEntry.OrganizationUnitId =:organizationUnitId", { organizationUnitId: model.organizationUnitId })
                .getMany()
        }
        else {
            manualEntry = await AppDataSource.getRepository(entities.ManualEntry)
                .createQueryBuilder("allowManualEntry")
                .leftJoinAndSelect("allowManualEntry.OrganizationUnitId", "organization")
                .leftJoinAndSelect("allowManualEntry.CreatedBy", "user")
                .where("allowManualEntry.Status =:pending", { pending: "pending" })
                .getMany()
        }

        const manualEntryData: AllowManualEntryModel[] = manualEntry.map(
            (manualEntry) => ({
            id: manualEntry?.Id,
            organizationUnitId: manualEntry.OrganizationUnitId,
            status: manualEntry?.Status,
            createdBy: manualEntry?.CreatedBy ? manualEntry.CreatedBy?.Id : 0,
            createdAt: manualEntry?.CreatedAt,
            requestFor: manualEntry?.RequestFor
        }));
        //console.log(manualEntry);
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: manualEntryData
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null
        }
    }
}

async function CreateManualEntry(
    req: Request,
    model: CreateManualEntryModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const organization = await AppDataSource.getRepository(entities.Organization)
            .createQueryBuilder("organization")
            .where("organization.Id =:id", { id: model.organizationUnitId })
            .getOne();

        const repository = AppDataSource.getRepository(entities.ManualEntry);
        const manualEntry = new entities.ManualEntry();

        if(organization){
            manualEntry.OrganizationUnitId = organization;
        }
        manualEntry.Status = "pending";
        manualEntry.CreatedBy = userId;
        manualEntry.CreatedAt = new Date();
        // console.log(manualEntry.CreatedAt,"create");
        manualEntry.RequestFor = model.requestFor ? model.requestFor : manualEntry.RequestFor;
        await repository.save(manualEntry);

        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: null
        }
    }
    catch (error) {
        console.log(error)
        return {
            status: 400,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null
        }
    }
}

async function UpdateManualEntry(
    req: Request,
    model: UpdateManualEntryModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const organizationUnit = await AppDataSource.getRepository(entities.Organization)
        .createQueryBuilder("organization")
        .where("organization.Id =:id", { id: model.organizationUnitId })
        .getOne();

        const repository = AppDataSource.getRepository(entities.ManualEntry);
        const manualEntry = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });

        if (manualEntry) {
            if (organizationUnit) {
                manualEntry.OrganizationUnitId = organizationUnit;
            }
            manualEntry.Status = model.status ? model.status : manualEntry.Status;
            manualEntry.RequestFor = model.requestFor ? model.requestFor : manualEntry.RequestFor;
            // console.log(manualEntry.ModifiedAt,"modify")
            manualEntry.ModifiedBy = userId;
            await repository.save(manualEntry);
            return{
                status: 200,
                message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
                data: null
            }
        }else{
            return{
                status: 404,
                message: ERROR_MESSAGES.NO_DATA,
                data: null
            }
        }
    }catch(error){
        console.log(error);
        return{
            status: 400,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null
        }
    }
}

async function DeleteManualEntry(
    req: Request,
    model: DeleteManualEntryModel
  ): Promise<ServiceResponse<APIResponse[]>> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const key = process.env.TOKEN_SECRET;
      const decode = jwt.verify(token, key);
      const userId = decode.userId;
  
      const repository = AppDataSource.getRepository(entities.ManualEntry);
      const manualEntry = await repository.findOne({
        where: { Id: model.id ?? 0 },
      });
      if (manualEntry) {
        manualEntry.IsActive = false;
        manualEntry.DeletedAt = new Date();
        manualEntry.DeletedBy = userId;
        await repository.save(manualEntry);
  
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

  export{
    GetManualEntry,
    CreateManualEntry,
    UpdateManualEntry,
    DeleteManualEntry
  }