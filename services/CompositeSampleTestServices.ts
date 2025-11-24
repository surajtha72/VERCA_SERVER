import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import {
    AllCompositeSampleTestModel,
    CreateCompositeSampleTestModel,
    DeleteCompositeSampleTestModel,
    UpdateCompositeSampleTestModel,
} from "../models/CompositeSampleTestModel";
dotenv.config();

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

async function GetCompositeSampleTest(
    model?: any
): Promise<ServiceResponse<AllCompositeSampleTestModel[]>> {
    try {
        let composite;
        if (model.vehicleNo && model.routeId && model.productCategory) {
            composite = await AppDataSource.getRepository(entities.CompositeSampleTest)
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
            composite = await AppDataSource.getRepository(entities.CompositeSampleTest)
                .createQueryBuilder("composite")
                .leftJoinAndSelect("composite.VehicleNo", "transporter_vehicle")
                .leftJoinAndSelect("composite.RouteId", "route_master")
                .leftJoinAndSelect("composite.ProductCategory", "product_category")
                .where("DATE(composite.TestDate) =:testDate", { testDate: model.testDate })
                .andWhere("composite.IsActive = :isActive", { isActive: true })
                .getMany();
        } else {
            composite = await AppDataSource.getRepository(entities.CompositeSampleTest)
                .createQueryBuilder("composite")
                .leftJoinAndSelect("composite.VehicleNo", "transporter_vehicle")
                .leftJoinAndSelect("composite.RouteId", "route_master")
                .leftJoinAndSelect("composite.ProductCategory", "product_category")
                .where("composite.IsActive = :isActive", { isActive: true })
                .getMany();
        }
        // console.log(composite);
        const compositeData: AllCompositeSampleTestModel[] = composite.map(
            (composite) => ({
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
            })
        );
        // console.log(compositeData);
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: compositeData,
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

async function CreateCompositeSampleTest(
    req: Request,
    model: CreateCompositeSampleTestModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const vehicleNo = await AppDataSource.getRepository(entities.TransporterVehicles)
            .createQueryBuilder("transporter_vehicle")
            .where("transporter_vehicle.Id = :id", { id: model.vehicleNo })
            .getOne();

        const routeId = await AppDataSource.getRepository(entities.RouteMaster)
            .createQueryBuilder("route_master")
            .where("route_master.Id = :id", { id: model.routeId })
            .getOne();

        const productCategory = await AppDataSource.getRepository(entities.ProductCategory)
            .createQueryBuilder("product_category")
            .where("product_category.Id = :id", { id: model.productCategory })
            .getOne();

        const repository = AppDataSource.getRepository(entities.CompositeSampleTest);
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
        await repository.save(composite);

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

async function UpdateCompositeSampleTest(
    req: Request,
    model: UpdateCompositeSampleTestModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const vehicleNo = await AppDataSource.getRepository(entities.TransporterVehicles)
            .createQueryBuilder("transporter_vehicle")
            .where("transporter_vehicle.Id = :id", { id: model.vehicleNo })
            .getOne();

        const routeId = await AppDataSource.getRepository(entities.RouteMaster)
            .createQueryBuilder("route_master")
            .where("route_master.Id = :id", { id: model.routeId })
            .getOne();

        const productCategory = await AppDataSource.getRepository(entities.ProductCategory)
            .createQueryBuilder("product_category")
            .where("product_category.Id = :id", { id: model.productCategory })
            .getOne();

        const repository = AppDataSource.getRepository(entities.CompositeSampleTest);
        const composite = await repository.findOne({
            where: { Id: model.id ?? 0 },
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
            await repository.save(composite);

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

async function DeleteCompositeSampleTest(
    req: Request,
    model: DeleteCompositeSampleTestModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const repository = AppDataSource.getRepository(entities.CompositeSampleTest);
        // console.log("repository: ", repository);
        const composite = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });
        if (composite) {
            composite.IsActive = false;
            composite.DeletedAt = new Date();
            composite.DeletedBy = userId;
            await repository.save(composite);

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

export { GetCompositeSampleTest, CreateCompositeSampleTest, UpdateCompositeSampleTest, DeleteCompositeSampleTest };
