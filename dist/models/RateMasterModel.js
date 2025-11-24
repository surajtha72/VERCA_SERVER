"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRateMasterModel = exports.UpdateRateMasterModel = exports.CreateRateMasterModel = exports.AllTRateMasterModel = void 0;
class AllTRateMasterModel {
    constructor(data) {
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
}
exports.AllTRateMasterModel = AllTRateMasterModel;
class CreateRateMasterModel {
    constructor(data) {
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
}
exports.CreateRateMasterModel = CreateRateMasterModel;
class UpdateRateMasterModel {
    constructor(data) {
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
}
exports.UpdateRateMasterModel = UpdateRateMasterModel;
class DeleteRateMasterModel {
    constructor(data) {
        this.id = data.id;
    }
}
exports.DeleteRateMasterModel = DeleteRateMasterModel;
