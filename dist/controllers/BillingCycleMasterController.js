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
exports.LockCycle = exports.KrishiBazarReport = exports.GetAgentLedger = exports.GetPayoutCheckList = exports.GetBmcWisePayment = exports.GetRouteWiseBmcMilkCollection = exports.GetDateWiseBmcMilkCollection = exports.GetBmcWiseMilkCollection = exports.GetDateWiseAgentCollection = exports.GetAgentWiseMilkCollection = exports.GetBmcSnfReconcillation = exports.GetBankLetterAmount = exports.GetBankAdvice = exports.GetRateChart = exports.GetBillByBMCRoutes = exports.GetBillByBMC = exports.GetBill = exports.DeleteCycleMaster = exports.UpdateCycleMaster = exports.CreateCycleMaster = exports.GetAllCycleMaster = void 0;
const cyclemasterService = __importStar(require("../services/BillingCycleMasterServices"));
const BillingCycleMasterModel_1 = require("../models/BillingCycleMasterModel");
function GetAllCycleMaster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        if (model) {
            const response = yield cyclemasterService.GetCycleMaster(model);
            res.json(response);
        }
        else {
            const response = yield cyclemasterService.GetCycleMaster();
            res.json(response);
        }
    });
}
exports.GetAllCycleMaster = GetAllCycleMaster;
function GetBill(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.GetBill(req, model);
        res.json(response);
    });
}
exports.GetBill = GetBill;
function GetBillByBMC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.GetBillByBMC(req, model);
        res.json(response);
    });
}
exports.GetBillByBMC = GetBillByBMC;
function GetBillByBMCRoutes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.GetBillByBMCRoutes(req, model);
        res.json(response);
    });
}
exports.GetBillByBMCRoutes = GetBillByBMCRoutes;
function CreateCycleMaster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let cycleModel = new BillingCycleMasterModel_1.CreateCycleMasterModel(req.body);
        const response = yield cyclemasterService.CreateCycleMaster(req, cycleModel);
        res.json(response);
    });
}
exports.CreateCycleMaster = CreateCycleMaster;
function UpdateCycleMaster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let cycleModel = new BillingCycleMasterModel_1.UpdateCycleMasterModel(req.body);
        const response = yield cyclemasterService.UpdateCycleMaster(req, cycleModel);
        res.json(response);
    });
}
exports.UpdateCycleMaster = UpdateCycleMaster;
function DeleteCycleMaster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new BillingCycleMasterModel_1.DeleteCycleMasterModel(req.params);
        const response = yield cyclemasterService.DeleteCycleMaster(req, model);
        res.json(response);
    });
}
exports.DeleteCycleMaster = DeleteCycleMaster;
function GetRateChart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.query;
        const response = yield cyclemasterService.GetRateChart();
        res.json(response);
    });
}
exports.GetRateChart = GetRateChart;
function GetBankAdvice(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.GetBankAdvice(req, model);
        res.json(response);
    });
}
exports.GetBankAdvice = GetBankAdvice;
function GetBankLetterAmount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.GetBankLetterAmount(req, model);
        res.json(response);
    });
}
exports.GetBankLetterAmount = GetBankLetterAmount;
function GetBmcSnfReconcillation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.GetBmcSnfReconcillation(req, model);
        res.json(response);
    });
}
exports.GetBmcSnfReconcillation = GetBmcSnfReconcillation;
function GetAgentWiseMilkCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.GetAgentWiseMilkCollection(req, model);
        res.json(response);
    });
}
exports.GetAgentWiseMilkCollection = GetAgentWiseMilkCollection;
function GetDateWiseAgentCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.DateWiseAgentColletionDetail(req, model);
        res.json(response);
    });
}
exports.GetDateWiseAgentCollection = GetDateWiseAgentCollection;
function GetBmcWiseMilkCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.GetBmcWiseMilkCollection(req, model);
        res.json(response);
    });
}
exports.GetBmcWiseMilkCollection = GetBmcWiseMilkCollection;
function GetDateWiseBmcMilkCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.DateWiseBmcMilkCollection(req, model);
        res.json(response);
    });
}
exports.GetDateWiseBmcMilkCollection = GetDateWiseBmcMilkCollection;
function GetRouteWiseBmcMilkCollection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.RouteWiseBmcMilkCollection(req, model);
        res.json(response);
    });
}
exports.GetRouteWiseBmcMilkCollection = GetRouteWiseBmcMilkCollection;
function GetBmcWisePayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.BMCWisePayment(req, model);
        res.json(response);
    });
}
exports.GetBmcWisePayment = GetBmcWisePayment;
function GetPayoutCheckList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.GetPayoutCheckList(req, model);
        res.json(response);
    });
}
exports.GetPayoutCheckList = GetPayoutCheckList;
function GetAgentLedger(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.AgentLedger(req, model);
        res.json(response);
    });
}
exports.GetAgentLedger = GetAgentLedger;
function KrishiBazarReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = req.body;
        const response = yield cyclemasterService.KrishiBazarReport(req, model);
        res.json(response);
    });
}
exports.KrishiBazarReport = KrishiBazarReport;
function LockCycle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = req.body;
        const response = yield cyclemasterService.LockCycle(req, model);
        res.json(response);
    });
}
exports.LockCycle = LockCycle;
