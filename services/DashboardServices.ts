import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import moment from "moment";
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

async function GetOrganizationUnitWeights(): Promise<ServiceResponse<{ organization: entities.Organization; sumOfWeights: number }[]>> {
  try {
    const date = new Date();
    const today = moment(date).format('YYYY-MM-DD')
    const milkCollections = await AppDataSource.getRepository(
      entities.MilkCollections
    )
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

    const milkCollectionDetails = await AppDataSource.getRepository(
      entities.MilkCollectionDetails
    )
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
    let bmcs = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder('organization')
      .where("organization.OrganizationType=:type", { type: 4 })
      .andWhere("organization.IsActive=:active", { active: true })
      .getMany();

    const result: any = []
    for (let bmcIterator = 0; bmcIterator < bmcs.length; bmcIterator++) {
      let total = 0;
      milkCollectionDetails.forEach((milkDetail) => {
        if (milkDetail.OrganizationUnitId.ParentId?.Id == bmcs[bmcIterator].Id) {
          total += milkDetail.Weight;
        }
      })
      if (total !== 0) {
        result.push({ bmc: bmcs[bmcIterator], weight: total })
      }
    }
    // console.log(milkCollectionDetails)
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: result,
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

async function MorEveBargraphData(
  model?: any
): Promise<ServiceResponse<any[]>> {
  try {
    const key = process.env.TOKEN_SECRET;
    const milkCollections = await AppDataSource.getRepository(
      entities.MilkCollections
    )
      .createQueryBuilder("milkCollections")
      .leftJoinAndSelect("milkCollections.CreatedBy", "createdBy")
      .leftJoinAndSelect("createdBy.OrganizationUnitId", "bmc")
      .where("DATE(milkCollections.CollectionDateTime) =:date", {date : model.date})
      .getMany();

    const bmcs = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("organization")
      .innerJoinAndSelect("organization.OrganizationType", "organizationType")
      .where("organization.IsActive =:cond", { cond: true })
      .andWhere("organizationType.Id =:typeId", { typeId: 4 })
      .getMany();

    const milkCollectionIds = milkCollections.map((milk) => milk.Id);
    // console.log(milkCollections)

    const milkCollectionDetails = await AppDataSource.getRepository(
      entities.MilkCollectionDetails
    )
      .createQueryBuilder("milkCollectionDetails")
      .leftJoinAndSelect("milkCollectionDetails.OrganizationUnitId", "organization")
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect("milkCollectionDetails.MilkCollectionId", "collections")
      .where("milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)", { milkCollectionIds })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .getMany();

    let data: any[] = [];
    for (let bmcIter = 0; bmcIter < bmcs.length; bmcIter++) {
      let collectionDetails = {
        bmcName: '',
        detail: {}
      };
      let detail = {
        morQty: 0,
        eveQty: 0
      }
      for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
        if (milkCollectionDetails[iter]?.OrganizationUnitId?.ParentId?.Id == bmcs[bmcIter].Id) {
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
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

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
async function LinegraphData(
  model?: any
): Promise<ServiceResponse<any[]>> {
  try {
    const today = moment().format('YYYY-MM-DD');
    const tenDaysAgo = moment().subtract(10, 'days').format('YYYY-MM-DD');

    // Query milk collection details with necessary joins and aggregations
    const milkData = await AppDataSource.getRepository(entities.MilkCollectionDetails)
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
    const groupedData: { [key: string]: any[] } = {};
    milkData.forEach((row) => {
      if (!groupedData[row.bmcName]) {
        groupedData[row.bmcName] = [];
      }
      groupedData[row.bmcName].push({
        date: moment(row.collectionDate).format('DD/MM/YYYY'),
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
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}


export { GetOrganizationUnitWeights, MorEveBargraphData, LinegraphData };
