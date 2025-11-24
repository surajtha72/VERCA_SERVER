import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import {
  APIResponse,
  PagedResponse,
  ServiceResponse,
} from "../models/ApiResponse";
import {
  AllOrganizationsModel,
  CreateOrganizationsModel,
  DeleteOrganizationsModel,
  UpdateOrganizationsModel,
} from "../models/OrganizationsModel";
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

async function GetOrganizations(
  model?: any
): Promise<ServiceResponse<PagedResponse<AllOrganizationsModel>>> {
  try {
    let organizations;
    let organizationsCount;
    if (model.id) {
      [organizations, organizationsCount] = await AppDataSource.getRepository(
        entities.Organization
      )
        .createQueryBuilder("organizations")
        .skip(model.pageIndex * model.pageSize)
        .take(model.pageSize)
        .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
        .leftJoinAndSelect(
          "organizations.DefaultCollectionType",
          "DefaultCollectionType"
        )
        .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
        .where("organizations.Id = :id", { id: model.id })
        .andWhere("organizations.IsActive = :isActive", { isActive: true })
        .getManyAndCount();
    } else if (model.organization) {
      [organizations, organizationsCount] = await AppDataSource.getRepository(
        entities.Organization
      )
        .createQueryBuilder("organizations")
        .skip(model.pageIndex * model.pageSize)
        .take(model.pageSize)
        .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
        .leftJoinAndSelect(
          "organizations.DefaultCollectionType",
          "DefaultCollectionType"
        )
        .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
        .where("organizations.OrganizationType = :organization_type", {
          organization_type: model.organization,
        })
        .andWhere("organizations.IsActive = :isActive", { isActive: true })
        .getManyAndCount();
    } else if (model.parentId) {
      [organizations, organizationsCount] = await AppDataSource.getRepository(
        entities.Organization
      )
        .createQueryBuilder("organizations")
        .skip(model.pageIndex * model.pageSize)
        .take(model.pageSize)
        .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
        .leftJoinAndSelect(
          "organizations.DefaultCollectionType",
          "DefaultCollectionType"
        )
        .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
        .where("organizations.ParentId = :parentId", {
          parentId: model.parentId,
        })
        .andWhere("organizations.IsActive = :isActive", { isActive: true })
        .getManyAndCount();
    } else if (model.orgUnitType) {
      // console.log('ALL ORGANIZATION WITHOUT AGENT')
      [organizations, organizationsCount] = await AppDataSource.getRepository(
        entities.Organization
      )
        .createQueryBuilder("organizations")
        .skip(model.pageIndex * model.pageSize)
        .take(model.pageSize)
        .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
        .leftJoinAndSelect(
          "organizations.DefaultCollectionType",
          "DefaultCollectionType"
        )
        .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
        .where("organizations.OrganizationType = :organization_type", {
          organization_type: model.orgUnitType,
        })
        .andWhere("organizations.IsActive = :isActive", { isActive: true })
        // .andWhere("organizations.ParentId != :parent_id", { parent_id: 5 })
        .getManyAndCount();
    } else {
      [organizations, organizationsCount] = await AppDataSource.getRepository(
        entities.Organization
      )
        .createQueryBuilder("organizations")
        .skip(model.pageIndex * model.pageSize)
        .take(model.pageSize)
        .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
        .leftJoinAndSelect(
          "organizations.DefaultCollectionType",
          "DefaultCollectionType"
        )
        .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
        .where("organizations.IsActive = :isActive", { isActive: true })
        .getManyAndCount();
    }
    const organizationsData: AllOrganizationsModel[] = organizations.map(
      (organizations) => ({
        id: organizations.Id,
        organizationType: organizations?.OrganizationType
          ? organizations.OrganizationType.Id
          : 0,
        organizationName: organizations?.OrganizationType
          ? organizations.OrganizationType.Name
          : "",
        parentId: organizations.ParentId ? organizations.ParentId.Id : 0,
        parentName: organizations.ParentId ? organizations.ParentId.Name : "",
        name: organizations.Name,
        businessRegnNo: organizations.BusinessRegnNo,
        gstNo: organizations.GstNo,
        addressLine1: organizations.AddressLine1,
        addressLine2: organizations.AddressLine2,
        vctId: organizations.VctId ? organizations.VctId.Id : 0,
        vctName: organizations.VctId ? organizations.VctId.Name : "",
        geocode: organizations.Geocode,
        capacity: organizations.Capacity,
        morningShiftStartTime: organizations.MorningShiftStartTime,
        morningShiftEndTime: organizations.MorningShiftEndTime,
        eveningShiftStartTime: organizations.EveningShiftStartTime,
        eveningShiftEndTime: organizations.EveningShiftEndTime,
        accHolderName: organizations.AccHolderName
          ? organizations.AccHolderName
          : "",
        accountNumber: organizations.AccountNumber
          ? organizations.AccountNumber
          : "",
        ifscCode: organizations.IfscCode ? organizations.IfscCode : "",
        phoneNumber: organizations.PhoneNumber ? organizations.PhoneNumber : "",
        defaultCollectionTypeId: organizations.DefaultCollectionType
          ? organizations.DefaultCollectionType.Id
          : 0,
        defaultCollectionTypeName: organizations.DefaultCollectionType
          ? organizations.DefaultCollectionType.Name
          : "",
        payrollTypeId: organizations.PayrollTypes
          ? organizations.PayrollTypes.Id
          : 0,
        payrollTypeName: organizations.PayrollTypes
          ? organizations.PayrollTypes.Name
          : "",
        enforceStrictTiming: organizations.EnforceStrictTiming,
        enforceNoDueCollection: organizations.EnforceNoDueCollection,
        headload: organizations.HeadLoad,
        commission: organizations.Commission,
        stateId: organizations.State ? organizations.State.Id : 0,
        districtId: organizations.District ? organizations.District.Id : 0,
            ouCode: organizations.OUCode ?? "",       // ⬅️ ADD THIS LINE
            allowCan: organizations.AllowCan,                    // ⬅️ new
    milkCollectionUom: organizations.MilkCollectionUom,  // ⬅️ new
    milkDispatchUom: organizations.MilkDispatchUom,      // ⬅️ new

      })
    );
    const data = new PagedResponse(
      organizationsData,
      organizationsCount,
      Number(model.pageIndex),
      model.pageSize
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: data,
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

async function GetAllOrganizations(
  model?: any
): Promise<ServiceResponse<AllOrganizationsModel[]>> {
  try {
    // console.log('model : ', model)
    let organizations;
    if (model.id) {
      // console.log("ALL ORGANIZATION WITH ORG ID");
      organizations = await AppDataSource.getRepository(entities.Organization)
        .createQueryBuilder("organizations")
        .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
        .leftJoinAndSelect(
          "organizations.DefaultCollectionType",
          "DefaultCollectionType"
        )
        .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
        .where("organizations.Id = :id", { id: model.id })
        .andWhere("organizations.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.orgType) {
      console.log("orgtype");
      organizations = await AppDataSource.getRepository(entities.Organization)
        .createQueryBuilder("organizations")
        .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
        .leftJoinAndSelect(
          "organizations.DefaultCollectionType",
          "DefaultCollectionType"
        )
        .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
        .leftJoinAndSelect("organizations.State", "State")
        .leftJoinAndSelect("organizations.District", "District")
        .leftJoinAndSelect("organizations.VctId", "Vct")
        .where("organizations.OrganizationType != :organization_type", {
          organization_type: model.orgType,
        })
        .andWhere("organizations.IsActive = :isActive", { isActive: true })
        .andWhere("organizations.ParentId != :parent_id", { parent_id: 5 })
        .getMany();
    } else if (model.organization) {
      // console.log("ALL ORGANIZATION WITH ORGANIZATION");
      organizations = await AppDataSource.getRepository(entities.Organization)
        .createQueryBuilder("organizations")
        .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
        .leftJoinAndSelect(
          "organizations.DefaultCollectionType",
          "DefaultCollectionType"
        )
        .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
        .where("organizations.OrganizationType = :organization_type", {
          organization_type: model.organization,
        })
        .andWhere("organizations.IsActive = :isActive", { isActive: true })
        .andWhere("organizations.ParentId != :parent_id", { parent_id: 5 })
        .getMany();
    } else if (model.orgTypeId) {
      // console.log("ALL ORGANIZATION WITH orgTypeId dropdown");
      //this query is for fetching organization details without making any join to make it load faster in the dropdown list
      organizations = await AppDataSource.getRepository(entities.Organization)
        .createQueryBuilder("organizations")
        .where("organizations.OrganizationType = :orgTypeId", {
          orgTypeId: model.orgTypeId,
        })
        .getMany();
    } else if (model.parentId) {
      // console.log("ALL ORGANIZATION WITH PARENT ID");
      organizations = await AppDataSource.getRepository(entities.Organization)
        .createQueryBuilder("organizations")
        .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
        .leftJoinAndSelect(
          "organizations.DefaultCollectionType",
          "DefaultCollectionType"
        )
        .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
        .where("organizations.ParentId = :parentId", {
          parentId: model.parentId,
        })
        .andWhere("organizations.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.orgUnitType) {
      console.log("orgUnitType block");
      organizations = await AppDataSource.getRepository(entities.Organization)
        .createQueryBuilder("organizations")
        .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
        .leftJoinAndSelect(
          "organizations.DefaultCollectionType",
          "DefaultCollectionType"
        )
        .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
        .where("organizations.OrganizationType = :org_type", {
          org_type: model.orgUnitType,
        })
        .andWhere("organizations.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      console.log("else block");
      organizations = await AppDataSource.getRepository(entities.Organization)
        .createQueryBuilder("organizations")
        .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
        .leftJoinAndSelect(
          "organizations.DefaultCollectionType",
          "DefaultCollectionType"
        )
        .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
        .leftJoinAndSelect("organizations.State", "State")
        .leftJoinAndSelect("organizations.District", "District")
        .leftJoinAndSelect("organizations.VctId", "Vct")
        .where("organizations.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    // console.log(organizations);
    const organizationsData: AllOrganizationsModel[] = organizations.map(
      (organizations) => ({
        id: organizations.Id,
        organizationType: organizations?.OrganizationType
          ? organizations.OrganizationType.Id
          : 0,
        organizationName: organizations?.OrganizationType
          ? organizations.OrganizationType.Name
          : "",
        parentId: organizations.ParentId ? organizations.ParentId.Id : 0,
        parentName: organizations.ParentId ? organizations.ParentId.Name : "",
        name: organizations.Name,
        businessRegnNo: organizations.BusinessRegnNo,
        gstNo: organizations.GstNo,
        addressLine1: organizations.AddressLine1,
        addressLine2: organizations.AddressLine2,
        vctId: organizations.VctId ? organizations.VctId.Id : 0,
        vctName: organizations.VctId ? organizations.VctId.Name : "",
        geocode: organizations.Geocode,
        capacity: organizations.Capacity,
        morningShiftStartTime: organizations.MorningShiftStartTime,
        morningShiftEndTime: organizations.MorningShiftEndTime,
        eveningShiftStartTime: organizations.EveningShiftStartTime,
        eveningShiftEndTime: organizations.EveningShiftEndTime,
        accHolderName: organizations.AccHolderName
          ? organizations.AccHolderName
          : "",
        accountNumber: organizations.AccountNumber
          ? organizations.AccountNumber
          : "",
        ifscCode: organizations.IfscCode ? organizations.IfscCode : "",
        phoneNumber: organizations.PhoneNumber ? organizations.PhoneNumber : "",
        defaultCollectionTypeId: organizations.DefaultCollectionType
          ? organizations.DefaultCollectionType.Id
          : 0,
        defaultCollectionTypeName: organizations.DefaultCollectionType
          ? organizations.DefaultCollectionType.Name
          : "",
        payrollTypeId: organizations.PayrollTypes
          ? organizations.PayrollTypes.Id
          : 0,
        payrollTypeName: organizations.PayrollTypes
          ? organizations.PayrollTypes.Name
          : "",
        enforceStrictTiming: organizations.EnforceStrictTiming,
        enforceNoDueCollection: organizations.EnforceNoDueCollection,
        headload: organizations.HeadLoad,
        commission: organizations.Commission,
        stateId: organizations.State ? organizations.State.Id : 0,
        districtId: organizations.District ? organizations.District.Id : 0,
            ouCode: organizations.OUCode ?? "",       // ⬅️ ADD THIS LINE
            allowCan: organizations.AllowCan,                    // ⬅️ new
    milkCollectionUom: organizations.MilkCollectionUom,  // ⬅️ new
    milkDispatchUom: organizations.MilkDispatchUom,      // ⬅️ new

      })
    );

    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: organizationsData,
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

async function CreateOrganizations(
  req: Request,
  model: CreateOrganizationsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const parent = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("parent")
      .where("parent.Id = :id", { id: model.parentId })
      .getOne();

    const repository = AppDataSource.getRepository(entities.Organization);
    const organizations = new entities.Organization();
    organizations.OrganizationType = model.organizationType
      ? model.organizationType
      : organizations.OrganizationType;

    if (parent) {
      organizations.ParentId = parent;
    }
    organizations.Name = model.name ? model.name : organizations.Name;
    organizations.OUCode = model.ouCode ?? organizations.OUCode; // <--- new line
// ⬇️ NEW assignments
organizations.AllowCan =
  typeof model.allowCan === "boolean"
    ? model.allowCan
    : organizations.AllowCan;

organizations.MilkCollectionUom =
  model.milkCollectionUom ?? organizations.MilkCollectionUom;

organizations.MilkDispatchUom =
  model.milkDispatchUom ?? organizations.MilkDispatchUom;

    organizations.BusinessRegnNo =
      model.businessRegnNo ?? organizations.BusinessRegnNo;
    organizations.GstNo = model.gstNo ?? organizations.GstNo;
    organizations.AddressLine1 = model.addressLine1
      ? model.addressLine1
      : organizations.AddressLine1;
    organizations.AddressLine2 = model.addressLine2
      ? model.addressLine2
      : organizations.AddressLine2;
    organizations.VctId = model.vctId ? model.vctId : organizations.VctId;
    organizations.Geocode = model.geocode ?? organizations.Geocode;
    organizations.Capacity = model.capacity
      ? model.capacity
      : organizations.Capacity;
    (organizations.MorningShiftStartTime = model.morningShiftStartTime
      ? model.morningShiftStartTime
      : organizations.MorningShiftStartTime),
      (organizations.MorningShiftEndTime = model.morningShiftEndTime
        ? model.morningShiftEndTime
        : organizations.MorningShiftEndTime),
      (organizations.EveningShiftStartTime = model.eveningShiftStartTime
        ? model.eveningShiftStartTime
        : organizations.EveningShiftStartTime),
      (organizations.EveningShiftEndTime = model.eveningShiftEndTime
        ? model.eveningShiftEndTime
        : organizations.EveningShiftEndTime),
      (organizations.AccHolderName = model.accHolderName
        ? model.accHolderName
        : organizations.AccHolderName),
      (organizations.AccountNumber = model.accountNumber
        ? model.accountNumber
        : organizations.AccountNumber),
      (organizations.IfscCode = model.ifscCode ?? null),
      (organizations.PhoneNumber = model.phoneNumber
        ? model.phoneNumber
        : organizations.PhoneNumber),
      (organizations.DefaultCollectionType = model.defaultCollectionType
        ? model.defaultCollectionType
        : organizations.DefaultCollectionType);
    organizations.PayrollTypes = model.payrollTypes
      ? model.payrollTypes
      : organizations.PayrollTypes;
    (organizations.EnforceStrictTiming = model.enforceStrictTiming
      ? model.enforceStrictTiming
      : organizations.EnforceStrictTiming),
      (organizations.EnforceNoDueCollection = model.enforceNoDueCollection
        ? model.enforceNoDueCollection
        : organizations.EnforceNoDueCollection),
      (organizations.HeadLoad = model.headload
        ? model.headload
        : organizations.HeadLoad);
    organizations.Commission = model.commission
      ? model.commission
      : organizations.Commission;
    organizations.State = model.stateId ? model.stateId : organizations.State;
    organizations.District = model.districtId
      ? model.districtId
      : organizations.District;
    organizations.CreatedAt = new Date();
    organizations.CreatedBy = userId;
    await repository.save(organizations);

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

async function UpdateOrganizations(
  req: Request,
  model: UpdateOrganizationsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    // console.log("model : ", model)
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Organization);
    const organizations = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    const payroll = await AppDataSource.getRepository(
      entities.PayrollTypes
    ).findOne({
      where: { Id: model.payrollTypes ?? 0 },
    });
    const parent = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("parent")
      .where("parent.Id = :id", { id: model.parentId })
      .getOne();

    if (organizations) {
      organizations.OrganizationType = model.organizationType
        ? model.organizationType
        : organizations.OrganizationType;

      if (parent) {
        organizations.ParentId = parent;
      }
      organizations.ParentId = model.parentId
        ? model.parentId
        : organizations.ParentId;
      organizations.Name = model.name ? model.name : organizations.Name;
      organizations.OUCode = model.ouCode ?? organizations.OUCode; // <--- new line
// ⬇️ NEW assignments
organizations.AllowCan =
  typeof model.allowCan === "boolean"
    ? model.allowCan
    : organizations.AllowCan;

organizations.MilkCollectionUom =
  model.milkCollectionUom ?? organizations.MilkCollectionUom;

organizations.MilkDispatchUom =
  model.milkDispatchUom ?? organizations.MilkDispatchUom;

      organizations.BusinessRegnNo =
        model.businessRegnNo ?? organizations.BusinessRegnNo;
      organizations.GstNo = model.gstNo ?? organizations.GstNo;
      organizations.AddressLine1 = model.addressLine1
        ? model.addressLine1
        : organizations.AddressLine1;
      organizations.AddressLine2 = model.addressLine2
        ? model.addressLine2
        : organizations.AddressLine2;
      organizations.VctId = model.vctId ? model.vctId : organizations.VctId;
      organizations.Geocode = model.geocode ?? organizations.Geocode;
      organizations.Capacity = model.capacity
        ? model.capacity
        : organizations.Capacity;
      (organizations.MorningShiftStartTime = model.morningShiftStartTime
        ? model.morningShiftStartTime
        : organizations.MorningShiftStartTime),
        (organizations.MorningShiftEndTime = model.morningShiftEndTime
          ? model.morningShiftEndTime
          : organizations.MorningShiftEndTime),
        (organizations.EveningShiftStartTime = model.eveningShiftStartTime
          ? model.eveningShiftStartTime
          : organizations.EveningShiftStartTime),
        (organizations.EveningShiftEndTime = model.eveningShiftEndTime
          ? model.eveningShiftEndTime
          : organizations.EveningShiftEndTime),
        (organizations.AccHolderName = model.accHolderName),
        (organizations.AccountNumber = model.accountNumber),
        (organizations.IfscCode = model.ifscCode ?? null),
        (organizations.PhoneNumber = model.phoneNumber),
        (organizations.DefaultCollectionType = model.defaultCollectionType
          ? model.defaultCollectionType
          : organizations.DefaultCollectionType);
      if (payroll) {
        organizations.PayrollTypes = payroll;
      }
      organizations.EnforceStrictTiming =
        model.enforceStrictTiming !== undefined
          ? model.enforceStrictTiming
          : organizations.EnforceStrictTiming;
      organizations.EnforceNoDueCollection =
        model.enforceNoDueCollection !== undefined
          ? model.enforceNoDueCollection
          : organizations.EnforceNoDueCollection;
      organizations.HeadLoad = model.headload;
      organizations.Commission = model.commission;
      organizations.State = model.stateId ? model.stateId : organizations.State;
      organizations.District = model.districtId
        ? model.districtId
        : organizations.District;
      organizations.ModifiedAt = new Date();
      organizations.ModifiedBy = userId;

      await repository.save(organizations);
      // console.log(organizations)

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

async function DeleteOrganizations(
  req: Request,
  model: DeleteOrganizationsModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.Organization);
    const organizations = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    const routeStopRepo = AppDataSource.getRepository(entities.RouteStops);
    const routeStop = await routeStopRepo
      .createQueryBuilder("routeStop")
      .where("routeStop.StopId =:stopId", { stopId: model.id })
      .getOne();

    if (routeStop) {
      routeStopRepo.remove(routeStop);
    }

    if (organizations) {
      organizations.IsActive = false;
      organizations.DeletedAt = new Date();
      organizations.DeletedBy = userId;
      await repository.save(organizations);

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
  GetOrganizations,
  GetAllOrganizations,
  CreateOrganizations,
  UpdateOrganizations,
  DeleteOrganizations,
};
