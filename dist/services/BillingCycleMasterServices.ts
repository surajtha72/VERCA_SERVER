import { Shifts } from "./../entities/Shifts";
import { ProductAmountDue } from "./../entities/ProductAmountDue";
import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import {
  AllCycleMasterModel,
  CreateCycleMasterModel,
  UpdateCycleMasterModel,
  DeleteCycleMasterModel,
  GetBillModel,
  GetBillModelByBMC,
  GetBillModelByBMCRoutes,
  RateChartModel,
  GetBankAdviceModel,
  GetBankLetterAmountModel,
  GetSnfReconcillationModel,
  GetAgentLedgerModel,
} from "../models/BillingCycleMasterModel";
import {
  APIResponse,
  AgentWiseMilkCollectionModel,
  BankAdviceModel,
  BankLetterAmountModel,
  BillResponseModel,
  CollectionDetail,
  LoginResponse,
  ParentOu,
  ServiceResponse,
  SnfReconcillationModel,
} from "../models/ApiResponse";
import moment from "moment";
import { calculateValue } from "../utils/MilkValueCalculator";
import { aggregateData } from "../utils/AggregateCollectionData";
import { Any, Decimal128 } from "typeorm";
import { log } from "util";
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

async function GetCycleMaster(
  model?: any
): Promise<ServiceResponse<AllCycleMasterModel[]>> {
  try {
    let cycleMaster;
    if (model.id) {
      cycleMaster = await AppDataSource.getRepository(
        entities.BillingCycleMaster
      )
        .createQueryBuilder("cycleMaster")
        .leftJoinAndSelect("cycleMaster.FinancialYearId", "FinancialYearId")
        .where("cycleMaster.Id = :id", { id: model.id })
        .andWhere("cycleMaster.IsActive = :isActive", { isActive: true })
        .getMany();
    } else if (model.currentDate) {
      cycleMaster = await AppDataSource.getRepository(
        entities.BillingCycleMaster
      )
        .createQueryBuilder("cyclemaster")
        .leftJoin("cyclemaster.FinancialYearId", "FinancialYearId")
        .where("cyclemaster.IsActive =:isActive", { isActive: true })
        // .andWhere("cyclemaster.EndDate <=:currentDate",{currentDate: model.currentDate})
        .getMany();
    } else {
      cycleMaster = await AppDataSource.getRepository(
        entities.BillingCycleMaster
      )
        .createQueryBuilder("cycleMaster")
        .leftJoinAndSelect("cycleMaster.FinancialYearId", "FinancialYearId")
        .where("cycleMaster.IsActive = :isActive", { isActive: true })
        .getMany();
    }
    const cycleMasterData: AllCycleMasterModel[] = cycleMaster.map(
      (cycleMaster) => ({
        id: cycleMaster?.Id,
        financialYearId: cycleMaster.FinancialYearId
          ? cycleMaster.FinancialYearId?.Id
          : 0,
        cycleNo: cycleMaster?.CycleNo,
        startDate: cycleMaster?.StartDate,
        endDate: cycleMaster?.EndDate,
        isFrozen: cycleMaster?.IsFrozen,
      })
    );
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: cycleMasterData,
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

async function GetBill(
  req: Request,
  model: GetBillModel
): Promise<ServiceResponse<BillResponseModel[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const startDate = model.startDate;
    const endDate = model.endDate;

    const milkCollections = await AppDataSource.getRepository(
      entities.MilkCollections
    )
      .createQueryBuilder("milkCollections")
      .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
        startDate,
      })
      .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
        endDate,
      })
      .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
      .getMany();
    // console.log(milkCollections);
    const milkCollectionIds = milkCollections.map((milk) => milk.Id);
    // console.log(milkCollectionIds);
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
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", {
        id: 5,
      })
      .getMany();
    if (milkCollectionDetails.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }
    let orgArr: any[] = [];

    for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
      if (!orgArr.includes(milkCollectionDetails[iter].OrganizationUnitId.Id)) {
        orgArr.push(milkCollectionDetails[iter].OrganizationUnitId.Id);
      }
    }

    const org: any = [];
    for (let iteration = 0; iteration < orgArr.length; iteration++) {
      const route: any[] = [];
      for (
        let routeIteration = 0;
        routeIteration < milkCollectionDetails.length;
        routeIteration++
      ) {
        if (
          orgArr[iteration] ===
          milkCollectionDetails[routeIteration].OrganizationUnitId.Id
        ) {
          const item = {
            id: milkCollectionDetails[routeIteration].OrganizationUnitId.Id,
            name: milkCollectionDetails[routeIteration].OrganizationUnitId.Name,
            headload:
              milkCollectionDetails[routeIteration].OrganizationUnitId.HeadLoad,
            commision:
              milkCollectionDetails[routeIteration].OrganizationUnitId
                .Commission,
            routeId: milkCollectionDetails[routeIteration].RouteId.Id,
            routeName: milkCollectionDetails[routeIteration].RouteId.RouteName,
            collectionDetails: [],
          };
          if (
            !route.some((ele) => {
              return ele.id === item.id && ele.routeId === item.routeId;
            })
          ) {
            route.push(item);
          }
        }
      }
      org.push({ org: orgArr[iteration], route });
    }

    for (let orgIteration = 0; orgIteration < org.length; orgIteration++) {
      for (
        let routeIteration = 0;
        routeIteration < org[orgIteration].route.length;
        routeIteration++
      ) {
        milkCollectionDetails.forEach((milkDetail) => {
          const item = {
            id: milkDetail.OrganizationUnitId.Id,
            routeId: milkDetail.RouteId.Id,
          };
          if (
            org[orgIteration].route[routeIteration].id === item.id &&
            org[orgIteration].route[routeIteration].routeId === item.routeId
          ) {
            org[orgIteration].route[routeIteration].collectionDetails.push(
              milkDetail
            );
          }
        });
      }
    }

    const data: BillResponseModel[] = [];
    for (let orgIteration = 0; orgIteration < org.length; orgIteration++) {
      for (
        let routeIteration = 0;
        routeIteration < org[orgIteration].route.length;
        routeIteration++
      ) {
        let item: BillResponseModel;
        let groupItem = org[orgIteration].route[routeIteration];
        item = {
          organization: {
            id: groupItem.id,
            name: groupItem.name,
            headload: groupItem.headload,
            commision: groupItem.commision,
            routeId: groupItem.routeId,
            routeName: groupItem.routeName,
          },
          settlementAmount: 0,
          collectionDetails: groupItem["collectionDetails"].map(
            (detail: any) => ({
              Id: detail.Id,
              MilkType: detail.MilkType,
              CollectionOperationType: detail.CollectionOperationType,
              TestingOperationType: detail.TestingOperationType,
              Fat: detail.Fat,
              KGFat: (detail.Fat * detail.Weight) / 100,
              Snf: detail.Snf,
              KGSnf: (detail.Snf * detail.Weight) / 100,
              Clr: detail.Clr,
              Weight: detail.Weight,
              CanCount: detail.CanCount,
              CollectedAt: detail.CollectedAt,
              TestedAt: detail.TestedAt,
              IsActive: detail.IsActive,
              CreatedAt: detail.CreatedAt,
              ModifiedAt: detail.ModifiedAt,
              DeletedAt: detail.DeletedAt,
              organizationId: detail.OrganizationUnitId.Id,
              organizationName: detail.OrganizationUnitId.Name,
              shift: detail.MilkCollectionId.Shift,
              value: Number(
                (
                  ((detail.Fat * 384 + detail.Snf * 256) / 100) *
                  detail.Weight
                ).toFixed(2)
              ),
            })
          ),
        };
        data.push(item);
      }
    }
    // console.log(data);
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

async function GetRateChart(): Promise<ServiceResponse<RateChartModel[]>> {
  try {
    const rateMaster = await AppDataSource.getRepository(entities.RateMaster)
      .createQueryBuilder("ratemaster")
      .where("ratemaster.Wef < :currDate", { currDate: new Date() })
      .andWhere("ratemaster.IsActive =:isActive", { isActive: true })
      .orderBy("ratemaster.SeqNo", "ASC")
      .getMany();
    if (rateMaster.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    // console.log("result: ", res)
    const data = [];
    // for (let fat = 3.0; fat <= 10.0; fat += 0.1) {
    //   for (let snf = 7.5; snf <= 9.0; snf += 0.1) {
    //     let rate = calculateValue(fat, snf);
    //     console.log(fat.toFixed(2), " ", snf.toFixed(2), " rate-->", rate.toFixed(2));
    //   }
    //   console.log("\n");
    // }

    // console.log("****************************************************START**********************************************************")
    for (let fat = 3.0; fat <= 10.0; fat += 0.1) {
      let rateStr = "";
      for (let snf = 7.5; snf <= 9.0; snf += 0.1) {
        let rate = calculateValue(
          parseFloat(fat.toFixed(1)),
          parseFloat(snf.toFixed(1)),
          rateMaster
        );
        rateStr += "  ";
        rateStr += rate.toFixed(2);
      }
      // console.log(rateStr)
      // console.log("\n");
    }
    // console.log("****************************************************END***********************************************************")

    for (let fat = 3.0; fat <= 10.0; fat += 0.1) {
      let values: RateChartModel = {
        rates: [],
      };
      for (let snf = 7.5; snf <= 9.0; snf += 0.1) {
        let rate = calculateValue(
          parseFloat(fat.toFixed(1)),
          parseFloat(snf.toFixed(1)),
          rateMaster
        );
        values.rates.push(rate.toFixed(2));
      }
      // console.log("rate: ", calculateValue(6.0,9))
      data.push(values);
    }
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data,
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

async function GetBillByBMC(
  req: Request,
  model: GetBillModelByBMC
): Promise<ServiceResponse<BillResponseModel[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    // console.log("model : ", model);
    const startDate = model.startDate;
    const endDate = model.endDate;
    const bmcId = model.bmcId;

    // Fetch cycle details based on startDate and endDate
    const cycle = await AppDataSource.getRepository(entities.BillingCycleMaster)
      .createQueryBuilder("cycle")
      .where("cycle.StartDate = :startDate", { startDate })
      .andWhere("cycle.EndDate = :endDate", { endDate })
      .getOne();

    if (!cycle) {
      return {
        status: 400,
        message: "Billing cycle not found for the provided dates.",
        data: null,
      };
    }

    const isFrozen = cycle.IsFrozen;
    // console.log("isFrozen value: ",isFrozen);

    const milkCollections = await AppDataSource.getRepository(
      entities.MilkCollections
    )
      .createQueryBuilder("milkCollections")
      .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
        startDate,
      })
      .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
        endDate,
      })
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
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .andWhere("milkCollectionDetails.Fat IS NOT NULL")
      .andWhere("milkCollectionDetails.Snf IS NOT NULL")
      .andWhere("milkCollectionDetails.Clr IS NOT NULL")
      .andWhere("organizationParent.Id =:bmcid", { bmcid: bmcId })
      .orderBy("milkCollectionDetails.OrganizationUnitId")
      .getMany();

    const complaints = await AppDataSource.getRepository(entities.Complaints)
      .createQueryBuilder("complaints")
      .leftJoinAndSelect("complaints.AgentId", "agent")
      .where("agent.ParentId =:bmcId", { bmcId: bmcId })
      .andWhere("DATE(complaints.TobeSettledStartDate) =:startDate", {
        startDate: startDate,
      })
      .andWhere("DATE(complaints.TobeSettledEndDate) =:endDate", {
        endDate: endDate,
      })
      .getMany();

    // Aggregated collection details incase of multiple dumping for an agent.
    const resultArr = aggregateData(milkCollectionDetails);

    const rateMaster = await AppDataSource.getRepository(entities.RateMaster)
      .createQueryBuilder("ratemaster")
      .where("ratemaster.Wef < :currDate", { currDate: new Date() })
      .andWhere("ratemaster.IsActive =:isActive", { isActive: true })
      .orderBy("ratemaster.SeqNo", "ASC")
      .getMany();
    if (rateMaster.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    // console.log("rate:",rateMaster);

    if (milkCollectionDetails.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }
    let orgArr: any[] = [];

    for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
      if (!orgArr.includes(milkCollectionDetails[iter].OrganizationUnitId.Id)) {
        orgArr.push(milkCollectionDetails[iter].OrganizationUnitId.Id);
      }
    }

    const org: any = [];
    for (let iteration = 0; iteration < orgArr.length; iteration++) {
      const route: any[] = [];

      const organizationId = orgArr[iteration];
      // Fetch the headload for the current organizationId
      let headload = 0;
      let routeId = 0;
      let routeName = "";
      // console.log("isFrozen value: ",isFrozen);

      if (isFrozen) {
        // console.log("data taken from headloadhistory")
        const headloadHistory = await AppDataSource.getRepository(
          entities.HeadloadHistory
        )
          .createQueryBuilder("history")
          .where("history.Agent_id = :organizationId", { organizationId })
          .andWhere("history.BillingCycle = :cycleId", { cycleId: cycle.Id })
          .getOne();
        headload = headloadHistory?.HeadLoad || 0;
      } else {
        // console.log("data taken from org")
        const organization = await AppDataSource.getRepository(
          entities.Organization
        )
          .createQueryBuilder("organization")
          .select([
            "organization.Id AS Id",
            "organization.HeadLoad AS HeadLoad",
            "organization.AccountNumber AS AccountNumber",
            "organization.AccHolderName AS AccHolderName",
            "routeMaster.RouteName AS RouteName",
            "routeMaster.Id AS RouteId",
          ])
          .leftJoin(
            "RouteStops",
            "routeStops",
            "routeStops.StopId = organization.Id"
          )
          .leftJoin("routeStops.RouteId", "routeMaster")
          .where("organization.Id = :organizationId", { organizationId })
          .getRawOne();

        headload = organization?.HeadLoad || 0;
      }
      // console.log("organization headload: ",organizationId, headload);

      for (
        let routeIteration = 0;
        routeIteration < milkCollectionDetails.length;
        routeIteration++
      ) {
        if (
          orgArr[iteration] ===
          milkCollectionDetails[routeIteration].OrganizationUnitId.Id
        ) {
          const item = {
            id: milkCollectionDetails[routeIteration]?.OrganizationUnitId.Id,
            name: milkCollectionDetails[routeIteration]?.OrganizationUnitId.Name,
            // headload: milkCollectionDetails[routeIteration]?.OrganizationUnitId.HeadLoad,
            headload: headload,
            commision: milkCollectionDetails[routeIteration]?.OrganizationUnitId.Commission,
            routeId: milkCollectionDetails[routeIteration].RouteId.Id,
            // routeId: routeId,
            routeName: milkCollectionDetails[routeIteration].RouteId.RouteName,
            // routeName: routeName,
            collectionDetails: [],
          };
          if (
            !route.some((ele) => {
              return ele.id === item.id && ele.routeId === item.routeId;
            })
          ) {
            route.push(item);
          }
        }
      }
      org.push({ org: orgArr[iteration], route });
    }

    for (let orgIteration = 0; orgIteration < org.length; orgIteration++) {
      for (
        let routeIteration = 0;
        routeIteration < org[orgIteration].route.length;
        routeIteration++
      ) {
        resultArr.forEach((milkDetail) => {
          const item = {
            id: milkDetail.OrganizationUnitId.Id,
            routeId: milkDetail.RouteId.Id,
          };
          if (
            org[orgIteration].route[routeIteration]?.id === item.id &&
            org[orgIteration].route[routeIteration]?.routeId === item.routeId
          ) {
            org[orgIteration].route[routeIteration]?.collectionDetails.push(
              milkDetail
            );
          }
        });
      }
    }

    const data: BillResponseModel[] = [];

    // for (let orgIteration = 0; orgIteration < org.length; orgIteration++) {
    //   for (
    //     let routeIteration = 0;
    //     routeIteration < org[orgIteration].route.length;
    //     routeIteration++
    //   ) {
    //     let item: BillResponseModel;
    //     let groupItem = org[orgIteration].route[routeIteration];
    //     let settlementAmount: number = 0;

    //     if (new Date(startDate) >= new Date("2024-08-01")) {
    //       complaints.forEach((complaint) => {
    //         if (complaint.AgentId.Id === groupItem.id) {
    //           settlementAmount += complaint.SettlementAmount;
    //         }
    //       });
    //     } else {
    //       complaints.forEach((complaint) => {
    //         if (complaint.AgentId.Id === groupItem.id) {
    //           settlementAmount = 0;
    //         }
    //       });
    //     }

    //     item = {
    //       organization: {
    //         id: groupItem.id,
    //         name: groupItem.name,
    //         headload: groupItem.headload,
    //         commision: groupItem.commision,
    //         routeId: groupItem.routeId,
    //         routeName: groupItem.routeName,
    //       },
    //       settlementAmount: settlementAmount ?? 0,

    //       collectionDetails: groupItem["collectionDetails"].map(
    //         (detail: any) => {
    //           return {
    //             Id: detail.Id,
    //             MilkType: detail.MilkType,
    //             CollectionOperationType: detail.CollectionOperationType,
    //             TestingOperationType: detail.TestingOperationType,
    //             Fat: detail.Fat,
    //             KGFat: (detail.Weight.toFixed(1) / 100) * detail.Fat.toFixed(1),
    //             Snf: detail.Snf,
    //             KGSnf: (detail.Weight.toFixed(1) / 100) * detail.Snf.toFixed(1),
    //             Clr: detail.Clr,
    //             Weight: detail.Weight,
    //             CanCount: detail.CanCount,
    //             CollectedAt: detail.CollectedAt,
    //             TestedAt: detail.TestedAt,
    //             IsActive: detail.IsActive,
    //             CreatedAt: detail.CreatedAt,
    //             ModifiedAt: detail.ModifiedAt,
    //             DeletedAt: detail.DeletedAt,
    //             organizationId: detail.OrganizationUnitId.Id,
    //             organizationName: detail.OrganizationUnitId.Name,
    //             shift: detail.MilkCollectionId.Shift,
    //             value: Number(
    //               calculateValue(
    //                 parseFloat(detail.Fat.toFixed(1)),
    //                 // parseFloat(detail.Snf.toFixed(1)),
    //                 parseFloat(
    //                   (new Date(startDate) >= new Date("2024-07-21") &&
    //                   detail.Snf > 9.0
    //                     ? 9.0
    //                     : detail.Snf
    //                   ).toFixed(1)
    //                 ),
    //                 rateMaster
    //               ) * parseFloat(detail.Weight.toFixed(1))
    //             ),
    //           };
    //         }
    //       ),
    //     };

    //     for (const complaint of complaints) {
    //       const existingAgent = data.find(
    //         (item) => item.organization.id === complaint.AgentId.Id
    //       );

    //       console.log(existingAgent);

    //       if (!existingAgent) {
    //         const organization = await AppDataSource.getRepository(
    //           entities.Organization
    //         )
    //           .createQueryBuilder("organization")
    //           .select([
    //             "organization.Id AS Id",
    //             "organization.HeadLoad AS HeadLoad",
    //             "organization.Commission AS Commission",
    //             "routeMaster.RouteName AS RouteName",
    //             "routeMaster.Id AS RouteId",
    //           ])
    //           .leftJoin(
    //             "RouteStops",
    //             "routeStops",
    //             "routeStops.StopId = organization.Id"
    //           )
    //           .leftJoin("routeStops.RouteId", "routeMaster")
    //           .where("organization.Id = :organizationId", {
    //             organizationId: complaint.AgentId.Id,
    //           })
    //           .getRawOne();

    //         data.push({
    //           organization: {
    //             id: complaint.AgentId.Id,
    //             name: complaint.AgentId.Name,
    //             headload: 0,
    //             commision: 0,
    //             routeId: organization?.RouteId || 0,
    //             routeName: organization?.RouteName || "",
    //           },
    //           settlementAmount: complaint.SettlementAmount,
    //           collectionDetails: [],
    //         });
    //       }
    //     }

    //     data.push(item);
    //   }
    // }

    // Create a Set to track agent IDs that have already been added to the data array
    const processedAgents = new Set<number>();

    for (let orgIteration = 0; orgIteration < org.length; orgIteration++) {
      for (
        let routeIteration = 0;
        routeIteration < org[orgIteration].route.length;
        routeIteration++
      ) {
        let groupItem = org[orgIteration].route[routeIteration];
        let settlementAmount: number = 0;

        if (new Date(startDate) >= new Date("2024-08-01")) {
          complaints.forEach((complaint) => {
            if (complaint.AgentId.Id === groupItem.id) {
              settlementAmount += complaint.SettlementAmount;
            }
          });
        } else {
          complaints.forEach((complaint) => {
            if (complaint.AgentId.Id === groupItem.id) {
              settlementAmount = 0;
            }
          });
        }

        // If this agent is already processed, skip to the next one
        if (processedAgents.has(groupItem.id)) {
          continue;
        }

        // Map collection details
        const collectionDetails = groupItem["collectionDetails"].map(
          (detail: any) => ({
            Id: detail.Id,
            MilkType: detail.MilkType,
            CollectionOperationType: detail.CollectionOperationType,
            TestingOperationType: detail.TestingOperationType,
            Fat: detail.Fat,
            KGFat: (detail.Weight.toFixed(1) / 100) * detail.Fat.toFixed(1),
            Snf: detail.Snf,
            KGSnf: (detail.Weight.toFixed(1) / 100) * detail.Snf.toFixed(1),
            Clr: detail.Clr,
            Weight: detail.Weight,
            CanCount: detail.CanCount,
            CollectedAt: detail.CollectedAt,
            TestedAt: detail.TestedAt,
            IsActive: detail.IsActive,
            CreatedAt: detail.CreatedAt,
            ModifiedAt: detail.ModifiedAt,
            DeletedAt: detail.DeletedAt,
            organizationId: detail.OrganizationUnitId.Id,
            organizationName: detail.OrganizationUnitId.Name,
            shift: detail.MilkCollectionId.Shift,
            value: Number(
              calculateValue(
                parseFloat(detail.Fat.toFixed(1)),
                parseFloat(
                  (new Date(startDate) >= new Date("2024-07-21") &&
                  detail.Snf > 9.0
                    ? 9.0
                    : detail.Snf
                  ).toFixed(1)
                ),
                rateMaster
              ) * parseFloat(detail.Weight.toFixed(1))
            ),
          })
        );

        // Push the data for the agent
        data.push({
          organization: {
            id: groupItem.id,
            name: groupItem.name,
            headload: groupItem.headload,
            commision: groupItem.commision,
            routeId: groupItem.routeId,
            routeName: groupItem.routeName,
          },
          settlementAmount: settlementAmount ?? 0,
          collectionDetails: collectionDetails,
        });

        // Mark the agent as processed
        processedAgents.add(groupItem.id);
      }
    }

    // After the main loop, handle complaints for any remaining agents
    for (const complaint of complaints) {
      if (processedAgents.has(complaint.AgentId.Id)) {
        continue;
      }

      const organization = await AppDataSource.getRepository(
        entities.Organization
      )
        .createQueryBuilder("organization")
        .select([
          "organization.Id AS Id",
          "organization.HeadLoad AS HeadLoad",
          "organization.Commission AS Commission",
          "routeMaster.RouteName AS RouteName",
          "routeMaster.Id AS RouteId",
        ])
        .leftJoin(
          "RouteStops",
          "routeStops",
          "routeStops.StopId = organization.Id"
        )
        .leftJoin("routeStops.RouteId", "routeMaster")
        .where("organization.Id = :organizationId", {
          organizationId: complaint.AgentId.Id,
        })
        .getRawOne();

      data.push({
        organization: {
          id: complaint.AgentId.Id,
          name: complaint.AgentId.Name,
          headload: 0,
          commision: 0,
          routeId: organization?.RouteId || 0,
          routeName: organization?.RouteName || "",
        },
        settlementAmount: complaint.SettlementAmount,
        collectionDetails: [],
      });

      // Mark the complaint's agent as processed
      processedAgents.add(complaint.AgentId.Id);
    }

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

