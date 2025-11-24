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
exports.DeleteCompositeSampleTest = exports.UpdateCompositeSampleTest = exports.CreateCompositeSampleTest = exports.GetCompositeSampleTest = void 0;
const DbConnection_1 = require("../db-config/DbConnection");
const entities = __importStar(require("../entities/Context"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
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
function GetCompositeSampleTest(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let composite;
            if (model.vehicleNo && model.routeId && model.productCategory) {
                composite = yield DbConnection_1.AppDataSource.getRepository(entities.CompositeSampleTest)
                    .createQueryBuilder("composite")
                    .leftJoinAndSelect("composite.VehicleNo", "transporter_vehicle")
                    .leftJoinAndSelect("composite.RouteId", "route_master")
                    .leftJoinAndSelect("composite.ProductCategory", "product_category")
                    .where("transporter_vehicle.Id = :id", { id: model.vehicleNo })
                    .andWhere("route_master.Id = :routeId", { routeId: model.routeId })
                    .andWhere("product_category.Id = :productCategory", { productCategory: model.productCategory })
                    .andWhere("composite.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else if (model.testDate) {
                // console.log(model.testDate)
                composite = yield DbConnection_1.AppDataSource.getRepository(entities.CompositeSampleTest)
                    .createQueryBuilder("composite")
                    .leftJoinAndSelect("composite.VehicleNo", "transporter_vehicle")
                    .leftJoinAndSelect("composite.RouteId", "route_master")
                    .leftJoinAndSelect("composite.ProductCategory", "product_category")
                    .where("DATE(composite.TestDate) =:testDate", { testDate: model.testDate })
                    .andWhere("composite.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            else {
                composite = yield DbConnection_1.AppDataSource.getRepository(entities.CompositeSampleTest)
                    .createQueryBuilder("composite")
                    .leftJoinAndSelect("composite.VehicleNo", "transporter_vehicle")
                    .leftJoinAndSelect("composite.RouteId", "route_master")
                    .leftJoinAndSelect("composite.ProductCategory", "product_category")
                    .where("composite.IsActive = :isActive", { isActive: true })
                    .getMany();
            }
            // console.log(composite);
            const compositeData = composite.map((composite) => ({
                id: composite.Id,
                vehicleNo: composite.VehicleNo,
                productCategory: composite.ProductCategory,
                productName: composite.ProductName,
                routeId: composite.RouteId,
                testDate: composite.TestDate,
                fat: composite.Fat,
                snf: composite.Snf,
                clr: composite.Clr,
                protein: composite.Protein,
                lactose: composite.Lactose,
                salt: composite.Salt,
                water: composite.water,
                temperature: composite.Temperature,
                analyst: composite.Analyst,
                // sampledBy: composite.SampledBy,
                status: composite.Status,
                remarks: composite.Remarks,
                isActive: composite.IsActive
            }));
            // console.log(compositeData);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: compositeData,
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
exports.GetCompositeSampleTest = GetCompositeSampleTest;
function CreateCompositeSampleTest(req, model) {
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
            const repository = DbConnection_1.AppDataSource.getRepository(entities.CompositeSampleTest);
            const composite = new entities.CompositeSampleTest();
            if (vehicleNo) {
                composite.VehicleNo = vehicleNo;
            }
            if (routeId) {
                composite.RouteId = routeId;
            }
            if (productCategory) {
                composite.ProductCategory = productCategory;
            }
            composite.ProductName = model.productName ? model.productName : composite.ProductName;
            composite.TestDate = model.testDate ? model.testDate : composite.TestDate;
            composite.Fat = model.fat ? model.fat : composite.Fat;
            composite.Snf = model.snf ? model.snf : composite.Snf;
            composite.Clr = model.clr ? model.clr : composite.Clr;
            composite.Protein = model.protein ? model.protein : composite.Protein;
            composite.Lactose = model.lactose ? model.lactose : composite.Lactose;
            composite.Salt = model.salt ? model.salt : composite.Salt;
            composite.water = model.water ? model.water : composite.water;
            composite.Temperature = model.temperature ? model.temperature : composite.Temperature;
            composite.Analyst = model.analyst ? model.analyst : composite.Analyst;
            // composite.SampledBy = model.sampledBy ? model.sampledBy : composite.SampledBy;
            composite.Status = model.status ? model.status : composite.Status;
            composite.Remarks = model.remarks ? model.remarks : composite.Remarks;
            composite.IsActive = true;
            composite.CreatedAt = new Date();
            composite.CreatedBy = userId;
            yield repository.save(composite);
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
exports.CreateCompositeSampleTest = CreateCompositeSampleTest;
function UpdateCompositeSampleTest(req, model) {
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
            const repository = DbConnection_1.AppDataSource.getRepository(entities.CompositeSampleTest);
            const composite = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (composite) {
                if (vehicleNo) {
                    composite.VehicleNo = vehicleNo;
                }
                if (routeId) {
                    composite.RouteId = routeId;
                }
                if (productCategory) {
                    composite.ProductCategory = productCategory;
                }
                composite.ProductName = model.productName ? model.productName : composite.ProductName;
                composite.TestDate = model.testDate ? model.testDate : composite.TestDate;
                composite.Fat = model.fat ? model.fat : composite.Fat;
                composite.Snf = model.snf ? model.snf : composite.Snf;
                composite.Clr = model.clr ? model.clr : composite.Clr;
                composite.Protein = model.protein ? model.protein : composite.Protein;
                composite.Lactose = model.lactose ? model.lactose : composite.Lactose;
                composite.Salt = model.salt ? model.salt : composite.Salt;
                composite.water = model.water ? model.water : composite.water;
                composite.Temperature = model.temperature ? model.temperature : composite.Temperature;
                composite.Analyst = model.analyst ? model.analyst : composite.Analyst;
                // composite.SampledBy = model.sampledBy ? model.sampledBy : composite.SampledBy;
                composite.Status = model.status ? model.status : composite.Status;
                composite.Remarks = model.remarks ? model.remarks : composite.Remarks;
                composite.ModifiedAt = new Date();
                composite.ModifiedBy = userId;
                yield repository.save(composite);
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
exports.UpdateCompositeSampleTest = UpdateCompositeSampleTest;
function DeleteCompositeSampleTest(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.CompositeSampleTest);
            // console.log("repository: ", repository);
            const composite = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (composite) {
                composite.IsActive = false;
                composite.DeletedAt = new Date();
                composite.DeletedBy = userId;
                yield repository.save(composite);
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
exports.DeleteCompositeSampleTest = DeleteCompositeSampleTest;
