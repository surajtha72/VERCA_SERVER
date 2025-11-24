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
exports.DeleteIncentiveSlabs = exports.UpdateIncentiveSlabs = exports.CreateIncentiveSlabs = exports.GetAllIncentiveSlabs = void 0;
const slabServices = __importStar(require("../services/IncentiveSlabsServices"));
const IncentiveSlabsModel_1 = require("../models/IncentiveSlabsModel");
function GetAllIncentiveSlabs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield slabServices.GetAllIncentiveSlabs(model);
            res.json(response);
        }
        else {
            const response = yield slabServices.GetAllIncentiveSlabs();
            res.json(response);
        }
    });
}
exports.GetAllIncentiveSlabs = GetAllIncentiveSlabs;
function CreateIncentiveSlabs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new IncentiveSlabsModel_1.CreateIncentiveSlabsModel(req.body);
        const response = yield slabServices.CreateIncentiveSlabs(req, roleModel);
        res.json(response);
    });
}
exports.CreateIncentiveSlabs = CreateIncentiveSlabs;
function UpdateIncentiveSlabs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let roleModel = new IncentiveSlabsModel_1.UpdateIncentiveSlabsModel(req.body);
        const response = yield slabServices.UpdateIncentiveSlabs(req, roleModel);
        res.json(response);
    });
}
exports.UpdateIncentiveSlabs = UpdateIncentiveSlabs;
function DeleteIncentiveSlabs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new IncentiveSlabsModel_1.DeleteIncentiveSlabsModel(req.params);
        const response = yield slabServices.DeleteIncentiveSlabs(req, model);
        res.json(response);
    });
}
exports.DeleteIncentiveSlabs = DeleteIncentiveSlabs;
