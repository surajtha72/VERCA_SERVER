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
exports.UpdateComplaint = exports.CreateComplaint = exports.GetAllComplaints = void 0;
const complaintsService = __importStar(require("../services/ComplaintsService"));
const ComplaintsModel_1 = require("../models/ComplaintsModel");
function GetAllComplaints(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield complaintsService.GetAllComplaints(model);
            res.json(response);
        }
        else {
            const response = yield complaintsService.GetAllComplaints();
            res.json(response);
        }
    });
}
exports.GetAllComplaints = GetAllComplaints;
function CreateComplaint(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = new ComplaintsModel_1.CreateComplaintModel(req.body);
        const response = yield complaintsService.CreateComplaint(req, model);
        res.json(response);
    });
}
exports.CreateComplaint = CreateComplaint;
function UpdateComplaint(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = new ComplaintsModel_1.UpdateComplaintModel(req.body);
        const response = yield complaintsService.UpdateComplaint(req, model);
        res.json(response);
    });
}
exports.UpdateComplaint = UpdateComplaint;