async function GetAgentWiseMilkCollection(
  req: Request,
  model: GetSnfReconcillationModel
): Promise<ServiceResponse<AgentWiseMilkCollectionModel[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const startDate = model.startDate;
    const endDate = model.endDate;
    const shift = model.shift;

    let milkCollections;
    console.log("model: ", model);

    if (shift === undefined || shift === "both") {
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
          startDate,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
          endDate,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .getMany();

      console.log("inside if: ", milkCollections);
    } else {
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
          startDate,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
          endDate,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .andWhere("milkCollections.Shift = :Shift", { Shift: model.shift })
        .getMany();
    }

    const milkCollectionIds = milkCollections.map((milk) => milk.Id);

    // console.log(milkCollections);
    // console.log(model);

    if (milkCollectionIds.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    const bmc = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("organization")
      .innerJoinAndSelect("organization.OrganizationType", "organizationType")
      .andWhere("organization.IsActive =:cond", { cond: true })
      .andWhere("organizationType.Id =:bmcid", { bmcid: 4 })
      .getMany();

    if (!bmc) {
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
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .andWhere("milkCollectionDetails.Fat IS NOT NULL")
      .andWhere("milkCollectionDetails.Snf IS NOT NULL")
      .andWhere("milkCollectionDetails.Clr IS NOT NULL")
      .getMany();

    if (milkCollectionDetails.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    let parentOuArr: any[] = [];
    let parent: any[] = [];
    for (let i = 0; i < bmc.length; i++) {
      if (!parentOuArr.includes(bmc[i].Id)) {
        parentOuArr.push(bmc[i].Id);
        parent.push(bmc[i].Name);
      }
    }

    let orgArr: any[] = [];
    for (let parentIter = 0; parentIter < parentOuArr.length; parentIter++) {
      let milkDetailArr: any[] = [];
      let agentArr: any[] = [];
      let agentDetail: any[] = [];
      for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
        if (
          parentOuArr[parentIter] ==
          milkCollectionDetails[iter].OrganizationUnitId.ParentId?.Id
        ) {
          if (
            !agentArr.includes(
              milkCollectionDetails[iter].OrganizationUnitId.Id
            )
          ) {
            agentArr.push(milkCollectionDetails[iter].OrganizationUnitId.Id);
            agentDetail.push({
              agentId: milkCollectionDetails[iter].OrganizationUnitId.Id,
              agentName: milkCollectionDetails[iter].OrganizationUnitId.Name,
            });
          }
        }
      }
      for (let i = 0; i < agentArr.length; i++) {
        let cowMilkDetail = {
          totalWeight: 0,
          avgFat: 0,
          avgSnf: 0,
          kgFat: 0,
          kgSnf: 0,
        };
        let buffMilkDetail = {
          totalWeight: 0,
          avgFat: 0,
          avgSnf: 0,
          kgFat: 0,
          kgSnf: 0,
        };
        let counter = 0;
        let buffCounter = 0;
        for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
          if (
            agentArr[i] == milkCollectionDetails[iter].OrganizationUnitId.Id
          ) {
            if (milkCollectionDetails[iter].Fat < 5.4) {
              cowMilkDetail.totalWeight += milkCollectionDetails[iter].Weight;
              cowMilkDetail.avgFat += milkCollectionDetails[iter].Fat;
              cowMilkDetail.avgSnf += milkCollectionDetails[iter].Snf;
              cowMilkDetail.kgFat +=
                (parseFloat(milkCollectionDetails[iter].Fat.toFixed(1)) *
                  parseFloat(milkCollectionDetails[iter].Weight.toFixed(1))) /
                100;
              cowMilkDetail.kgSnf +=
                (parseFloat(milkCollectionDetails[iter].Snf.toFixed(1)) *
                  parseFloat(milkCollectionDetails[iter].Weight.toFixed(1))) /
                100;
              counter++;
            } else {
              buffMilkDetail.totalWeight += milkCollectionDetails[iter].Weight;
              buffMilkDetail.avgFat += milkCollectionDetails[iter].Fat;
              buffMilkDetail.avgSnf += milkCollectionDetails[iter].Snf;
              buffMilkDetail.kgFat +=
                (parseFloat(milkCollectionDetails[iter].Fat.toFixed(1)) *
                  parseFloat(milkCollectionDetails[iter].Weight.toFixed(1))) /
                100;
              buffMilkDetail.kgSnf +=
                (parseFloat(milkCollectionDetails[iter].Snf.toFixed(1)) *
                  parseFloat(milkCollectionDetails[iter].Weight.toFixed(1))) /
                100;
              buffCounter++;
            }
          }
        }
        cowMilkDetail.avgFat = cowMilkDetail.avgFat / counter;
        cowMilkDetail.avgSnf = cowMilkDetail.avgSnf / counter;
        buffMilkDetail.avgFat = buffMilkDetail.avgFat / buffCounter;
        buffMilkDetail.avgSnf = buffMilkDetail.avgSnf / buffCounter;
        milkDetailArr.push({
          agentDetail: agentDetail[i],
          cowMilkDetail: cowMilkDetail.totalWeight !== 0 ? cowMilkDetail : {},
          buffMilkDetail:
            buffMilkDetail.totalWeight !== 0 ? buffMilkDetail : {},
        });
      }
      if (milkDetailArr.length > 0) {
        orgArr.push({
          pareOuId: parentOuArr[parentIter],
          parentOuNmae: parent[parentIter],
          details: milkDetailArr,
        });
      }
    }
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: orgArr,
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

async function GetBmcSnfReconcillation(
  req: Request,
  model: GetSnfReconcillationModel
): Promise<ServiceResponse<SnfReconcillationModel[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const startDate = model.startDate;
    const endDate = model.endDate;
    const shift = model.shift;

    let milkCollections;
    console.log(shift, "this is shift");
    if (shift === undefined || shift === "both") {
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
          startDate,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
          endDate,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
          startDate,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
          endDate,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .andWhere("milkCollections.Shift = :Shift", { Shift: model.shift })
        .getMany();
    }

    const milkCollectionIds = milkCollections.map((milk) => milk.Id);

    if (milkCollectionIds.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    const bmc = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("organization")
      .innerJoinAndSelect("organization.OrganizationType", "organizationType")
      .andWhere("organization.IsActive =:cond", { cond: true })
      .andWhere("organizationType.Id =:bmcid", { bmcid: 4 })
      .getMany();

    if (!bmc) {
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
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .andWhere("milkCollectionDetails.Fat IS NOT NULL")
      .andWhere("milkCollectionDetails.Snf IS NOT NULL")
      .andWhere("milkCollectionDetails.Clr IS NOT NULL")
      .orderBy("milkCollectionDetails.CollectedAt")
      .getMany();

    if (milkCollectionDetails.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    let parentOuArr: any[] = [];
    let parent: any[] = [];
    for (let i = 0; i < bmc.length; i++) {
      if (!parentOuArr.includes(bmc[i].Id)) {
        parentOuArr.push(bmc[i].Id);
        parent.push(bmc[i].Name);
      }
    }

    let orgArr: any[] = [];
    for (let parentIter = 0; parentIter < parentOuArr.length; parentIter++) {
      let milkDetailArr: any[] = [];
      let collectedAtArr: any[] = [];
      for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
        if (
          parentOuArr[parentIter] ==
          milkCollectionDetails[iter].OrganizationUnitId.ParentId?.Id
        ) {
          if (
            !collectedAtArr.includes(
              moment(
                milkCollectionDetails[iter].MilkCollectionId.CollectionDateTime
              ).format("YYYY-MM-DD")
            )
          ) {
            collectedAtArr.push(
              moment(
                milkCollectionDetails[iter].MilkCollectionId.CollectionDateTime
              ).format("YYYY-MM-DD")
            );
          }
        }
      }
      for (let i = 0; i < collectedAtArr.length; i++) {
        let morningShift = {
          cowMilkDetail: {
            totalWeight: 0,
            avgFat: 0,
            avgSnf: 0,
            kgFat: 0,
            kgSnf: 0,
          },
          buffMilkDetail: {
            totalWeight: 0,
            avgFat: 0,
            avgSnf: 0,
            kgFat: 0,
            kgSnf: 0,
          },
        };
        let eveningShift = {
          cowMilkDetail: {
            totalWeight: 0,
            avgFat: 0,
            avgSnf: 0,
            kgFat: 0,
            kgSnf: 0,
          },
          buffMilkDetail: {
            totalWeight: 0,
            avgFat: 0,
            avgSnf: 0,
            kgFat: 0,
            kgSnf: 0,
          },
        };
        let morningCowMilkCounter = 0;
        let morningBuffMilkCounter = 0;
        let eveningCowMilkCounter = 0;
        let eveningBuffMilkCounter = 0;
        for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
          if (
            collectedAtArr[i] ==
            moment(
              milkCollectionDetails[iter].MilkCollectionId.CollectionDateTime
            ).format("YYYY-MM-DD")
          ) {
            if (
              milkCollectionDetails[iter].MilkCollectionId.Shift == "morning"
            ) {
              if (milkCollectionDetails[iter].Fat < 5.4) {
                morningShift.cowMilkDetail.totalWeight +=
                  milkCollectionDetails[iter].Weight;
                morningShift.cowMilkDetail.avgFat +=
                  milkCollectionDetails[iter].Fat;
                morningShift.cowMilkDetail.avgSnf +=
                  milkCollectionDetails[iter].Snf;
                morningShift.cowMilkDetail.kgFat +=
                  (parseFloat(milkCollectionDetails[iter].Weight.toFixed(1)) /
                    100) *
                  parseFloat(milkCollectionDetails[iter].Fat.toFixed(1));
                morningShift.cowMilkDetail.kgSnf +=
                  (parseFloat(milkCollectionDetails[iter].Weight.toFixed(1)) /
                    100) *
                  parseFloat(milkCollectionDetails[iter].Snf.toFixed(1));
                morningCowMilkCounter++;
              } else {
                morningShift.buffMilkDetail.totalWeight +=
                  milkCollectionDetails[iter].Weight;
                morningShift.buffMilkDetail.avgFat +=
                  milkCollectionDetails[iter].Fat;
                morningShift.buffMilkDetail.avgSnf +=
                  milkCollectionDetails[iter].Snf;
                morningShift.buffMilkDetail.kgFat +=
                  (parseFloat(milkCollectionDetails[iter].Weight.toFixed(1)) /
                    100) *
                  parseFloat(milkCollectionDetails[iter].Fat.toFixed(1));
                morningShift.buffMilkDetail.kgSnf +=
                  (parseFloat(milkCollectionDetails[iter].Weight.toFixed(1)) /
                    100) *
                  parseFloat(milkCollectionDetails[iter].Snf.toFixed(1));
                morningBuffMilkCounter++;
              }
            }
            if (
              milkCollectionDetails[iter].MilkCollectionId.Shift == "evening"
            ) {
              if (milkCollectionDetails[iter].Fat < 5.4) {
                eveningShift.cowMilkDetail.totalWeight +=
                  milkCollectionDetails[iter].Weight;
                eveningShift.cowMilkDetail.avgFat +=
                  milkCollectionDetails[iter].Fat;
                eveningShift.cowMilkDetail.avgSnf +=
                  milkCollectionDetails[iter].Snf;
                eveningShift.cowMilkDetail.kgFat +=
                  (parseFloat(milkCollectionDetails[iter].Fat.toFixed(1)) *
                    parseFloat(milkCollectionDetails[iter].Weight.toFixed(1))) /
                  100;
                eveningShift.cowMilkDetail.kgSnf +=
                  (parseFloat(milkCollectionDetails[iter].Snf.toFixed(1)) *
                    parseFloat(milkCollectionDetails[iter].Weight.toFixed(1))) /
                  100;
                eveningCowMilkCounter++;
              } else {
                eveningShift.buffMilkDetail.totalWeight +=
                  milkCollectionDetails[iter].Weight;
                eveningShift.buffMilkDetail.avgFat +=
                  milkCollectionDetails[iter].Fat;
                eveningShift.buffMilkDetail.avgSnf +=
                  milkCollectionDetails[iter].Snf;
                eveningShift.buffMilkDetail.kgFat +=
                  (parseFloat(milkCollectionDetails[iter].Fat.toFixed(1)) *
                    parseFloat(milkCollectionDetails[iter].Weight.toFixed(1))) /
                  100;
                eveningShift.buffMilkDetail.kgSnf +=
                  (parseFloat(milkCollectionDetails[iter].Snf.toFixed(1)) *
                    parseFloat(milkCollectionDetails[iter].Weight.toFixed(1))) /
                  100;
                eveningBuffMilkCounter++;
              }
            }
          }
        }
        morningShift.cowMilkDetail.avgFat =
          morningShift.cowMilkDetail.avgFat / morningCowMilkCounter;
        morningShift.cowMilkDetail.avgSnf =
          morningShift.cowMilkDetail.avgSnf / morningCowMilkCounter;
        morningShift.buffMilkDetail.avgFat =
          morningShift.buffMilkDetail.avgFat / morningBuffMilkCounter;
        morningShift.buffMilkDetail.avgSnf =
          morningShift.buffMilkDetail.avgSnf / morningBuffMilkCounter;
        eveningShift.cowMilkDetail.avgFat =
          eveningShift.cowMilkDetail.avgFat / eveningCowMilkCounter;
        eveningShift.cowMilkDetail.avgSnf =
          eveningShift.cowMilkDetail.avgSnf / eveningCowMilkCounter;
        eveningShift.buffMilkDetail.avgFat =
          eveningShift.buffMilkDetail.avgFat / eveningBuffMilkCounter;
        eveningShift.buffMilkDetail.avgSnf =
          eveningShift.buffMilkDetail.avgSnf / eveningBuffMilkCounter;
        milkDetailArr.push({
          collectedAt: collectedAtArr[i],
          morningShift: {
            cowMilkDetails:
              morningShift.cowMilkDetail.totalWeight != 0
                ? morningShift.cowMilkDetail
                : {},
            buffMilkDetails:
              morningShift.buffMilkDetail.totalWeight !== 0
                ? morningShift.buffMilkDetail
                : {},
          },
          eveningShift: {
            cowMilkDetails:
              eveningShift.cowMilkDetail.totalWeight != 0
                ? eveningShift.cowMilkDetail
                : {},
            buffMilkDetails:
              eveningShift.buffMilkDetail.totalWeight !== 0
                ? eveningShift.buffMilkDetail
                : {},
          },
        });
      }
      if (milkDetailArr.length > 0) {
        orgArr.push({
          parentOuId: parentOuArr[parentIter],
          parentOuName: parent[parentIter],
          details: milkDetailArr,
        });
      }
    }
    // console.log("orgArr ; ", orgArr[0].details)

    const data: AgentWiseMilkCollectionModel[] = [];
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: orgArr,
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

async function GetBillByBMCRoutes(
  req: Request,
  model: GetBillModelByBMCRoutes
): Promise<ServiceResponse<BillResponseModel[]>> {
  try {
    // console.log(model)
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const startDate = model.startDate;
    const endDate = model.endDate;
    const bmcId = model.bmcId;
    const routeId = model.routeId;

    // Fetch cycle details based on startDate and endDate
    const cycle = await AppDataSource.getRepository(entities.BillingCycleMaster)
      .createQueryBuilder("cycle")
      .where("cycle.StartDate = :startDate", { startDate })
      .andWhere("cycle.EndDate = :endDate", { endDate })
      .getOne();

    if (!cycle) {
      return {
        status: 400,
        message: "Billing cycle not found for the provided dates.",
        data: null,
      };
    }

    const isFrozen = cycle.IsFrozen;

    const milkCollections = await AppDataSource.getRepository(
      entities.MilkCollections
    )
      .createQueryBuilder("milkCollections")
      .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
        startDate,
      })
      .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
        endDate,
      })
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
    const bmc = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("organization")
      .innerJoinAndSelect("organization.OrganizationType", "organizationType")
      .where("organization.Id =:id", { id: bmcId })
      .andWhere("organization.IsActive =:cond", { cond: true })
      .andWhere("organizationType.Id =:bmcid", { bmcid: 4 })
      .getOne();

    if (!bmc) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }
    const routeDetail = await AppDataSource.getRepository(entities.RouteMaster)
      .createQueryBuilder("route")
      .where("route.Id =:id", { id: routeId })
      .andWhere("route.IsActive =:cond", { cond: true })
      .getOne();
    if (!routeDetail) {
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
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .andWhere("milkCollectionDetails.Fat IS NOT NULL")
      .andWhere("milkCollectionDetails.Snf IS NOT NULL")
      .andWhere("milkCollectionDetails.Clr IS NOT NULL")
      .andWhere("organizationParent.Id =:bmcid", { bmcid: bmc.Id })
      .andWhere("route.Id =:routeId", { routeId: routeId })
      .getMany();

    if (milkCollectionDetails.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    const complaints = await AppDataSource.getRepository(entities.Complaints)
      .createQueryBuilder("complaints")
      .leftJoinAndSelect("complaints.AgentId", "agent")
      .where("agent.ParentId =:bmcId", { bmcId: bmcId })
      .andWhere("DATE(complaints.TobeSettledStartDate) =:startDate", {
        startDate: startDate,
      })
      .andWhere("DATE(complaints.TobeSettledEndDate) =:endDate", {
        endDate: endDate,
      })
      .getMany();

    const resultArray = aggregateData(milkCollectionDetails);

    const rateMaster = await AppDataSource.getRepository(entities.RateMaster)
      .createQueryBuilder("ratemaster")
      .where("ratemaster.Wef < :currDate", { currDate: new Date() })
      .orderBy("ratemaster.SeqNo", "ASC")
      .getMany();
    if (rateMaster.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    let orgArr: any[] = [];

    for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
      if (!orgArr.includes(milkCollectionDetails[iter].OrganizationUnitId.Id)) {
        orgArr.push(milkCollectionDetails[iter].OrganizationUnitId.Id);
      }
    }

    const org: any = [];
    for (let iteration = 0; iteration < orgArr.length; iteration++) {
      const route: any[] = [];

      const organizationId = orgArr[iteration];
      // Fetch the headload for the current organizationId
      let headload = 0;
      let routeId = 0;
      let routeName = "";
      // console.log("isFrozen value: ",isFrozen);

      if (isFrozen) {
        // console.log("data taken from headloadhistory")
        const headloadHistory = await AppDataSource.getRepository(
          entities.HeadloadHistory
        )
          .createQueryBuilder("history")
          .where("history.Agent_id = :organizationId", { organizationId })
          .andWhere("history.BillingCycle = :cycleId", { cycleId: cycle.Id })
          .getOne();
        headload = headloadHistory?.HeadLoad || 0;
        routeId = headloadHistory?.RouteId || 0;
        routeName = headloadHistory?.RouteName || "";
      } else {
        // console.log("data taken from org")
        const organization = await AppDataSource.getRepository(
          entities.Organization
        )
          .createQueryBuilder("organization")
          .select([
            "organization.Id AS Id",
            "organization.HeadLoad AS HeadLoad",
            "organization.AccountNumber AS AccountNumber",
            "organization.AccHolderName AS AccHolderName",
            "routeMaster.RouteName AS RouteName",
            "routeMaster.Id AS RouteId",
          ])
          .leftJoin(
            "RouteStops",
            "routeStops",
            "routeStops.StopId = organization.Id"
          )
          .leftJoin("routeStops.RouteId", "routeMaster")
          .where("organization.Id = :organizationId", { organizationId })
          .getRawOne();

        headload = organization?.HeadLoad || 0;
        routeId = organization?.RouteId || 0;
        routeName = organization?.RouteName || "";
      }

      for (
        let routeIteration = 0;
        routeIteration < milkCollectionDetails.length;
        routeIteration++
      ) {
        if (
          orgArr[iteration] ===
          milkCollectionDetails[routeIteration].OrganizationUnitId.Id
        ) {
          const item = {
            id: milkCollectionDetails[routeIteration].OrganizationUnitId.Id,
            name: milkCollectionDetails[routeIteration].OrganizationUnitId.Name,
            // headload: milkCollectionDetails[routeIteration].OrganizationUnitId.HeadLoad,
            headload: headload,
            commision:
              milkCollectionDetails[routeIteration].OrganizationUnitId
                .Commission,
            // routeId: milkCollectionDetails[routeIteration].RouteId.Id,
            routeId: routeId,
            // routeName: milkCollectionDetails[routeIteration].RouteId.RouteName,
            routeName: routeName,
            collectionDetails: [],
          };
          if (
            !route.some((ele) => {
              return ele.id === item.id && ele.routeId === item.routeId;
            })
          ) {
            route.push(item);
          }
        }
      }
      org.push({ org: orgArr[iteration], route });
    }

    for (let orgIteration = 0; orgIteration < org.length; orgIteration++) {
      for (
        let routeIteration = 0;
        routeIteration < org[orgIteration].route.length;
        routeIteration++
      ) {
        resultArray.forEach((milkDetail) => {
          const item = {
            id: milkDetail.OrganizationUnitId.Id,
            routeId: milkDetail.RouteId.Id,
          };
          if (
            org[orgIteration].route[routeIteration].id === item.id &&
            org[orgIteration].route[routeIteration].routeId === item.routeId
          ) {
            org[orgIteration].route[routeIteration].collectionDetails.push(
              milkDetail
            );
          }
        });
      }
    }

    const data: BillResponseModel[] = [];
    for (let orgIteration = 0; orgIteration < org.length; orgIteration++) {
      for (
        let routeIteration = 0;
        routeIteration < org[orgIteration].route.length;
        routeIteration++
      ) {
        let item: BillResponseModel;
        let groupItem = org[orgIteration].route[routeIteration];
        let settlementAmount: number = 0;

        if (new Date(startDate) >= new Date("2024-08-01")) {
          complaints.forEach((complaint) => {
            if (complaint.AgentId.Id === groupItem.id) {
              settlementAmount += complaint.SettlementAmount;
            }
          });
        } else {
          complaints.forEach((complaint) => {
            if (complaint.AgentId.Id === groupItem.id) {
              settlementAmount = 0;
            }
          });
        }
        console.log("settlementAmount: ", settlementAmount);

        // Check if any collectionDetails have Snf > 9.0
        const hasHighSnf = groupItem["collectionDetails"].some(
          (detail: any) => detail.Snf > 9.0
        );

        // Only process and push the organization if Snf > 9.0 condition is met
        if (hasHighSnf) {
          item = {
            organization: {
              id: groupItem.id,
              name: groupItem.name,
              headload: groupItem.headload,
              commision: groupItem.commision,
              routeId: groupItem.routeId,
              routeName: groupItem.routeName,
            },
            settlementAmount: settlementAmount ?? 0,

            collectionDetails: groupItem["collectionDetails"].map(
              (detail: any) => {
                return {
                  Id: detail.Id,
                  MilkType: detail.MilkType,
                  CollectionOperationType: detail.CollectionOperationType,
                  TestingOperationType: detail.TestingOperationType,
                  Fat: detail.Fat,
                  KGFat:
                    (detail.Weight.toFixed(1) / 100) * detail.Fat.toFixed(1),
                  Snf: detail.Snf,
                  KGSnf:
                    (detail.Weight.toFixed(1) / 100) * detail.Snf.toFixed(1),
                  Clr: detail.Clr,
                  Weight: detail.Weight,
                  CanCount: detail.CanCount,
                  CollectedAt: detail.CollectedAt,
                  TestedAt: detail.TestedAt,
                  IsActive: detail.IsActive,
                  CreatedAt: detail.CreatedAt,
                  ModifiedAt: detail.ModifiedAt,
                  DeletedAt: detail.DeletedAt,
                  organizationId: detail.OrganizationUnitId.Id,
                  organizationName: detail.OrganizationUnitId.Name,
                  shift: detail.MilkCollectionId.Shift,
                  value: Number(
                    calculateValue(
                      parseFloat(detail.Fat.toFixed(1)),
                      parseFloat(
                        (new Date(startDate) >= new Date("2024-07-21") &&
                        detail.Snf > 9.0
                          ? 9.0
                          : detail.Snf
                        ).toFixed(1)
                      ),
                      rateMaster
                    ) * parseFloat(detail.Weight.toFixed(1))
                  ),
                };
              }
            ),
          };

          // Push the item to the data array
          // if (item.organization.id == 1000442) {
          //   console.log(item.collectionDetails);
          // }
          data.push(item);
        }
      }
    }
    // console.log(data);
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

async function GetBankLetterAmount(
  req: Request,
  model: GetBankLetterAmountModel
): Promise<ServiceResponse<any>> {
  try {
    // console.log(model)
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const startDate = model.startDate;
    const endDate = model.endDate;

    const cycle = await AppDataSource.getRepository(entities.BillingCycleMaster)
      .createQueryBuilder("cycle")
      .where("cycle.StartDate = :startDate", { startDate })
      .andWhere("cycle.EndDate = :endDate", { endDate })
      .getOne();

    if (!cycle) {
      return {
        status: 400,
        message: "Billing cycle not found for the provided dates.",
        data: null,
      };
    }
    const isFrozen = cycle.IsFrozen;

    const milkCollections = await AppDataSource.getRepository(
      entities.MilkCollections
    )
      .createQueryBuilder("milkCollections")
      .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
        startDate,
      })
      .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
        endDate,
      })
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

    const collectionDetails = await AppDataSource.getRepository(
      entities.MilkCollectionDetails
    )
      .createQueryBuilder("milkCollectionDetails")
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .andWhere("milkCollectionDetails.Fat IS NOT NULL")
      .andWhere("milkCollectionDetails.Snf IS NOT NULL")
      .andWhere("milkCollectionDetails.Clr IS NOT NULL")
      .getMany();

    if (collectionDetails.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    const rateMaster = await AppDataSource.getRepository(entities.RateMaster)
      .createQueryBuilder("ratemaster")
      .where("ratemaster.Wef < :currDate", { currDate: new Date() })
      .andWhere("ratemaster.IsActive =:isActive", { isActive: true })
      .orderBy("ratemaster.SeqNo", "ASC")
      .getMany();
    if (rateMaster.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    const productsSoldToAgent = await AppDataSource.getRepository(
      entities.ProductSalesToAgent
    )
      .createQueryBuilder("productSalesToAgent")
      .leftJoinAndSelect("productSalesToAgent.SoldToAgent", "agent")
      .leftJoinAndSelect("agent.ParentId", "parent")
      .where("DATE(productSalesToAgent.CreatedAt) >= :startDate", {
        startDate: model.startDate,
      })
      .andWhere("parent.Id =:parentId", { parentId: model.bmcId })
      .andWhere("DATE(productSalesToAgent.CreatedAt) <= :endDate", {
        endDate: model.endDate,
      })
      .getMany();

    const complaints = await AppDataSource.getRepository(entities.Complaints)
      .createQueryBuilder("complaints")
      .leftJoinAndSelect("complaints.AgentId", "agent")
      .where("agent.ParentId =:bmcId", { bmcId: model.bmcId })
      .andWhere("DATE(complaints.TobeSettledStartDate) =:startDate", {
        startDate: model.startDate,
      })
      .andWhere("DATE(complaints.TobeSettledEndDate) =:endDate", {
        endDate: model.endDate,
      })
      .getMany();

    const milkCollectionDetails = aggregateData(collectionDetails);

    let totalAmount: any = 0;
    let deduction: any = 0;
    let earning: any = 0;
    let settlementAmount = 0;
    if (productsSoldToAgent.length) {
      for (let i = 0; i < productsSoldToAgent.length; i++) {
        deduction += productsSoldToAgent[i].Balance;
      }
    }

    for (let i = 0; i < milkCollectionDetails.length; i++) {
      const detail = milkCollectionDetails[i];

      let headload = 0;
      const organizationId = detail.OrganizationUnitId.Id;

      complaints.forEach((complaint) => {
        if (complaint.AgentId.Id === detail.OrganizationUnitId.Id) {
          settlementAmount = complaint.SettlementAmount;
        }
      });

      if (isFrozen) {
        // Fetch headload from headload history
        const headloadHistory = await AppDataSource.getRepository(
          entities.HeadloadHistory
        )
          .createQueryBuilder("history")
          .where("history.Agent_id = :organizationId", { organizationId })
          .andWhere("history.BillingCycle = :cycleId", { cycleId: cycle.Id })
          .getOne();
        headload = headloadHistory?.HeadLoad || 0;
      } else {
        // Fetch headload from organization
        const organization = await AppDataSource.getRepository(
          entities.Organization
        )
          .createQueryBuilder("organization")
          .where("organization.Id = :organizationId", { organizationId })
          .getOne();
        headload = organization?.HeadLoad || 0;
      }

      earning +=
        parseInt(
          (
            (((parseFloat(detail.Weight.toFixed(1)) / 100) *
              parseFloat(detail.Fat.toFixed(1)) +
              (parseFloat(detail.Weight.toFixed(1)) / 100) *
                parseFloat(detail.Snf.toFixed(1))) /
              12) *
            100 *
            detail.OrganizationUnitId.Commission
          ).toFixed(1)
        ) +
        parseInt(
          (
            (((parseFloat(detail.Weight.toFixed(1)) / 100) *
              parseFloat(detail.Fat.toFixed(1)) +
              (parseFloat(detail.Weight.toFixed(1)) / 100) *
                parseFloat(detail.Fat.toFixed(1))) /
              12) *
            100 *
            detail.OrganizationUnitId.HeadLoad
          )
            // headload
            .toFixed(1)
        );

      totalAmount += Number(
        calculateValue(
          parseFloat(detail.Fat.toFixed(1)), // Convert Fat to a number
          parseFloat(
            (new Date(startDate) >= new Date("2024-07-21") && detail.Snf > 9.0
              ? 9.0
              : detail.Snf
            ).toFixed(1)
          ), // Ensure SNF is a number
          rateMaster
        ) * parseFloat(detail.Weight.toFixed(1)) // Convert Weight to a number
      );
    }

    const data = totalAmount + earning - deduction + settlementAmount;
    console.log("total earning : ", earning);
    console.log("total duduction : ", deduction);
    console.log("total amount : ", totalAmount);
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

//with freeze and headload changes
async function GetBankAdvice(
  req: Request,
  model: GetBankAdviceModel
): Promise<ServiceResponse<BankAdviceModel[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const startDate = model.startDate;
    const endDate = model.endDate;
    const bmcId = model.bmcId;

    // Fetch cycle details based on startDate and endDate
    const cycle = await AppDataSource.getRepository(entities.BillingCycleMaster)
      .createQueryBuilder("cycle")
      .where("cycle.StartDate = :startDate", { startDate })
      .andWhere("cycle.EndDate = :endDate", { endDate })
      .getOne();

    if (!cycle) {
      return {
        status: 400,
        message: "Billing cycle not found for the provided dates.",
        data: null,
      };
    }

    const isFrozen = cycle.IsFrozen;

    const milkCollections = await AppDataSource.getRepository(
      entities.MilkCollections
    )
      .createQueryBuilder("milkCollections")
      .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
        startDate,
      })
      .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
        endDate,
      })
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

    const bmc = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("organization")
      .innerJoinAndSelect("organization.OrganizationType", "organizationType")
      .where("organization.Id =:id", { id: bmcId })
      .andWhere("organization.IsActive =:cond", { cond: true })
      .andWhere("organizationType.Id =:bmcid", { bmcid: 4 })
      .getOne();

    if (!bmc) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }
    const collectionDetails = await AppDataSource.getRepository(
      entities.MilkCollectionDetails
    )
      .createQueryBuilder("milkCollectionDetails")
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .andWhere("milkCollectionDetails.Fat IS NOT NULL")
      .andWhere("milkCollectionDetails.Snf IS NOT NULL")
      .andWhere("milkCollectionDetails.Clr IS NOT NULL")
      .andWhere("organizationParent.Id =:bmcid", { bmcid: bmc.Id })
      .orderBy("milkCollectionDetails.RouteId")
      .getMany();

    const rateMaster = await AppDataSource.getRepository(entities.RateMaster)
      .createQueryBuilder("ratemaster")
      .where("ratemaster.Wef < :currDate", { currDate: new Date() })
      .orderBy("ratemaster.SeqNo", "ASC")
      .getMany();
    if (rateMaster.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    const productsSoldToAgent = await AppDataSource.getRepository(
      entities.ProductSalesToAgent
    )
      .createQueryBuilder("productSalesToAgent")
      .leftJoinAndSelect("productSalesToAgent.SoldToAgent", "agent")
      .leftJoinAndSelect("agent.ParentId", "parent")
      .where("DATE(productSalesToAgent.CreatedAt) >= :startDate", {
        startDate: model.startDate,
      })
      .andWhere("DATE(productSalesToAgent.CreatedAt) <= :endDate", {
        endDate: model.endDate,
      })
      .getMany();

    // const productsSoldToAgent = await AppDataSource.getRepository(
    //   entities.ProductSalesToAgent
    // )
    //   .createQueryBuilder("productSalesToAgent")
    //   .leftJoinAndSelect("productSalesToAgent.SoldToAgent", "agent")
    //   .leftJoinAndSelect("agent.ParentId", "parent")
    //   .where("DATE(productSalesToAgent.TobeSettledStartDate) >= :startDate", {
    //     startDate: model.startDate,
    //   })
    //   .andWhere("DATE(productSalesToAgent.TobeSettledEndDate) <= :endDate", {
    //     endDate: model.endDate,
    //   })
    //   .getMany();

    const complaints = await AppDataSource.getRepository(entities.Complaints)
      .createQueryBuilder("complaints")
      .leftJoinAndSelect("complaints.AgentId", "agent")
      .where("agent.ParentId =:bmcId", { bmcId: bmcId })
      .andWhere("DATE(complaints.TobeSettledStartDate) =:startDate", {
        startDate: model.startDate,
      })
      .andWhere("DATE(complaints.TobeSettledEndDate) =:endDate", {
        endDate: model.endDate,
      })
      .getMany();

    // console.log(complaints);
    const aggregatedData: Record<
      string,
      {
        MilkType: string;
        Fat: number;
        Snf: number;
        Clr: number;
        Weight: number;
        CollectedAt: Date;
        OrganizationUnitId: entities.Organization;
        MilkCollectionId: entities.MilkCollections;
        RouteId: entities.RouteMaster;
        KGFat: number;
        KGSnf: number;
        count: number;
      }
    > = {};

    collectionDetails.forEach((item: entities.MilkCollectionDetails) => {
      const key = `${moment(item.MilkCollectionId.CollectionDateTime).format(
        "DD-MM-YYYY"
      )}-${item.MilkType}-${item.OrganizationUnitId.Id}-${
        item.MilkCollectionId.Shift
      }`;
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          MilkType: item.MilkType,
          Fat: item.Fat,
          Snf: item.Snf,
          Clr: item.Clr,
          Weight: item.Weight,
          CollectedAt: item.MilkCollectionId.CollectionDateTime,
          OrganizationUnitId: item.OrganizationUnitId,
          MilkCollectionId: item.MilkCollectionId,
          RouteId: item.RouteId,
          KGFat: (item.Weight / 100) * item.Fat,
          KGSnf: (item.Weight / 100) * item.Snf,
          count: 1,
        };
      } else {
        aggregatedData[key].Weight += item.Weight;
        aggregatedData[key].Fat += item.Fat;
        aggregatedData[key].Snf += item.Snf;
        aggregatedData[key].Clr += item.Clr;
        aggregatedData[key].KGFat += (item.Weight / 100) * item.Fat;
        aggregatedData[key].KGSnf += (item.Weight / 100) * item.Snf;
        aggregatedData[key].count++;
      }
    });

    const milkCollectionDetails = Object.values(aggregatedData).map((item) => {
      const resultItem = {
        ...item,
      };

      if (item.count === 1) {
        resultItem.Fat = item.Fat;
        resultItem.Snf = item.Snf;
        resultItem.Clr = item.Clr;
      } else {
        resultItem.Fat = (item.KGFat / item.Weight) * 100;
        resultItem.Snf = (item.KGSnf / item.Weight) * 100;
        // console.log(item.KGFat.toFixed(2), " ", item.KGSnf, " ", "details : ", item.Weight, "  ", parseFloat(((item.KGFat / item.Weight) * 100).toFixed(1)), "   ", (item.KGSnf / item.Weight) * 100)
        resultItem.Clr = item.Clr / item.count;
      }

      return resultItem;
    });

    if (milkCollectionDetails.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }
    let orgArr: any[] = [];

    for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
      if (!orgArr.includes(milkCollectionDetails[iter].OrganizationUnitId.Id)) {
        orgArr.push(milkCollectionDetails[iter].OrganizationUnitId.Id);
      }
    }

    const org: any = [];
    for (let iteration = 0; iteration < orgArr.length; iteration++) {
      let headload = 0;
      let accNumber = "";
      let accHolderName = "";
      let routeId = 0;
      let routeName = "";
      const route: any[] = [];
      const organizationId = orgArr[iteration];
      // Fetch the headload for the current organizationId

      // console.log("organizationId ",organizationId);

      if (isFrozen) {
        console.log("Headload taken from headloadhistory");
        const headloadHistory = await AppDataSource.getRepository(
          entities.HeadloadHistory
        )
          .createQueryBuilder("history")
          .where("history.Agent_id = :organizationId", { organizationId })
          .andWhere("history.BillingCycle = :cycleId", { cycleId: cycle.Id })
          .getOne();
        // console.log("headloadhistory data:", headloadHistory);
        headload = headloadHistory?.HeadLoad || 0;
        accNumber = headloadHistory?.AccountNumber || "";
        accHolderName = headloadHistory?.AccHolderName || "";
        routeId = headloadHistory?.RouteId || 0;
        routeName = headloadHistory?.RouteName || "";
      } else {
        console.log("Headload taken from org");
        const organization = await AppDataSource.getRepository(
          entities.Organization
        )
          .createQueryBuilder("organization")
          .select([
            "organization.Id AS Id",
            "organization.HeadLoad AS HeadLoad",
            "organization.AccountNumber AS AccountNumber",
            "organization.AccHolderName AS AccHolderName",
            "routeMaster.RouteName AS RouteName",
            "routeMaster.Id AS RouteId",
          ])
          .leftJoin(
            "RouteStops",
            "routeStops",
            "routeStops.StopId = organization.Id"
          )
          .leftJoin("routeStops.RouteId", "routeMaster")
          .where("organization.Id = :organizationId", { organizationId })
          .getRawOne();

        headload = organization?.HeadLoad || 0;
        accNumber = organization?.AccountNumber || "";
        accHolderName = organization?.AccHolderName || "";
        routeId = organization?.RouteId || 0;
        routeName = organization?.RouteName || "";
        // console.log("headload: ", headload);
      }

      for (
        let routeIteration = 0;
        routeIteration < milkCollectionDetails.length;
        routeIteration++
      ) {
        if (
          orgArr[iteration] ===
          milkCollectionDetails[routeIteration].OrganizationUnitId.Id
        ) {
          const item = {
            id: milkCollectionDetails[routeIteration]?.OrganizationUnitId.Id,
            name: milkCollectionDetails[routeIteration]?.OrganizationUnitId
              .Name,
            // headload: milkCollectionDetails[routeIteration]?.OrganizationUnitId.HeadLoad,
            headload: headload,
            commision:
              milkCollectionDetails[routeIteration]?.OrganizationUnitId
                .Commission,
            // routeId: milkCollectionDetails[routeIteration]?.RouteId.Id,
            routeId: routeId,
            // accountNumber: milkCollectionDetails[routeIteration]?.OrganizationUnitId.AccountNumber,
            accountNumber: accNumber,
            // routeName: milkCollectionDetails[routeIteration]?.RouteId.RouteName,
            routeName: routeName,
            ifscCode:
              milkCollectionDetails[routeIteration]?.OrganizationUnitId
                .IfscCode,
            // accHolderName: milkCollectionDetails[routeIteration]?.OrganizationUnitId.AccHolderName,
            accHolderName: accHolderName,
            collectionDetails: [],
          };
          if (
            !route.some((ele) => {
              return ele.id === item.id && ele.routeId === item.routeId;
            })
          ) {
            route.push(item);
          }
        }
      }
      org.push({ org: orgArr[iteration], route });
    }

    for (let orgIteration = 0; orgIteration < org.length; orgIteration++) {
      for (
        let routeIteration = 0;
        routeIteration < org[orgIteration].route.length;
        routeIteration++
      ) {
        milkCollectionDetails.forEach((milkDetail) => {
          const item = {
            id: milkDetail.OrganizationUnitId.Id,
            routeId: milkDetail.RouteId.Id,
          };
          if (
            org[orgIteration].route[routeIteration]?.id === item.id &&
            org[orgIteration].route[routeIteration]?.routeId === item.routeId
          ) {
            org[orgIteration].route[routeIteration]?.collectionDetails.push(
              milkDetail
            );
          }
        });
      }
    }
    const data: BankAdviceModel[] = [];

    for (let orgIteration = 0; orgIteration < org.length; orgIteration++) {
      let deduction = 0;
      let earning = 0;
      let settlementAmount = 0;
      if (productsSoldToAgent.length) {
        for (let i = 0; i < productsSoldToAgent.length; i++) {
          if (productsSoldToAgent[i].SoldToAgent?.Id == org[orgIteration].org) {
            deduction += productsSoldToAgent[i].Balance;
          }
        }
        // if(org[orgIteration].org==1000760){
        //   console.log("deduction: ",deduction);
        // }
      }
      complaints.forEach((complaint) => {
        if (complaint.AgentId.Id === org[orgIteration].org) {
          settlementAmount = complaint.SettlementAmount;
        }
      });
      for (
        let routeIteration = 0;
        routeIteration < org[orgIteration].route.length;
        routeIteration++
      ) {
        let totalAmount = 0;
        let kgFat = 0;
        let kgSnf = 0;
        const details =
          org[orgIteration].route[routeIteration].collectionDetails;
        details.forEach((detail: any) => {
          kgFat += (detail.Weight.toFixed(1) / 100) * detail.Fat.toFixed(1);
          kgSnf += (detail.Weight.toFixed(1) / 100) * detail.Snf.toFixed(1);
          totalAmount += Number(
            calculateValue(
              detail.Fat.toFixed(1),
              (new Date(startDate) >= new Date("2024-07-21") && detail.Snf > 9.0
                ? 9.0
                : detail.Snf
              ).toFixed(1),
              rateMaster
            ) * detail.Weight.toFixed(1)
          );
        });
        earning =
          parseInt(
            (
              ((kgFat + kgSnf) / 12) *
              100 *
              org[orgIteration].route[routeIteration]?.headload
            ).toFixed(2)
          ) +
          parseInt(
            (
              ((kgFat + kgSnf) / 12) *
              100 *
              org[orgIteration].route[routeIteration]?.commision
            ).toFixed(2)
          );
        // console.log("total amount : ", totalAmount);
        totalAmount = totalAmount - deduction + earning + settlementAmount;
        // console.log("earning : ", earning);
        // console.log("deduction : ", deduction);
        // console.log("settlement amount", settlementAmount);
        const item: BankAdviceModel = {
          organization: {
            id: org[orgIteration].route[routeIteration].id,
            name: org[orgIteration].route[routeIteration].name,
            accHolderName:
              org[orgIteration].route[routeIteration]?.accHolderName,
            ifscCode: org[orgIteration].route[routeIteration]?.ifscCode,
            accNumber: org[orgIteration].route[routeIteration]?.accountNumber,
            routeName: org[orgIteration].route[routeIteration].routeName,
          },
          amount: totalAmount,
        };
        data.push(item);
      }
    }
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

