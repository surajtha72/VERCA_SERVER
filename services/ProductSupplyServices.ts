import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
  AllProductSupplyModel,
  CreateProductSupplyModel,
  DCNumberModel,
  DeleteProductSupplyModel,
  UpdateProductSupplyModel,
} from "../models/ProductSupplyModel";
dotenv.config();

const ERROR_MESSAGES = {
  NO_DATA: "No Data",
  INTERNAL_SERVER: "Internal Server Error",
};

const SUCCESS_MESSAGES = {
  SUCCESS: "Success",
  ADD_SUCCESS: "Added Successfully",
  UPDATE_SUCCESS: "Approved Successfully",
  UPDATE_SUCCESS_DISPATCH: "Dispatched Successfully",
  UPDATE_SUCCESS_RECEIVED: "Received Successfully",
  DELETE_SUCCESS: "Deleted Successfully",
};

async function GetProductSupplyIndent(
  model?: any
): Promise<ServiceResponse<AllProductSupplyModel[]>> {
  try {
    let productSupply;
    if (model.indent_raised_by) {
      productSupply = await AppDataSource.getRepository(entities.ProductSupply)
        .createQueryBuilder("productSupply")
        .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
        .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
        .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
        .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
        .andWhere("raisedForUser.Id = :approvedId", {
          approvedId: model.indentRaisedFor,
        })
        .andWhere("raisedByUser.Id = :raisedId", {
          raisedId: model.indentRaisedBy,
        })
        .andWhere("productSupply.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.indentStatus) {
      productSupply = await AppDataSource.getRepository(entities.ProductSupply)
        .createQueryBuilder("productSupply")
        .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
        .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
        .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
        .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
        .where("productSupply.IndentStatus =:status", {
          status: model.indentStatus,
        })
        .andWhere("productSupply.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      productSupply = await AppDataSource.getRepository(entities.ProductSupply)
        .createQueryBuilder("productSupply")
        .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
        .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
        .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
        .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
        .where("productSupply.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    // console.log(productSupply);
    const productMasterData: AllProductSupplyModel[] = productSupply.map(
      (productSupply) => ({
        id: productSupply.Id,
        indentStatus: productSupply.IndentStatus,
        indentRaisedBy: productSupply.IndentRaisedBy,
        indentRaisedFor: productSupply.IndentRaisedFor,
        indentRaisedOnDate: productSupply.IndentRaisedOnDate,
        indentApprovedBy: productSupply.IndentApprovedBy,
        indentRejectedBy: productSupply.IndentRejectedBy,
        approvedOnDate: productSupply.ApprovedOnDate,
        dispatchByEmployee: productSupply.DispatchByEmployee,
        dispatchDate: productSupply.DispatchDate,
        receivedByUserId: productSupply.ReceivedByUserId,
        receivedOn: productSupply.ReceivedOn,
        isActive: productSupply.IsActive,
        rejectReason: productSupply.RejectReason,
        dcNumber: productSupply.DCNumber,
      })
    );
    // console.log(productMasterData);
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: productMasterData,
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

async function GetProductSupplyApprove(
  model?: any
): Promise<ServiceResponse<AllProductSupplyModel[]>> {
  try {
    let productSupply;
    // console.log("model : ", model)
    if (model.id) {
      productSupply = await AppDataSource.getRepository(entities.ProductSupply)
        .createQueryBuilder("productSupply")
        .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
        .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
        .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
        .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
        .andWhere("productSupply.IsActive = :isActive", { isActive: true })
        // .andWhere("productSupply.IndentStatus = :indentStatus", { indentStatus: 1 })
        .getMany();
    } else if (model.indentStatus) {
      productSupply = await AppDataSource.getRepository(entities.ProductSupply)
        .createQueryBuilder("productSupply")
        .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
        .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
        .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
        .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
        .where("productSupply.IsActive = :isActive", { isActive: true })
        .andWhere("productSupply.IndentStatus = :indentStatus", {
          indentStatus: model.indentStatus,
        })
        .getMany();
    } else if (model.dcNumber) {
      productSupply = await AppDataSource.getRepository(entities.ProductSupply)
        .createQueryBuilder("productSupply")
        .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
        .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
        .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
        .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
        .where("productSupply.IsActive = :isActive", { isActive: true })
        .andWhere("productSupply.DCNumber IS NOT NULL")
        .andWhere("productSupply.DCNumber =:dcNumber", {
          dcNumber: model.dcNumber,
        })
        .getMany();
    } else if (model.organizationUnitId) {
      productSupply = await AppDataSource.getRepository(entities.ProductSupply)
        .createQueryBuilder("productSupply")
        .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedBy")
        .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
        .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
        .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
        .where("productSupply.IndentRaisedBy = :id", {
          id: model.organizationUnitId,
        })
        .getMany();
    } else {
      productSupply = await AppDataSource.getRepository(entities.ProductSupply)
        .createQueryBuilder("productSupply")
        .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
        .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
        .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
        .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
        .where("productSupply.IsActive = :isActive", { isActive: true })
        // .andWhere("productSupply.IndentStatus = :indentStatus", { indentStatus: 1 })
        .getMany();
    }
    // console.log(productSupply);
    const productMasterData: AllProductSupplyModel[] = productSupply.map(
      (productSupply) => ({
        id: productSupply.Id,
        indentStatus: productSupply.IndentStatus,
        indentRaisedBy: productSupply.IndentRaisedBy,
        indentRaisedFor: productSupply.IndentRaisedFor,
        indentRaisedOnDate: productSupply.IndentRaisedOnDate,
        indentApprovedBy: productSupply.IndentApprovedBy,
        indentRejectedBy: productSupply.IndentRejectedBy,
        approvedOnDate: productSupply.ApprovedOnDate,
        dispatchByEmployee: productSupply.DispatchByEmployee,
        dispatchDate: productSupply.DispatchDate,
        receivedByUserId: productSupply.ReceivedByUserId,
        receivedOn: productSupply.ReceivedOn,
        isActive: productSupply.IsActive,
        rejectReason: productSupply.RejectReason,
        dcNumber: productSupply.DCNumber,
      })
    );
    // console.log(productMasterData);
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: productMasterData,
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

async function GetDCNumbers(
  model?: any
): Promise<ServiceResponse<DCNumberModel[]>> {
  try {
    let productSupply;
    productSupply = await AppDataSource.getRepository(entities.ProductSupply)
      .createQueryBuilder("productSupply")
      .leftJoinAndSelect("productSupply.IndentRaisedBy", "raisedByUser")
      .leftJoinAndSelect("productSupply.IndentRaisedFor", "raisedForUser")
      .leftJoinAndSelect("productSupply.DispatchByEmployee", "dispatchUser")
      .leftJoinAndSelect("productSupply.ReceivedByUserId", "receivedUser")
      .where("productSupply.IsActive = :isActive", { isActive: true })
      .andWhere("productSupply.DCNumber IS NOT NULL")
      .andWhere("productSupply.ReceivedByUserId IS NULL")
      .getMany();
    // console.log(productSupply);
    const productMasterData: DCNumberModel[] = productSupply.map(
      (productSupply) => ({
        id: productSupply.Id,
        dcNumber: productSupply.DCNumber,
      })
    );
    // console.log(productMasterData);
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: productMasterData,
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

async function CreateProductSupply(
  req: Request,
  model: CreateProductSupplyModel[]
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;
    const uuid: string = uuidv4();

    // console.log(model);
    for(const record of model){
    console.log(record);

    const indentRaisedBy = await AppDataSource.getRepository(
      entities.Organization
    )
      .createQueryBuilder("organization")
      .where("organization.Id = :id", { id: record.indentRaisedBy })
      .getOne();
    const indentRaisedFor = await AppDataSource.getRepository(
      entities.Organization
    )
      .createQueryBuilder("organization")
      .where("organization.Id = :id", { id: record.indentRaisedBy })
      .getOne();

    const repository = AppDataSource.getRepository(entities.ProductSupply);
    const productSupply = new entities.ProductSupply();
    if (indentRaisedBy) {
      productSupply.IndentRaisedBy = indentRaisedBy;
    }
    if (indentRaisedFor) {
      productSupply.IndentRaisedFor = indentRaisedFor;
    }
    if (record.id) {
      productSupply.Id = record.id;
    } else {
      productSupply.Id = uuid;
    }
    if (record.indentRaisedOnDate) {
      productSupply.IndentRaisedOnDate = record.indentRaisedOnDate;
    } else {
      productSupply.IndentRaisedOnDate = new Date();
    }
    productSupply.IndentStatus = 1;
    productSupply.IsActive = true;
    productSupply.CreatedAt = new Date();
    productSupply.CreatedBy = userId;
    console.log(productSupply);
    await repository.save(productSupply);
  }
    // if (model.indentProducts) {
    //   const indentProductsRepository = AppDataSource.getRepository(
    //     entities.IndentProducts
    //   );
    //   for (const indentProduct of model.indentProducts) {
    //     // console.log("indentProduct: ", indentProduct);
    //     const product = new entities.IndentProducts();
    //     product.Id = indentProduct.id;
    //     product.IndentId = productSupply;
    //     product.ProductId = indentProduct.productId || product.ProductId;
    //     product.AvailableQty =
    //       indentProduct.availableQty || product.AvailableQty;
    //     product.Rate = indentProduct.rate || product.Rate;
    //     product.RequestedQty =
    //       indentProduct.requestedQty || product.RequestedQty;
    //     product.IsActive = true;
    //     product.CreatedAt = new Date();
    //     product.CreatedBy = userId;

    //     await indentProductsRepository.save(product);
    //   }
    // }
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

async function UpdateProductSupply(
  req: Request,
  model: UpdateProductSupplyModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    // console.log("abcd", model);

    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const indentApprovedBy = await AppDataSource.getRepository(
      entities.Organization
    )
      .createQueryBuilder("organization")
      .where("organization.Id = :id", { id: model.indentApprovedBy })
      .getOne();
    const indentRaisedBy = await AppDataSource.getRepository(
      entities.Organization
    )
      .createQueryBuilder("organization")
      .where("organization.Id = :id", { id: model.indentRaisedBy })
      .getOne();
    const indentRaisedFor = await AppDataSource.getRepository(
      entities.Organization
    )
      .createQueryBuilder("organization")
      .where("organization.Id = :id", { id: model.indentRaisedFor })
      .getOne();
    const indentRejectedBy = await AppDataSource.getRepository(
      entities.Organization
    )
      .createQueryBuilder("organization")
      .where("organization.Id = :id", { id: model.indentRejectedBy })
      .getOne();

    const repository = AppDataSource.getRepository(entities.ProductSupply);
    const productSupply = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });

    if (productSupply) {
      productSupply.IndentRaisedOnDate = model.indentRaisedOnDate
        ? model.indentRaisedOnDate
        : productSupply.IndentRaisedOnDate;
      if (indentApprovedBy) {
        productSupply.IndentApprovedBy = indentApprovedBy;
      }
      if (indentRejectedBy) {
        productSupply.IndentRejectedBy = indentRejectedBy;
      }
      productSupply.DispatchByEmployee = model.dispatchByEmployee
        ? model.dispatchByEmployee
        : productSupply.DispatchByEmployee;
      productSupply.DispatchDate = model.dispatchDate
        ? model.dispatchDate
        : productSupply.DispatchDate;
      productSupply.ReceivedOn = model.receivedOn
        ? model.receivedOn
        : productSupply.ReceivedOn;
      productSupply.RejectReason = model.rejectReason
        ? model.rejectReason
        : productSupply.RejectReason;
      productSupply.IndentStatus = model.indentStatus
        ? model.indentStatus
        : productSupply.IndentStatus;
      productSupply.DCNumber = model.dcNumber
        ? model.dcNumber
        : productSupply.DCNumber;
      productSupply.ApprovedOnDate = new Date();
      productSupply.ModifiedAt = new Date();
      productSupply.ModifiedBy = userId;
      if (model.indentProducts) {
        productSupply.ReceivedByUserId = userId;
      }
      await repository.save(productSupply);

      if (model.indentProducts) {
        const indentProductsRepository = AppDataSource.getRepository(
          entities.IndentProducts
        );
        for (const indentProduct of model.indentProducts) {
          const product = await indentProductsRepository.findOne({
            where: { Id: indentProduct.id ?? 0 },
          });
          if (product) {
            product.ReceivedQty =
              indentProduct.receivedQty || product.ReceivedQty;
            product.ApprovedQty =
              indentProduct.approvedQty || product.ApprovedQty;
            product.IsActive = true;
            product.ModifiedAt = new Date();
            product.ModifiedBy = userId;

            await indentProductsRepository.save(product);
          }
        }
      }

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

async function DeleteProductSupply(
  req: Request,
  model: DeleteProductSupplyModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.ProductSupply);
    // console.log("repository: ", repository);
    const productSupply = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (productSupply) {
      productSupply.IsActive = false;
      productSupply.DeletedAt = new Date();
      productSupply.DeletedBy = userId;
      await repository.save(productSupply);

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

export {
  GetProductSupplyIndent,
  GetProductSupplyApprove,
  CreateProductSupply,
  UpdateProductSupply,
  DeleteProductSupply,
  GetDCNumbers,
};
