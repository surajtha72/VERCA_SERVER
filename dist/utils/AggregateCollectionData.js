"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsAggregateData = exports.aggregateData = void 0;
const moment_1 = __importDefault(require("moment"));
const aggregateData = (milkCollectionDetails) => {
    let aggregatedData = {};
    milkCollectionDetails.forEach((item) => {
        const key = `${(0, moment_1.default)(item.MilkCollectionId.CollectionDateTime).format("DD-MM-YYYY")}-${item.MilkType}-${item.OrganizationUnitId.Id}-${item.MilkCollectionId.Shift}`;
        if (!aggregatedData[key]) {
            aggregatedData[key] = {
                MilkType: item.MilkType,
                Fat: item.Fat,
                Snf: item.Snf,
                Clr: item.Clr,
                Weight: item.Weight,
                CollectedAt: item.MilkCollectionId.CollectionDateTime,
                OrganizationUnitId: item.OrganizationUnitId,
                MilkCollectionId: item.MilkCollectionId,
                RouteId: item.RouteId,
                KGFat: (item.Weight / 100) * item.Fat,
                KGSnf: (item.Weight / 100) * item.Snf,
                count: 1,
            };
        }
        else {
            aggregatedData[key].Weight += item.Weight;
            aggregatedData[key].Fat += item.Fat;
            aggregatedData[key].Snf += item.Snf;
            aggregatedData[key].Clr += item.Clr;
            aggregatedData[key].KGFat += (item.Weight / 100) * item.Fat;
            aggregatedData[key].KGSnf += (item.Weight / 100) * item.Snf;
            aggregatedData[key].count++;
        }
    });
    const resultArray = Object.values(aggregatedData).map(item => {
        const resultItem = Object.assign({}, item);
        if (item.count === 1) {
            resultItem.Fat = item.Fat;
            resultItem.Snf = item.Snf;
            resultItem.Clr = item.Clr;
        }
        else {
            resultItem.Fat = (item.KGFat / item.Weight) * 100;
            resultItem.Snf = (item.KGSnf / item.Weight) * 100;
            resultItem.Clr = item.Clr / item.count;
        }
        return resultItem;
    });
    return resultArray;
};
exports.aggregateData = aggregateData;
const smsAggregateData = (milkCollectionDetails) => {
    let aggregatedData = {};
    milkCollectionDetails.forEach((item) => {
        const key = `${item.MilkType}-${item.OrganizationUnitId.Id}`;
        if (!aggregatedData[key]) {
            aggregatedData[key] = {
                MilkType: item.MilkType,
                CanCount: item.CanCount,
                Fat: item.Fat,
                Snf: item.Snf,
                Clr: item.Clr,
                Weight: item.Weight,
                CollectedAt: item.CollectedAt,
                OrganizationUnitId: item.OrganizationUnitId,
                MilkCollectionId: item.MilkCollectionId,
                KGFat: (item.Weight / 100) * item.Fat,
                KGSnf: (item.Weight / 100) * item.Snf,
                count: 1,
            };
        }
        else {
            aggregatedData[key].Weight += item.Weight;
            aggregatedData[key].CanCount += item.CanCount;
            aggregatedData[key].Fat += item.Fat;
            aggregatedData[key].Snf += item.Snf;
            aggregatedData[key].Clr += item.Clr;
            aggregatedData[key].KGFat += (item.Weight / 100) * item.Fat;
            aggregatedData[key].KGSnf += (item.Weight / 100) * item.Snf;
            aggregatedData[key].count++;
        }
    });
    const resultArray = Object.values(aggregatedData).map(item => {
        const resultItem = Object.assign({}, item);
        if (item.count === 1) {
            resultItem.Fat = item.Fat;
            resultItem.Snf = item.Snf;
            resultItem.Clr = item.Clr;
        }
        else {
            resultItem.Fat = (item.KGFat / item.Weight) * 100;
            resultItem.Snf = (item.KGSnf / item.Weight) * 100;
            resultItem.Clr = item.Clr / item.count;
        }
        return resultItem;
    });
    return resultArray;
};
exports.smsAggregateData = smsAggregateData;