//original
// `async function GetBankAdvice(
//   req: Request,
//   model: GetBankAdviceModel
// ): Promise<ServiceResponse<BankAdviceModel[]>> {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     const key = process.env.TOKEN_SECRET;
//     const decode = jwt.verify(token, key);
//     const userId = decode.userId;

//     const startDate = model.startDate;
//     const endDate = model.endDate;
//     const bmcId = model.bmcId;
//     const milkCollections = await AppDataSource.getRepository(
//       entities.MilkCollections
//     )
//       .createQueryBuilder("milkCollections")
//       .where("DATE(milkCollections.CollectionDateTime) >= :startDate", { startDate })
//       .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", { endDate })
//       .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
//       .getMany();

//     const milkCollectionIds = milkCollections.map((milk) => milk.Id);

//     if (milkCollectionIds.length === 0) {
//       return {
//         status: 200,
//         message: ERROR_MESSAGES.NO_DATA,
//         data: null,
//       };
//     }

//     const bmc = await AppDataSource.getRepository(entities.Organization)
//       .createQueryBuilder("organization")
//       .innerJoinAndSelect("organization.OrganizationType", "organizationType")
//       .where("organization.Id =:id", { id: bmcId })
//       .andWhere("organization.IsActive =:cond", { cond: true })
//       .andWhere("organizationType.Id =:bmcid", { bmcid: 4 })
//       .getOne();

