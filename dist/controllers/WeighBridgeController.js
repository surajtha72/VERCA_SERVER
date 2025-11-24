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
exports.GetTransitLossGainReports = exports.CreateWeighBridgeVehicle = exports.DeleteWeighBridge = exports.UpdateWeighBridge = exports.CreateWeighBridge = exports.GetWeighBridge = void 0;
const weighBridgeServices = __importStar(require("../services/WeighBridgeServices"));
const WeighBridgeModel_1 = require("../models/WeighBridgeModel");
function GetWeighBridge(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield weighBridgeServices.GetWeighBridge(model);
            res.json(response);
        }
        else {
            const response = yield weighBridgeServices.GetWeighBridge();
            res.json(response);
        }
    });
}
exports.GetWeighBridge = GetWeighBridge;
function GetTransitLossGainReports(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        console.log('called', model);
        // let model= { vehicleId: '31', fromDate: '2024-05-03', toDate: '2024-06-02' };
        const response = yield weighBridgeServices.GetTransitLossGainReports(model);
        res.json(response);
    });
}
exports.GetTransitLossGainReports = GetTransitLossGainReports;
function CreateWeighBridge(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new WeighBridgeModel_1.CreateWeighBridgeModel(req.body);
        const response = yield weighBridgeServices.CreateWeighBridge(req, roleModel);
        res.json(response);
    });
}
exports.CreateWeighBridge = CreateWeighBridge;
function CreateWeighBridgeVehicle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let reqModel = req.body;
        const response = yield weighBridgeServices.CreateWeighBridgeVehicle(req, reqModel);
        res.json(response);
    });
}
exports.CreateWeighBridgeVehicle = CreateWeighBridgeVehicle;
function UpdateWeighBridge(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new WeighBridgeModel_1.UpdateWeighBridgeModel(req.body);
        const response = yield weighBridgeServices.UpdateWeighBridge(req, roleModel);
        res.json(response);
    });
}
exports.UpdateWeighBridge = UpdateWeighBridge;
function DeleteWeighBridge(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new WeighBridgeModel_1.DeleteWeighBridgeModel(req.params);
        const response = yield weighBridgeServices.DeleteWeighBridge(req, model);
        res.json(response);
    });
}
exports.DeleteWeighBridge = DeleteWeighBridge;
