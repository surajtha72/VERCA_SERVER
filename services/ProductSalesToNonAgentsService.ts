import { AppDataSource } from "../db-config/DbConnection";
import * as entities from "../entities/Context";
const jwt = require("jsonwebtoken");
import { Request } from "express";
import dotenv from "dotenv";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import { CreateProductSalesToNonAgentsModel, DeleteProductSalesToNonAgentsModel, GetProductSalesToNonAgentsModel, UpdateProductSalesToNonAgentsModel } from "../models/ProductSalesToNonAgentsModel";
import { CreateProductsSoldToNonAgentsOTPModel, GetProductsSoldToNonAgentsOTPModel } from "../models/ProductSoldToNonAgentsModelOTP";
dotenv.config();
import * as https from 'https';
import * as http from 'http';
import moment from "moment";
import { calculateValue } from "../utils/MilkValueCalculator";

const ERROR_MESSAGES = {
    NO_DATA: "No Data",
    INTERNAL_SERVER: "Internal Server Error",
};

const SUCCESS_MESSAGES = {
    SUCCESS: "Success",
    ADD_SUCCESS: "Added Successfully",
    UPDATE_SUCCESS: "Updated Successfully",
    UPDATE_SUCCESS_DISPATCH: "Dispatched Successfully",
    UPDATE_SUCCESS_RECEIVED: "Received Successfully",
    DELETE_SUCCESS: "Deleted Successfully",
};

async function GetProductSalesToNonAgents(model: any):
    Promise<ServiceResponse<GetProductSalesToNonAgentsModel[]>> {
    try {
        let productSalesToNonAgents;
        if (model.startDate && model.endDate && model.bmcId) {
            productSalesToNonAgents = await AppDataSource.getRepository(entities.ProductSalesToNonAgents)
                .createQueryBuilder("productSalesToFarer")
                .leftJoinAndSelect("productSalesToNonAgents.SoldToNonAgents", "productSoldToNonAgents")
                .where("DATE(productSalesToNonAgents.CreatedAt) >= :startDate", { startDate: model.startDate })
                .andWhere("DATE(productSalesToNonAgents.CreatedAt) <= :endDate", { endDate: model.endDate })
                .andWhere("productSoldToNonAgents.ParentId =:bmcId", { bmcId: model.bmcId })
                .getMany();
        } else if (model.startDate && model.endDate) {
            productSalesToNonAgents = await AppDataSource.getRepository(entities.ProductSalesToNonAgents)
                .createQueryBuilder("productSalesToNonAgents")
                .leftJoinAndSelect("productSalesToNonAgents.SoldToAgent", "productSoldToNonAgents")
                .where("DATE(productSalesToNonAgents.CreatedAt) >= :startDate", { startDate: model.startDate })
                .andWhere("DATE(productSalesToNonAgents.CreatedAt) <= :endDate", { endDate: model.endDate })
                .getMany();

        } else {
            productSalesToNonAgents = await AppDataSource.getRepository(entities.ProductSalesToNonAgents)
                .createQueryBuilder("productSalesToNonAgents")
                .leftJoinAndSelect("productSalesToNonAgents.SoldToAgent", "productSoldToNonAgents")
                .getMany();
        }

        const soldProductsData: GetProductSalesToNonAgentsModel[] = productSalesToNonAgents.map(
            (productsSold) => ({
                id: productsSold.Id,
                invoiceNumber: productsSold.InvoiceNumber,
                soldToNonAgents: productsSold.SoldToNonAgents,
                totalAmount: productsSold.TotalAmount,
                paymentMode: productsSold.PaymentMode,
                paidAmount: productsSold.PaidAmount,
                balance: productsSold.Balance,
            })
        );
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: soldProductsData
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null
        }
    }
}