//     if (!bmc) {
//       return {
//         status: 200,
//         message: ERROR_MESSAGES.NO_DATA,
//         data: null,
//       };
//     }
//     const collectionDetails = await AppDataSource.getRepository(
//       entities.MilkCollectionDetails
//     )
//       .createQueryBuilder("milkCollectionDetails")
//       .leftJoinAndSelect("milkCollectionDetails.OrganizationUnitId", "organization")
//       .leftJoinAndSelect("organization.ParentId", "organizationParent")
//       .leftJoinAndSelect("organization.OrganizationType", "organizationType")
//       .leftJoinAndSelect("milkCollectionDetails.MilkCollectionId", "collections")
//       .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
//       .leftJoinAndSelect("route.RouteOwner", "routeOwner")
//       .where("milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)", { milkCollectionIds })
//       .andWhere("milkCollectionDetails.IsActive = :isActive", { isActive: true })
//       .andWhere("organizationType.Id = :id", { id: 5 })
//       .andWhere("milkCollectionDetails.Fat IS NOT NULL")
//       .andWhere("milkCollectionDetails.Snf IS NOT NULL")
//       .andWhere("milkCollectionDetails.Clr IS NOT NULL")
//       .andWhere("organizationParent.Id =:bmcid", { bmcid: bmc.Id })
//       .orderBy("milkCollectionDetails.RouteId")
//       .getMany();

//     const rateMaster = await AppDataSource.getRepository(entities.RateMaster)
//       .createQueryBuilder("ratemaster")
//       .where("ratemaster.Wef < :currDate", { currDate: new Date() })
//       .orderBy("ratemaster.SeqNo", "ASC")
//       .getMany();
//     if (rateMaster.length === 0) {
//       return {
//         status: 200,
//         message: ERROR_MESSAGES.NO_DATA,
//         data: null,
//       };
//     }

//     const productsSoldToAgent = await AppDataSource.getRepository(entities.ProductSalesToAgent)
//       .createQueryBuilder("productSalesToAgent")
//       .leftJoinAndSelect("productSalesToAgent.SoldToAgent", "agent")
//       .leftJoinAndSelect("agent.ParentId", "parent")
//       .where("DATE(productSalesToAgent.CreatedAt) >= :startDate", { startDate: model.startDate })
//       .andWhere("DATE(productSalesToAgent.CreatedAt) <= :endDate", { endDate: model.endDate })
//       .getMany();

//     const complaints = await AppDataSource.getRepository(entities.Complaints)
//       .createQueryBuilder("complaints")
//       .leftJoinAndSelect("complaints.AgentId", "agent")
//       .where("agent.ParentId =:bmcId", { bmcId: bmcId })
//       .andWhere("DATE(complaints.TobeSettledStartDate) =:startDate", { startDate: model.startDate })
//       .andWhere("DATE(complaints.TobeSettledEndDate) =:endDate", { endDate: model.endDate })
//       .getMany();

