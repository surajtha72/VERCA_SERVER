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
exports.GetDCNumbers = exports.DeleteProductSupply = exports.UpdateProductSupply = exports.CreateProductSupply = exports.GetProductSupplyApprove = exports.GetProductSupplyIndent = void 0;
const productSupplyServices = __importStar(require("../services/ProductSupplyServices"));
const ProductSupplyModel_1 = require("../models/ProductSupplyModel");
function GetProductSupplyIndent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield productSupplyServices.GetProductSupplyIndent(model);
            res.json(response);
        }
        else {
            const response = yield productSupplyServices.GetProductSupplyIndent();
            res.json(response);
        }
    });
}
exports.GetProductSupplyIndent = GetProductSupplyIndent;
function GetProductSupplyApprove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield productSupplyServices.GetProductSupplyApprove(model);
            res.json(response);
        }
        else {
            const response = yield productSupplyServices.GetProductSupplyApprove();
            res.json(response);
        }
    });
}
exports.GetProductSupplyApprove = GetProductSupplyApprove;
function GetDCNumbers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield productSupplyServices.GetDCNumbers(model);
            res.json(response);
        }
        else {
            const response = yield productSupplyServices.GetDCNumbers();
            res.json(response);
        }
    });
}
exports.GetDCNumbers = GetDCNumbers;
function CreateProductSupply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let rolemodel = req.body;
        const response = yield productSupplyServices.CreateProductSupply(req, rolemodel);
        res.json(response);
    });
}
exports.CreateProductSupply = CreateProductSupply;
function UpdateProductSupply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new ProductSupplyModel_1.UpdateProductSupplyModel(req.body);
        const response = yield productSupplyServices.UpdateProductSupply(req, roleModel);
        res.json(response);
    });
}
exports.UpdateProductSupply = UpdateProductSupply;
function DeleteProductSupply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new ProductSupplyModel_1.DeleteProductSupplyModel(req.params);
        const response = yield productSupplyServices.DeleteProductSupply(req, model);
        res.json(response);
    });
}
exports.DeleteProductSupply = DeleteProductSupply;
