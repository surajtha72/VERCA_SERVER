import { RateMaster } from "../entities/RateMaster";

class AllTRateAppliedModel {
    constructor(data: any) {
      this.id = data.id;
      this.rateId = data.rateId;
      this.appliedTo = data.appliedTo;
      this.appliedOn = data.appliedOn;
      this.isActive = data.isActive;
    }
    public id: number;
    public rateId: number;
    public appliedTo: string;
    public appliedOn: Date;
    public isActive: boolean;
  }
  
  class CreateRateAppliedModel {
    constructor(data: any) {
        this.rateId = data.rateId;
        this.appliedTo = data.appliedTo;
        this.appliedOn = data.appliedOn;
        this.isActive = data.isActive;
      }
      public rateId: RateMaster;
      public appliedTo: string;
      public appliedOn: Date;
      public isActive: boolean;
  }
  
  class UpdateRateAppliedModel {
    constructor(data: any) {
        this.id = data.id;
        this.rateId = data.rateId;
        this.appliedTo = data.appliedTo;
        this.appliedOn = data.appliedOn;
        this.isActive = data.isActive;
      }
      public id: number;
      public rateId: RateMaster;
      public appliedTo: string;
      public appliedOn: Date;
      public isActive: boolean;
  }
  
  class DeleteRateAppliedModel {
    constructor(data: any) {
      this.id = data.id;
    }
    public id: number;
  }
  
  export { AllTRateAppliedModel, CreateRateAppliedModel, UpdateRateAppliedModel, DeleteRateAppliedModel };