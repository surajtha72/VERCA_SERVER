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
exports.LinegraphData = exports.MorEveBargraphData = exports.GetOrganizationUnitWeights = void 0;
const DbConnection_1 = require("../db-config/DbConnection");
const entities = __importStar(require("../entities/Context"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const moment_1 = __importDefault(require("moment"));
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
function GetOrganizationUnitWeights() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const date = new Date();
            const today = (0, moment_1.default)(date).format('YYYY-MM-DD');
            const milkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollections)
                .createQueryBuilder("milkCollections")
                .where("DATE(milkCollections.CollectionDateTime) = :today", { today })
                .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
                .getMany();
            const milkCollectionIds = milkCollections.map((milk) => milk.Id);
            if (milkCollectionIds.length === 0) {
                return {
                    status: 200,
                    message: ERROR_MESSAGES.NO_DATA,
                    data: null,
                };
            }
            const milkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                .createQueryBuilder("milkCollectionDetails")
                .leftJoinAndSelect("milkCollectionDetails.OrganizationUnitId", "organization")
                .leftJoinAndSelect("organization.ParentId", "organizationParent")
                .leftJoinAndSelect("organization.OrganizationType", "organizationType")
                .leftJoinAndSelect("milkCollectionDetails.MilkCollectionId", "collections")
                .where("milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)", { milkCollectionIds })
                .andWhere("milkCollectionDetails.IsActive = :isActive", { isActive: true })
                .andWhere("organizationType.Id = :id", { id: 5 })
                .getMany();
            if (milkCollectionDetails.length === 0) {
                return {
                    status: 503,
                    message: ERROR_MESSAGES.NO_DATA,
                    data: null,
                };
            }
            let bmcs = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder('organization')
                .where("organization.OrganizationType=:type", { type: 4 })
                .andWhere("organization.IsActive=:active", { active: true })
                .getMany();
            const result = [];
            for (let bmcIterator = 0; bmcIterator < bmcs.length; bmcIterator++) {
                let total = 0;
                milkCollectionDetails.forEach((milkDetail) => {
                    var _a;
                    if (((_a = milkDetail.OrganizationUnitId.ParentId) === null || _a === void 0 ? void 0 : _a.Id) == bmcs[bmcIterator].Id) {
                        total += milkDetail.Weight;
                    }
                });
                if (total !== 0) {
                    result.push({ bmc: bmcs[bmcIterator], weight: total });
                }
            }
            // console.log(milkCollectionDetails)
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: result,
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
exports.GetOrganizationUnitWeights = GetOrganizationUnitWeights;
function MorEveBargraphData(model) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const key = process.env.TOKEN_SECRET;
            const milkCollections = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollections)
                .createQueryBuilder("milkCollections")
                .leftJoinAndSelect("milkCollections.CreatedBy", "createdBy")
                .leftJoinAndSelect("createdBy.OrganizationUnitId", "bmc")
                .where("DATE(milkCollections.CollectionDateTime) =:date", { date: model.date })
                .getMany();
            const bmcs = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("organization")
                .innerJoinAndSelect("organization.OrganizationType", "organizationType")
                .where("organization.IsActive =:cond", { cond: true })
                .andWhere("organizationType.Id =:typeId", { typeId: 4 })
                .getMany();
            const milkCollectionIds = milkCollections.map((milk) => milk.Id);
            // console.log(milkCollections)
            const milkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                .createQueryBuilder("milkCollectionDetails")
                .leftJoinAndSelect("milkCollectionDetails.OrganizationUnitId", "organization")
                .leftJoinAndSelect("organization.ParentId", "organizationParent")
                .leftJoinAndSelect("organization.OrganizationType", "organizationType")
                .leftJoinAndSelect("milkCollectionDetails.MilkCollectionId", "collections")
                .where("milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)", { milkCollectionIds })
                .andWhere("organizationType.Id = :id", { id: 5 })
                .getMany();
            let data = [];
            for (let bmcIter = 0; bmcIter < bmcs.length; bmcIter++) {
                let collectionDetails = {
                    bmcName: '',
                    detail: {}
                };
                let detail = {
                    morQty: 0,
                    eveQty: 0
                };
                for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
                    if (((_c = (_b = (_a = milkCollectionDetails[iter]) === null || _a === void 0 ? void 0 : _a.OrganizationUnitId) === null || _b === void 0 ? void 0 : _b.ParentId) === null || _c === void 0 ? void 0 : _c.Id) == bmcs[bmcIter].Id) {
                        if (milkCollectionDetails[iter].MilkCollectionId.Shift == 'morning') {
                            detail.morQty += milkCollectionDetails[iter].Weight;
                        }
                        if (milkCollectionDetails[iter].MilkCollectionId.Shift == 'evening') {
                            detail.eveQty += milkCollectionDetails[iter].Weight;
                        }
                    }
                }
                if (detail.morQty > 0 || detail.eveQty > 0) {
                    collectionDetails.bmcName = bmcs[bmcIter].Name;
                    collectionDetails.detail = detail;
                    data.push(collectionDetails);
                }
            }
            // console.table(data);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data,
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
exports.MorEveBargraphData = MorEveBargraphData;
// async function LinegraphData(
//   model?: any
// ): Promise<ServiceResponse<any[]>> {
//   try {
//     const date = new Date();
//     const lastDate = new Date();
//     const today = moment(date).format('YYYY-MM-DD')
//     lastDate.setDate(lastDate.getDate() - 10);
//     const tenDaysAgo = moment(lastDate).format('YYYY-MM-DD');
//     const key = process.env.TOKEN_SECRET;
//     const milkCollections = await AppDataSource.getRepository(
//       entities.MilkCollections
//     )
//       .createQueryBuilder("milkCollections")
//       .leftJoinAndSelect("milkCollections.CreatedBy", "createdBy")
//       .leftJoinAndSelect("createdBy.OrganizationUnitId", "bmc")
//       .where("DATE(milkCollections.CollectionDateTime) <= :today", { today })
//       .andWhere("DATE(milkCollections.CollectionDateTime) >= :tenDaysAgo", { tenDaysAgo })
//       .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
//       .orderBy("milkCollections.CollectionDateTime")
//       .getMany();
//     const bmcs = await AppDataSource.getRepository(entities.Organization)
//       .createQueryBuilder("organization")
//       .innerJoinAndSelect("organization.OrganizationType", "organizationType")
//       .where("organization.IsActive =:cond", { cond: true })
//       .andWhere("organizationType.Id =:typeId", { typeId: 4 })
//       .getMany();
//     const milkCollectionIds = milkCollections.map((milk) => milk.Id);
//     const milkCollectionDetails = await AppDataSource.getRepository(
//       entities.MilkCollectionDetails
//     )
//       .createQueryBuilder("milkCollectionDetails")
//       .leftJoinAndSelect("milkCollectionDetails.OrganizationUnitId", "organization")
//       .leftJoinAndSelect("organization.ParentId", "organizationParent")
//       .leftJoinAndSelect("organization.OrganizationType", "organizationType")
//       .leftJoinAndSelect("milkCollectionDetails.MilkCollectionId", "collections")
//       .where("milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)", { milkCollectionIds })
//       .andWhere("milkCollectionDetails.IsActive = :isActive", { isActive: true })
//       .andWhere("organizationType.Id = :id", { id: 5 })
//       .getMany();
//     let dateArr: any[] = [];
//     for (let dateIter = 0; dateIter < milkCollections.length; dateIter++) {
//       if (!dateArr.includes(moment(milkCollections[dateIter].CollectionDateTime).format('DD/MM/YYYY'))) {
//         dateArr.push(moment(milkCollections[dateIter].CollectionDateTime).format('DD/MM/YYYY'));
//       }
//     }
//     let data: any[] = [];
//     bmcs.forEach((bmc) => {
//       let dateWiseQuantity: { date: string; totalQuantity: number; }[] = [];
//       for (let dateIter = 0; dateIter < dateArr.length; dateIter++) {
//         let dateWiseDetail = {
//           date: '',
//           totalQuantity: 0,
//         }
//         milkCollectionDetails.forEach((data) => {
//           if (data?.OrganizationUnitId?.ParentId?.Id == bmc.Id &&
//             moment(data.MilkCollectionId.CollectionDateTime).format('DD/MM/YYYY') == dateArr[dateIter]) {
//             dateWiseDetail.totalQuantity += data.Weight;
//           }
//         })
//         dateWiseDetail.date = dateArr[dateIter];
//         dateWiseQuantity.push(dateWiseDetail);
//       }
//       if (dateWiseQuantity.length > 0) {
//         data.push({ bmcName: bmc.Name, dateWiseQuantity: dateWiseQuantity });
//       }
//     })
//     return {
//       status: 200,
//       message: SUCCESS_MESSAGES.SUCCESS,
//       data,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       status: 400,
//       message: ERROR_MESSAGES.INTERNAL_SERVER,
//       data: null,
//     };
//   }
// }
//optimized linegraph
function LinegraphData(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const today = (0, moment_1.default)().format('YYYY-MM-DD');
            const tenDaysAgo = (0, moment_1.default)().subtract(10, 'days').format('YYYY-MM-DD');
            // Query milk collection details with necessary joins and aggregations
            const milkData = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                .createQueryBuilder("milkCollectionDetails")
                .select([
                "bmc.Name AS bmcName",
                "DATE(milkCollections.CollectionDateTime) AS collectionDate",
                "SUM(milkCollectionDetails.Weight) AS totalQuantity"
            ])
                .leftJoin("milkCollectionDetails.MilkCollectionId", "milkCollections")
                .leftJoin("milkCollectionDetails.OrganizationUnitId", "organization")
                .leftJoin("organization.ParentId", "bmc")
                .leftJoin("organization.OrganizationType", "organizationType")
                .where("milkCollections.IsActive = :isActive", { isActive: true })
                .andWhere("milkCollectionDetails.IsActive = :isActive", { isActive: true })
                .andWhere("organizationType.Id = :orgTypeId", { orgTypeId: 5 })
                .andWhere("DATE(milkCollections.CollectionDateTime) BETWEEN :tenDaysAgo AND :today", { tenDaysAgo, today })
                .groupBy("bmc.Name, DATE(milkCollections.CollectionDateTime)")
                .orderBy("collectionDate")
                .getRawMany();
            // Transform data into the required format
            const groupedData = {};
            milkData.forEach((row) => {
                if (!groupedData[row.bmcName]) {
                    groupedData[row.bmcName] = [];
                }
                groupedData[row.bmcName].push({
                    date: (0, moment_1.default)(row.collectionDate).format('DD/MM/YYYY'),
                    totalQuantity: parseFloat(row.totalQuantity),
                });
            });
            const data = Object.keys(groupedData).map((bmcName) => ({
                bmcName,
                dateWiseQuantity: groupedData[bmcName],
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data,
            };
        }
        catch (error) {
            console.error(error);
            return {
                status: 400,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.LinegraphData = LinegraphData;
