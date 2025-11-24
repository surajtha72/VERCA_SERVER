import { Request, Response } from "express";
import * as cyclemasterService from "../services/BillingCycleMasterServices";
import {
  CreateCycleMasterModel,
  DeleteCycleMasterModel,
  UpdateCycleMasterModel,
} from "../models/BillingCycleMasterModel";

async function GetAllCycleMaster(req: Request, res: Response) {
  const model = req.query;
  if (model) {
    const response = await cyclemasterService.GetCycleMaster(model);
    res.json(response);
  } else {
    const response = await cyclemasterService.GetCycleMaster();
    res.json(response);
  }
}

async function GetBill(req: Request, res: Response) {
  const model = req.body;
  const response = await cyclemasterService.GetBill(req, model);
  res.json(response);
}

async function GetBillByBMC(req: Request, res: Response) {
  const model = req.body;
  const response = await cyclemasterService.GetBillByBMC(req, model);
  res.json(response);
}

async function GetBillByBMCRoutes(req: Request, res: Response) {
  const model = req.body;
  const response = await cyclemasterService.GetBillByBMCRoutes(req, model);
  res.json(response);
}

async function CreateCycleMaster(req: Request, res: Response) {
  let cycleModel = new CreateCycleMasterModel(req.body);
  const response = await cyclemasterService.CreateCycleMaster(
    req,
    cycleModel
  );
  res.json(response);
}

async function UpdateCycleMaster(req: Request, res: Response) {
  let cycleModel = new UpdateCycleMasterModel(req.body);
  const response = await cyclemasterService.UpdateCycleMaster(
    req,
    cycleModel
  );
  res.json(response);
}

async function DeleteCycleMaster(req: Request, res: Response) {
  let model = new DeleteCycleMasterModel(req.params);
  const response = await cyclemasterService.DeleteCycleMaster(req, model);
  res.json(response);
}

async function GetRateChart(req: Request, res: Response) {
  const model = req.query;
    const response = await cyclemasterService.GetRateChart();
    res.json(response);
}

async function GetBankAdvice(req: Request, res: Response) {
  const model = req.body;
    const response = await cyclemasterService.GetBankAdvice(req, model);
    res.json(response);
}

async function GetBankLetterAmount(req: Request, res: Response) {
  const model = req.body;
    const response = await cyclemasterService.GetBankLetterAmount(req, model);
    res.json(response);
}

async function GetBmcSnfReconcillation(req: Request, res: Response) {
  const model = req.body;
    const response = await cyclemasterService.GetBmcSnfReconcillation(req, model);
    res.json(response);
}

async function GetAgentWiseMilkCollection(req: Request, res: Response) {
  const model = req.body;
    const response = await cyclemasterService.GetAgentWiseMilkCollection(req, model);
    res.json(response);
}

async function GetDateWiseAgentCollection(req: Request, res: Response) {
  const model = req.body;
    const response = await cyclemasterService.DateWiseAgentColletionDetail(req, model);
    res.json(response);
}

async function GetBmcWiseMilkCollection(req: Request, res: Response) {
  const model = req.body;
    const response = await cyclemasterService.GetBmcWiseMilkCollection(req, model);
    res.json(response);
}

async function GetDateWiseBmcMilkCollection(req: Request, res: Response) {
  const model = req.body;
    const response = await cyclemasterService.DateWiseBmcMilkCollection(req, model);
    res.json(response);
}

async function GetRouteWiseBmcMilkCollection(req: Request, res: Response) {
  const model = req.body;
    const response = await cyclemasterService.RouteWiseBmcMilkCollection(req, model);
    res.json(response);
}

async function GetBmcWisePayment(req: Request, res: Response) {
  const model = req.body;
    const response = await cyclemasterService.BMCWisePayment(req, model);
    res.json(response);
}

async function GetPayoutCheckList(req: Request, res: Response) {
  const model = req.body;
    const response = await cyclemasterService.GetPayoutCheckList(req, model);
    res.json(response);
}

async function GetAgentLedger(req: Request, res: Response) {
  const model = req.body;
    const response = await cyclemasterService.AgentLedger(req, model);
    res.json(response);
}

async function KrishiBazarReport(req: Request, res: Response) {
  const model = req.body;
    const response = await cyclemasterService.KrishiBazarReport(req, model);
    res.json(response);
}

async function LockCycle(req: Request, res: Response) {
  let model = req.body;
  const response = await cyclemasterService.LockCycle(req,model);
  res.json(response);
}

export {
  GetAllCycleMaster,
  CreateCycleMaster,
  UpdateCycleMaster,
  DeleteCycleMaster,
  GetBill,
  GetBillByBMC,
  GetBillByBMCRoutes,
  GetRateChart,
  GetBankAdvice,
  GetBankLetterAmount,
  GetBmcSnfReconcillation,
  GetAgentWiseMilkCollection,
  GetDateWiseAgentCollection,
  GetBmcWiseMilkCollection,
  GetDateWiseBmcMilkCollection,
  GetRouteWiseBmcMilkCollection,
  GetBmcWisePayment,
  GetPayoutCheckList,
  GetAgentLedger,
  KrishiBazarReport,
  LockCycle
};