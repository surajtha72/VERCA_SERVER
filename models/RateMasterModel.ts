class AllTRateMasterModel {
  constructor(data: any) {
    this.id = data.id;
    this.effectiveFrom = data.effectiveFrom;
    this.cowFatRate = data.cowFatRate;
    this.cowSnfRate = data.cowSnfRate;
    this.buffFatRate = data.buffFatRate;
    this.buffSnfRate = data.buffSnfRate;
    this.shiftsApplicableId = data.shiftsApplicableId;
    this.shiftsApplicable = data.shiftsApplicable;
    this.shortDesc = data.shortDesc;
    this.fatRangeMin = data.fatRangeMin;
    this.fatRangeMax = data.fatRangeMax;
    this.snfRangeMin = data.snfRangeMin;
    this.snfRangeMax = data.snfRangeMax;
    this.wef = data.wef;
    this.cowMinFat = data.cowMinFat;
    this.cowMinSnf = data.cowMinSnf;
    this.buffMinFat = data.buffMinFat;
    this.buffMinSnf = data.buffMinSnf;
    this.seqNo = data.seqNo;
  }
  public id: number;
  public effectiveFrom: Date;
  public cowFatRate: number;
  public cowSnfRate: number;
  public buffFatRate: number;
  public buffSnfRate: number;
  public shiftsApplicableId: number;
  public shiftsApplicable: string;
  public shortDesc: string;
  public seqNo: number;
  public wef: Date;
  public fatRangeMin: number;
  public fatRangeMax: number;
  public snfRangeMax: number;
  public snfRangeMin: number;
  public cowMinFat: number;
  public cowMinSnf: number;
  public buffMinFat: number;
  public buffMinSnf: number;
}

class CreateRateMasterModel {
  constructor(data: any) {
    this.effectiveFrom = data.effectiveFrom;
    this.cowFatRate = data.cowFatRate;
    this.cowSnfRate = data.cowSnfRate;
    this.buffFatRate = data.buffFatRate;
    this.buffSnfRate = data.buffSnfRate;
    this.shiftsApplicable = data.shiftsApplicable;
    this.shortDesc = data.shortDesc;
    this.fatRangeMin = data.fatRangeMin;
    this.fatRangeMax = data.fatRangeMax;
    this.snfRangeMin = data.snfRangeMin;
    this.snfRangeMax = data.snfRangeMax;
    this.wef = data.wef;
    this.cowMinFat = data.cowMinFat;
    this.cowMinSnf = data.cowMinSnf;
    this.buffMinFat = data.buffMinFat;
    this.buffMinSnf = data.buffMinSnf;
    this.seqNo = data.seqNo;
  }
  public effectiveFrom: Date;
  public cowFatRate: number;
  public cowSnfRate: number;
  public buffFatRate: number;
  public buffSnfRate: number;
  public shiftsApplicable: number;
  public shortDesc: string;
  public seqNo: number;
  public wef: Date;
  public fatRangeMin: number;
  public fatRangeMax: number;
  public snfRangeMax: number;
  public snfRangeMin: number;
  public cowMinFat: number;
  public cowMinSnf: number;
  public buffMinFat: number;
  public buffMinSnf: number;  
}

class UpdateRateMasterModel {
  constructor(data: any) {
    this.id = data.id;
    this.effectiveFrom = data.effectiveFrom;
    this.cowFatRate = data.cowFatRate;
    this.cowSnfRate = data.cowSnfRate;
    this.buffFatRate = data.buffFatRate;
    this.buffSnfRate = data.buffSnfRate;
    this.shiftsApplicable = data.shiftsApplicable;
    this.shortDesc = data.shortDesc;
    this.fatRangeMin = data.fatRangeMin;
    this.fatRangeMax = data.fatRangeMax;
    this.snfRangeMin = data.snfRangeMin;
    this.snfRangeMax = data.snfRangeMax;
    this.wef = data.wef;
    this.cowMinFat = data.cowMinFat;
    this.cowMinSnf = data.cowMinSnf;
    this.buffMinFat = data.buffMinFat;
    this.buffMinSnf = data.buffMinSnf;
    this.seqNo = data.seqNo;
  }
  public id: number;
  public effectiveFrom: Date;
  public cowFatRate: number;
  public cowSnfRate: number;
  public buffFatRate: number;
  public buffSnfRate: number;
  public shiftsApplicable: number;
  public shortDesc: string;
  public seqNo: number;
  public wef: Date;
  public fatRangeMin: number;
  public fatRangeMax: number;
  public snfRangeMax: number;
  public snfRangeMin: number;
  public cowMinFat: number;
  public cowMinSnf: number;
  public buffMinFat: number;
  public buffMinSnf: number;
}

class DeleteRateMasterModel {
  constructor(data: any) {
    this.id = data.id;
  }
  public id: number;
}

export { AllTRateMasterModel, CreateRateMasterModel, UpdateRateMasterModel, DeleteRateMasterModel };