//     console.log(complaints)
//     const aggregatedData: Record<string, {
//       MilkType: string;
//       Fat: number;
//       Snf: number;
//       Clr: number;
//       Weight: number;
//       CollectedAt: Date;
//       OrganizationUnitId: entities.Organization;
//       MilkCollectionId: entities.MilkCollections;
//       RouteId: entities.RouteMaster;
//       KGFat: number;
//       KGSnf: number;
//       count: number;
//     }> = {};

//     collectionDetails.forEach((item: entities.MilkCollectionDetails) => {
//       const key = `${moment(item.MilkCollectionId.CollectionDateTime).format("DD-MM-YYYY")}-${item.MilkType}-${item.OrganizationUnitId.Id}-${item.MilkCollectionId.Shift}`;
//       if (!aggregatedData[key]) {
//         aggregatedData[key] = {
//           MilkType: item.MilkType,
//           Fat: item.Fat,
//           Snf: item.Snf,
//           Clr: item.Clr,
//           Weight: item.Weight,
//           CollectedAt: item.MilkCollectionId.CollectionDateTime,
//           OrganizationUnitId: item.OrganizationUnitId,
//           MilkCollectionId: item.MilkCollectionId,
//           RouteId: item.RouteId,
//           KGFat: (item.Weight / 100) * item.Fat,
//           KGSnf: (item.Weight / 100) * item.Snf,
//           count: 1,
//         };
//       } else {
//         aggregatedData[key].Weight += item.Weight;
//         aggregatedData[key].Fat += item.Fat;
//         aggregatedData[key].Snf += item.Snf;
//         aggregatedData[key].Clr += item.Clr;
//         aggregatedData[key].KGFat += (item.Weight / 100) * item.Fat;
//         aggregatedData[key].KGSnf += (item.Weight / 100) * item.Snf;
//         aggregatedData[key].count++;
//       }
//     });

//     const milkCollectionDetails = Object.values(aggregatedData).map(item => {
//       const resultItem = {
//         ...item,
//       };

//       if (item.count === 1) {
//         resultItem.Fat = item.Fat;
//         resultItem.Snf = item.Snf;
//         resultItem.Clr = item.Clr;
//       } else {
//         resultItem.Fat = (item.KGFat / item.Weight) * 100;
//         resultItem.Snf = (item.KGSnf / item.Weight) * 100;
//         // console.log(item.KGFat.toFixed(2), " ", item.KGSnf, " ", "details : ", item.Weight, "  ", parseFloat(((item.KGFat / item.Weight) * 100).toFixed(1)), "   ", (item.KGSnf / item.Weight) * 100)
//         resultItem.Clr = item.Clr / item.count;
//       }

//       return resultItem;
//     });

//     if (milkCollectionDetails.length === 0) {
//       return {
//         status: 200,
//         message: ERROR_MESSAGES.NO_DATA,
//         data: null,
//       };
//     }
//     let orgArr: any[] = [];

//     for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
//       if (!orgArr.includes(milkCollectionDetails[iter].OrganizationUnitId.Id)) {
//         orgArr.push(milkCollectionDetails[iter].OrganizationUnitId.Id);
//       }
//     }

//     const org: any = [];
//     for (let iteration = 0; iteration < orgArr.length; iteration++) {
//       const route: any[] = [];
//       for (
//         let routeIteration = 0;
//         routeIteration < milkCollectionDetails.length;
//         routeIteration++
//       ) {
//         if (
//           orgArr[iteration] ===
//           milkCollectionDetails[routeIteration].OrganizationUnitId.Id
//         ) {
//           const item = {
//             id: milkCollectionDetails[routeIteration]?.OrganizationUnitId.Id,
//             name: milkCollectionDetails[routeIteration]?.OrganizationUnitId.Name,
//             headload:
//               milkCollectionDetails[routeIteration]?.OrganizationUnitId.HeadLoad,
//             commision:
//               milkCollectionDetails[routeIteration]?.OrganizationUnitId
//                 .Commission,
//             routeId: milkCollectionDetails[routeIteration]?.RouteId.Id,
//             accountNumber: milkCollectionDetails[routeIteration]?.OrganizationUnitId.AccountNumber,
//             routeName: milkCollectionDetails[routeIteration]?.RouteId.RouteName,
//             ifscCode: milkCollectionDetails[routeIteration]?.OrganizationUnitId.IfscCode,
//             accHolderName: milkCollectionDetails[routeIteration]?.OrganizationUnitId.AccHolderName,
//             collectionDetails: [],
//           };
//           if (
//             !route.some((ele) => {
//               return ele.id === item.id && ele.routeId === item.routeId;
//             })
//           ) {
//             route.push(item);
//           }
//         }
//       }
//       org.push({ org: orgArr[iteration], route });
//     }

//     for (let orgIteration = 0; orgIteration < org.length; orgIteration++) {
//       for (
//         let routeIteration = 0;
//         routeIteration < org[orgIteration].route.length;
//         routeIteration++
//       ) {
//         milkCollectionDetails.forEach((milkDetail) => {
//           const item = {
//             id: milkDetail.OrganizationUnitId.Id,
//             routeId: milkDetail.RouteId.Id,
//           };
//           if (
//             org[orgIteration].route[routeIteration]?.id === item.id &&
//             org[orgIteration].route[routeIteration]?.routeId === item.routeId
//           ) {
//             org[orgIteration].route[routeIteration]?.collectionDetails.push(
//               milkDetail
//             );
//           }
//         });
//       }
//     }
//     const data: BankAdviceModel[] = [];

//     for (let orgIteration = 0; orgIteration < org.length; orgIteration++) {
//       let deduction = 0;
//       let earning = 0;
//       let settlementAmount = 0;
//       if (productsSoldToAgent.length) {
//         for (let i = 0; i < productsSoldToAgent.length; i++) {
//           if (productsSoldToAgent[i].SoldToAgent?.Id == org[orgIteration].org) {
//             deduction += productsSoldToAgent[i].Balance
//           }
//         }
//       }
//       complaints.forEach((complaint) => {
//         if (complaint.AgentId.Id === org[orgIteration].org) {
//           settlementAmount = complaint.SettlementAmount;
//         }
//       })
//       for (
//         let routeIteration = 0;
//         routeIteration < org[orgIteration].route.length;
//         routeIteration++
//       ) {
//         let totalAmount = 0;
//         let kgFat = 0;
//         let kgSnf = 0;
//         const details = org[orgIteration].route[routeIteration].collectionDetails;
//         details.forEach((detail: any) => {
//           kgFat += (detail.Weight.toFixed(1) / 100) * detail.Fat.toFixed(1);
//           kgSnf += (detail.Weight.toFixed(1) / 100) * detail.Snf.toFixed(1)
//           totalAmount += Number(calculateValue(detail.Fat.toFixed(1), (new Date(startDate) >= new Date('2024-07-21') && detail.Snf > 9.0 ? 9.0 : detail.Snf).toFixed(1), rateMaster) * detail.Weight.toFixed(1));
//         });
//         earning = parseInt(((((kgFat + kgSnf) / 12) * 100) * org[orgIteration].route[routeIteration].headload).toFixed(2)) + parseInt(((((kgFat + kgSnf) / 12) * 100) * org[orgIteration].route[routeIteration]?.commision).toFixed(2));
//         // console.log('total amount : ', totalAmount);
//         totalAmount = (totalAmount - deduction) + earning + settlementAmount;
//         // console.log('earning : ', earning);
//         // console.log('deduction : ', deduction);
//         // console.log('settlement amount', settlementAmount);
//         const item: BankAdviceModel = {
//           organization: {
//             id: org[orgIteration].route[routeIteration].id,
//             name: org[orgIteration].route[routeIteration].name,
//             accHolderName: org[orgIteration].route[routeIteration]?.accHolderName,
//             ifscCode: org[orgIteration].route[routeIteration]?.ifscCode,
//             accNumber: org[orgIteration].route[routeIteration]?.accountNumber,
//             routeName: org[orgIteration].route[routeIteration].routeName,
//           },
//           amount: totalAmount
//         };

//         data.push(item);
//       }
//     }
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
// }`

async function CreateCycleMaster(
  req: Request,
  model: CreateCycleMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.BillingCycleMaster);

    const financial = await AppDataSource.getRepository(entities.FinancialYear)
      .createQueryBuilder("financial")
      .where("financial.Id = :id", { id: model.financialYearId })
      .getOne();
    const cycleMaster = new entities.BillingCycleMaster();
    if (financial) {
      cycleMaster.FinancialYearId = financial;
    }
    cycleMaster.CycleNo = model.cycleNo ?? cycleMaster.CycleNo;
    cycleMaster.StartDate = model.startDate ?? cycleMaster.StartDate;
    cycleMaster.EndDate = model.endDate ?? cycleMaster.EndDate;
    cycleMaster.CreatedAt = new Date();
    cycleMaster.CreatedBy = userId;
    await repository.save(cycleMaster);
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

