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
exports.GetTotalBalance = exports.DeleteProductSale = exports.UpdateProductSalesToAgent = exports.CreateOtp = exports.GetOtp = exports.CreateProductSalesToAgent = exports.GetProductSalesToAgent = void 0;
const productSalesToAgentService = __importStar(require("../services/ProductSalesToAgentService"));
const ProductSalesToAgentModel_1 = require("../models/ProductSalesToAgentModel");
const ProductSoldToAgentModelOTP_1 = require("../models/ProductSoldToAgentModelOTP");
function GetProductSalesToAgent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield productSalesToAgentService.GetProductSalesToAgent(model);
            res.json(response);
        }
    });
}
exports.GetProductSalesToAgent = GetProductSalesToAgent;
function CreateProductSalesToAgent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new ProductSalesToAgentModel_1.CreateProductSalesToAgentModel(req.body);
        const response = yield productSalesToAgentService.CreateProductSalesToAgent(req, roleModel);
        res.json(response);
    });
}
exports.CreateProductSalesToAgent = CreateProductSalesToAgent;
function GetOtp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield productSalesToAgentService.GetOTP(model);
            res.json(response);
        }
    });
}
exports.GetOtp = GetOtp;
function CreateOtp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new ProductSoldToAgentModelOTP_1.CreateProductsSoldToAgentOTPModel(req.body);
        const response = yield productSalesToAgentService.CreateOTP(req, roleModel);
        res.json(response);
    });
}
exports.CreateOtp = CreateOtp;
function UpdateProductSalesToAgent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let salesModel = new ProductSalesToAgentModel_1.UpdateProductSalesToAgentModel(req.body);
        const response = yield productSalesToAgentService.UpdateProductSalesToAgent(req, salesModel);
        res.json(response);
    });
}
exports.UpdateProductSalesToAgent = UpdateProductSalesToAgent;
function DeleteProductSale(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('req : ', req);
        let model = new ProductSalesToAgentModel_1.DeleteProductSalesToAgentModel(req.params);
        const response = yield productSalesToAgentService.DeleteProductSalesToAgent(req, model);
        res.json(response);
    });
}
exports.DeleteProductSale = DeleteProductSale;
function GetTotalBalance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield productSalesToAgentService.GetTotalBalance(model);
            res.json(response);
        }
    });
}
exports.GetTotalBalance = GetTotalBalance;
