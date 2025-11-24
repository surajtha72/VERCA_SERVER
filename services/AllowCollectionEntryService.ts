import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
    AllowCollectionEntryModel,
    CreateCollectionEntryModel,
    DeleteCollectionEntryModel,
    UpdateCollectionEntryModel
} from "../models/CollectionEntryModel"
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

async function GetCollectionEntry(
    model?: any
): Promise<ServiceResponse<AllowCollectionEntryModel[]>> {
    try {
        let collectionEntry;
        if (model.organizationUnitId) {
            collectionEntry = await AppDataSource.getRepository(entities.CollectionEntry)
                .createQueryBuilder("allowCollectionEntry")
                .leftJoinAndSelect("allowCollectionEntry.OrganizationUnitId", "organization")
                .leftJoinAndSelect("allowCollectionEntry.CreatedBy", "user")
                .where("allowCollectionEntry.OrganizationUnitId =:organizationUnitId", { organizationUnitId: model.organizationUnitId })
                .getMany()
        }
        else {
            collectionEntry = await AppDataSource.getRepository(entities.CollectionEntry)
                .createQueryBuilder("allowCollectionEntry")
                .leftJoinAndSelect("allowCollectionEntry.OrganizationUnitId", "organization")
                .leftJoinAndSelect("allowCollectionEntry.CreatedBy", "user")
                .where("allowCollectionEntry.Status =:pending", { pending: "pending" })
                .getMany()
        }

        const collectionEntryData: AllowCollectionEntryModel[] = collectionEntry.map(
            (collectionEntry) => ({
            id: collectionEntry?.Id,
            organizationUnitId: collectionEntry.OrganizationUnitId,
            status: collectionEntry?.Status,
            createdBy: collectionEntry?.CreatedBy ? collectionEntry.CreatedBy?.Id : 0,
            createdAt: collectionEntry?.CreatedAt,
            requestFor: collectionEntry?.RequestFor
        }));
        //console.log(collectionEntry);
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: collectionEntryData
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

async function CreateCollectionEntry(
    req: Request,
    model: CreateCollectionEntryModel
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

        const repository = AppDataSource.getRepository(entities.CollectionEntry);
        const collectionEntry = new entities.CollectionEntry();

        if(organization){
            collectionEntry.OrganizationUnitId = organization;
        }
        collectionEntry.Status = "pending";
        collectionEntry.CreatedBy = userId;
        collectionEntry.CreatedAt = new Date();
        // console.log(collectionEntry.CreatedAt,"create");
        collectionEntry.RequestFor = model.requestFor ? model.requestFor : collectionEntry.RequestFor;
        await repository.save(collectionEntry);

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

async function UpdateCollectionEntry(
    req: Request,
    model: UpdateCollectionEntryModel
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

        const repository = AppDataSource.getRepository(entities.CollectionEntry);
        const collectionEntry = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });

        if (collectionEntry) {
            if (organizationUnit) {
                collectionEntry.OrganizationUnitId = organizationUnit;
            }
            collectionEntry.Status = model.status ? model.status : collectionEntry.Status;
            collectionEntry.RequestFor = model.requestFor ? model.requestFor : collectionEntry.RequestFor;
            // console.log(collectionEntry.ModifiedAt,"modify")
            collectionEntry.ModifiedBy = userId;
            await repository.save(collectionEntry);
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

async function DeleteCollectionEntry(
    req: Request,
    model: DeleteCollectionEntryModel
  ): Promise<ServiceResponse<APIResponse[]>> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const key = process.env.TOKEN_SECRET;
      const decode = jwt.verify(token, key);
      const userId = decode.userId;
  
      const repository = AppDataSource.getRepository(entities.CollectionEntry);
      const collectionEntry = await repository.findOne({
        where: { Id: model.id ?? 0 },
      });
      if (collectionEntry) {
        collectionEntry.IsActive = false;
        collectionEntry.DeletedAt = new Date();
        collectionEntry.DeletedBy = userId;
        await repository.save(collectionEntry);
  
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
    GetCollectionEntry,
    CreateCollectionEntry,
    UpdateCollectionEntry,
    DeleteCollectionEntry
  }