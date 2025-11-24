import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllIndentProductsModel,
  CreateIndentProductsModel,
  DeleteIndentProductsModel,
  UpdateIndentProductsModel,
} from "../models/IndentProductsModel";
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

async function GetIndentProducts(
  model?: any
): Promise<ServiceResponse<AllIndentProductsModel[]>> {
  try {
    console.log(model)
    let indentProducts;
    if (model.indentId) {
      // console.log("indent id model")
      indentProducts = await AppDataSource.getRepository(entities.IndentProducts)
        .createQueryBuilder("indentProducts")
        .leftJoinAndSelect("indentProducts.IndentId", "product_supply")
        .leftJoinAndSelect("product_supply.IndentRaisedBy", "organization")
        .leftJoinAndSelect("indentProducts.ProductId", "product_master")
        .where("indentProducts.IndentId =:indentId", { indentId: model.indentId })
        .andWhere("indentProducts.IsActive = :isActive", { isActive: true })
        .getMany();
        
    } else if (model.dcNumber) {
      indentProducts = await AppDataSource.getRepository(entities.IndentProducts)
        .createQueryBuilder("indentProducts")
        .leftJoinAndSelect("indentProducts.IndentId", "productSupply")
        .leftJoinAndSelect("productSupply.IndentRaisedBy", "organization")
        .leftJoinAndSelect("indentProducts.ProductId", "product_master")
        .where("productSupply.DCNumber = :dcNumber", { dcNumber: model.dcNumber })
        .getMany();
    } else if (model.organizationUnitId) {
      indentProducts = await AppDataSource.getRepository(entities.IndentProducts)
        .createQueryBuilder("indentProducts")
        .leftJoinAndSelect("indentProducts.IndentId", "productSupply")
        .leftJoinAndSelect("indentProducts.CreatedBy", "user")
        .leftJoinAndSelect("productSupply.IndentRaisedBy", "organization")
        .leftJoinAndSelect("indentProducts.ProductId", "product_master")
        .where("user.OrganizationUnitId = :organizationUnitId", { organizationUnitId: model.organizationUnitId })
        .andWhere("indentProducts.IndentId IS NOT NULL")
        .getMany();
    } else {
      indentProducts = await AppDataSource.getRepository(entities.IndentProducts)
        .createQueryBuilder("indentProducts")
        .leftJoinAndSelect("indentProducts.IndentId", "product_supply")
        .leftJoinAndSelect("product_supply.IndentRaisedBy", "organization")
        .leftJoinAndSelect("indentProducts.ProductId", "product_master")
        .andWhere("indentProducts.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const indentProductsData: AllIndentProductsModel[] = indentProducts.map(
      (indentProducts) => ({
        id: indentProducts?.Id,
        indentId: model.indentId?.Id ? model.indentId?.Id : indentProducts.IndentId,
        productId: model.productId?.Id ? model.productId?.Id : indentProducts.ProductId,
        availableQty: indentProducts.AvailableQty,
        rate: indentProducts.Rate,
        requestedQty: indentProducts.RequestedQty,
        approvedQty: indentProducts.ApprovedQty,
        dispatchQty: indentProducts.DispatchQty,
        reveivedQty: indentProducts.ReceivedQty,
        isActive: indentProducts.IsActive,
        createdBy: indentProducts.CreatedBy?.Id
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: indentProductsData,
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

async function CreateIndentProducts(
  req: Request,
  model: CreateIndentProductsModel[]
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;
    const uuid: string = uuidv4();

    for(const record of model){
      console.log(record);

    const repository = AppDataSource.getRepository(entities.IndentProducts);
    const indentProducts = new entities.IndentProducts();

    if (!record.id) {
      indentProducts.Id = uuid;
    } else {
      indentProducts.Id = record.id;
    }
    indentProducts.IndentId = record.indentId || indentProducts.IndentId;
    indentProducts.ProductId = record.productId || indentProducts.ProductId;
    indentProducts.AvailableQty = record.availableQty || indentProducts.AvailableQty;
    indentProducts.Rate = record.rate || indentProducts.Rate;
    indentProducts.RequestedQty = record.requestedQty || indentProducts.RequestedQty;
    indentProducts.ApprovedQty = record.approvedQty || indentProducts.ApprovedQty;
    indentProducts.IsActive = true;
    indentProducts.CreatedAt = new Date();
    indentProducts.CreatedBy = userId;
    console.log(indentProducts);
    await repository.save(indentProducts);
  }

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

async function UpdateIndentProducts(
  req: Request,
  model: UpdateIndentProductsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.IndentProducts);
    const indentProducts = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (indentProducts) {
      indentProducts.IndentId = model.indentId || indentProducts.IndentId;
      indentProducts.ProductId = model.productId || indentProducts.ProductId;
      indentProducts.AvailableQty = model.availableQty || indentProducts.AvailableQty;
      indentProducts.Rate = model.rate || indentProducts.Rate;
      indentProducts.RequestedQty = model.requestedQty || indentProducts.RequestedQty;
      indentProducts.ApprovedQty = model.approvedQty || indentProducts.ApprovedQty;
      indentProducts.DispatchQty = model.dispatchQty || indentProducts.DispatchQty;
      indentProducts.ReceivedQty = model.reveivedQty || indentProducts.ReceivedQty;
      indentProducts.IsActive = model.isActive || indentProducts.IsActive;

      indentProducts.ModifiedAt = new Date();
      indentProducts.ModifiedBy = userId;
      await repository.save(indentProducts);

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

async function UpdateIndentProductsApprove(
  req: Request,
  model: UpdateIndentProductsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.IndentProducts);
    const indentProducts = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (indentProducts) {
      indentProducts.ApprovedQty = model.approvedQty || indentProducts.ApprovedQty;
      indentProducts.ReceivedQty = model.reveivedQty || indentProducts.ReceivedQty;
      indentProducts.ModifiedAt = new Date();
      indentProducts.ModifiedBy = userId;
      await repository.save(indentProducts);

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

async function DeleteIndentProducts(
  req: Request,
  model: DeleteIndentProductsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.IndentProducts);
    // console.log("repository: ", repository);
    const indentProducts = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    // console.log("indentProducts: ", indentProducts, model.id);
    if (indentProducts) {
      indentProducts.IsActive = false;
      indentProducts.DeletedAt = new Date();
      indentProducts.DeletedBy = userId;
      await repository.save(indentProducts);

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

export { GetIndentProducts, CreateIndentProducts, UpdateIndentProducts, UpdateIndentProductsApprove, DeleteIndentProducts };