async function CreateProductsSalesToNonAgents(
    req: Request,
    model: CreateProductSalesToNonAgentsModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const soldToNonAgents = await AppDataSource.getRepository(entities.Organization)
            .createQueryBuilder("organization")
            .where("organization.Id =:id", { id: model.soldToNonAgents })
            .getOne();

        const repository = AppDataSource.getRepository(entities.ProductSalesToNonAgents);
        const productSalesToNonAgents = new entities.ProductSalesToNonAgents();
        if (soldToNonAgents) {
            productSalesToNonAgents.SoldToNonAgents = soldToNonAgents
        }
        productSalesToNonAgents.InvoiceNumber = model.invoiceNumber;
        productSalesToNonAgents.PaidAmount = model.paidAmount;
        productSalesToNonAgents.PaymentMode = model.paymentMode;
        productSalesToNonAgents.TotalAmount = model.totalAmount;
        productSalesToNonAgents.Balance = model.balance;
        productSalesToNonAgents.CreatedBy = userId;
        if (model.createdAt) {
            productSalesToNonAgents.CreatedAt = model.createdAt;
        } else {
            productSalesToNonAgents.CreatedAt = new Date();
        }

        await repository.save(productSalesToNonAgents);
        // console.log(model)

        if (model.soldProducts) {
            const soldProductsRepository = AppDataSource.getRepository(entities.ProductsSoldToNonAgents);
            for (const products of model.soldProducts) {

                const productMaster = await AppDataSource.getRepository(entities.ProductMaster)
                    .createQueryBuilder("product")
                    .where("product.Id =:id", { id: products.productId })
                    .getOne();
                const product = new entities.ProductsSoldToNonAgents();
                if (productMaster) {
                    product.ProductId = productMaster;
                }
                product.ProductSalesToNonAgents = productSalesToNonAgents;
                product.Quantity = products.quantity;
                product.Rate = products.rate;
                product.CreatedBy = userId;
                product.CreatedAt = new Date();
                await soldProductsRepository.save(product);
            }

            const otpRepo = AppDataSource.getRepository(entities.ProductSoldToAgentOTP)
            const otp = await otpRepo.findOne({
                where: { SoldToAgentId: model?.soldToNonAgents?.Id }
            })
            if (otp) {
                await otpRepo.remove(otp);
            }
        }
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: null
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null
        }
    }
}

async function UpdateProductSalesToNonAgents(
    req: Request,
    model: UpdateProductSalesToNonAgentsModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const saleRepo = AppDataSource.getRepository(entities.ProductSalesToNonAgents);
        const sale = await saleRepo.findOne({
            where: { Id: model.id ?? 0 },
        });
        if (sale) {
            sale.InvoiceNumber = model.invoiceNumber ? model.invoiceNumber : sale.InvoiceNumber;
            sale.SoldToNonAgents = model.soldToNonAgents ? model.soldToNonAgents : sale.SoldToNonAgents;
            sale.TotalAmount = model.totalAmount ? model.totalAmount : sale.TotalAmount;
            sale.PaymentMode = model.paymentMode ? model.paymentMode : sale.PaymentMode;
            sale.PaidAmount = model.paidAmount ? model.paidAmount : sale.PaidAmount;
            sale.Balance = model.balance ? model.balance : sale.Balance;
            sale.ModifiedAt = new Date();
            sale.ModifiedBy = userId;
            await saleRepo.save(sale);
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

async function GetOTP(model: any):
    Promise<ServiceResponse<any>> {
    try {
        let otp;
        otp = await AppDataSource.getRepository(entities.ProductSoldToNonAgentsOTP)
            .createQueryBuilder("otp")
            .where("otp.SoldToNonAgentsId =:id", { id: model.soldToNonAgentsId })
            .andWhere("otp.Otp =:otp", { otp: model.otp })
            .getOne();
        return {
            status: otp ? 200 : 404,
            message: otp ? SUCCESS_MESSAGES.SUCCESS : 'Wrong OTP',
            data: null
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null
        }
    }
}

async function CreateOTP(
    req: Request,
    model: CreateProductsSoldToNonAgentsOTPModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const otp = 100000 + Math.floor(Math.random() * 900000);
        const agentRepo = AppDataSource.getRepository(entities.Organization)
        const agent = await agentRepo.findOne({
            where: { Id: model?.soldToNonAgentsId }
        })
        console.log('otp : ', otp);
        console.log('agent : ', agent)
        const repository = AppDataSource.getRepository(entities.ProductSoldToNonAgentsOTP);
        const otpRepo = new entities.ProductSoldToNonAgentsOTP();
        otpRepo.SoldToNonAgentsId = model.soldToNonAgentsId;
        otpRepo.Otp = otp;
        console.log("amount : ", model.amount);
        const username = 'UVBEkr810UN8QeYybMGW';
        const password = 'aErfm0LJRnlYbVSm72tmdlwkTcRNP1TaYLtJS1GF';
        const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');


        const postData = JSON.stringify({
            "Text": `Dear, ${model.soldToNonAgentsId}, Your OTP for the product acceptance Amt. ${model.amount} is ${otp}. - GANGA DAIRY LTD `,
            "Number": `91${agent?.PhoneNumber}`,
            "SenderId": "GADLTD",
            "DRNotifyUrl": "https://www.domainname.com/notifyurl",
            "DRNotifyHttpMethod": "POST",
            "Tool": "API"
        });


        const options = {
            method: 'POST',
            hostname: 'restapi.smscountry.com',
            path: '/v0.1/Accounts/UVBEkr810UN8QeYybMGW/SMSes/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        console.log('postData:', postData);
        console.log('options:', options);

        const request = https.request(options, (res: http.IncomingMessage) => {
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk;
            });

            res.on('end', () => {
                console.log('Response:', responseBody);
            });
        });

        request.on('error', (error) => {
            console.error('Error:', error);
        });
        console.log('request : ', request);
        request.write(postData);
        request.end();

        await repository.save(otpRepo);
        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: null
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null
        }
    }
}

