import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllProductCategoryModel,
  CreateProductCategoryModel,
  DeleteProductCategoryModel,
  UpdateProductCategoryModel,
} from "../models/ProductCategoryModel";
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

async function GetProductCategory(
  model?: any
): Promise<ServiceResponse<AllProductCategoryModel[]>> {
  try {
    let productCategory;
    if (model.id) {
      productCategory = await AppDataSource.getRepository(entities.ProductCategory)
        .createQueryBuilder("productCategory")
        .where("productCategory.Id = :id", { id: model.id })
        .andWhere("productCategory.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      productCategory = await AppDataSource.getRepository(entities.ProductCategory)
        .createQueryBuilder("productCategory")
        .where("productCategory.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const productCategoryData: AllProductCategoryModel[] = productCategory.map(
      (productCategory) => ({
        id: productCategory.Id,
        categoryName: productCategory.CategoryName,
        shortDescription: productCategory.ShortDescription,
        isActive: productCategory.IsActive
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: productCategoryData,
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

async function CreateProductCategory(
  req: Request,
  model: CreateProductCategoryModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.ProductCategory);
    const productCategory = new entities.ProductCategory();

    productCategory.CategoryName = model.categoryName || productCategory.CategoryName;
    productCategory.ShortDescription = model.shortDescription || productCategory.ShortDescription;
    productCategory.IsActive =  true;
    productCategory.CreatedAt = new Date();
    productCategory.CreatedBy = userId;
    await repository.save(productCategory);

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

async function UpdateProductCategory(
  req: Request,
  model: UpdateProductCategoryModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.ProductCategory);
    const productCategory = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (productCategory) {
        productCategory.CategoryName = model.categoryName || productCategory.CategoryName;
        productCategory.ShortDescription = model.shortDescription || productCategory.ShortDescription;
        productCategory.IsActive =  model.isActive || productCategory.IsActive;

      productCategory.ModifiedAt = new Date();
      productCategory.ModifiedBy = userId;
      await repository.save(productCategory);

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

async function DeleteProductCategory(
  req: Request,
  model: DeleteProductCategoryModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.ProductCategory);
    // console.log("repository: ",repository);
    const productCategory = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    // console.log("productCategory: ",productCategory,model.id);
    if (productCategory) {
      productCategory.IsActive = false;
      productCategory.DeletedAt = new Date();
      productCategory.DeletedBy = userId;
      await repository.save(productCategory);

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

export { GetProductCategory, CreateProductCategory, UpdateProductCategory, DeleteProductCategory };
