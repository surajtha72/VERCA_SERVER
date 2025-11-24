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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTotalBalance = exports.DeleteProductSalesToFarmer = exports.UpdateProductSalesToFarmer = exports.CreateOtp = exports.GetOtp = exports.CreateProductSalesToFarmer = exports.GetProductSalesToFarmer = void 0;
const productSalesToFarmerService = __importStar(require("../services/ProductSalesToFarmerService"));
const ProductSalesToFarmerModel_1 = require("../models/ProductSalesToFarmerModel");
const ProductSoldToFarmerModelOTP_1 = require("../models/ProductSoldToFarmerModelOTP");
function GetProductSalesToFarmer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield productSalesToFarmerService.GetProductSalesToFarmer(model);
            res.json(response);
        }
    });
}
exports.GetProductSalesToFarmer = GetProductSalesToFarmer;
function CreateProductSalesToFarmer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new ProductSalesToFarmerModel_1.CreateProductSalesToFarmerModel(req.body);
        const response = yield productSalesToFarmerService.CreateProductsSalesToFarmer(req, roleModel);
        res.json(response);
    });
}
exports.CreateProductSalesToFarmer = CreateProductSalesToFarmer;
function GetOtp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield productSalesToFarmerService.GetOTP(model);
            res.json(response);
        }
    });
}
exports.GetOtp = GetOtp;
function CreateOtp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new ProductSoldToFarmerModelOTP_1.CreateProductsSoldToFarmerOTPModel(req.body);
        const response = yield productSalesToFarmerService.CreateOTP(req, roleModel);
        res.json(response);
    });
}
exports.CreateOtp = CreateOtp;
function UpdateProductSalesToFarmer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let salesModel = new ProductSalesToFarmerModel_1.UpdateProductSalesToFarmerModel(req.body);
        const response = yield productSalesToFarmerService.UpdateProductSalesToFarmer(req, salesModel);
        res.json(response);
    });
}
exports.UpdateProductSalesToFarmer = UpdateProductSalesToFarmer;
function DeleteProductSalesToFarmer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('req : ', req);
        let model = new ProductSalesToFarmerModel_1.DeleteProductSalesToFarmerModel(req.params);
        const response = yield productSalesToFarmerService.DeleteProductSalesToFarmer(req, model);
        res.json(response);
    });
}
exports.DeleteProductSalesToFarmer = DeleteProductSalesToFarmer;
function GetTotalBalance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield productSalesToFarmerService.GetTotalBalance(model);
            res.json(response);
        }
    });
}
exports.GetTotalBalance = GetTotalBalance;
