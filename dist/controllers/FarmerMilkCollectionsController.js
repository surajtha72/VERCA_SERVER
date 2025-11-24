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
exports.GetUnlockedBillingCycles = exports.LockMilkBill = exports.GetFarmerMilkCollectionsPortal = exports.GeFarmerMilkRoutes = exports.DeleteFarmerMilkCollection = exports.UpdateFarmerMilkCollection = exports.CreateFarmerMilkCollection = exports.GetAllFarmerMilkCollections = void 0;
const farmerMilkCollectionsServices = __importStar(require("../services/FarmerMilkCollectionsServices"));
const FarmerMilkCollectionsModel_1 = require("../models/FarmerMilkCollectionsModel");
function GetAllFarmerMilkCollections(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield farmerMilkCollectionsServices.GetAllFarmerMilkCollections(req, model);
            res.json(response);
        }
        else {
            const response = yield farmerMilkCollectionsServices.GetAllFarmerMilkCollections(req);
            res.json(response);
        }
    });
}
exports.GetAllFarmerMilkCollections = GetAllFarmerMilkCollections;
function GetFarmerMilkCollectionsPortal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield farmerMilkCollectionsServices.GetFarmerMilkCollectionsPortal(req, model);
            res.json(response);
        }
        else {
            const response = yield farmerMilkCollectionsServices.GetFarmerMilkCollectionsPortal(req);
            res.json(response);
        }
    });
}
exports.GetFarmerMilkCollectionsPortal = GetFarmerMilkCollectionsPortal;
function GeFarmerMilkRoutes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        const response = yield farmerMilkCollectionsServices.GetMilkRoutes(model);
        res.json(response);
    });
}
exports.GeFarmerMilkRoutes = GeFarmerMilkRoutes;
function CreateFarmerMilkCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let milkModel = req.body;
        const response = yield farmerMilkCollectionsServices.CreateFarmerMilkCollection(req, milkModel);
        res.json(response);
    });
}
exports.CreateFarmerMilkCollection = CreateFarmerMilkCollection;
function UpdateFarmerMilkCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let milkModel = req.body;
        const response = yield farmerMilkCollectionsServices.UpdateFarmerMilkCollection(req, milkModel);
        res.json(response);
    });
}
exports.UpdateFarmerMilkCollection = UpdateFarmerMilkCollection;
function DeleteFarmerMilkCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new FarmerMilkCollectionsModel_1.DeleteFarmerMilkCollectionModel(req.params);
        const response = yield farmerMilkCollectionsServices.DeleteFarmerMilkCollection(req, model);
        res.json(response);
    });
}
exports.DeleteFarmerMilkCollection = DeleteFarmerMilkCollection;
function LockMilkBill(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let milkModel = req.body;
        const response = yield farmerMilkCollectionsServices.LockMilkBill(req, milkModel);
        res.json(response);
    });
}
exports.LockMilkBill = LockMilkBill;
function GetUnlockedBillingCycles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield farmerMilkCollectionsServices.GetUnlockedBillingCycles(model);
            res.json(response);
        }
        else {
            const response = yield farmerMilkCollectionsServices.GetUnlockedBillingCycles(req);
            res.json(response);
        }
    });
}
exports.GetUnlockedBillingCycles = GetUnlockedBillingCycles;
