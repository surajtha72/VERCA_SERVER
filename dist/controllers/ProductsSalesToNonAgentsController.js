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
exports.GetTotalBalance = exports.DeleteProductSalesToNonAgents = exports.UpdateProductSalesToNonAgents = exports.CreateOtp = exports.GetOtp = exports.CreateProductSalesToNonAgents = exports.GetProductSalesToNonAgents = void 0;
const productSalesToNonAgentsService = __importStar(require("../services/ProductSalesToNonAgentsService"));
const ProductSalesToNonAgentsModel_1 = require("../models/ProductSalesToNonAgentsModel");
const ProductSoldToNonAgentsModelOTP_1 = require("../models/ProductSoldToNonAgentsModelOTP");
function GetProductSalesToNonAgents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield productSalesToNonAgentsService.GetProductSalesToNonAgents(model);
            res.json(response);
        }
    });
}
exports.GetProductSalesToNonAgents = GetProductSalesToNonAgents;
function CreateProductSalesToNonAgents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new ProductSalesToNonAgentsModel_1.CreateProductSalesToNonAgentsModel(req.body);
        const response = yield productSalesToNonAgentsService.CreateProductsSalesToNonAgents(req, roleModel);
        res.json(response);
    });
}
exports.CreateProductSalesToNonAgents = CreateProductSalesToNonAgents;
function GetOtp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield productSalesToNonAgentsService.GetOTP(model);
            res.json(response);
        }
    });
}
exports.GetOtp = GetOtp;
function CreateOtp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new ProductSoldToNonAgentsModelOTP_1.CreateProductsSoldToNonAgentsOTPModel(req.body);
        const response = yield productSalesToNonAgentsService.CreateOTP(req, roleModel);
        res.json(response);
    });
}
exports.CreateOtp = CreateOtp;
function UpdateProductSalesToNonAgents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let salesModel = new ProductSalesToNonAgentsModel_1.UpdateProductSalesToNonAgentsModel(req.body);
        const response = yield productSalesToNonAgentsService.UpdateProductSalesToNonAgents(req, salesModel);
        res.json(response);
    });
}
exports.UpdateProductSalesToNonAgents = UpdateProductSalesToNonAgents;
function DeleteProductSalesToNonAgents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('req : ', req);
        let model = new ProductSalesToNonAgentsModel_1.DeleteProductSalesToNonAgentsModel(req.params);
        const response = yield productSalesToNonAgentsService.DeleteProductSalesToNonAgents(req, model);
        res.json(response);
    });
}
exports.DeleteProductSalesToNonAgents = DeleteProductSalesToNonAgents;
function GetTotalBalance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield productSalesToNonAgentsService.GetTotalBalance(model);
            res.json(response);
        }
    });
}
exports.GetTotalBalance = GetTotalBalance;
