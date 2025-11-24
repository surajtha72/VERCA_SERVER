import { TransporterContracts } from './../entities/TransporterContracts';
import { Organization } from "./../entities/Organization";
import { MilkCollections } from "./../entities/MilkCollections";
import moment from "moment";
import { AppDataSource } from "../db-config/DbConnection";
import { MilkCollectionDetails } from "../entities/MilkCollectionDetails";
import { RouteMaster } from "../entities/RouteMaster";
import { BillResponseModel, ServiceResponse } from "../models/ApiResponse";
import { GetBillModelByBMC } from "../models/BillingCycleMasterModel";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import { count } from "console";

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

function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

async function GetInwardTransportation(
  req: Request,
  model: GetBillModelByBMC
): Promise<ServiceResponse<any[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const { startDate, endDate, bmcId, shift } = model;
    let milkCollections;
    const daysCount = moment(endDate).diff(moment(startDate), "days") + 1;

    const bmc = await AppDataSource.getRepository(Organization)
      .createQueryBuilder("organization")
      .innerJoinAndSelect("organization.OrganizationType", "organizationType")
      .where("organization.Id = :id", { id: bmcId })
      .andWhere("organization.IsActive = :cond", { cond: true })
      .andWhere("organizationType.Id = :bmcid", { bmcid: 4 })
      .getOne();

    if (!bmc) {
      return { status: 200, message: ERROR_MESSAGES.NO_DATA, data: null };
    }

    const bmcRoutes = await AppDataSource.getRepository(RouteMaster)
      .createQueryBuilder("RouteMaster")
      .select()
      .where("RouteMaster.RouteOwner = :id", { id: bmc?.Id })
      .andWhere("RouteMaster.RouteTypeId = :rid", { rid: 1 })
      .getMany();

    let inwardData: any = [];

    for (let routeItr = 0; routeItr < bmcRoutes.length; routeItr++) {
      const contracts = await AppDataSource.getRepository(TransporterContracts)
        .createQueryBuilder("TransporterContracts")
        .leftJoinAndSelect("TransporterContracts.TransporterId", "Transporters")
        .leftJoinAndSelect(
          "TransporterContracts.VehicleId",
          "TransporterVehicles"
        )
        .where("TransporterContracts.RouteId = :id", {
          id: bmcRoutes[routeItr]?.Id,
        })
        .getMany();

      for (let contractItr = 0; contractItr < contracts.length; contractItr++) {
        let inwardDetails: any = {
          vehicle: {},
          totalMilk: 0,
          contract: {},
          payAmount: 0,
          totalMilkCollections: 0,
          payTerm: "",
          daysCount: daysCount,
          arrivalTime: "",
          accName: "",
          accNumber: "",
          accIfscCode: "",
          attendanceDates: new Set<string>(),
          canCount: 0,
          KgFat: 0,
          KgSnf: 0,
          Headload: 0,
          HeadloadQty: 0,
          HeadloadAmt: 0,
        };
        if (shift === null || shift === "both") {
          milkCollections = await AppDataSource.getRepository(MilkCollections)
            .createQueryBuilder("milkCollections")
            .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
              startDate: startDate,
            })
            .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
              endDate: endDate,
            })
            .andWhere("milkCollections.IsActive = :isActive", {
              isActive: true,
            })
            .getMany();
        } else {
          milkCollections = await AppDataSource.getRepository(MilkCollections)
            .createQueryBuilder("milkCollections")
            .where("DATE(milkCollections.CollectionDateTime) >= :startDate", {
              startDate,
            })
            .andWhere("DATE(milkCollections.CollectionDateTime) <= :endDate", {
              endDate,
            })
            .andWhere("milkCollections.IsActive = :isActive", {
              isActive: true,
            })
            .andWhere("milkCollections.Shift = :Shift", { Shift: shift })
            .getMany();
        }

        const milkCollectionIds = milkCollections.map((milk) => milk.Id);

        const milkCollectionsDetails = await AppDataSource.getRepository(
          MilkCollectionDetails
        )
          .createQueryBuilder("MilkCollection")
          .select("MilkCollection.Id")
          .addSelect("MilkCollection.Weight")
          .addSelect("MilkCollection.CollectedAt")
          .addSelect("MilkCollection.CanCount")
          .addSelect("MilkCollection.Fat")
          .addSelect("MilkCollection.Snf")
          .addSelect("MilkCollection.RouteId")
          .addSelect("Organization.Headload")
          .leftJoinAndSelect(
            "MilkCollection.OrganizationUnitId",
            "Organization"
          )
          .where("MilkCollection.RouteId = :rid", {
            rid: bmcRoutes[routeItr]?.Id,
          })
          .andWhere("MilkCollection.TransporterVehicleId = :vid", {
            vid: contracts[contractItr]?.VehicleId?.Id,
          })
          .andWhere(
            "MilkCollection.MilkCollectionId IN (:...milkCollectionIds)",
            { milkCollectionIds }
          )
          .getMany();

        //for vehicle attendance
        const milkCollectionsDetailsAttd = await AppDataSource.getRepository(
          MilkCollectionDetails
        )
          .createQueryBuilder("MilkCollection")
          .select("MilkCollection.Id")
          .addSelect("MilkCollection.Weight")
          .addSelect("MilkCollection.CollectedAt")
          .addSelect("MilkCollection.CanCount")
          .addSelect("MilkCollection.Fat")
          .addSelect("MilkCollection.Snf")
          .addSelect("Organization.Headload")
          .leftJoinAndSelect(
            "MilkCollection.OrganizationUnitId",
            "Organization"
          )
          .where("MilkCollection.RouteId = :rid", {
            rid: bmcRoutes[routeItr]?.Id,
          })
          .andWhere("MilkCollection.TransporterVehicleId = :vid", {
            vid: contracts[contractItr]?.VehicleId?.Id,
          })
          .andWhere("DATE(MilkCollection.CreatedAt) >= :startDate", {
            startDate: startDate,
          })
          .andWhere("DATE(MilkCollection.CreatedAt) <= :endDate", {
            endDate: endDate,
          })
          .getMany();
        let hlAmount = 0.0;
        let hlQty = 0.0;
        milkCollectionsDetails.forEach((collection) => {
          inwardDetails.totalMilk += collection.Weight;
          inwardDetails.totalMilkCollections += 1;
          inwardDetails.canCount += collection.CanCount;
          inwardDetails.Headload = collection.OrganizationUnitId?.HeadLoad ?? 0;

          if (inwardDetails.Headload > 0) {
            const weight = (collection?.Weight).toFixed(3);
            const fat = (collection?.Fat).toFixed(3);
            const snf = (collection?.Snf).toFixed(3);

            const KgFat = parseFloat(weight) / 100 * parseFloat(fat);
            const KgSnf = parseFloat(weight) / 100 * parseFloat(snf);

            hlQty += ((KgFat + KgSnf) / 12) * 100

            inwardDetails.HeadloadQty = hlQty;
            inwardDetails.HeadloadQty = parseInt(inwardDetails.HeadloadQty).toFixed(3);

            console.log(collection.RouteId);

            // if(bmcRoutes[routeItr]?.Id==204){
            //   console.log('inwardDetails.HeadloadQty: ',inwardDetails.HeadloadQty);
            // }
            
            hlAmount += ((KgFat + KgSnf) / 12) * 100 * collection.OrganizationUnitId.HeadLoad;

            inwardDetails.HeadloadAmt = hlAmount;
            inwardDetails.HeadloadAmt = parseInt(inwardDetails.HeadloadAmt).toFixed(3);
            // console.log(contracts);
          }

          if (
            !inwardDetails.arrivalTime ||
            collection.CollectedAt < inwardDetails.arrivalTime
          ) {
            inwardDetails.arrivalTime = collection.CollectedAt;
          }
        });

        milkCollectionsDetailsAttd.forEach((collection) => {
          const collectionDate = moment(collection.CollectedAt).format(
            "YYYY-MM-DD"
          );

          if (!inwardDetails.attendanceDates.has(collectionDate)) {
            inwardDetails.attendanceDates.add(collectionDate);
          }
        });

        inwardDetails.routId = bmcRoutes[routeItr];
        inwardDetails.contract = contracts[contractItr];
        inwardDetails.vehicle = contracts[contractItr]?.VehicleId?.Id;
        inwardDetails.accName =
          contracts[contractItr]?.TransporterId.BankAcName;
        inwardDetails.accNumber =
          contracts[contractItr]?.TransporterId.BankAcNo;
        inwardDetails.payAmount = contracts[contractItr]?.PayAmount;
        inwardDetails.payTerm = contracts[contractItr]?.PayTerms;
        inwardDetails.accIfscCode =
          contracts[contractItr]?.TransporterId.BankIfscCode;

        inwardData.push(inwardDetails);
      }
    }

    const combinedData = inwardData.reduce((acc: any, current: any) => {
      const existing = acc.find(
        (item: any) => item.vehicle === current.vehicle
      );
      if (existing) {
        existing.totalMilk += current.totalMilk;
        existing.totalMilkCollections += current.totalMilkCollections;
        existing.canCount += current.canCount;

        current.attendanceDates.forEach((date: string) =>
          existing.attendanceDates.add(date)
        );
      } else {
        acc.push({
          ...current,
          attendanceDates: new Set([...current.attendanceDates]),
        });
      }
      return acc;
    }, []);

    combinedData.forEach((item: any) => {
      item.attendance = item.attendanceDates.size;
      delete item.attendanceDates;
    });

    //console.log(combinedData[0])

    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: combinedData,
    };
  } catch (error) {
    console.error(error);
    return { status: 400, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
  }
}

