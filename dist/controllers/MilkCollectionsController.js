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
exports.GetUnlockedBillingCycles = exports.LockMilkBill = exports.GetMilkCollectionsPortal = exports.GetMilkRoutes = exports.DeleteMilkCollection = exports.UpdateMilkCollection = exports.CreateMilkCollection = exports.GetAllMilkCollections = void 0;
const milkCollectionsServices = __importStar(require("../services/MilkCollectionsServices"));
const MilkCollectionsModel_1 = require("../models/MilkCollectionsModel");
function GetAllMilkCollections(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield milkCollectionsServices.GetAllMilkCollections(req, model);
            res.json(response);
        }
        else {
            const response = yield milkCollectionsServices.GetAllMilkCollections(req);
            res.json(response);
        }
    });
}
exports.GetAllMilkCollections = GetAllMilkCollections;
function GetMilkCollectionsPortal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield milkCollectionsServices.GetMilkCollectionsPortal(req, model);
            res.json(response);
        }
        else {
            const response = yield milkCollectionsServices.GetMilkCollectionsPortal(req);
            res.json(response);
        }
    });
}
exports.GetMilkCollectionsPortal = GetMilkCollectionsPortal;
function GetMilkRoutes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        const response = yield milkCollectionsServices.GetMilkRoutes(model);
        res.json(response);
    });
}
exports.GetMilkRoutes = GetMilkRoutes;
function CreateMilkCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let milkModel = req.body;
        const response = yield milkCollectionsServices.CreateMilkCollection(req, milkModel);
        res.json(response);
    });
}
exports.CreateMilkCollection = CreateMilkCollection;
function UpdateMilkCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let milkModel = req.body;
        const response = yield milkCollectionsServices.UpdateMilkCollection(req, milkModel);
        res.json(response);
    });
}
exports.UpdateMilkCollection = UpdateMilkCollection;
function DeleteMilkCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new MilkCollectionsModel_1.DeleteMilkCollectionModel(req.params);
        const response = yield milkCollectionsServices.DeleteMilkCollection(req, model);
        res.json(response);
    });
}
exports.DeleteMilkCollection = DeleteMilkCollection;
function LockMilkBill(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let milkModel = req.body;
        const response = yield milkCollectionsServices.LockMilkBill(req, milkModel);
        res.json(response);
    });
}
exports.LockMilkBill = LockMilkBill;
function GetUnlockedBillingCycles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield milkCollectionsServices.GetUnlockedBillingCycles(model);
            res.json(response);
        }
        else {
            const response = yield milkCollectionsServices.GetUnlockedBillingCycles(req);
            res.json(response);
        }
    });
}
exports.GetUnlockedBillingCycles = GetUnlockedBillingCycles;