async function UpdateCycleMaster(
  req: Request,
  model: UpdateCycleMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.BillingCycleMaster);
    const cycleMaster = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    const financial = await AppDataSource.getRepository(entities.FinancialYear)
      .createQueryBuilder("financial")
      .where("financial.Id = :id", { id: model.financialYearId })
      .getOne();
    if (cycleMaster) {
      if (financial) {
        cycleMaster.FinancialYearId = financial;
      }
      cycleMaster.CycleNo = model.cycleNo ?? cycleMaster.CycleNo;
      cycleMaster.StartDate = model.startDate ?? cycleMaster.StartDate;
      cycleMaster.EndDate = model.endDate ?? cycleMaster.EndDate;
      cycleMaster.ModifiedAt = new Date();
      cycleMaster.ModifiedBy = userId;
      await repository.save(cycleMaster);

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

async function DeleteCycleMaster(
  req: Request,
  model: DeleteCycleMasterModel
): Promise<ServiceResponse<APIResponse[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.BillingCycleMaster);
    const cycleMaster = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });
    if (cycleMaster) {
      cycleMaster.IsActive = false;
      cycleMaster.DeletedAt = new Date();
      cycleMaster.DeletedBy = userId;
      await repository.save(cycleMaster);

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

async function DateWiseAgentColletionDetail(
  req: Request,
  model: GetSnfReconcillationModel
): Promise<ServiceResponse<any[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const startDate = model.startDate;
    const endDate = model.endDate;

    const shift = model.shift;

    let milkCollections;
    if (shift === undefined || shift === "both") {
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
          startDate,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
          endDate,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
          startDate,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
          endDate,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .andWhere("milkCollections.Shift = :Shift", { Shift: model.shift })
        .getMany();
    }

    const milkCollectionIds = milkCollections.map((milk) => milk.Id);

    if (milkCollectionIds.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    const bmc = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("organization")
      .innerJoinAndSelect("organization.OrganizationType", "organizationType")
      .where("organization.IsActive =:cond", { cond: true })
      .andWhere("organizationType.Id =:bmcid", { bmcid: 4 })
      .getMany();

    if (!bmc) {
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
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .andWhere("milkCollectionDetails.Fat IS NOT NULL")
      .andWhere("milkCollectionDetails.Snf IS NOT NULL")
      .andWhere("milkCollectionDetails.Clr IS NOT NULL")
      .orderBy("milkCollectionDetails.CollectedAt")
      .getMany();

    let parentOuArr: any[] = [];
    let parent: any[] = [];
    for (let i = 0; i < bmc.length; i++) {
      if (!parentOuArr.includes(bmc[i].Id)) {
        parentOuArr.push(bmc[i].Id);
        parent.push(bmc[i].Name);
      }
    }

    let collectedAtArr: any[] = [];
    let agentArr: any[] = [];
    let agentDetail: any[] = [];
    for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
      if (
        !agentArr.includes(milkCollectionDetails[iter].OrganizationUnitId.Id)
      ) {
        agentArr.push(milkCollectionDetails[iter].OrganizationUnitId.Id);
        agentDetail.push({
          agentId: milkCollectionDetails[iter].OrganizationUnitId.Id,
          agentName: milkCollectionDetails[iter].OrganizationUnitId.Name,
          parentId: milkCollectionDetails[iter].OrganizationUnitId.ParentId?.Id,
        });
      }
      if (
        !collectedAtArr.includes(
          moment(
            milkCollectionDetails[iter].MilkCollectionId.CollectionDateTime
          ).format("YYYY-MM-DD")
        )
      ) {
        collectedAtArr.push(
          moment(
            milkCollectionDetails[iter].MilkCollectionId.CollectionDateTime
          ).format("YYYY-MM-DD")
        );
      }
    }
    let orgArr: any[] = [];
    for (let parentIter = 0; parentIter < parent.length; parentIter++) {
      let milkDetailsArr: any[] = [];
      for (let agentIter = 0; agentIter < agentArr.length; agentIter++) {
        let milkDetailArr: any[] = [];
        for (let i = 0; i < collectedAtArr.length; i++) {
          let morningDetails = {
            totalCowMilkWeight: 0,
            avgCowFat: 0,
            avgCowSnf: 0,
            kgFatCow: 0,
            kgSnfCow: 0,
            totalBuffMilkWeight: 0,
            avgBuffFat: 0,
            avgBuffSnf: 0,
            kgFatBuff: 0,
            kgSnfBuff: 0,
          };
          let eveningDetails = {
            totalCowMilkWeight: 0,
            avgCowFat: 0,
            avgCowSnf: 0,
            kgFatCow: 0,
            kgSnfCow: 0,
            totalBuffMilkWeight: 0,
            avgBuffFat: 0,
            avgBuffSnf: 0,
            kgFatBuff: 0,
            kgSnfBuff: 0,
          };
          let morningCowMilkCounter = 0;
          let morningBuffMilkCounter = 0;
          let eveningCowMilkCounter = 0;
          let eveningBuffMilkCounter = 0;
          for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
            if (
              milkCollectionDetails[iter].OrganizationUnitId.Id ==
                agentArr[agentIter] &&
              moment(
                milkCollectionDetails[iter].MilkCollectionId.CollectionDateTime
              ).format("YYYY-MM-DD") == collectedAtArr[i] &&
              milkCollectionDetails[iter].OrganizationUnitId.ParentId?.Id ==
                parentOuArr[parentIter]
            ) {
              if (
                milkCollectionDetails[iter].MilkCollectionId.Shift == "morning"
              ) {
                if (milkCollectionDetails[iter].Fat < 5.4) {
                  morningDetails.totalCowMilkWeight +=
                    milkCollectionDetails[iter].Weight;
                  morningDetails.avgCowFat += milkCollectionDetails[iter].Fat;
                  morningDetails.avgCowSnf += milkCollectionDetails[iter].Snf;
                  morningDetails.kgFatCow +=
                    (milkCollectionDetails[iter].Weight / 100) *
                    milkCollectionDetails[iter].Fat;
                  morningDetails.kgSnfCow +=
                    (milkCollectionDetails[iter].Weight / 100) *
                    milkCollectionDetails[iter].Snf;
                  morningCowMilkCounter++;
                } else {
                  morningDetails.totalBuffMilkWeight +=
                    milkCollectionDetails[iter].Weight;
                  morningDetails.avgBuffFat += milkCollectionDetails[iter].Fat;
                  morningDetails.avgBuffSnf += milkCollectionDetails[iter].Snf;
                  morningDetails.kgFatBuff +=
                    (milkCollectionDetails[iter].Weight / 100) *
                    milkCollectionDetails[iter].Fat;
                  morningDetails.kgSnfBuff +=
                    (milkCollectionDetails[iter].Weight / 100) *
                    milkCollectionDetails[iter].Snf;
                  morningBuffMilkCounter++;
                }
              }
              if (
                milkCollectionDetails[iter].MilkCollectionId.Shift == "evening"
              ) {
                if (milkCollectionDetails[iter].Fat < 5.4) {
                  eveningDetails.totalCowMilkWeight +=
                    milkCollectionDetails[iter].Weight;
                  eveningDetails.avgCowFat += milkCollectionDetails[iter].Fat;
                  eveningDetails.avgCowSnf += milkCollectionDetails[iter].Snf;
                  eveningDetails.kgFatCow +=
                    (milkCollectionDetails[iter].Weight / 100) *
                    milkCollectionDetails[iter].Fat;
                  eveningDetails.kgSnfCow +=
                    (milkCollectionDetails[iter].Weight / 100) *
                    milkCollectionDetails[iter].Snf;
                  eveningCowMilkCounter++;
                } else {
                  eveningDetails.totalBuffMilkWeight +=
                    milkCollectionDetails[iter].Weight;
                  eveningDetails.avgBuffFat += milkCollectionDetails[iter].Fat;
                  eveningDetails.avgBuffSnf += milkCollectionDetails[iter].Snf;
                  eveningDetails.kgFatBuff +=
                    (milkCollectionDetails[iter].Weight / 100) *
                    milkCollectionDetails[iter].Fat;
                  eveningDetails.kgSnfBuff +=
                    (milkCollectionDetails[iter].Weight / 100) *
                    milkCollectionDetails[iter].Snf;
                  eveningBuffMilkCounter++;
                }
              }
            }
          }
          morningDetails.avgCowFat =
            (morningDetails.kgFatCow / morningDetails.totalCowMilkWeight) * 100;
          morningDetails.avgCowSnf =
            (morningDetails.kgSnfCow / morningDetails.totalCowMilkWeight) * 100;
          morningDetails.avgBuffFat =
            (morningDetails.kgFatBuff / morningDetails.totalBuffMilkWeight) *
            100;
          morningDetails.avgBuffSnf =
            (morningDetails.kgSnfBuff / morningDetails.totalBuffMilkWeight) *
            100;
          eveningDetails.avgCowFat =
            (eveningDetails.kgFatCow / eveningDetails.totalCowMilkWeight) * 100;
          eveningDetails.avgCowSnf =
            (eveningDetails.kgSnfCow / eveningDetails.totalCowMilkWeight) * 100;
          eveningDetails.avgBuffFat =
            (eveningDetails.kgFatBuff / eveningDetails.totalBuffMilkWeight) *
            100;
          eveningDetails.avgBuffSnf =
            (eveningDetails.kgSnfBuff / eveningDetails.totalBuffMilkWeight) *
            100;
          // const collectedAtDate = new Date(collectedAtArr[i]);
          if (
            morningDetails.totalBuffMilkWeight !== 0 ||
            eveningDetails.totalBuffMilkWeight !== 0 ||
            morningDetails.totalCowMilkWeight !== 0 ||
            eveningDetails.totalCowMilkWeight !== 0
          ) {
            milkDetailArr.push(
              {
                collectedAt: collectedAtArr[i],
                morningMilkDetails:
                  morningDetails.totalCowMilkWeight ||
                  morningDetails.totalBuffMilkWeight
                    ? morningDetails
                    : {},
              },
              {
                collectedAt: collectedAtArr[i],
                eveningMilkDetails:
                  eveningDetails.totalCowMilkWeight ||
                  eveningDetails.totalBuffMilkWeight
                    ? eveningDetails
                    : {},
              }
            );
          }
          // milkDetailArr.sort((a, b) => a.collectedAt - b.collectedAt);
        }
        if (parentOuArr[parentIter] === agentDetail[agentIter].parentId) {
          milkDetailsArr.push({
            agentId: agentDetail[agentIter],
            milkDetailArr,
          });
        }
      }
      if (milkDetailsArr.length > 0) {
        orgArr.push({
          pareOuId: parentOuArr[parentIter],
          parentOuName: parent[parentIter],
          details: milkDetailsArr,
        });
      }
    }
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: orgArr,
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

async function GetBmcWiseMilkCollection(
  req: Request,
  model: GetSnfReconcillationModel
): Promise<ServiceResponse<any[]>> {
  try {
    console.log(model);

    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const startDate = model.startDate;
    const endDate = model.endDate;
    const shift = model.shift;

    let milkCollections = await AppDataSource.getRepository(
      entities.MilkCollections
    )
      .createQueryBuilder("milkCollections")
      .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
        startDate,
      })
      .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
        endDate,
      })
      .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
      .getMany();

    //     .andWhere("milkCollections.Shift = :Shift", { Shift: model.shift })

    console.log(shift);

    if (shift === undefined || shift === "both") {
      console.log("in if cond");

      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
          startDate,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
          endDate,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
          startDate,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
          endDate,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .andWhere("milkCollections.Shift = :Shift", { Shift: model.shift })
        .getMany();
    }

    const milkCollectionIds = milkCollections.map((milk) => milk.Id);

    if (milkCollectionIds.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    const bmc = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("organization")
      .innerJoinAndSelect("organization.OrganizationType", "organizationType")
      .andWhere("organization.IsActive =:cond", { cond: true })
      .andWhere("organizationType.Id =:bmcid", { bmcid: 4 })
      .getMany();

    if (!bmc) {
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
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .andWhere("milkCollectionDetails.Fat IS NOT NULL")
      .andWhere("milkCollectionDetails.Snf IS NOT NULL")
      .andWhere("milkCollectionDetails.Clr IS NOT NULL")
      .getMany();

    if (milkCollectionDetails.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    let parentOuArr: any[] = [];
    let parent: any[] = [];
    for (let i = 0; i < bmc.length; i++) {
      if (!parentOuArr.includes(bmc[i].Id)) {
        parentOuArr.push(bmc[i].Id);
        parent.push(bmc[i].Name);
      }
    }
    let orgArr: any[] = [];
    for (let parentIter = 0; parentIter < parentOuArr.length; parentIter++) {
      let cowMilkDetail = {
        totalWeight: 0,
        avgFat: 0,
        avgSnf: 0,
        kgFat: 0,
        kgSnf: 0,
      };
      let buffMilkDetail = {
        totalWeight: 0,
        avgFat: 0,
        avgSnf: 0,
        kgFat: 0,
        kgSnf: 0,
      };
      let cowMilkCounter = 0;
      let buffMilkCounter = 0;
      for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
        if (
          milkCollectionDetails[iter].OrganizationUnitId.ParentId?.Id ==
          parentOuArr[parentIter]
        ) {
          if (milkCollectionDetails[iter].Fat < 5.4) {
            cowMilkDetail.totalWeight += milkCollectionDetails[iter].Weight;
            cowMilkDetail.avgFat += milkCollectionDetails[iter].Fat;
            cowMilkDetail.avgSnf += milkCollectionDetails[iter].Snf;
            cowMilkDetail.kgFat +=
              (milkCollectionDetails[iter].Weight / 100) *
              milkCollectionDetails[iter].Fat;
            cowMilkDetail.kgSnf +=
              (milkCollectionDetails[iter].Weight / 100) *
              milkCollectionDetails[iter].Snf;
            cowMilkCounter++;
          } else {
            buffMilkDetail.totalWeight += milkCollectionDetails[iter].Weight;
            buffMilkDetail.avgFat += milkCollectionDetails[iter].Fat;
            buffMilkDetail.avgSnf += milkCollectionDetails[iter].Snf;
            buffMilkDetail.kgFat +=
              (milkCollectionDetails[iter].Weight / 100) *
              milkCollectionDetails[iter].Fat;
            buffMilkDetail.kgSnf +=
              (milkCollectionDetails[iter].Weight / 100) *
              milkCollectionDetails[iter].Snf;
            buffMilkCounter++;
          }
        }
      }
      cowMilkDetail.avgFat =
        (cowMilkDetail.kgFat / cowMilkDetail.totalWeight) * 100;
      cowMilkDetail.avgSnf =
        (cowMilkDetail.kgSnf / cowMilkDetail.totalWeight) * 100;
      buffMilkDetail.avgFat =
        (buffMilkDetail.kgFat / buffMilkDetail.totalWeight) * 100;
      buffMilkDetail.avgSnf =
        (buffMilkDetail.kgSnf / buffMilkDetail.totalWeight) * 100;

      if (cowMilkDetail.totalWeight != 0 || buffMilkDetail.totalWeight != 0) {
        orgArr.push({
          pareOuId: parentOuArr[parentIter],
          parentOuName: parent[parentIter],
          cowMilkDetail: cowMilkDetail.totalWeight != 0 ? cowMilkDetail : {},
          buffMilkDetail: buffMilkDetail.totalWeight != 0 ? buffMilkDetail : {},
        });
      }
    }
    // console.log(model)
    // console.log(orgArr)
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: orgArr,
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

async function DateWiseBmcMilkCollection(
  req: Request,
  model: GetSnfReconcillationModel
): Promise<ServiceResponse<any[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const startDate = model.startDate;
    const endDate = model.endDate;
    const shift = model.shift;
    let milkCollections;

    if (shift === undefined || shift === "both") {
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
          startDate,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
          endDate,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
          startDate,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
          endDate,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .andWhere("milkCollections.Shift = :Shift", { Shift: model.shift })
        .getMany();
    }

    const milkCollectionIds = milkCollections.map((milk) => milk.Id);

    if (milkCollectionIds.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    const bmc = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("organization")
      .innerJoinAndSelect("organization.OrganizationType", "organizationType")
      .andWhere("organization.IsActive =:cond", { cond: true })
      .andWhere("organizationType.Id =:bmcid", { bmcid: 4 })
      .getMany();

    if (!bmc) {
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
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .andWhere("milkCollectionDetails.Fat IS NOT NULL")
      .andWhere("milkCollectionDetails.Snf IS NOT NULL")
      .andWhere("milkCollectionDetails.Clr IS NOT NULL")
      .orderBy("collections.CollectionDateTime")
      .getMany();

    if (milkCollectionDetails.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    let parentOuArr: any[] = [];
    let parent: any[] = [];
    for (let i = 0; i < bmc.length; i++) {
      if (!parentOuArr.includes(bmc[i].Id)) {
        parentOuArr.push(bmc[i].Id);
        parent.push(bmc[i].Name);
      }
    }
    let collectedAtArr: any[] = [];
    for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
      if (
        !collectedAtArr.includes(
          moment(
            milkCollectionDetails[iter].MilkCollectionId.CollectionDateTime
          ).format("YYYY-MM-DD")
        )
      ) {
        collectedAtArr.push(
          moment(
            milkCollectionDetails[iter].MilkCollectionId.CollectionDateTime
          ).format("YYYY-MM-DD")
        );
      }
    }
    // console.log("collectedAtArr : ", collectedAtArr)
    let orgArr: any[] = [];
    for (let parentIter = 0; parentIter < parentOuArr.length; parentIter++) {
      let milkDetailArr: any[] = [];
      for (let i = 0; i < collectedAtArr.length; i++) {
        let cowMilkDetail = {
          totalWeight: 0,
          avgFat: 0,
          avgSnf: 0,
          kgFat: 0,
          kgSnf: 0,
        };
        let buffMilkDetail = {
          totalWeight: 0,
          avgFat: 0,
          avgSnf: 0,
          kgFat: 0,
          kgSnf: 0,
        };
        let cowMilkCounter = 0;
        let buffMilkCounter = 0;
        for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
          if (
            milkCollectionDetails[iter].OrganizationUnitId.ParentId?.Id ==
              parentOuArr[parentIter] &&
            moment(
              milkCollectionDetails[iter].MilkCollectionId.CollectionDateTime
            ).format("YYYY-MM-DD") == collectedAtArr[i]
          ) {
            if (milkCollectionDetails[iter].Fat < 5.4) {
              cowMilkDetail.totalWeight += milkCollectionDetails[iter].Weight;
              cowMilkDetail.avgFat += milkCollectionDetails[iter].Fat;
              cowMilkDetail.avgSnf += milkCollectionDetails[iter].Snf;
              cowMilkDetail.kgFat +=
                (milkCollectionDetails[iter].Weight / 100) *
                milkCollectionDetails[iter].Fat;
              cowMilkDetail.kgSnf +=
                (milkCollectionDetails[iter].Weight / 100) *
                milkCollectionDetails[iter].Snf;
              cowMilkCounter++;
            } else {
              buffMilkDetail.totalWeight += milkCollectionDetails[iter].Weight;
              buffMilkDetail.avgFat += milkCollectionDetails[iter].Fat;
              buffMilkDetail.avgSnf += milkCollectionDetails[iter].Snf;
              buffMilkDetail.kgFat +=
                (milkCollectionDetails[iter].Weight / 100) *
                milkCollectionDetails[iter].Fat;
              buffMilkDetail.kgSnf +=
                (milkCollectionDetails[iter].Weight / 100) *
                milkCollectionDetails[iter].Snf;
              buffMilkCounter++;
            }
          }
        }
        cowMilkDetail.avgFat =
          (cowMilkDetail.kgFat / cowMilkDetail.totalWeight) * 100;
        cowMilkDetail.avgSnf =
          (cowMilkDetail.kgSnf / cowMilkDetail.totalWeight) * 100;
        buffMilkDetail.avgFat =
          (buffMilkDetail.kgFat / buffMilkDetail.totalWeight) * 100;
        buffMilkDetail.avgSnf =
          (buffMilkDetail.kgSnf / buffMilkDetail.totalWeight) * 100;
        if (cowMilkDetail.totalWeight != 0 || buffMilkDetail.totalWeight != 0) {
          milkDetailArr.push({
            collectedAt: collectedAtArr[i],
            cowMilkDetail: cowMilkDetail.totalWeight != 0 ? cowMilkDetail : {},
            buffMilkDetail:
              buffMilkDetail.totalWeight != 0 ? buffMilkDetail : {},
          });
        }
        milkDetailArr.sort((a, b) => a.collectedAt - b.collectedAt);
      }
      if (milkDetailArr.length > 0) {
        orgArr.push({
          pareOuId: parentOuArr[parentIter],
          parentOuName: parent[parentIter],
          details: milkDetailArr,
        });
      }
    }
    orgArr.forEach((ele) => {
      // console.log(ele.details)
    });
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: orgArr,
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

async function RouteWiseBmcMilkCollection(
  req: Request,
  model: GetBillModelByBMC
): Promise<ServiceResponse<any[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;
    console.log(model);

    const startDate = model.startDate;
    const endDate = model.endDate;
    const shift = model.shift;
    const bmcId = model.bmcId;
    let milkCollections;

    // Fetch cycle details based on startDate and endDate
    let isFrozen;
    if (shift === null) {
      const cycle = await AppDataSource.getRepository(
        entities.BillingCycleMaster
      )
        .createQueryBuilder("cycle")
        .where("cycle.StartDate = :startDate", { startDate })
        .andWhere("cycle.EndDate = :endDate", { endDate })
        .getOne();
      console.log(cycle);

      if (!cycle) {
        return {
          status: 400,
          message: "Billing cycle not found for the provided dates.",
          data: null,
        };
      }
      isFrozen = cycle.IsFrozen;
    } else {
      const cycles = await AppDataSource.getRepository(
        entities.BillingCycleMaster
      )
        .createQueryBuilder("cycle")
        .where(":startDate BETWEEN cycle.StartDate AND cycle.EndDate", {
          startDate,
        })
        .orWhere(":endDate BETWEEN cycle.StartDate AND cycle.EndDate", {
          endDate,
        })
        .getMany();

      if (!cycles || cycles.length === 0) {
        return {
          status: 400,
          message: "No billing cycles found for the provided date range.",
          data: null,
        };
      }

      // Process the retrieved cycles
      // console.log("Retrieved cycles:", cycles);
      const latestCycle = cycles.reduce((prev, current) => {
        return new Date(prev.EndDate) > new Date(current.EndDate)
          ? prev
          : current;
      });
      isFrozen = latestCycle.IsFrozen;
      // console.log("isFrozen value:",isFrozen);
    }

    if (shift === null || shift === "both") {
      console.log("inside shift null");
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
          startDate,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
          endDate,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .getMany();
    } else {
      milkCollections = await AppDataSource.getRepository(
        entities.MilkCollections
      )
        .createQueryBuilder("milkCollections")
        .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
          startDate,
        })
        .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
          endDate,
        })
        .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
        .andWhere("milkCollections.Shift = :Shift", { Shift: model.shift })
        .getMany();
    }
    const milkCollectionIds = milkCollections.map((milk) => milk.Id);

    if (milkCollectionIds.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    const bmc = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("organization")
      .innerJoinAndSelect("organization.OrganizationType", "organizationType")
      .where("organization.Id =:id", { id: bmcId })
      .andWhere("organization.IsActive =:cond", { cond: true })
      .andWhere("organizationType.Id =:bmcid", { bmcid: 4 })
      .getOne();

    if (!bmc) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    let routes: any[] = [];
    if (isFrozen) {
      routes = await AppDataSource.getRepository(
        entities.RouteWiseCollectionHistory
      )
        .createQueryBuilder("routehistory")
        .where("routehistory.RouteOwner =:bmcId", { bmcId: bmcId })
        .getMany();
      // console.log("routes fetched from routeHistory: ", routes);
    } else {
      routes = await AppDataSource.getRepository(entities.RouteMaster)
        .createQueryBuilder("routemaster")
        .where("routemaster.RouteOwner =:bmcId", { bmcId: bmcId })
        .getMany();
      // console.log("routes fetched from original route: ", routes);
    }
    // console.log("routes: ", routes);

    const milkCollectionDetails = await AppDataSource.getRepository(
      entities.MilkCollectionDetails
    )
      .createQueryBuilder("milkCollectionDetails")
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .andWhere("milkCollectionDetails.Fat IS NOT NULL")
      .andWhere("milkCollectionDetails.Snf IS NOT NULL")
      .andWhere("milkCollectionDetails.Clr IS NOT NULL")
      .andWhere("organizationParent.Id =:bmcid", { bmcid: bmc.Id })
      .orderBy("collections.CollectionDateTime")
      .getMany();

    let collectedAtArr: any[] = [];
    for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
      if (
        !collectedAtArr.includes(
          moment(
            milkCollectionDetails[iter].MilkCollectionId.CollectionDateTime
          ).format("YYYY-MM-DD")
        )
      ) {
        collectedAtArr.push(
          moment(
            milkCollectionDetails[iter].MilkCollectionId.CollectionDateTime
          ).format("YYYY-MM-DD")
        );
      }
    }
    // console.log("collectedAtArr : ", collectedAtArr)
    let orgArr: any[] = [];
    let routeDetailsArr: any[] = [];
    for (let routeIter = 0; routeIter < routes.length; routeIter++) {
      let milkDetailArr: any[] = [];
      for (let i = 0; i < collectedAtArr.length; i++) {
        let cowMilkDetail = {
          totalWeight: 0,
          avgFat: 0,
          avgSnf: 0,
          kgFat: 0,
          kgSnf: 0,
        };
        let buffMilkDetail = {
          totalWeight: 0,
          avgFat: 0,
          avgSnf: 0,
          kgFat: 0,
          kgSnf: 0,
        };
        let cowMilkCounter = 0;
        let buffMilkCounter = 0;
        for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
          if (
            milkCollectionDetails[iter].RouteId.Id == routes[routeIter].Id &&
            moment(
              milkCollectionDetails[iter].MilkCollectionId.CollectionDateTime
            ).format("YYYY-MM-DD") == collectedAtArr[i]
          ) {
            if (milkCollectionDetails[iter].Fat < 5.4) {
              cowMilkDetail.totalWeight += milkCollectionDetails[iter].Weight;
              cowMilkDetail.avgFat += milkCollectionDetails[iter].Fat;
              cowMilkDetail.avgSnf += milkCollectionDetails[iter].Snf;
              cowMilkDetail.kgFat +=
                (milkCollectionDetails[iter].Weight / 100) *
                milkCollectionDetails[iter].Fat;
              cowMilkDetail.kgSnf +=
                (milkCollectionDetails[iter].Weight / 100) *
                milkCollectionDetails[iter].Snf;
              cowMilkCounter++;
            } else {
              buffMilkDetail.totalWeight += milkCollectionDetails[iter].Weight;
              buffMilkDetail.avgFat += milkCollectionDetails[iter].Fat;
              buffMilkDetail.avgSnf += milkCollectionDetails[iter].Snf;
              buffMilkDetail.kgFat +=
                (milkCollectionDetails[iter].Weight / 100) *
                milkCollectionDetails[iter].Fat;
              buffMilkDetail.kgSnf +=
                (milkCollectionDetails[iter].Weight / 100) *
                milkCollectionDetails[iter].Snf;
              buffMilkCounter++;
            }
          }
        }
        cowMilkDetail.avgFat =
          (cowMilkDetail.kgFat / cowMilkDetail.totalWeight) * 100;
        cowMilkDetail.avgSnf =
          (cowMilkDetail.kgSnf / cowMilkDetail.totalWeight) * 100;
        buffMilkDetail.avgFat =
          (buffMilkDetail.kgFat / buffMilkDetail.totalWeight) * 100;
        buffMilkDetail.avgSnf =
          (buffMilkDetail.kgSnf / buffMilkDetail.totalWeight) * 100;
        const collectedAtDate = new Date(collectedAtArr[i]);
        if (cowMilkDetail.totalWeight != 0 || buffMilkDetail.totalWeight != 0) {
          milkDetailArr.push({
            collectedAt: collectedAtArr[i],
            cowMilkDetail: cowMilkDetail.totalWeight != 0 ? cowMilkDetail : {},
            buffMilkDetail:
              buffMilkDetail.totalWeight != 0 ? buffMilkDetail : {},
          });
        }
        milkDetailArr.sort((a, b) => a.collectedAt - b.collectedAt);
      }
      if (milkDetailArr.length > 0) {
        routeDetailsArr.push({
          routeName: routes[routeIter].RouteName,
          routeId: routes[routeIter].Id,
          milkDetailArr,
        });
      }
    }
    orgArr.push({
      pareOuId: bmc.Id,
      parentOuName: bmc.Name,
      details: routeDetailsArr,
    });

    const data: AgentWiseMilkCollectionModel[] = [];
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: orgArr,
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

