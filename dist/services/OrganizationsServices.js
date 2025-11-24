"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrganizations = exports.UpdateOrganizations = exports.CreateOrganizations = exports.GetAllOrganizations = exports.GetOrganizations = void 0;
const DbConnection_1 = require("../db-config/DbConnection");
const entities = __importStar(require("../entities/Context"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const ApiResponse_1 = require("../models/ApiResponse");
dotenv_1.default.config();
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
function GetOrganizations(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let organizations;
            let organizationsCount;
            if (model.id) {
                [organizations, organizationsCount] = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizations")
                    .skip(model.pageIndex * model.pageSize)
                    .take(model.pageSize)
                    .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
                    .leftJoinAndSelect("organizations.DefaultCollectionType", "DefaultCollectionType")
                    .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
                    .where("organizations.Id = :id", { id: model.id })
                    .andWhere("organizations.IsActive = :isActive", { isActive: true })
                    .getManyAndCount();
            }
            else if (model.organization) {
                [organizations, organizationsCount] = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizations")
                    .skip(model.pageIndex * model.pageSize)
                    .take(model.pageSize)
                    .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
                    .leftJoinAndSelect("organizations.DefaultCollectionType", "DefaultCollectionType")
                    .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
                    .where("organizations.OrganizationType = :organization_type", {
                    organization_type: model.organization,
                })
                    .andWhere("organizations.IsActive = :isActive", { isActive: true })
                    .getManyAndCount();
            }
            else if (model.parentId) {
                [organizations, organizationsCount] = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizations")
                    .skip(model.pageIndex * model.pageSize)
                    .take(model.pageSize)
                    .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
                    .leftJoinAndSelect("organizations.DefaultCollectionType", "DefaultCollectionType")
                    .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
                    .where("organizations.ParentId = :parentId", {
                    parentId: model.parentId,
                })
                    .andWhere("organizations.IsActive = :isActive", { isActive: true })
                    .getManyAndCount();
            }
            else if (model.orgUnitType) {
                // console.log('ALL ORGANIZATION WITHOUT AGENT')
                [organizations, organizationsCount] = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizations")
                    .skip(model.pageIndex * model.pageSize)
                    .take(model.pageSize)
                    .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
                    .leftJoinAndSelect("organizations.DefaultCollectionType", "DefaultCollectionType")
                    .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
                    .where("organizations.OrganizationType = :organization_type", {
                    organization_type: model.orgUnitType,
                })
                    .andWhere("organizations.IsActive = :isActive", { isActive: true })
                    // .andWhere("organizations.ParentId != :parent_id", { parent_id: 5 })
                    .getManyAndCount();
            }
            else {
                [organizations, organizationsCount] = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizations")
                    .skip(model.pageIndex * model.pageSize)
                    .take(model.pageSize)
                    .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
                    .leftJoinAndSelect("organizations.DefaultCollectionType", "DefaultCollectionType")
                    .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
                    .where("organizations.IsActive = :isActive", { isActive: true })
                    .getManyAndCount();
            }
            const organizationsData = organizations.map((organizations) => {
                var _a;
                return ({
                    id: organizations.Id,
                    organizationType: (organizations === null || organizations === void 0 ? void 0 : organizations.OrganizationType)
                        ? organizations.OrganizationType.Id
                        : 0,
                    organizationName: (organizations === null || organizations === void 0 ? void 0 : organizations.OrganizationType)
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
                    ouCode: (_a = organizations.OUCode) !== null && _a !== void 0 ? _a : "",
                    allowCan: organizations.AllowCan,
                    milkCollectionUom: organizations.MilkCollectionUom,
                    milkDispatchUom: organizations.MilkDispatchUom, // ⬅️ new
                });
            });
            const data = new ApiResponse_1.PagedResponse(organizationsData, organizationsCount, Number(model.pageIndex), model.pageSize);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: data,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.GetOrganizations = GetOrganizations;
function GetAllOrganizations(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log('model : ', model)
            let organizations;
            if (model.id) {
                // console.log("ALL ORGANIZATION WITH ORG ID");
                organizations = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizations")
                    .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
                    .leftJoinAndSelect("organizations.DefaultCollectionType", "DefaultCollectionType")
                    .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
                    .where("organizations.Id = :id", { id: model.id })
                    .andWhere("organizations.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.orgType) {
                console.log("orgtype");
                organizations = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizations")
                    .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
                    .leftJoinAndSelect("organizations.DefaultCollectionType", "DefaultCollectionType")
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
            }
            else if (model.organization) {
                // console.log("ALL ORGANIZATION WITH ORGANIZATION");
                organizations = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizations")
                    .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
                    .leftJoinAndSelect("organizations.DefaultCollectionType", "DefaultCollectionType")
                    .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
                    .where("organizations.OrganizationType = :organization_type", {
                    organization_type: model.organization,
                })
                    .andWhere("organizations.IsActive = :isActive", { isActive: true })
                    .andWhere("organizations.ParentId != :parent_id", { parent_id: 5 })
                    .getMany();
            }
            else if (model.orgTypeId) {
                // console.log("ALL ORGANIZATION WITH orgTypeId dropdown");
                //this query is for fetching organization details without making any join to make it load faster in the dropdown list
                organizations = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizations")
                    .where("organizations.OrganizationType = :orgTypeId", {
                    orgTypeId: model.orgTypeId,
                })
                    .getMany();
            }
            else if (model.parentId) {
                // console.log("ALL ORGANIZATION WITH PARENT ID");
                organizations = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizations")
                    .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
                    .leftJoinAndSelect("organizations.DefaultCollectionType", "DefaultCollectionType")
                    .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
                    .where("organizations.ParentId = :parentId", {
                    parentId: model.parentId,
                })
                    .andWhere("organizations.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.orgUnitType) {
                console.log("orgUnitType block");
                organizations = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizations")
                    .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
                    .leftJoinAndSelect("organizations.DefaultCollectionType", "DefaultCollectionType")
                    .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
                    .where("organizations.OrganizationType = :org_type", {
                    org_type: model.orgUnitType,
                })
                    .andWhere("organizations.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                console.log("else block");
                organizations = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                    .createQueryBuilder("organizations")
                    .leftJoinAndSelect("organizations.OrganizationType", "OrganizationType")
                    .leftJoinAndSelect("organizations.DefaultCollectionType", "DefaultCollectionType")
                    .leftJoinAndSelect("organizations.ParentId", "parentOrganization")
                    .leftJoinAndSelect("organizations.State", "State")
                    .leftJoinAndSelect("organizations.District", "District")
                    .leftJoinAndSelect("organizations.VctId", "Vct")
                    .where("organizations.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            // console.log(organizations);
            const organizationsData = organizations.map((organizations) => {
                var _a;
                return ({
                    id: organizations.Id,
                    organizationType: (organizations === null || organizations === void 0 ? void 0 : organizations.OrganizationType)
                        ? organizations.OrganizationType.Id
                        : 0,
                    organizationName: (organizations === null || organizations === void 0 ? void 0 : organizations.OrganizationType)
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
                    ouCode: (_a = organizations.OUCode) !== null && _a !== void 0 ? _a : "",
                    allowCan: organizations.AllowCan,
                    milkCollectionUom: organizations.MilkCollectionUom,
                    milkDispatchUom: organizations.MilkDispatchUom, // ⬅️ new
                });
            });
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: organizationsData,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.GetAllOrganizations = GetAllOrganizations;
function CreateOrganizations(req, model) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const parent = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("parent")
                .where("parent.Id = :id", { id: model.parentId })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Organization);
            const organizations = new entities.Organization();
            organizations.OrganizationType = model.organizationType
                ? model.organizationType
                : organizations.OrganizationType;
            if (parent) {
                organizations.ParentId = parent;
            }
            organizations.Name = model.name ? model.name : organizations.Name;
            organizations.OUCode = (_b = model.ouCode) !== null && _b !== void 0 ? _b : organizations.OUCode; // <--- new line
            // ⬇️ NEW assignments
            organizations.AllowCan =
                typeof model.allowCan === "boolean"
                    ? model.allowCan
                    : organizations.AllowCan;
            organizations.MilkCollectionUom =
                (_c = model.milkCollectionUom) !== null && _c !== void 0 ? _c : organizations.MilkCollectionUom;
            organizations.MilkDispatchUom =
                (_d = model.milkDispatchUom) !== null && _d !== void 0 ? _d : organizations.MilkDispatchUom;
            organizations.BusinessRegnNo =
                (_e = model.businessRegnNo) !== null && _e !== void 0 ? _e : organizations.BusinessRegnNo;
            organizations.GstNo = (_f = model.gstNo) !== null && _f !== void 0 ? _f : organizations.GstNo;
            organizations.AddressLine1 = model.addressLine1
                ? model.addressLine1
                : organizations.AddressLine1;
            organizations.AddressLine2 = model.addressLine2
                ? model.addressLine2
                : organizations.AddressLine2;
            organizations.VctId = model.vctId ? model.vctId : organizations.VctId;
            organizations.Geocode = (_g = model.geocode) !== null && _g !== void 0 ? _g : organizations.Geocode;
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
                (organizations.IfscCode = (_h = model.ifscCode) !== null && _h !== void 0 ? _h : null),
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
            yield repository.save(organizations);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.ADD_SUCCESS,
                data: null,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 400,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.CreateOrganizations = CreateOrganizations;
function UpdateOrganizations(req, model) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log("model : ", model)
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Organization);
            const organizations = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            const payroll = yield DbConnection_1.AppDataSource.getRepository(entities.PayrollTypes).findOne({
                where: { Id: (_c = model.payrollTypes) !== null && _c !== void 0 ? _c : 0 },
            });
            const parent = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
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
                organizations.OUCode = (_d = model.ouCode) !== null && _d !== void 0 ? _d : organizations.OUCode; // <--- new line
                // ⬇️ NEW assignments
                organizations.AllowCan =
                    typeof model.allowCan === "boolean"
                        ? model.allowCan
                        : organizations.AllowCan;
                organizations.MilkCollectionUom =
                    (_e = model.milkCollectionUom) !== null && _e !== void 0 ? _e : organizations.MilkCollectionUom;
                organizations.MilkDispatchUom =
                    (_f = model.milkDispatchUom) !== null && _f !== void 0 ? _f : organizations.MilkDispatchUom;
                organizations.BusinessRegnNo =
                    (_g = model.businessRegnNo) !== null && _g !== void 0 ? _g : organizations.BusinessRegnNo;
                organizations.GstNo = (_h = model.gstNo) !== null && _h !== void 0 ? _h : organizations.GstNo;
                organizations.AddressLine1 = model.addressLine1
                    ? model.addressLine1
                    : organizations.AddressLine1;
                organizations.AddressLine2 = model.addressLine2
                    ? model.addressLine2
                    : organizations.AddressLine2;
                organizations.VctId = model.vctId ? model.vctId : organizations.VctId;
                organizations.Geocode = (_j = model.geocode) !== null && _j !== void 0 ? _j : organizations.Geocode;
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
                    (organizations.IfscCode = (_k = model.ifscCode) !== null && _k !== void 0 ? _k : null),
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
                yield repository.save(organizations);
                // console.log(organizations)
                return {
                    status: 200,
                    message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
                    data: null,
                };
            }
            else {
                return {
                    status: 404,
                    message: ERROR_MESSAGES.NO_DATA,
                    data: null,
                };
            }
        }
        catch (error) {
            console.log(error);
            return {
                status: 400,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.UpdateOrganizations = UpdateOrganizations;
function DeleteOrganizations(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.Organization);
            const organizations = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            const routeStopRepo = DbConnection_1.AppDataSource.getRepository(entities.RouteStops);
            const routeStop = yield routeStopRepo
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
                yield repository.save(organizations);
                return {
                    status: 200,
                    message: SUCCESS_MESSAGES.DELETE_SUCCESS,
                    data: null,
                };
            }
            else {
                return {
                    status: 200,
                    message: ERROR_MESSAGES.NO_DATA,
                    data: null,
                };
            }
        }
        catch (error) {
            console.log(error);
            return {
                status: 400,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.DeleteOrganizations = DeleteOrganizations;