async function GetVehicleAttendance(
  req: Request,
  model: GetBillModelByBMC
): Promise<ServiceResponse<any[]>> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const { startDate, endDate, bmcId } = model;
    let attendanceData: any[] = [];

    const bmc = await AppDataSource.getRepository(Organization)
      .createQueryBuilder("BmcMaster")
      .select("BmcMaster.Name", "bmcName")
      .where("BmcMaster.Id = :id", { id: bmcId })
      .getRawOne();
    const bmcName = bmc ? bmc.bmcName : "Unknown BMC";

    const bmcRoutes = await AppDataSource.getRepository(RouteMaster)
      .createQueryBuilder("RouteMaster")
      .select()
      .where("RouteMaster.RouteOwner = :id", { id: bmcId })
      .andWhere("RouteMaster.RouteTypeId = :rid", { rid: 1 })
      .getMany();

    for (let route of bmcRoutes) {
      const contracts = await AppDataSource.getRepository(TransporterContracts)
        .createQueryBuilder("TransporterContracts")
        .leftJoinAndSelect(
          "TransporterContracts.VehicleId",
          "TransporterVehicles"
        )
        .where("TransporterContracts.RouteId = :id", { id: route.Id })
        .getMany();

      for (let contract of contracts) {
        let vehicleAttendance: any = {
          startDate: startDate,
          endDate: endDate,
          bmc: bmcName,
          vehicleRegNo: contract.VehicleId?.RegistrationNo,
          route: route.RouteName,
          morningShiftArrival: {},
          eveningShiftArrival: {},
        };

        let currentDate = moment(startDate);
        const endDateMoment = moment(endDate);

        while (currentDate.isSameOrBefore(endDateMoment)) {
          const dateStr = currentDate.format("YYYY-MM-DD");

          const morningShift = await AppDataSource.getRepository(
            MilkCollectionDetails
          )
            .createQueryBuilder("MilkCollectionDetails")
            .leftJoinAndSelect(
              "MilkCollectionDetails.MilkCollectionId",
              "MilkCollections"
            )
            .where("MilkCollectionDetails.TransporterVehicleId = :vid", {
              vid: contract.VehicleId.Id,
            })
            .andWhere("DATE(MilkCollectionDetails.CollectedAt) = :dateStr", {
              dateStr,
            })
            .andWhere("MilkCollections.Shift = :shift", { shift: "morning" })
            .orderBy("MilkCollectionDetails.CollectedAt", "ASC")
            .getOne();

          const eveningShift = await AppDataSource.getRepository(
            MilkCollectionDetails
          )
            .createQueryBuilder("MilkCollectionDetails")
            .leftJoinAndSelect(
              "MilkCollectionDetails.MilkCollectionId",
              "MilkCollections"
            )
            .where("MilkCollectionDetails.TransporterVehicleId = :vid", {
              vid: contract.VehicleId.Id,
            })
            .andWhere("DATE(MilkCollectionDetails.CollectedAt) = :dateStr", {
              dateStr,
            })
            .andWhere("MilkCollections.Shift = :shift", { shift: "evening" })
            .orderBy("MilkCollectionDetails.CollectedAt", "ASC")
            .getOne();

          vehicleAttendance.morningShiftArrival[dateStr] = morningShift
            ? morningShift.CollectedAt
            : null;
          vehicleAttendance.eveningShiftArrival[dateStr] = eveningShift
            ? eveningShift.CollectedAt
            : null;

          currentDate.add(1, "days");
        }

        attendanceData.push(vehicleAttendance);
      }
    }

    return {
      status: 200,
      message: SUCCESS_MESSAGES.SUCCESS,
      data: attendanceData,
    };
  } catch (error) {
    console.error(error);
    return { status: 400, message: ERROR_MESSAGES.INTERNAL_SERVER, data: null };
  }
}

export { GetInwardTransportation, GetVehicleAttendance };
