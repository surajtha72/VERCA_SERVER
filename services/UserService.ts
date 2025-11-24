import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";
import { Request } from "express";
import dotenv from "dotenv";
import {
  AllUsersModel,
  CreateUserModel,
  UpdateUserModel,
  DeleteUserModel,
} from "../models/UsersModel";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
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

async function GetAllUsers(
  model?: any
): Promise<ServiceResponse<AllUsersModel[]>> {
  try {
    let user;
    if (model.id) {
      // console.log(model)
      user = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.Role", "Role")
        .leftJoinAndSelect(
          "user.OrganizationUnitTypeId",
          "OrganizationUnitTypeId"
        )
        .leftJoinAndSelect("user.OrganizationUnitId", "OrganizationUnitId")
        .leftJoinAndSelect("user.State", "State")
        .leftJoinAndSelect("user.District", "District")
        .leftJoinAndSelect("user.Taluka", "Taluka")
        .where("user.Id = :id", { id: model.id })
        // .andWhere("user.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.organizationUnitId) {
      user = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.Role", "Role")
        .leftJoinAndSelect(
          "user.OrganizationUnitTypeId",
          "OrganizationUnitTypeId"
        )
        .leftJoinAndSelect("user.OrganizationUnitId", "OrganizationUnitId")
        .leftJoinAndSelect("user.State", "State")
        .leftJoinAndSelect("user.District", "District")
        .leftJoinAndSelect("user.Taluka", "Taluka")
        .where("user.OrganizationUnitId = :organizationUnit", {
          organizationUnit: model.organizationUnitId,
        })
        // .andWhere("user.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      user = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.Role", "Role")
        .leftJoinAndSelect(
          "user.OrganizationUnitTypeId",
          "OrganizationUnitTypeId"
        )
        .leftJoinAndSelect("user.OrganizationUnitId", "OrganizationUnitId")
        .leftJoinAndSelect("user.State", "State")
        .leftJoinAndSelect("user.District", "District")
        .leftJoinAndSelect("user.Taluka", "Taluka")
        // .where("user.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const userData: AllUsersModel[] = user.map((user) => ({
      id: user.Id,
      organizationUnitTypeId: user.OrganizationUnitTypeId
        ? user.OrganizationUnitTypeId.Id
        : 0,
      organizationUnitTypeName: user.OrganizationUnitTypeId
        ? user.OrganizationUnitTypeId.Name
        : "",
      organizationUnitId: user.OrganizationUnitId
        ? user.OrganizationUnitId.Id
        : 0,
      organizationUnitName: user.OrganizationUnitId
        ? user.OrganizationUnitId.Name
        : "",
      name: user.Name,
      address: user.Address,
      mobileNo: user.MobileNo,
      emailId: user.EmailId,
      roleId: user.Role.Id,
      roleName: user.Role.Name,
      stateId: user.State ? user.State.Id : 0,
      stateName: user.State ? user.State.Name : "",
      districtId: user.District ? user.District.Id : 0,
      districtName: user.District ? user.District.Name : "",
      vctId: user.Taluka ? user.Taluka.Id : 0,
      vctName: user.Taluka ? user.Taluka.Name : "",
      aadhaarNo: user.AadhaarNo,
      panNo: user.PanNo,
      bankAccNo: user.BankAcNo,
      bankAccName: user.BankAcName,
      bankBranchId: user.BankBranIfsc,
      isActive: user.IsActive,
    }));
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: userData,
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

