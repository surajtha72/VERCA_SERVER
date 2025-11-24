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
exports.DeleteNonAgents = exports.UpdateNonAgents = exports.CreateNonAgents = exports.GetAllNonAgents = void 0;
const nonAgentsServices = __importStar(require("../services/NonAgentsServices"));
const NonAgentsModel_1 = require("../models/NonAgentsModel");
function GetAllNonAgents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield nonAgentsServices.GetAllNonAgents(model);
            res.json(response);
        }
        else {
            const response = yield nonAgentsServices.GetAllNonAgents();
            res.json(response);
        }
    });
}
exports.GetAllNonAgents = GetAllNonAgents;
function CreateNonAgents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let farmersModel = new NonAgentsModel_1.CreateNonAgentsModel(req.body);
        const response = yield nonAgentsServices.CreateNonAgents(req, farmersModel);
        res.json(response);
    });
}
exports.CreateNonAgents = CreateNonAgents;
function UpdateNonAgents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let transportersModel = new NonAgentsModel_1.UpdateNonAgentsModel(req.body);
        const response = yield nonAgentsServices.UpdateNonAgents(req, transportersModel);
        res.json(response);
    });
}
exports.UpdateNonAgents = UpdateNonAgents;
function DeleteNonAgents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new NonAgentsModel_1.DeleteNonAgentsModel(req.params);
        const response = yield nonAgentsServices.DeleteNonAgents(req, model);
        res.json(response);
    });
}
exports.DeleteNonAgents = DeleteNonAgents;