async function DeleteProductSalesToNonAgents(
    req: Request,
    model: DeleteProductSalesToNonAgentsModel
): Promise<ServiceResponse<APIResponse[]>> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const repository = AppDataSource.getRepository(entities.ProductSalesToNonAgents);
        const state = await repository.findOne({
            where: { Id: model.id ?? 0 },
        });
        if (state) {
            await repository.remove(state);

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

async function GetTotalBalance(model: any):
    Promise<ServiceResponse<any>> {
        try {
        const currentDate = new Date();
        const date = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const Getdates = () => {
            let startdate;
            let enddate;

            if (date <= 30 && date >= 21) {
                enddate = new Date(year, month - 1, 20);
                startdate = new Date(year, month - 2, 20);
            }
            if (date <= 20 && date >= 11) {
                enddate = new Date(year, month - 1, 10);
                startdate = new Date(year, month - 2, 10);
            }
            if (date <= 1 && date >= 10) {
                enddate = new Date(year, month - 2, 30);
                startdate = new Date(year, month - 3, 30);
            }
            return { startdate, enddate };
        }


        let dateDetails = Getdates();
        console.log(dateDetails);


        console.log('model ', model);



        let productSalesToAgent = await AppDataSource.getRepository(entities.ProductSalesToAgent)
            .createQueryBuilder("productSalesToAgent")
            .leftJoinAndSelect("productSalesToAgent.SoldToAgent", "productSoldToAgent")
            .where("DATE(productSalesToAgent.CreatedAt) >= :startDate", { startDate: moment(dateDetails.startdate).format('YYYY-MM-DD') })
            .andWhere("DATE(productSalesToAgent.CreatedAt) <= :endDate", { endDate: moment(dateDetails.enddate).format('YYYYY-MM-DD') })
            .andWhere("productSalesToAgent.SoldToAgent =:SoldToAgent", { SoldToAgent: model.organizationUnitId })
            .getMany();

        const milkCollectionDetails = await AppDataSource.getRepository(entities.MilkCollectionDetails).createQueryBuilder("milkCollectionDetails")
            .leftJoinAndSelect("milkCollectionDetails.OrganizationUnitId", "organization")
            .where("DATE(milkCollectionDetails.CollectedAt) >= :startDate", { startDate: moment(dateDetails.startdate).format('YYYY-MM-DD') })
            .andWhere("DATE(milkCollectionDetails.CollectedAt) <= :endDate", { endDate: moment(dateDetails.enddate).format('YYYY-MM-DD') })
            .andWhere("milkCollectionDetails.OrganizationUnitId =:OrganizationUnitId", { OrganizationUnitId: model.organizationUnitId })
            .getMany();


        const rateMaster = await AppDataSource.getRepository(entities.RateMaster)
            .createQueryBuilder("ratemaster")
            .where("ratemaster.Wef < :currDate", { currDate: new Date() })
            .andWhere("ratemaster.IsActive =:isActive", { isActive: true })
            .orderBy("ratemaster.SeqNo", "ASC")
            .getMany();


        let totalProductValue = 0;
        let totalMilkValue = 0;
        console.log('milk collection details : ', milkCollectionDetails)
        console.log('milk products bougt details : ', milkCollectionDetails)

        productSalesToAgent.forEach(element => {
            // console.log('Balance:',element.Balance);
            totalProductValue += element.Balance;
        });


        milkCollectionDetails.forEach(element => {
            let value = calculateValue(element.Fat, element.Snf, rateMaster);
            // console.log('vales:',value,element.Weight+value);
            totalMilkValue += element.Weight * value
        });

        console.log('total mmilk value  : ', totalMilkValue)
        let result = { balance: totalMilkValue - totalProductValue }

        // console.log("For ID :",req.params.id,"MilkValue:",TotalMilkValue,'Productvalue:',TotalProductValue);

        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: result,
        };

    } catch (e) {
        console.error(e); // Log the actual error
        console.log(e);
        return {
            status: 400,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null,
        };

    }
}

export { GetProductSalesToNonAgents, CreateProductsSalesToNonAgents, CreateOTP, GetOTP, UpdateProductSalesToNonAgents, DeleteProductSalesToNonAgents, GetTotalBalance }