async function CreateUser(
  req: Request,
  model: CreateUserModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const organizationUnitType = await AppDataSource.getRepository(
      entities.OrganizationUnitType
    )
      .createQueryBuilder("organizationUnitType")
      .where("organizationUnitType.Id = :id", {
        id: model.organizationUnitTypeId,
      })
      .getOne();

    const organizationUnit = await AppDataSource.getRepository(
      entities.Organization
    )
      .createQueryBuilder("organization")
      .where("organization.Id = :id", { id: model.organizationUnitId })
      .getOne();

    const repository = AppDataSource.getRepository(entities.User);
    const user = new entities.User();
    if (organizationUnitType) {
      user.OrganizationUnitTypeId = organizationUnitType;
    }
    if (organizationUnit) {
      user.OrganizationUnitId = organizationUnit;
    }
    user.Name = model.name ? model.name : user.Name;
    user.Address = model.address ? model.address : user.Address;
    user.MobileNo = model.mobileNo ? model.mobileNo : user.MobileNo;
    user.EmailId = model.emailId ? model.emailId : user.EmailId;
    user.Role = model.roleId ? model.roleId : user.Role;
    user.State = model.stateId ? model.stateId : user.State;
    user.District = model.districtId ? model.districtId : user.District;
    user.Taluka = model.vctId ? model.vctId : user.Taluka;
    user.AadhaarNo = model.aadhaarNo ? model.aadhaarNo : user.AadhaarNo;
    user.PanNo = model.panNo ? model.panNo : user.PanNo;
    user.BankAcNo = model.bankAccNo ?? user.BankAcNo;
    user.BankAcName = model.bankAccName ?? user.BankAcName;
    user.BankBranIfsc = model.bankBranchId ?? user.BankBranIfsc;
    user.Username = model.username ? model.username : user.Username;
    if (model.password) {
      const hashedPassword = await bcrypt.hash(model.password, 10);
      user.Password = hashedPassword;
    }
    user.IsActive = model.isActive ? model.isActive : user.IsActive;

    user.CreatedAt = new Date();

    user.CreatedBy = userId;
    const getRole = await AppDataSource.getRepository(entities.Roles)
      .createQueryBuilder("role")
      .where("role.id = :roleId", { roleId: model.roleId })
      .getOne();
    if (getRole) {
      user.Role = getRole;
    }
    await repository.save(user);

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

async function UpdateUser(
  req: Request,
  model: UpdateUserModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.User);
    const user = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });

    console.log("model: ",model.isActive);

    const organizationUnitType = await AppDataSource.getRepository(
      entities.OrganizationUnitType
    )
      .createQueryBuilder("organizationUnitType")
      .where("organizationUnitType.Id = :id", {
        id: model.organizationUnitTypeId,
      })
      .getOne();

    const organizationUnit = await AppDataSource.getRepository(
      entities.Organization
    )
      .createQueryBuilder("organization")
      .where("organization.Id = :id", { id: model.organizationUnitId })
      .getOne();
    if (user) {
      if (organizationUnitType) {
        user.OrganizationUnitTypeId = organizationUnitType;
      }
      if (organizationUnit) {
        user.OrganizationUnitId = organizationUnit;
      }
      user.Name = model.name ? model.name : user.Name;
      user.Address = model.address ? model.address : user.Address;
      user.MobileNo = model.mobileNo ? model.mobileNo : user.MobileNo;
      user.EmailId = model.emailId ? model.emailId : user.EmailId;
      user.Role = model.roleId ? model.roleId : user.Role;
      user.State = model.stateId ? model.stateId : user.State;
      user.District = model.districtId ? model.districtId : user.District;
      user.Taluka = model.vctId ? model.vctId : user.Taluka;
      user.AadhaarNo = model.aadhaarNo ? model.aadhaarNo : user.AadhaarNo;
      user.PanNo = model.panNo ? model.panNo : user.PanNo;
      user.BankAcNo = model.bankAccNo ?? user.BankAcNo;
      user.BankAcName = model.bankAccName ?? user.BankAcName;
      user.BankBranIfsc = model.bankBranchId ?? user.BankBranIfsc;
      user.Username = model.username ? model.username : user.Username;
      if (model.password) {
        const hashedPassword = await bcrypt.hash(model.password, 10);
        user.Password = hashedPassword;
      }
      user.IsActive = model.isActive;

      user.ModifiedAt = new Date();
      user.ModifiedBy = userId;
      await repository.save(user);

      console.log('user: ',user);

      return {
        status: 200,
        message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
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

async function DeleteUser(
  req: Request,
  model: DeleteUserModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.User);
    const user = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (user) {
      user.IsActive = false;
      user.DeletedAt = new Date();
      user.DeletedBy = userId;
      await repository.save(user);

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

async function CheckManualEntry(
  model: any
): Promise<ServiceResponse<string>> {
  try {
    if (model.userId && model.aadhaarNo) {
      // console.log(model.aadhaarNo)
      const user = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :userId", { userId: model.userId })
        .andWhere("user.AadhaarNo = :aadhaarNo", { aadhaarNo: model.aadhaarNo })
        .getOne();

        if (user) {
        if (model.aadhaarNo === '0') {
          return {
            status: 400,
            message: "Not allowed",
            data: null,
          };
        } else if (user.AadhaarNo === model.aadhaarNo) {
          return {
            status: 200,
            message: "Allowed",
            data: null,
          };
        } else {
          return {
            status: 200,
            message: "SUCCESS",
            data: null,
          };
        }
      } else {
        return {
          status: 400,
          message: "Not allowed",
          data: null,
        };
      }
    } else {
      return {
        status: 200,
        message: SUCCESS_MESSAGES.SUCCESS,
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

async function CheckCollectionEntry(
  model: any
): Promise<ServiceResponse<string>> {
  try {
    if (model.userId && model.aadhaarNo) {
      // console.log(model.aadhaarNo)
      const user = await AppDataSource.getRepository(entities.User)
        .createQueryBuilder("user")
        .where("user.Id = :userId", { userId: model.userId })
        .andWhere("user.AadhaarNo = :aadhaarNo", { aadhaarNo: model.aadhaarNo })
        .getOne();

        if (user) {
        if (model.aadhaarNo === '0') {
          return {
            status: 400,
            message: "Not allowed",
            data: null,
          };
        } else if (user.AadhaarNo === model.aadhaarNo) {
          return {
            status: 200,
            message: "Allowed",
            data: null,
          };
        } else {
          return {
            status: 200,
            message: "SUCCESS",
            data: null,
          };
        }
      } else {
        return {
          status: 400,
          message: "Not allowed",
          data: null,
        };
      }
    } else {
      return {
        status: 200,
        message: SUCCESS_MESSAGES.SUCCESS,
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


export { GetAllUsers, CreateUser, UpdateUser, DeleteUser, CheckManualEntry, CheckCollectionEntry };
