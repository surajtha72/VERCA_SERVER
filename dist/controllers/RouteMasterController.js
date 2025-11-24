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
exports.DeleteRouteMaster = exports.UpdateRouteMaster = exports.CreateRouteMaster = exports.GetRouteMaster = void 0;
const routeMasterServices = __importStar(require("../services/RouteMasterServices"));
const RouteMasterModel_1 = require("../models/RouteMasterModel");
function GetRouteMaster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield routeMasterServices.GetRouteMaster(model);
            res.json(response);
        }
        else {
            const response = yield routeMasterServices.GetRouteMaster();
            res.json(response);
        }
    });
}
exports.GetRouteMaster = GetRouteMaster;
function CreateRouteMaster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new RouteMasterModel_1.CreateRouteMasterModel(req.body);
        const response = yield routeMasterServices.CreateRouteMaster(req, model);
        res.json(response);
    });
}
exports.CreateRouteMaster = CreateRouteMaster;
function UpdateRouteMaster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new RouteMasterModel_1.UpdateRouteMasterModel(req.body);
        const response = yield routeMasterServices.UpdateRouteMaster(req, model);
        res.json(response);
    });
}
exports.UpdateRouteMaster = UpdateRouteMaster;
function DeleteRouteMaster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new RouteMasterModel_1.DeleteRouteMasterModel(req.params);
        const response = yield routeMasterServices.DeleteRouteMaster(req, model);
        res.json(response);
    });
}
exports.DeleteRouteMaster = DeleteRouteMaster;
