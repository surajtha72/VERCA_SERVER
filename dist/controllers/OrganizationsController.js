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
exports.DeleteOrganizations = exports.UpdateOrganizations = exports.CreateOrganizations = exports.GetAllOrganizations = exports.GetOrganizations = void 0;
const organizationsServices = __importStar(require("../services/OrganizationsServices"));
const OrganizationsModel_1 = require("../models/OrganizationsModel");
function GetOrganizations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield organizationsServices.GetOrganizations(model);
            res.json(response);
        }
        else {
            const response = yield organizationsServices.GetOrganizations();
            res.json(response);
        }
    });
}
exports.GetOrganizations = GetOrganizations;
function GetAllOrganizations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield organizationsServices.GetAllOrganizations(model);
            res.json(response);
        }
        else {
            const response = yield organizationsServices.GetAllOrganizations();
            res.json(response);
        }
    });
}
exports.GetAllOrganizations = GetAllOrganizations;
function CreateOrganizations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let transportersModel = new OrganizationsModel_1.CreateOrganizationsModel(req.body);
        const response = yield organizationsServices.CreateOrganizations(req, transportersModel);
        res.json(response);
    });
}
exports.CreateOrganizations = CreateOrganizations;
function UpdateOrganizations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let transportersModel = new OrganizationsModel_1.UpdateOrganizationsModel(req.body);
        const response = yield organizationsServices.UpdateOrganizations(req, transportersModel);
        res.json(response);
    });
}
exports.UpdateOrganizations = UpdateOrganizations;
function DeleteOrganizations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new OrganizationsModel_1.DeleteOrganizationsModel(req.params);
        const response = yield organizationsServices.DeleteOrganizations(req, model);
        res.json(response);
    });
}
exports.DeleteOrganizations = DeleteOrganizations;
