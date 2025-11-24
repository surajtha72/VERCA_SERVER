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
exports.DeleteIndentProducts = exports.UpdateIndentProductsApprove = exports.UpdateIndentProducts = exports.CreateIndentProducts = exports.GetIndentProducts = void 0;
const indentProductsServices = __importStar(require("../services/IndentProductsService"));
const IndentProductsModel_1 = require("../models/IndentProductsModel");
function GetIndentProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield indentProductsServices.GetIndentProducts(model);
            res.json(response);
        }
        else {
            const response = yield indentProductsServices.GetIndentProducts();
            res.json(response);
        }
    });
}
exports.GetIndentProducts = GetIndentProducts;
function CreateIndentProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = req.body;
        const response = yield indentProductsServices.CreateIndentProducts(req, roleModel);
        res.json(response);
    });
}
exports.CreateIndentProducts = CreateIndentProducts;
function UpdateIndentProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new IndentProductsModel_1.UpdateIndentProductsModel(req.body);
        const response = yield indentProductsServices.UpdateIndentProducts(req, roleModel);
        res.json(response);
    });
}
exports.UpdateIndentProducts = UpdateIndentProducts;
function UpdateIndentProductsApprove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new IndentProductsModel_1.UpdateIndentProductsModel(req.body);
        const response = yield indentProductsServices.UpdateIndentProductsApprove(req, roleModel);
        res.json(response);
    });
}
exports.UpdateIndentProductsApprove = UpdateIndentProductsApprove;
function DeleteIndentProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new IndentProductsModel_1.DeleteIndentProductsModel(req.params);
        const response = yield indentProductsServices.DeleteIndentProducts(req, model);
        res.json(response);
    });
}
exports.DeleteIndentProducts = DeleteIndentProducts;