async function BMCWisePayment(
  req: Request,
  model: GetSnfReconcillationModel
): Promise<ServiceResponse<any[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const startDate = model.startDate;
    const endDate = model.endDate;

    const cycle = await AppDataSource.getRepository(entities.BillingCycleMaster)
      .createQueryBuilder("cycle")
      .where("cycle.StartDate = :startDate", { startDate })
      .andWhere("cycle.EndDate = :endDate", { endDate })
      .getOne();

    if (!cycle) {
      return {
        status: 400,
        message: "Billing cycle not found for the provided dates.",
        data: null,
      };
    }
    const isFrozen = cycle.IsFrozen;

    const milkCollections = await AppDataSource.getRepository(
      entities.MilkCollections
    )
      .createQueryBuilder("milkCollections")
      .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
        startDate,
      })
      .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
        endDate,
      })
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

    const bmcs = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("organization")
      .innerJoinAndSelect("organization.OrganizationType", "organizationType")
      .andWhere("organization.IsActive =:cond", { cond: true })
      .andWhere("organizationType.Id =:bmcid", { bmcid: 4 })
      .getMany();

    if (!bmcs) {
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
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .andWhere("milkCollectionDetails.Fat IS NOT NULL")
      .andWhere("milkCollectionDetails.Snf IS NOT NULL")
      .andWhere("milkCollectionDetails.Clr IS NOT NULL")
      .getMany();

    console.log("milkCollectionDetails: ", milkCollectionDetails);

    const rateMaster = await AppDataSource.getRepository(entities.RateMaster)
      .createQueryBuilder("ratemaster")
      .where("ratemaster.Wef < :currDate", { currDate: new Date() })
      .andWhere("ratemaster.IsActive =:isActive", { isActive: true })
      .orderBy("ratemaster.SeqNo", "ASC")
      .getMany();

    if (rateMaster.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    const productsSoldToAgent = await AppDataSource.getRepository(
      entities.ProductSalesToAgent
    )
      .createQueryBuilder("productSalesToAgent")
      .leftJoinAndSelect("productSalesToAgent.SoldToAgent", "agent")
      .leftJoinAndSelect("agent.ParentId", "parent")
      .where("DATE(productSalesToAgent.CreatedAt) >= :startDate", {
        startDate: model.startDate,
      })
      .andWhere("DATE(productSalesToAgent.CreatedAt) <= :endDate", {
        endDate: model.endDate,
      })
      .getMany();

    let orgArr: any[] = [];
    for (let bmcIter = 0; bmcIter < bmcs.length; bmcIter++) {
      let milkDetailArr: any[] = [];
      let bmcPaymenetDetails = {
        totalEarning: 0,
        totalDeduction: 0,
        cowMilkDetail: {
          quantity: 0,
          amount: 0,
          avgSnf: 0,
          avgFat: 0,
          kgFat: 0,
          kgSnf: 0,
        },
        buffMilkDetail: {
          quantity: 0,
          amount: 0,
          avgSnf: 0,
          avgFat: 0,
          kgFat: 0,
          kgSnf: 0,
        },
      };
      if (productsSoldToAgent.length) {
        for (let i = 0; i < productsSoldToAgent.length; i++) {
          if (
            productsSoldToAgent[i].SoldToAgent?.ParentId?.Id == bmcs[bmcIter].Id
          ) {
            bmcPaymenetDetails.totalDeduction += productsSoldToAgent[i].Balance;
          }
        }
      }
      let cowMilkCounter = 0;
      let buffMilkCounter = 0;
      for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
        const organizationId = orgArr[iter];
        let headload = 0;

        if (isFrozen) {
          // console.log("Headload taken from headloadhistory")
          const headloadHistory = await AppDataSource.getRepository(
            entities.HeadloadHistory
          )
            .createQueryBuilder("history")
            .where("history.Agent_id = :organizationId", { organizationId })
            .andWhere("history.BillingCycle = :cycleId", { cycleId: cycle.Id })
            .getOne();
          headload = headloadHistory?.HeadLoad || 0;
        } else {
          // console.log("Headload taken from org")
          const organization = await AppDataSource.getRepository(
            entities.Organization
          )
            .createQueryBuilder("organization")
            .where("organization.Id = :organizationId", { organizationId })
            .getOne();
          headload = organization?.HeadLoad || 0;
        }

        if (
          milkCollectionDetails[iter].OrganizationUnitId.ParentId?.Id ==
          bmcs[bmcIter].Id
        ) {
          if (milkCollectionDetails[iter].Fat < 5.4) {
            bmcPaymenetDetails.cowMilkDetail.quantity +=
              milkCollectionDetails[iter].Weight;
            bmcPaymenetDetails.cowMilkDetail.avgFat +=
              milkCollectionDetails[iter].Fat;
            bmcPaymenetDetails.cowMilkDetail.avgSnf +=
              milkCollectionDetails[iter].Snf;
            bmcPaymenetDetails.cowMilkDetail.kgFat +=
              (milkCollectionDetails[iter].Weight / 100) *
              milkCollectionDetails[iter].Fat;
            bmcPaymenetDetails.cowMilkDetail.kgSnf +=
              (milkCollectionDetails[iter].Weight / 100) *
              milkCollectionDetails[iter].Snf;
            bmcPaymenetDetails.cowMilkDetail.amount +=
              calculateValue(
                milkCollectionDetails[iter].Fat,
                milkCollectionDetails[iter].Snf,
                rateMaster
              ) * milkCollectionDetails[iter].Weight;
            cowMilkCounter++;
          } else {
            bmcPaymenetDetails.buffMilkDetail.quantity +=
              milkCollectionDetails[iter].Weight;
            bmcPaymenetDetails.buffMilkDetail.avgFat +=
              milkCollectionDetails[iter].Fat;
            bmcPaymenetDetails.buffMilkDetail.avgSnf +=
              milkCollectionDetails[iter].Snf;
            bmcPaymenetDetails.buffMilkDetail.kgFat +=
              (milkCollectionDetails[iter].Weight / 100) *
              milkCollectionDetails[iter].Fat;
            bmcPaymenetDetails.buffMilkDetail.kgSnf +=
              (milkCollectionDetails[iter].Weight / 100) *
              milkCollectionDetails[iter].Snf;
            bmcPaymenetDetails.buffMilkDetail.amount +=
              calculateValue(
                milkCollectionDetails[iter].Fat,
                new Date(startDate) >= new Date("2024-07-21") &&
                  milkCollectionDetails[iter].Snf > 9.0
                  ? 9.0
                  : milkCollectionDetails[iter].Snf,
                rateMaster
              ) * milkCollectionDetails[iter].Weight;
            buffMilkCounter++;
          }

          bmcPaymenetDetails.totalEarning +=
            (((milkCollectionDetails[iter].Fat *
              milkCollectionDetails[iter].Weight) /
              100 +
              (milkCollectionDetails[iter].Snf *
                milkCollectionDetails[iter].Weight) /
                100) /
              12) *
              100 *
              // milkCollectionDetails[iter].OrganizationUnitId.HeadLoad
              headload +
            (((milkCollectionDetails[iter].Fat *
              milkCollectionDetails[iter].Weight) /
              100 +
              (milkCollectionDetails[iter].Snf *
                milkCollectionDetails[iter].Weight) /
                100) /
              12) *
              100 *
              milkCollectionDetails[iter].OrganizationUnitId.Commission;
        }
      }
      bmcPaymenetDetails.cowMilkDetail.avgFat =
        (bmcPaymenetDetails.cowMilkDetail.kgFat /
          bmcPaymenetDetails.cowMilkDetail.quantity) *
        100;
      bmcPaymenetDetails.cowMilkDetail.avgSnf =
        (bmcPaymenetDetails.cowMilkDetail.kgSnf /
          bmcPaymenetDetails.cowMilkDetail.quantity) *
        100;
      bmcPaymenetDetails.buffMilkDetail.avgFat =
        (bmcPaymenetDetails.buffMilkDetail.kgFat /
          bmcPaymenetDetails.buffMilkDetail.quantity) *
        100;
      bmcPaymenetDetails.buffMilkDetail.avgSnf =
        (bmcPaymenetDetails.buffMilkDetail.kgSnf /
          bmcPaymenetDetails.buffMilkDetail.quantity) *
        100;

      milkDetailArr.push({
        pareOuId: bmcs[bmcIter].Id,
        parentOuName: bmcs[bmcIter].Name,
        bmcPaymenetDetails,
      });
      if (
        bmcPaymenetDetails.buffMilkDetail.quantity != 0 ||
        bmcPaymenetDetails.cowMilkDetail.quantity != 0
      ) {
        orgArr.push({
          pareOuId: bmcs[bmcIter].Id,
          parentOuName: bmcs[bmcIter].Name,
          bmcPaymenetDetails,
        });
      }
    }

    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: orgArr,
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

async function GetPayoutCheckList(
  req: Request,
  model: GetBillModelByBMC
): Promise<ServiceResponse<BillResponseModel[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const startDate = model.startDate;
    const endDate = model.endDate;
    const bmcId = model.bmcId;

    const cycle = await AppDataSource.getRepository(entities.BillingCycleMaster)
      .createQueryBuilder("cycle")
      .where("cycle.StartDate = :startDate", { startDate })
      .andWhere("cycle.EndDate = :endDate", { endDate })
      .getOne();

    if (!cycle) {
      return {
        status: 400,
        message: "Billing cycle not found for the provided dates.",
        data: null,
      };
    }
    const isFrozen = cycle.IsFrozen;

    const milkCollections = await AppDataSource.getRepository(
      entities.MilkCollections
    )
      .createQueryBuilder("milkCollections")
      .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
        startDate,
      })
      .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
        endDate,
      })
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

    const bmc = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("organization")
      .innerJoinAndSelect("organization.OrganizationType", "organizationType")
      .where("organization.Id =:id", { id: bmcId })
      .andWhere("organization.IsActive =:cond", { cond: true })
      .andWhere("organizationType.Id =:bmcid", { bmcid: 4 })
      .getOne();

    if (!bmc) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }
    const collectionDetails = await AppDataSource.getRepository(
      entities.MilkCollectionDetails
    )
      .createQueryBuilder("milkCollectionDetails")
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .andWhere("milkCollectionDetails.Fat IS NOT NULL")
      .andWhere("milkCollectionDetails.Snf IS NOT NULL")
      .andWhere("milkCollectionDetails.Clr IS NOT NULL")
      .andWhere("organizationParent.Id =:bmcid", { bmcid: bmc.Id })
      .orderBy("milkCollectionDetails.RouteId")
      .getMany();

    const productsSoldToAgent = await AppDataSource.getRepository(
      entities.ProductSalesToAgent
    )
      .createQueryBuilder("productSalesToAgent")
      .leftJoinAndSelect("productSalesToAgent.SoldToAgent", "agent")
      .leftJoinAndSelect("agent.ParentId", "parent")
      .where("DATE(productSalesToAgent.CreatedAt) >= :startDate", {
        startDate: model.startDate,
      })
      .andWhere("DATE(productSalesToAgent.CreatedAt) <= :endDate", {
        endDate: model.endDate,
      })
      .getMany();

    // const productsSoldToAgent = await AppDataSource.getRepository(
    //   entities.ProductSalesToAgent
    // )
    //   .createQueryBuilder("productSalesToAgent")
    //   .leftJoinAndSelect("productSalesToAgent.SoldToAgent", "agent")
    //   .leftJoinAndSelect("agent.ParentId", "parent")
    //   .where("DATE(productSalesToAgent.TobeSettledStartDate) >= :startDate", {
    //     startDate: model.startDate,
    //   })
    //   .andWhere("DATE(productSalesToAgent.TobeSettledEndDate) <= :endDate", {
    //     endDate: model.endDate,
    //   })
    //   .getMany();

    const complaints = await AppDataSource.getRepository(entities.Complaints)
      .createQueryBuilder("complaints")
      .leftJoinAndSelect("complaints.AgentId", "agent")
      .where("agent.ParentId =:bmcId", { bmcId: bmcId })
      .andWhere("DATE(complaints.TobeSettledStartDate) =:startDate", {
        startDate: model.startDate,
      })
      .andWhere("DATE(complaints.TobeSettledEndDate) =:endDate", {
        endDate: model.endDate,
      })
      .getMany();

    const aggregatedData: Record<
      string,
      {
        MilkType: string;
        Fat: number;
        Snf: number;
        Clr: number;
        Weight: number;
        CollectedAt: Date;
        OrganizationUnitId: entities.Organization;
        MilkCollectionId: entities.MilkCollections;
        RouteId: entities.RouteMaster;
        KGFat: number;
        KGSnf: number;
        count: number;
      }
    > = {};

    collectionDetails.forEach((item: entities.MilkCollectionDetails) => {
      const key = `${moment(item.MilkCollectionId.CollectionDateTime).format(
        "YYYY-MM-DD"
      )}-${item.MilkType}-${item.OrganizationUnitId.Id}-${
        item.MilkCollectionId.Shift
      }`;
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          MilkType: item.MilkType,
          Fat: item.Fat,
          Snf: item.Snf,
          Clr: item.Clr,
          Weight: item.Weight,
          CollectedAt: item.MilkCollectionId.CollectionDateTime,
          OrganizationUnitId: item.OrganizationUnitId,
          MilkCollectionId: item.MilkCollectionId,
          RouteId: item.RouteId,
          KGFat: (item.Weight / 100) * item.Fat,
          KGSnf: (item.Weight / 100) * item.Snf,
          count: 1,
        };
      } else {
        aggregatedData[key].Weight += item.Weight;
        aggregatedData[key].Fat += item.Fat;
        aggregatedData[key].Snf += item.Snf;
        aggregatedData[key].Clr += item.Clr;
        aggregatedData[key].KGFat += (item.Weight / 100) * item.Fat;
        aggregatedData[key].KGSnf += (item.Weight / 100) * item.Snf;
        aggregatedData[key].count++;
      }
    });

    const milkCollectionDetails = Object.values(aggregatedData).map((item) => {
      const resultItem = {
        ...item,
      };

      if (item.count === 1) {
        resultItem.Fat = item.Fat;
        resultItem.Snf = item.Snf;
        resultItem.Clr = item.Clr;
      } else {
        resultItem.Fat = (item.KGFat / item.Weight) * 100;
        resultItem.Snf = (item.KGSnf / item.Weight) * 100;
        // console.log(item.KGFat.toFixed(2), " ", item.KGSnf, " ", "details : ", item.Weight, "  ", parseFloat(((item.KGFat / item.Weight) * 100).toFixed(1)), "   ", (item.KGSnf / item.Weight) * 100)
        resultItem.Clr = item.Clr / item.count;
      }

      return resultItem;
    });

    const rateMaster = await AppDataSource.getRepository(entities.RateMaster)
      .createQueryBuilder("ratemaster")
      .where("ratemaster.Wef < :currDate", { currDate: new Date() })
      .andWhere("ratemaster.IsActive =:isActive", { isActive: true })
      .orderBy("ratemaster.SeqNo", "ASC")
      .getMany();
    if (rateMaster.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    if (milkCollectionDetails.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }
    let orgArr: any[] = [];
    let orgArrDetails: any[] = [];
    for (let iter = 0; iter < milkCollectionDetails.length; iter++) {
      if (!orgArr.includes(milkCollectionDetails[iter].OrganizationUnitId.Id)) {
        orgArr.push(milkCollectionDetails[iter].OrganizationUnitId.Id);
        orgArrDetails.push(milkCollectionDetails[iter].OrganizationUnitId);
      }
    }

    const org: any = [];
    for (let agentIter = 0; agentIter < orgArr.length; agentIter++) {
      const paymentDetails: any[] = [];
      const details = {
        agentCode: "",
        agentName: "",
        totalQuantity: 0,
        totalAmount: 0,
        earning: 0,
        deduction: 0,
        routeName: "",
        settlementAmount: 0,
        kgFat : 0,
        kgSnf : 0,
        headload : 0,
        handlingCharge : 0,
        payment: 0
      };
      let kgFatSum = 0;
      let kgSnfSum = 0;
      let headload = 0;
      let routeName = "";

      if (isFrozen) {
        // Fetch headload from HeadloadHistory table for frozen cycles
        // console.log("data from headloadhistory");
        const headloadHistory = await AppDataSource.getRepository(
          entities.HeadloadHistory
        )
          .createQueryBuilder("history")
          .where("history.Agent_id = :organizationId", {
            organizationId: orgArr[agentIter],
          })
          .andWhere("history.BillingCycle = :cycleId", { cycleId: cycle.Id })
          .getOne();

        headload = headloadHistory?.HeadLoad || 0;
        routeName = headloadHistory?.RouteName || "";
      } else {
        // Fetch headload from Organization table for non-frozen cycles
        // console.log("data from organization");

        const organization = await AppDataSource.getRepository(
          entities.Organization
        )
          .createQueryBuilder("organization")
          .select([
            "organization.Id AS Id",
            "organization.HeadLoad AS HeadLoad",
            "organization.AccountNumber AS AccountNumber",
            "organization.AccHolderName AS AccHolderName",
            "routeMaster.RouteName AS RouteName",
            "routeMaster.Id AS RouteId",
          ])
          .leftJoin(
            "RouteStops",
            "routeStops",
            "routeStops.StopId = organization.Id"
          )
          .leftJoin("routeStops.RouteId", "routeMaster")
          .where("organization.Id = :organizationId", {
            organizationId: orgArr[agentIter],
          })
          .getRawOne();

        headload = organization?.HeadLoad || 0;
        routeName = organization?.RouteName || "";
      }

      if (productsSoldToAgent.length) {
        for (let i = 0; i < productsSoldToAgent.length; i++) {
          if (productsSoldToAgent[i].SoldToAgent?.Id == orgArr[agentIter]) {
            details.deduction += productsSoldToAgent[i].Balance;
          }
        }
      }
      complaints.forEach((complaint) => {
        if (complaint.AgentId.Id === orgArr[agentIter]) {
          details.settlementAmount = complaint.SettlementAmount;
        }
      });
      for (
        let milkIter = 0;
        milkIter < milkCollectionDetails.length;
        milkIter++
      ) {
        if (
          orgArr[agentIter] ==
          milkCollectionDetails[milkIter].OrganizationUnitId.Id
        ) {
          details.totalQuantity += milkCollectionDetails[milkIter].Weight;
          details.totalAmount += Number(
            calculateValue(
              parseFloat(milkCollectionDetails[milkIter].Fat.toFixed(1)),
              // parseFloat(milkCollectionDetails[milkIter].Snf.toFixed(1)),
              parseFloat(
                (new Date(startDate) >= new Date("2024-07-21") &&
                milkCollectionDetails[milkIter].Snf > 9.0
                  ? 9.0
                  : milkCollectionDetails[milkIter].Snf
                ).toFixed(1)
              ),
              rateMaster
            ) * parseFloat(milkCollectionDetails[milkIter].Weight.toFixed(1))
          );
          // details.routeName = milkCollectionDetails[milkIter].RouteId.RouteName;
          details.routeName = routeName;
          kgFatSum +=
            (parseFloat(milkCollectionDetails[milkIter].Weight.toFixed(1)) /
              100) *
            parseFloat(milkCollectionDetails[milkIter].Fat.toFixed(1));
          kgSnfSum +=
            (parseFloat(milkCollectionDetails[milkIter].Weight.toFixed(1)) /
              100) *
            parseFloat(milkCollectionDetails[milkIter].Snf.toFixed(1));
        }
      }
      details.agentCode = orgArr[agentIter];
      details.agentName = orgArrDetails[agentIter].Name;
      details.earning =
        parseInt(
          (
            ((kgFatSum + kgSnfSum) / 12) *
            100 *
            orgArrDetails[agentIter].Commission
          ).toFixed(2)
        ) +
        parseInt(
          (
            ((kgFatSum + kgSnfSum) / 12) *
            100 *
            // orgArrDetails[agentIter].HeadLoad
            headload
          ).toFixed(2)
        );
        details.kgFat = parseFloat(kgFatSum.toFixed(2));
        details.kgSnf = parseFloat(kgSnfSum.toFixed(2));
        details.headload = parseFloat(((((kgFatSum + kgSnfSum) / 12) * 100) * headload).toFixed(2));
        details.payment = details.totalAmount + details.earning;
        details.handlingCharge = parseFloat(((((kgFatSum + kgSnfSum) / 12) * 100) * 1.25).toFixed(2));
      org.push(details);
      // console.log("org details: ",org);
    }
    let finalDetails: any[] = [];
    finalDetails.push({ bmcName: bmc.Name, org });

    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: finalDetails,
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

async function AgentLedger(
  req: Request,
  model: GetAgentLedgerModel
): Promise<ServiceResponse<BillResponseModel[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const startDate = model.startDate;
    const endDate = model.endDate;
    const bmcId = model.agentId;

    // Fetch cycle details based on startDate and endDate
    const cycle = await AppDataSource.getRepository(entities.BillingCycleMaster)
      .createQueryBuilder("cycle")
      .where("cycle.StartDate = :startDate", { startDate })
      .andWhere("cycle.EndDate = :endDate", { endDate })
      .getOne();

    if (!cycle) {
      return {
        status: 400,
        message: "Billing cycle not found for the provided dates.",
        data: null,
      };
    }

    const isFrozen = cycle.IsFrozen;

    const milkCollections = await AppDataSource.getRepository(
      entities.MilkCollections
    )
      .createQueryBuilder("milkCollections")
      .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
        startDate,
      })
      .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
        endDate,
      })
      .andWhere("milkCollections.IsActive = :isActive", { isActive: true })
      .getMany();

    const milkCollectionIds = milkCollections.map((milk) => milk.Id);
    // console.log('milk collection ids: ',milkCollectionIds);

    if (milkCollectionIds.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    const agent = await AppDataSource.getRepository(entities.Organization)
      .createQueryBuilder("organization")
      .innerJoinAndSelect("organization.OrganizationType", "organizationType")
      .where("organization.Id =:id", { id: model.agentId })
      .andWhere("organization.IsActive =:cond", { cond: true })
      .getOne();

    if (!agent) {
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
      .leftJoinAndSelect(
        "milkCollectionDetails.OrganizationUnitId",
        "organization"
      )
      .leftJoinAndSelect("organization.ParentId", "organizationParent")
      .leftJoinAndSelect("organization.OrganizationType", "organizationType")
      .leftJoinAndSelect(
        "milkCollectionDetails.MilkCollectionId",
        "collections"
      )
      .leftJoinAndSelect("milkCollectionDetails.RouteId", "route")
      .leftJoinAndSelect("route.RouteOwner", "routeOwner")
      .where(
        "milkCollectionDetails.MilkCollectionId IN (:...milkCollectionIds)",
        { milkCollectionIds }
      )
      .andWhere("milkCollectionDetails.IsActive = :isActive", {
        isActive: true,
      })
      .andWhere("organizationType.Id = :id", { id: 5 })
      .andWhere("milkCollectionDetails.Fat IS NOT NULL")
      .andWhere("milkCollectionDetails.Snf IS NOT NULL")
      .andWhere("milkCollectionDetails.Clr IS NOT NULL")
      .andWhere("milkCollectionDetails.OrganizationUnitId =:agentId", {
        agentId: model.agentId,
      })
      .getMany();

    const rateMaster = await AppDataSource.getRepository(entities.RateMaster)
      .createQueryBuilder("ratemaster")
      .where("ratemaster.Wef < :currDate", { currDate: new Date() })
      .orderBy("ratemaster.SeqNo", "DESC")
      .getMany();
    if (rateMaster.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    const productsSoldToAgent = await AppDataSource.getRepository(
      entities.ProductSalesToAgent
    )
      .createQueryBuilder("productSalesToAgent")
      .leftJoinAndSelect("productSalesToAgent.SoldToAgent", "agent")
      .leftJoinAndSelect("agent.ParentId", "parent")
      .where("DATE(productSalesToAgent.CreatedAt) >= :startDate", {
        startDate: model.startDate,
      })
      .andWhere("DATE(productSalesToAgent.CreatedAt) <= :endDate", {
        endDate: model.endDate,
      })
      .getMany();

    if (milkCollectionDetails.length === 0) {
      return {
        status: 200,
        message: ERROR_MESSAGES.NO_DATA,
        data: null,
      };
    }

    let orgArrDetails: any[] = [];

    const org: any = [];
    const paymentDetails: any[] = [];
    const details = {
      agentCode: agent.Id,
      agentName: agent.Name,
      milkValue: 0,
      deduction: 0,
      headLoad: 0,
      handlingCharge: 0,
    };
    let kgFatSum = 0;
    let kgSnfSum = 0;
    if (productsSoldToAgent.length) {
      for (let i = 0; i < productsSoldToAgent.length; i++) {
        if (productsSoldToAgent[i].SoldToAgent?.Id == model.agentId) {
          details.deduction += productsSoldToAgent[i].Balance;
        }
      }
    }

    let headload = 0;
    for (
      let milkIter = 0;
      milkIter < milkCollectionDetails.length;
      milkIter++
    ) {
      if (
        model.agentId == milkCollectionDetails[milkIter].OrganizationUnitId.Id
      ) {
        const organizationId =
          milkCollectionDetails[milkIter].OrganizationUnitId.Id;

        if (isFrozen) {
          // Fetch headload from HeadloadHistory table for frozen cycles
          const headloadHistory = await AppDataSource.getRepository(
            entities.HeadloadHistory
          )
            .createQueryBuilder("history")
            .where("history.Agent_id = :organizationId", { organizationId })
            .andWhere("history.BillingCycle = :cycleId", { cycleId: cycle.Id })
            .getOne();

          headload = headloadHistory?.HeadLoad || 0;
        } else {
          // Fetch headload from Organization table for non-frozen cycles
          const organization = await AppDataSource.getRepository(
            entities.Organization
          )
            .createQueryBuilder("organization")
            .where("organization.Id = :organizationId", { organizationId })
            .getOne();

          headload = organization?.HeadLoad || 0;
        }

        details.milkValue += Number(
          calculateValue(
            parseFloat(milkCollectionDetails[milkIter].Fat.toFixed(1)),
            parseFloat(
              (new Date(startDate) >= new Date("2024-07-21") &&
              milkCollectionDetails[milkIter].Snf > 9.0
                ? 9.0
                : milkCollectionDetails[milkIter].Snf
              ).toFixed(1)
            ),
            rateMaster
          ) * parseFloat(milkCollectionDetails[milkIter].Weight.toFixed(1))
        );
        // calculateValue(
        //   milkCollectionDetails[milkIter].Fat,
        //   new Date(startDate) >= new Date("2024-07-21") &&
        //     milkCollectionDetails[milkIter].Snf > 9.0
        //     ? 9.0
        //     : milkCollectionDetails[milkIter].Snf,
        //   rateMaster
        // ) * milkCollectionDetails[milkIter].Weight;

        kgFatSum +=
          (milkCollectionDetails[milkIter].Weight / 100) *
          milkCollectionDetails[milkIter].Fat;

        kgSnfSum +=
          (milkCollectionDetails[milkIter].Weight / 100) *
          milkCollectionDetails[milkIter].Snf;
      }
    }
    // console.log("milkvalue: ", details.milkValue);
    details.handlingCharge =
      ((kgFatSum + kgSnfSum) / 12) * 100 * agent.Commission;
    details.headLoad = ((kgFatSum + kgSnfSum) / 12) * 100 * headload;
    org.push(details);

    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: org,
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

async function KrishiBazarReport(
  req: Request,
  model: GetBillModelByBMC
): Promise<ServiceResponse<BillResponseModel[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const startDate = model.startDate;
    const endDate = model.endDate;
    const bmcId = model.bmcId;
    const salesDetail = await AppDataSource.getRepository(
      entities.ProductsSoldToAgent
    )
      .createQueryBuilder("productsSoldToAgent")
      .leftJoinAndSelect(
        "productsSoldToAgent.ProductSalesToAgent",
        "saleDetail"
      )
      .leftJoinAndSelect("saleDetail.SoldToAgent", "agent")
      .leftJoinAndSelect("productsSoldToAgent.ProductId", "product")
      .leftJoinAndSelect("product.ProductCategId", "productCat")
      .where("DATE(productsSoldToAgent.CreatedAt) >= :startDate", { startDate })
      .andWhere("DATE(productsSoldToAgent.CreatedAt) <= :endDate", { endDate })
      .andWhere("agent.ParentId =:bmcId", { bmcId: bmcId })
      .getMany();

    const agentArr: any[] = [];
    const agentDetailArr: any[] = [];
    salesDetail.forEach((sale) => {
      if (!agentArr.includes(sale.ProductSalesToAgent.SoldToAgent.Id)) {
        agentArr.push(sale.ProductSalesToAgent.SoldToAgent.Id);
        agentDetailArr.push(sale.ProductSalesToAgent.SoldToAgent);
      }
    });

    const krishiBazarReport: any[] = [];
    agentArr.forEach((agent, ind) => {
      const details: any[] = [];
      salesDetail.forEach((sale) => {
        if (sale.ProductSalesToAgent.SoldToAgent.Id == agent) {
          if (sale.ProductSalesToAgent.SoldToAgent.Id == 1002651) {
            console.log(sale);
          }
          const item = {
            soldOn: sale.CreatedAt,
            productCat: sale.ProductId.ProductCategId.CategoryName,
            productName: sale.ProductId.ProductName,
            soldQuantity: sale.Quantity,
            rate: sale.Rate,
            totalAmount: sale.Rate * sale.Quantity,
            paymentMode:
              sale.ProductSalesToAgent.Balance > 0 ? "Credit" : "Cash", // will need attention in the future.
          };
          details.push(item);
        }
      });
      krishiBazarReport.push({
        agentDetail: agentDetailArr[ind],
        saleDetail: details,
      });
    });
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: krishiBazarReport,
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

async function LockCycle(
  req: Request,
  model: any
): Promise<ServiceResponse<APIResponse[]>> {
  let userId;
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    userId = decode.userId;

    const repository = AppDataSource.getRepository(entities.BillingCycleMaster);
    const cycleMaster = await repository.findOne({
      where: { Id: model.id ?? 0 },
    });

    //update isFrozen value in billingcycle table
    if (cycleMaster) {
      cycleMaster.IsFrozen = true;
      cycleMaster.ModifiedAt = new Date();
      cycleMaster.ModifiedBy = userId;
      await repository.save(cycleMaster);

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
  } finally {
    try {
      const organizationRepository = AppDataSource.getRepository(
        entities.Organization
      );
      const headloadHistoryRepository = AppDataSource.getRepository(
        entities.HeadloadHistory
      );

      const routeWiseCollectionHistoryRepository = AppDataSource.getRepository(
        entities.RouteWiseCollectionHistory
      );

      const organizationData = await organizationRepository
        .createQueryBuilder("organization")
        .select([
          "organization.Id AS Id",
          "organization.HeadLoad AS HeadLoad",
          "organization.AccountNumber AS AccountNumber",
          "organization.AccHolderName AS AccHolderName",
          "routeMaster.RouteName AS RouteName",
          "routeMaster.Id AS RouteId",
        ])
        .leftJoin(
          "RouteStops",
          "routeStops",
          "routeStops.StopId = organization.Id"
        )
        .leftJoin("routeStops.RouteId", "routeMaster")
        .where("organization.IsActive = :isActive", { isActive: true })
        .andWhere("organization.OrganizationType = :orgType", { orgType: 5 })
        .getRawMany();

      // console.log(organizationData);

      // Insert into HeadloadHistory
      const batchSize = 1000;
      for (let i = 0; i < organizationData.length; i += batchSize) {
        const batch = organizationData
          .slice(i, i + batchSize)
          .map((organization) => ({
            Agent_id: organization,
            BillingCycle: model.id,
            HeadLoad: organization.HeadLoad,
            AccountNumber: organization.AccountNumber,
            AccHolderName: organization.AccHolderName,
            RouteId: organization.RouteId,
            RouteName: organization.RouteName,
            CreatedAt: new Date(),
          }));

        // console.log("batch: ",batch);
        await headloadHistoryRepository.insert(batch);
      }

      // Fetch route data from RouteMaster and insert into RouteWiseCollectionHistory
      const routeData = await AppDataSource.getRepository(entities.RouteMaster)
        .createQueryBuilder("routeMaster")
        .leftJoinAndSelect("routeMaster.RouteTypeId", "RouteTypeId")
        .leftJoinAndSelect("routeMaster.RouteOwner", "RouteOwner")
        .where("routeMaster.IsActive = :isActive", { isActive: true })
        .getMany();

      // console.log("routeData: ",routeData)

      const routeHistoryBatch = routeData.map((route) => ({
        BillingCycle: model.id,
        Id: route.Id,
        RouteName: route.RouteName,
        RouteOwner: route.RouteOwner.Id,
        CreatedAt: new Date(),
      }));

      await routeWiseCollectionHistoryRepository.insert(routeHistoryBatch);
    } catch (error) {
      console.error("Error fetching organization details:", error);
    }
  }
}

export {
  GetCycleMaster,
  CreateCycleMaster,
  UpdateCycleMaster,
  DeleteCycleMaster,
  GetBill,
  GetBillByBMC,
  GetBillByBMCRoutes,
  GetRateChart,
  GetBankAdvice,
  GetBankLetterAmount,
  GetBmcSnfReconcillation,
  GetAgentWiseMilkCollection,
  DateWiseAgentColletionDetail,
  GetBmcWiseMilkCollection,
  DateWiseBmcMilkCollection,
  RouteWiseBmcMilkCollection,
  BMCWisePayment,
  GetPayoutCheckList,
  AgentLedger,
  KrishiBazarReport,
  LockCycle,
};
