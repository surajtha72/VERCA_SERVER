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
exports.GetTransitLossGainReports = exports.CreateWeighBridgeVehicle = exports.DeleteWeighBridge = exports.UpdateWeighBridge = exports.CreateWeighBridge = exports.GetWeighBridge = void 0;
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
    SUCCESS: "Success",
    ADD_SUCCESS: "Added Successfully",
    UPDATE_SUCCESS: "Updated Successfully",
    DELETE_SUCCESS: "Deleted Successfully",
};
function GetWeighBridge(model, currDate = new Date()) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let weighBridge;
            const newDate = (0, moment_1.default)(currDate).format("YYYY-MM-DD");
            console.log(model, "test code");
            if (model.vehicleNo && model.routeId && model.productCategory) {
                weighBridge = yield DbConnection_1.AppDataSource.getRepository(entities.WeighBridge)
                    .createQueryBuilder("weighBridge")
                    .leftJoinAndSelect("weighBridge.VehicleNo", "transporter_vehicle")
                    .leftJoinAndSelect("weighBridge.RouteId", "route_master")
                    .leftJoinAndSelect("weighBridge.ProductCategory", "product_category")
                    .where("transporter_vehicle.Id = :id", { id: model.vehicleNo })
                    .andWhere("route_master.Id = :routeId", { routeId: model.routeId })
                    .andWhere("product_category.Id = :productCategory", {
                    productCategory: model.productCategory,
                })
                    .andWhere("weighBridge.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.vehicleNo) {
                console.log("inside vehicle dispatched date");
                // console.log(model)
                weighBridge = yield DbConnection_1.AppDataSource.getRepository(entities.WeighBridge)
                    .createQueryBuilder("weighbridge")
                    .leftJoinAndSelect("weighbridge.VehicleNo", "transporter_vehicle")
                    .leftJoinAndSelect("weighbridge.RouteId", "route_master")
                    .leftJoinAndSelect("weighbridge.ProductCategory", "product_category")
                    .where("weighbridge.VehicleNo =:vehicleNo", {
                    vehicleNo: model.vehicleNo,
                })
                    .andWhere("DATE(weighbridge.CreatedAt) =:currentDate", {
                    currentDate: newDate,
                })
                    .andWhere("weighbridge.IsActive =:isActive", { isActive: true })
                    .getMany();
            }
            else if (model.vehicleId && model.fromDate && model.toDate) {
                console.log("inside vehicle no dispatched date");
                weighBridge = yield DbConnection_1.AppDataSource.getRepository(entities.WeighBridge)
                    .createQueryBuilder("weighbridge")
                    .leftJoinAndSelect("weighbridge.VehicleNo", "transporter_vehicle")
                    .leftJoinAndSelect("weighbridge.RouteId", "route_master")
                    .leftJoinAndSelect("weighbridge.ProductCategory", "product_category")
                    .where("weighbridge.VehicleNo =:vehicleNo", {
                    vehicleNo: model.vehicleId,
                })
                    .andWhere("DATE(weighbridge.CreatedAt) >=:fromDate", {
                    fromDate: model.fromDate,
                })
                    .andWhere("DATE(weighbridge.CreatedAt) <=:toDate", {
                    toDate: model.toDate,
                })
                    .getMany();
            }
            else if (model.currentDate) {
                weighBridge = yield DbConnection_1.AppDataSource.getRepository(entities.WeighBridge)
                    .createQueryBuilder("weighbridge")
                    .where("DATE(weighbridge.CreatedAt) =:currentDate", {
                    currentDate: model.currentDate,
                })
                    .leftJoinAndSelect("weighbridge.VehicleNo", "transporter_vehicle")
                    .leftJoinAndSelect("weighbridge.RouteId", "route_master")
                    .leftJoinAndSelect("weighbridge.ProductCategory", "product_category")
                    .andWhere("weighbridge.IsActive =:isActive", { isActive: true })
                    .andWhere("weighbridge.GrossWeight IS NOT NULL")
                    .andWhere("weighbridge.TareWeight IS NULL")
                    .getMany();
            }
            else if (model.testDate) {
                weighBridge = yield DbConnection_1.AppDataSource.getRepository(entities.WeighBridge)
                    .createQueryBuilder("weighbridge")
                    .where("DATE(weighbridge.CreatedAt) =:currentDate", {
                    currentDate: model.testDate,
                })
                    .leftJoinAndSelect("weighbridge.VehicleNo", "transporter_vehicle")
                    .leftJoinAndSelect("weighbridge.RouteId", "route_master")
                    .leftJoinAndSelect("weighbridge.ProductCategory", "product_category")
                    .andWhere("weighbridge.IsActive =:isActive", { isActive: true })
                    .andWhere("weighbridge.GrossWeight IS NOT NULL")
                    .andWhere("weighbridge.TareWeight IS NOT NULL")
                    .getMany();
            }
            else {
                console.log("inside else condition");
                weighBridge = yield DbConnection_1.AppDataSource.getRepository(entities.WeighBridge)
                    .createQueryBuilder("weighBridge")
                    .leftJoinAndSelect("weighBridge.VehicleNo", "transporter_vehicle")
                    .leftJoinAndSelect("weighBridge.RouteId", "route_master")
                    .leftJoinAndSelect("weighBridge.ProductCategory", "product_category")
                    .where("weighBridge.IsActive = :isActive", { isActive: true })
                    .orderBy("weighBridge.Id", "DESC")
                    .getMany();
            }
            const productMasterData = weighBridge.map((weighBridge) => ({
                id: weighBridge.Id,
                weighbridgeNo: weighBridge.WeighbridgeNo,
                vehicleNo: weighBridge.VehicleNo,
                // contractorCode: weighBridge.ContractorCode,
                contractorName: weighBridge.ContractorName,
                challanNo: weighBridge.ChallanNo,
                // driverName: weighBridge.DriverName,
                // contactPerson: weighBridge.ContactPerson,
                destination: weighBridge.Destination,
                purpose: weighBridge.Purpose,
                supplierName: weighBridge.SupplierName,
                routeId: weighBridge.RouteId,
                productCategory: weighBridge.ProductCategory,
                productName: weighBridge.ProductName,
                weightMode: weighBridge.WeightMode,
                tareWeight: weighBridge.TareWeight,
                tareDate: weighBridge.TareDate,
                grossWeight: weighBridge.GrossWeight,
                grossDate: weighBridge.GrossDate,
                netWeightKg: weighBridge.NetWeightKg,
                supplyQty: weighBridge.SupplyQty,
                remarks: weighBridge.Remarks,
                // temparature: weighBridge.Temparature,
                // fat: weighBridge.Fat,
                // snf: weighBridge.Snf,
                // acidity: weighBridge.Acidity,
                isActive: weighBridge.IsActive,
                createdAt: weighBridge.CreatedAt,
                modifiedAt: weighBridge.ModifiedAt,
            }));
            console.log(productMasterData);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: productMasterData,
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
exports.GetWeighBridge = GetWeighBridge;
function GetTransitLossGainReports(model) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let weighBridge;
            let milkDispatch;
            let factoryFatSnfDetails;
            const transitLossgainData = [];
            weighBridge = yield DbConnection_1.AppDataSource.getRepository(entities.WeighBridge)
                .createQueryBuilder("weighbridge")
                .leftJoinAndSelect("weighbridge.VehicleNo", "transporter_vehicle")
                .leftJoinAndSelect("weighbridge.RouteId", "route_master")
                .leftJoinAndSelect("weighbridge.ProductCategory", "product_category")
                .where("weighbridge.VehicleNo =:vehicleNo", {
                vehicleNo: model.vehicleId,
            })
                .andWhere("DATE(weighbridge.CreatedAt) >=:fromDate", {
                fromDate: model.fromDate,
            })
                .andWhere("DATE(weighbridge.CreatedAt) <=:toDate", {
                toDate: model.toDate,
            })
                .getMany();
            console.log("weighbridge: ", weighBridge);
            milkDispatch = yield DbConnection_1.AppDataSource.getRepository(entities.MilkDispatch)
                .createQueryBuilder("milk_dispatch")
                .leftJoinAndSelect("milk_dispatch.TransporterVehicleId", "transporter_vehicle")
                .where("milk_dispatch.TransporterVehicleId =:vehicleNo", {
                vehicleNo: model.vehicleId,
            })
                .andWhere("DATE(milk_dispatch.CreatedAt) >=:fromDate", {
                fromDate: model.fromDate,
            })
                .andWhere("DATE(milk_dispatch.CreatedAt) <=:toDate", {
                toDate: model.toDate,
            })
                .getMany();
            console.log("milkDispatch: ", milkDispatch);
            const rateMaster = yield DbConnection_1.AppDataSource.getRepository(entities.RateMaster)
                .createQueryBuilder("ratemaster")
                .where("ratemaster.Wef < :currDate", { currDate: new Date() })
                .orderBy("ratemaster.SeqNo", "DESC")
                .getMany();
            factoryFatSnfDetails = yield DbConnection_1.AppDataSource.getRepository(entities.CompositeSampleTest)
                .createQueryBuilder("composite_sample_test")
                .where("composite_sample_test.VehicleNo =:vehicleNo", {
                vehicleNo: model.vehicleId,
            })
                .andWhere("DATE(composite_sample_test.CreatedAt) >=:fromDate", {
                fromDate: model.fromDate,
            })
                .andWhere("DATE(composite_sample_test.CreatedAt) <=:toDate", {
                toDate: model.toDate,
            })
                .getMany();
            console.log("factoryFatSnfDetails: ", factoryFatSnfDetails);
            for (let i = 0; i < weighBridge.length; i++) {
                let transitLossGainDetails = {
                    SN: 0,
                    vehicle: {},
                    ReportDate: Date,
                    Bmc: "",
                    ReceiptFat: 0,
                    ReceiptSnf: 0,
                    ReceiptnetWeight: 0,
                    TankerDispatchfat: 0,
                    TankerDispatchSnf: 0,
                    TankerDispatchnetWeight: 0,
                    FactoryReceiptfat: 0,
                    FactoryReceiptSnf: 0,
                    FactoryReceiptWeight: 0,
                };
                transitLossGainDetails.SN = i + 1;
                transitLossGainDetails.vehicle = (_a = weighBridge[i]) === null || _a === void 0 ? void 0 : _a.VehicleNo;
                transitLossGainDetails.FactoryReceiptWeight =
                    (_b = weighBridge[i]) === null || _b === void 0 ? void 0 : _b.NetWeightKg.toFixed(2);
                transitLossGainDetails.ReportDate = (0, moment_1.default)((_c = weighBridge[i]) === null || _c === void 0 ? void 0 : _c.CreatedAt).format("YYYY-MM-DD");
                transitLossGainDetails.Bmc = weighBridge[i].SupplierName;
                transitLossGainDetails.FactoryReceiptfat =
                    (_d = factoryFatSnfDetails[i]) === null || _d === void 0 ? void 0 : _d.Fat.toFixed(2);
                transitLossGainDetails.FactoryReceiptSnf =
                    (_e = factoryFatSnfDetails[i]) === null || _e === void 0 ? void 0 : _e.Snf.toFixed(2);
                //const getMilkCollection = await AppDataSource.getRepository(
                //  entities.MilkCollections
                //)
                //  .createQueryBuilder("milk_collection")
                //  .leftJoinAndSelect(
                //    "milk_collection.MilkDispatchId",
                //    "milk_collection_details"
                //  )
                //  .where("milk_collection.MilkDispatchId =:id", {
                //    id: milkDispatch[i]?.Id,
                //  })
                //  .andWhere("DATE(milk_collection.CreatedAt) >=:fromDate", {
                //    fromDate: model.fromDate,
                //  })
                //  .andWhere("DATE(milk_collection.CreatedAt) <=:toDate", {
                //    toDate: model.toDate,
                //  })
                //  .getMany();
                const getMilkCollection = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollections)
                    .createQueryBuilder("milk_collection")
                    .where("milk_collection.MilkDispatchId = :id", {
                    id: (_f = milkDispatch[i]) === null || _f === void 0 ? void 0 : _f.Id,
                })
                    .andWhere("DATE(milk_collection.CreatedAt) >= :fromDate", {
                    fromDate: model.fromDate,
                })
                    .andWhere("DATE(milk_collection.CreatedAt) <= :toDate", {
                    toDate: model.toDate,
                })
                    .getMany();
                let avgWeight = 0;
                let totalFatWeight = 0;
                let totalSnfWeight = 0;
                for (let m = 0; m < getMilkCollection.length; m++) {
                    if (((_g = getMilkCollection[i]) === null || _g === void 0 ? void 0 : _g.MilkDispatchId) == ((_h = milkDispatch[i]) === null || _h === void 0 ? void 0 : _h.Id)) {
                        //   console.log(m, "this is m");
                        transitLossGainDetails.TankerDispatchnetWeight =
                            (_j = milkDispatch[i]) === null || _j === void 0 ? void 0 : _j.Weight.toFixed(2);
                        transitLossGainDetails.TankerDispatchfat =
                            (_k = milkDispatch[i]) === null || _k === void 0 ? void 0 : _k.EndFat.toFixed(2);
                        transitLossGainDetails.TankerDispatchSnf =
                            (_l = milkDispatch[i]) === null || _l === void 0 ? void 0 : _l.EndSnf.toFixed(2);
                        const getMilkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails)
                            .createQueryBuilder("milk_collection_details")
                            .where("milk_collection_details.MilkCollectionId =:id", {
                            id: (_m = getMilkCollection[m]) === null || _m === void 0 ? void 0 : _m.Id,
                        })
                            .getMany();
                        // let avgSnf = 0;
                        // let avgFat = 0;
                        for (let j = 0; j < getMilkCollectionDetails.length; j++) {
                            // avgWeight += getMilkCollectionDetails[j]?.Weight;
                            // avgFat += getMilkCollectionDetails[j]?.Fat;
                            // avgSnf += getMilkCollectionDetails[j]?.Snf;
                            const detail = getMilkCollectionDetails[j];
                            avgWeight += detail.Weight;
                            totalFatWeight += (detail.Weight / 100) * detail.Fat;
                            totalSnfWeight += (detail.Weight / 100) * detail.Snf;
                        }
                        // transitLossGainDetails.ReceiptnetWeight = avgWeight.toFixed(2) ;
                        // transitLossGainDetails.ReceiptFat = (avgFat / getMilkCollectionDetails.length).toFixed(2);
                        // transitLossGainDetails.ReceiptSnf = (avgSnf / getMilkCollectionDetails.length).toFixed(2);
                        transitLossGainDetails.ReceiptnetWeight = avgWeight.toFixed(2);
                        // transitLossGainDetails.ReceiptFat = (
                        //   avgFat / getMilkCollectionDetails.length
                        // ).toFixed(2);
                        // transitLossGainDetails.ReceiptSnf = (
                        //   avgSnf / getMilkCollectionDetails.length
                        // ).toFixed(2);
                        transitLossGainDetails.ReceiptFat = ((totalFatWeight / avgWeight) * 100).toFixed(2);
                        transitLossGainDetails.ReceiptSnf = ((totalSnfWeight / avgWeight) * 100).toFixed(2);
                    }
                }
                transitLossgainData.push(transitLossGainDetails);
            }
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: transitLossgainData,
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
exports.GetTransitLossGainReports = GetTransitLossGainReports;
function CreateWeighBridge(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const vehicleNo = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles)
                .createQueryBuilder("transporter_vehicle")
                .where("transporter_vehicle.Id = :id", { id: model.vehicleNo })
                .getOne();
            const routeId = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                .createQueryBuilder("route_master")
                .where("route_master.Id = :id", { id: model.routeId })
                .getOne();
            const productCategory = yield DbConnection_1.AppDataSource.getRepository(entities.ProductCategory)
                .createQueryBuilder("product_category")
                .where("product_category.Id = :id", { id: model.productCategory })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.WeighBridge);
            const weighBridge = new entities.WeighBridge();
            if (vehicleNo) {
                weighBridge.VehicleNo = vehicleNo;
            }
            if (routeId) {
                weighBridge.RouteId = routeId;
            }
            if (productCategory) {
                weighBridge.ProductCategory = productCategory;
            }
            weighBridge.WeighbridgeNo = model.weighbridgeNo
                ? model.weighbridgeNo
                : weighBridge.WeighbridgeNo;
            // weighBridge.ContractorCode = model.contractorCode ? model.contractorCode : weighBridge.ContractorCode;
            weighBridge.ContractorName = model.contractorName
                ? model.contractorName
                : weighBridge.ContractorName;
            weighBridge.ChallanNo = model.challanNo
                ? model.challanNo
                : weighBridge.ChallanNo;
            // weighBridge.DriverName = model.driverName ? model.driverName : weighBridge.DriverName;
            // weighBridge.ContactPerson = model.contactPerson ? model.contactPerson : weighBridge.ContactPerson;
            weighBridge.Destination = model.destination
                ? model.destination
                : weighBridge.Destination;
            weighBridge.Purpose = model.purpose ? model.purpose : weighBridge.Purpose;
            weighBridge.SupplierName = model.supplierName
                ? model.supplierName
                : weighBridge.SupplierName;
            weighBridge.ProductName = model.productName
                ? model.productName
                : weighBridge.ProductName;
            weighBridge.WeightMode = model.weightMode
                ? model.weightMode
                : weighBridge.WeightMode;
            weighBridge.TareWeight = model.tareWeight
                ? model.tareWeight
                : weighBridge.TareWeight;
            weighBridge.TareDate = model.tareDate
                ? model.tareDate
                : weighBridge.TareDate;
            weighBridge.GrossWeight = model.grossWeight
                ? model.grossWeight
                : weighBridge.GrossWeight;
            weighBridge.GrossDate = model.grossDate
                ? model.grossDate
                : weighBridge.GrossDate;
            weighBridge.NetWeightKg = model.netWeightKg
                ? model.netWeightKg
                : weighBridge.NetWeightKg;
            weighBridge.SupplyQty = model.supplyQty
                ? model.supplyQty
                : weighBridge.SupplyQty;
            weighBridge.Remarks = model.remarks ? model.remarks : weighBridge.Remarks;
            // weighBridge.Temparature = model.temparature ? model.temparature : weighBridge.Temparature;
            // weighBridge.Fat = model.fat ? model.fat : weighBridge.Fat;
            // weighBridge.Snf = model.snf ? model.snf : weighBridge.Snf;
            // weighBridge.Acidity = model.acidity ? model.acidity : weighBridge.Acidity;
            weighBridge.IsActive = true;
            weighBridge.CreatedAt = new Date();
            weighBridge.CreatedBy = userId;
            yield repository.save(weighBridge);
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
exports.CreateWeighBridge = CreateWeighBridge;
function CreateWeighBridgeVehicle(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const transporterRepo = DbConnection_1.AppDataSource.getRepository(entities.Transporters);
            const transporter = new entities.Transporters();
            const bank = yield DbConnection_1.AppDataSource.getRepository(entities.Bank)
                .createQueryBuilder("bank")
                .where("bank.id = :id", { id: 1 })
                .getOne();
            transporter.FirmName = model.contractorName;
            transporter.Code = "other";
            transporter.ContactPersonName = model.contractorName;
            transporter.MobileNo = "1234567890";
            transporter.EmailId = "othertransporter@gmail.com";
            transporter.AddressLine1 = "bihar";
            transporter.AddressLine2 = "brgusarai";
            transporter.State = 1;
            transporter.District = 1;
            transporter.Vtc = 1;
            transporter.Pincode = "123456";
            transporter.Geocode = "123456";
            transporter.AadhaarNo = "456780853354";
            transporter.PanNo = "PAN5322451";
            if (bank) {
                transporter.BankId = bank;
            }
            transporter.BankAcNo = "1234567890";
            transporter.BankAcName = "SBI";
            transporter.BankIfscCode = "SBIN214312";
            transporter.IsActive = true;
            transporter.CreatedAt = new Date();
            transporter.CreatedBy = userId;
            yield transporterRepo.save(transporter);
            const newTransporter = yield DbConnection_1.AppDataSource.getRepository(entities.Transporters)
                .createQueryBuilder("transporter")
                .where("transporter.FirmName = :firmName", {
                firmName: model.contractorName,
            })
                .getOne();
            const vehicleRepo = DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles);
            const vehicle = new entities.TransporterVehicles();
            vehicle.IsFoodTransportVehicle = true;
            vehicle.VehicleType = "any";
            if (newTransporter) {
                vehicle.TransporterId = newTransporter;
            }
            if (typeof model.vehicleNo == "string") {
                vehicle.RegistrationNo = model.vehicleNo;
            }
            vehicle.Make = "any";
            vehicle.Model = "any";
            vehicle.Capacity = BigInt(1000);
            vehicle.FSSAILicNo = "any";
            vehicle.FSSAILicExpiryDate = new Date();
            vehicle.Insurance = "any";
            vehicle.InsuranceExpiryDate = new Date();
            vehicle.CreatedAt = new Date();
            vehicle.CreatedBy = userId;
            yield vehicleRepo.save(vehicle);
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
exports.CreateWeighBridgeVehicle = CreateWeighBridgeVehicle;
function UpdateWeighBridge(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const vehicleNo = yield DbConnection_1.AppDataSource.getRepository(entities.TransporterVehicles)
                .createQueryBuilder("transporter_vehicle")
                .where("transporter_vehicle.Id = :id", { id: model.vehicleNo })
                .getOne();
            const routeId = yield DbConnection_1.AppDataSource.getRepository(entities.RouteMaster)
                .createQueryBuilder("route_master")
                .where("route_master.Id = :id", { id: model.routeId })
                .getOne();
            const productCategory = yield DbConnection_1.AppDataSource.getRepository(entities.ProductCategory)
                .createQueryBuilder("product_category")
                .where("product_category.Id = :id", { id: model.productCategory })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.WeighBridge);
            const weighBridge = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (weighBridge) {
                if (vehicleNo) {
                    weighBridge.VehicleNo = vehicleNo;
                }
                if (routeId) {
                    weighBridge.RouteId = routeId;
                }
                if (productCategory) {
                    weighBridge.ProductCategory = productCategory;
                }
                weighBridge.WeighbridgeNo = model.weighbridgeNo
                    ? model.weighbridgeNo
                    : weighBridge.WeighbridgeNo;
                // weighBridge.ContractorCode = model.contractorCode ? model.contractorCode : weighBridge.ContractorCode;
                weighBridge.ContractorName = model.contractorName
                    ? model.contractorName
                    : weighBridge.ContractorName;
                weighBridge.ChallanNo = model.challanNo
                    ? model.challanNo
                    : weighBridge.ChallanNo;
                // weighBridge.DriverName = model.driverName ? model.driverName : weighBridge.DriverName;
                // weighBridge.ContactPerson = model.contactPerson ? model.contactPerson : weighBridge.ContactPerson;
                weighBridge.Destination = model.destination
                    ? model.destination
                    : weighBridge.Destination;
                weighBridge.Purpose = model.purpose ? model.purpose : weighBridge.Purpose;
                weighBridge.SupplierName = model.supplierName
                    ? model.supplierName
                    : weighBridge.SupplierName;
                weighBridge.ProductName = model.productName
                    ? model.productName
                    : weighBridge.ProductName;
                weighBridge.WeightMode = model.weightMode
                    ? model.weightMode
                    : weighBridge.WeightMode;
                weighBridge.TareWeight = model.tareWeight
                    ? model.tareWeight
                    : weighBridge.TareWeight;
                weighBridge.TareDate = model.tareDate
                    ? model.tareDate
                    : weighBridge.TareDate;
                weighBridge.GrossWeight = model.grossWeight
                    ? model.grossWeight
                    : weighBridge.GrossWeight;
                weighBridge.GrossDate = model.grossDate
                    ? model.grossDate
                    : weighBridge.GrossDate;
                weighBridge.NetWeightKg = model.netWeightKg
                    ? model.netWeightKg
                    : weighBridge.NetWeightKg;
                weighBridge.SupplyQty = model.supplyQty
                    ? model.supplyQty
                    : weighBridge.SupplyQty;
                weighBridge.Remarks = model.remarks ? model.remarks : weighBridge.Remarks;
                // weighBridge.Temparature = model.temparature ? model.temparature : weighBridge.Temparature;
                // weighBridge.Fat = model.fat ? model.fat : weighBridge.Fat;
                // weighBridge.Snf = model.snf ? model.snf : weighBridge.Snf;
                // weighBridge.Acidity = model.acidity ? model.acidity : weighBridge.Acidity;
                weighBridge.ModifiedAt = new Date();
                weighBridge.ModifiedBy = userId;
                yield repository.save(weighBridge);
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
exports.UpdateWeighBridge = UpdateWeighBridge;
function DeleteWeighBridge(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.WeighBridge);
            // console.log("repository: ", repository);
            const weighBridge = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (weighBridge) {
                weighBridge.IsActive = false;
                weighBridge.DeletedAt = new Date();
                weighBridge.DeletedBy = userId;
                yield repository.save(weighBridge);
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
exports.DeleteWeighBridge = DeleteWeighBridge;
