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
exports.GetWeighBridgeLabData = exports.UpdateWeighBridgeLabData = exports.GetWeighBridgeData = exports.UpdateWeighBridgeData = void 0;
const weighbridgeDataService = __importStar(require("../services/WeighbridgeDataService"));
const WeighbridgeDataModel_1 = require("../models/WeighbridgeDataModel");
function UpdateWeighBridgeData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new WeighbridgeDataModel_1.UpdateWeighbridgeData(req.body);
        const response = yield weighbridgeDataService.UpdateWeighBridgeData(req, roleModel);
        res.json(response);
    });
}
exports.UpdateWeighBridgeData = UpdateWeighBridgeData;
function GetWeighBridgeData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield weighbridgeDataService.GetWeighbridgeData(model);
            res.json(response);
        }
        else {
            const response = yield weighbridgeDataService.GetWeighbridgeData();
            res.json(response);
        }
    });
}
exports.GetWeighBridgeData = GetWeighBridgeData;
function UpdateWeighBridgeLabData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new WeighbridgeDataModel_1.UpdateWeighbridgeLabDataModel(req.body);
        const response = yield weighbridgeDataService.UpdateWeighBridgeLabData(req, roleModel);
        res.json(response);
    });
}
exports.UpdateWeighBridgeLabData = UpdateWeighBridgeLabData;
function GetWeighBridgeLabData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield weighbridgeDataService.GetWeighbridgeLabData(model);
            res.json(response);
        }
        else {
            const response = yield weighbridgeDataService.GetWeighbridgeLabData();
            res.json(response);
        }
    });
}
exports.GetWeighBridgeLabData = GetWeighBridgeLabData;
