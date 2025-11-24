import { FinancialYear } from "../entities/FinancialYear";

class AllCycleMasterModel {
  constructor(data: any) {
    this.id = data.Id;
    this.financialYearId = data.financialYearId ?? null;
    this.cycleNo = data.cycleNo;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.isFrozen = data.isFrozen;
  }
  public id: number;
  public financialYearId: number;
  public cycleNo: number;
  public startDate: Date;
  public endDate: Date;
  public isFrozen : boolean;

}

class GetBillModel {
  constructor(data: any) {
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
  public startDate: Date;
  public endDate: Date;
}

class CreateCycleMasterModel {
  constructor(data: any) {
    this.financialYearId = data.financialYearId;
    this.cycleNo = data.cycleNo;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
  public financialYearId: number;
  public cycleNo: number;
  public startDate: Date;
  public endDate: Date;
}

class GetBillModelByBMC {
  constructor(data: any) {
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.bmcId = data.bmcId;
    this.shift = data.shift;
    this.nextStartDate = data.nextStartDate;
    this.nextEndDate = data.nextEndDate;
  }
  public startDate: Date;
  public endDate: Date;
  public bmcId: number;
  public shift: string;
  public nextStartDate: Date;
  public nextEndDate: Date;
}

class GetAgentLedgerModel {
  constructor(data: any) {
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.agentId = data.agentId;
  }
  public startDate: Date;
  public endDate: Date;
  public agentId: number;
}

class GetSnfReconcillationModel {
  constructor(data: any) {
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.shift = data.shift;
    this.bmcId = data.bmcId;
  }
  public startDate: Date;
  public endDate: Date;
  public shift: string;
  public bmcId: number;
}

class GetBillModelByBMCRoutes {
  constructor(data: any) {
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.bmcId = data.bmcId;
    this.routeId = data.routeId;
  }
  public startDate: Date;
  public endDate: Date;
  public bmcId: number;
  public routeId: number;
}



class GetBankLetterAmountModel {
  constructor(data: any) {
    this.bmcId = data.bmcId;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
  public bmcId: number;
  public startDate: Date;
  public endDate: Date;
}
class GetBankAdviceModel {
  constructor(data: any) {
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.bmcId = data.bmcId;
  }
  public startDate: Date;
  public endDate: Date;
  public bmcId: number;
}

class UpdateCycleMasterModel {
  constructor(data: any) {
    this.id = data.id;
    this.financialYearId = data.financialYearId;
    this.cycleNo = data.cycleNo;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
  public id: number;
  public financialYearId: number;
  public cycleNo: number;
  public startDate: Date;
  public endDate: Date;
}

class DeleteCycleMasterModel {
  constructor(data: any) {
    this.id = data.id;
  }
  public id: number;
}

class RateChartModel { 
  public rates: string[];
  constructor(data: any) {
    this.rates = data.rate;
  }
}

export {
  AllCycleMasterModel,
  CreateCycleMasterModel,
  UpdateCycleMasterModel,
  DeleteCycleMasterModel,
  GetBillModel,
  GetBillModelByBMC,
  GetBillModelByBMCRoutes,
  RateChartModel,
  GetBankAdviceModel,
  GetBankLetterAmountModel,
  GetSnfReconcillationModel,
  GetAgentLedgerModel
};
