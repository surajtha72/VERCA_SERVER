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
exports.GetTotalBalance = exports.DeleteProductSalesToNonAgents = exports.UpdateProductSalesToNonAgents = exports.GetOTP = exports.CreateOTP = exports.CreateProductsSalesToNonAgents = exports.GetProductSalesToNonAgents = void 0;
const DbConnection_1 = require("../db-config/DbConnection");
const entities = __importStar(require("../entities/Context"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const https = __importStar(require("https"));
const moment_1 = __importDefault(require("moment"));
const MilkValueCalculator_1 = require("../utils/MilkValueCalculator");
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
function GetProductSalesToNonAgents(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let productSalesToNonAgents;
            if (model.startDate && model.endDate && model.bmcId) {
                productSalesToNonAgents = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSalesToNonAgents)
                    .createQueryBuilder("productSalesToFarer")
                    .leftJoinAndSelect("productSalesToNonAgents.SoldToNonAgents", "productSoldToNonAgents")
                    .where("DATE(productSalesToNonAgents.CreatedAt) >= :startDate", { startDate: model.startDate })
                    .andWhere("DATE(productSalesToNonAgents.CreatedAt) <= :endDate", { endDate: model.endDate })
                    .andWhere("productSoldToNonAgents.ParentId =:bmcId", { bmcId: model.bmcId })
                    .getMany();
            }
            else if (model.startDate && model.endDate) {
                productSalesToNonAgents = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSalesToNonAgents)
                    .createQueryBuilder("productSalesToNonAgents")
                    .leftJoinAndSelect("productSalesToNonAgents.SoldToAgent", "productSoldToNonAgents")
                    .where("DATE(productSalesToNonAgents.CreatedAt) >= :startDate", { startDate: model.startDate })
                    .andWhere("DATE(productSalesToNonAgents.CreatedAt) <= :endDate", { endDate: model.endDate })
                    .getMany();
            }
            else {
                productSalesToNonAgents = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSalesToNonAgents)
                    .createQueryBuilder("productSalesToNonAgents")
                    .leftJoinAndSelect("productSalesToNonAgents.SoldToAgent", "productSoldToNonAgents")
                    .getMany();
            }
            const soldProductsData = productSalesToNonAgents.map((productsSold) => ({
                id: productsSold.Id,
                invoiceNumber: productsSold.InvoiceNumber,
                soldToNonAgents: productsSold.SoldToNonAgents,
                totalAmount: productsSold.TotalAmount,
                paymentMode: productsSold.PaymentMode,
                paidAmount: productsSold.PaidAmount,
                balance: productsSold.Balance,
            }));
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: soldProductsData
            };
        }
        catch (err) {
            console.log(err);
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null
            };
        }
    });
}
exports.GetProductSalesToNonAgents = GetProductSalesToNonAgents;
function CreateProductsSalesToNonAgents(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const soldToNonAgents = yield DbConnection_1.AppDataSource.getRepository(entities.Organization)
                .createQueryBuilder("organization")
                .where("organization.Id =:id", { id: model.soldToNonAgents })
                .getOne();
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductSalesToNonAgents);
            const productSalesToNonAgents = new entities.ProductSalesToNonAgents();
            if (soldToNonAgents) {
                productSalesToNonAgents.SoldToNonAgents = soldToNonAgents;
            }
            productSalesToNonAgents.InvoiceNumber = model.invoiceNumber;
            productSalesToNonAgents.PaidAmount = model.paidAmount;
            productSalesToNonAgents.PaymentMode = model.paymentMode;
            productSalesToNonAgents.TotalAmount = model.totalAmount;
            productSalesToNonAgents.Balance = model.balance;
            productSalesToNonAgents.CreatedBy = userId;
            if (model.createdAt) {
                productSalesToNonAgents.CreatedAt = model.createdAt;
            }
            else {
                productSalesToNonAgents.CreatedAt = new Date();
            }
            yield repository.save(productSalesToNonAgents);
            // console.log(model)
            if (model.soldProducts) {
                const soldProductsRepository = DbConnection_1.AppDataSource.getRepository(entities.ProductsSoldToNonAgents);
                for (const products of model.soldProducts) {
                    const productMaster = yield DbConnection_1.AppDataSource.getRepository(entities.ProductMaster)
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
                    yield soldProductsRepository.save(product);
                }
                const otpRepo = DbConnection_1.AppDataSource.getRepository(entities.ProductSoldToAgentOTP);
                const otp = yield otpRepo.findOne({
                    where: { SoldToAgentId: (_b = model === null || model === void 0 ? void 0 : model.soldToNonAgents) === null || _b === void 0 ? void 0 : _b.Id }
                });
                if (otp) {
                    yield otpRepo.remove(otp);
                }
            }
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: null
            };
        }
        catch (err) {
            console.log(err);
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null
            };
        }
    });
}
exports.CreateProductsSalesToNonAgents = CreateProductsSalesToNonAgents;
function UpdateProductSalesToNonAgents(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const saleRepo = DbConnection_1.AppDataSource.getRepository(entities.ProductSalesToNonAgents);
            const sale = yield saleRepo.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
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
                yield saleRepo.save(sale);
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
exports.UpdateProductSalesToNonAgents = UpdateProductSalesToNonAgents;
function GetOTP(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let otp;
            otp = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSoldToNonAgentsOTP)
                .createQueryBuilder("otp")
                .where("otp.SoldToNonAgentsId =:id", { id: model.soldToNonAgentsId })
                .andWhere("otp.Otp =:otp", { otp: model.otp })
                .getOne();
            return {
                status: otp ? 200 : 404,
                message: otp ? SUCCESS_MESSAGES.SUCCESS : 'Wrong OTP',
                data: null
            };
        }
        catch (err) {
            console.log(err);
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null
            };
        }
    });
}
exports.GetOTP = GetOTP;
function CreateOTP(req, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const otp = 100000 + Math.floor(Math.random() * 900000);
            const agentRepo = DbConnection_1.AppDataSource.getRepository(entities.Organization);
            const agent = yield agentRepo.findOne({
                where: { Id: model === null || model === void 0 ? void 0 : model.soldToNonAgentsId }
            });
            console.log('otp : ', otp);
            console.log('agent : ', agent);
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductSoldToNonAgentsOTP);
            const otpRepo = new entities.ProductSoldToNonAgentsOTP();
            otpRepo.SoldToNonAgentsId = model.soldToNonAgentsId;
            otpRepo.Otp = otp;
            console.log("amount : ", model.amount);
            const username = 'UVBEkr810UN8QeYybMGW';
            const password = 'aErfm0LJRnlYbVSm72tmdlwkTcRNP1TaYLtJS1GF';
            const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
            const postData = JSON.stringify({
                "Text": `Dear, ${model.soldToNonAgentsId}, Your OTP for the product acceptance Amt. ${model.amount} is ${otp}. - GANGA DAIRY LTD `,
                "Number": `91${agent === null || agent === void 0 ? void 0 : agent.PhoneNumber}`,
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
            const request = https.request(options, (res) => {
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
            yield repository.save(otpRepo);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: null
            };
        }
        catch (err) {
            console.log(err);
            return {
                status: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null
            };
        }
    });
}
exports.CreateOTP = CreateOTP;
function DeleteProductSalesToNonAgents(req, model) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const key = process.env.TOKEN_SECRET;
            const decode = jwt.verify(token, key);
            const userId = decode.userId;
            const repository = DbConnection_1.AppDataSource.getRepository(entities.ProductSalesToNonAgents);
            const state = yield repository.findOne({
                where: { Id: (_b = model.id) !== null && _b !== void 0 ? _b : 0 },
            });
            if (state) {
                yield repository.remove(state);
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
exports.DeleteProductSalesToNonAgents = DeleteProductSalesToNonAgents;
function GetTotalBalance(model) {
    return __awaiter(this, void 0, void 0, function* () {
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
            };
            let dateDetails = Getdates();
            console.log(dateDetails);
            console.log('model ', model);
            let productSalesToAgent = yield DbConnection_1.AppDataSource.getRepository(entities.ProductSalesToAgent)
                .createQueryBuilder("productSalesToAgent")
                .leftJoinAndSelect("productSalesToAgent.SoldToAgent", "productSoldToAgent")
                .where("DATE(productSalesToAgent.CreatedAt) >= :startDate", { startDate: (0, moment_1.default)(dateDetails.startdate).format('YYYY-MM-DD') })
                .andWhere("DATE(productSalesToAgent.CreatedAt) <= :endDate", { endDate: (0, moment_1.default)(dateDetails.enddate).format('YYYYY-MM-DD') })
                .andWhere("productSalesToAgent.SoldToAgent =:SoldToAgent", { SoldToAgent: model.organizationUnitId })
                .getMany();
            const milkCollectionDetails = yield DbConnection_1.AppDataSource.getRepository(entities.MilkCollectionDetails).createQueryBuilder("milkCollectionDetails")
                .leftJoinAndSelect("milkCollectionDetails.OrganizationUnitId", "organization")
                .where("DATE(milkCollectionDetails.CollectedAt) >= :startDate", { startDate: (0, moment_1.default)(dateDetails.startdate).format('YYYY-MM-DD') })
                .andWhere("DATE(milkCollectionDetails.CollectedAt) <= :endDate", { endDate: (0, moment_1.default)(dateDetails.enddate).format('YYYY-MM-DD') })
                .andWhere("milkCollectionDetails.OrganizationUnitId =:OrganizationUnitId", { OrganizationUnitId: model.organizationUnitId })
                .getMany();
            const rateMaster = yield DbConnection_1.AppDataSource.getRepository(entities.RateMaster)
                .createQueryBuilder("ratemaster")
                .where("ratemaster.Wef < :currDate", { currDate: new Date() })
                .andWhere("ratemaster.IsActive =:isActive", { isActive: true })
                .orderBy("ratemaster.SeqNo", "ASC")
                .getMany();
            let totalProductValue = 0;
            let totalMilkValue = 0;
            console.log('milk collection details : ', milkCollectionDetails);
            console.log('milk products bougt details : ', milkCollectionDetails);
            productSalesToAgent.forEach(element => {
                // console.log('Balance:',element.Balance);
                totalProductValue += element.Balance;
            });
            milkCollectionDetails.forEach(element => {
                let value = (0, MilkValueCalculator_1.calculateValue)(element.Fat, element.Snf, rateMaster);
                // console.log('vales:',value,element.Weight+value);
                totalMilkValue += element.Weight * value;
            });
            console.log('total mmilk value  : ', totalMilkValue);
            let result = { balance: totalMilkValue - totalProductValue };
            // console.log("For ID :",req.params.id,"MilkValue:",TotalMilkValue,'Productvalue:',TotalProductValue);
            return {
                status: 200,
                message: SUCCESS_MESSAGES.SUCCESS,
                data: result,
            };
        }
        catch (e) {
            console.error(e); // Log the actual error
            console.log(e);
            return {
                status: 400,
                message: ERROR_MESSAGES.INTERNAL_SERVER,
                data: null,
            };
        }
    });
}
exports.GetTotalBalance = GetTotalBalance;
