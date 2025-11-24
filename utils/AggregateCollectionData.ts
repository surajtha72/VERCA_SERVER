import moment from "moment";
import { MilkCollectionDetails } from "../entities/MilkCollectionDetails";
import { MilkCollections } from "../entities/MilkCollections";
import { Organization } from "../entities/Organization";
import { RouteMaster } from "../entities/RouteMaster";

const aggregateData = (milkCollectionDetails: any[]) => {
    let aggregatedData: Record<string, {
        MilkType: string;
        Fat: number;
        Snf: number;
        Clr: number;
        Weight: number;
        CollectedAt: Date;
        OrganizationUnitId: Organization;
        MilkCollectionId: MilkCollections;
        RouteId: RouteMaster;
        KGFat: number;
        KGSnf: number;
        count: number;
    }> = {};

    milkCollectionDetails.forEach((item: MilkCollectionDetails) => {
        const key = `${moment(item.MilkCollectionId.CollectionDateTime).format("DD-MM-YYYY")}-${item.MilkType}-${item.OrganizationUnitId.Id}-${item.MilkCollectionId.Shift}`;
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
        } else {
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
        const resultItem = {
            ...item,
        };

        if (item.count === 1) {
            resultItem.Fat = item.Fat;
            resultItem.Snf = item.Snf;
            resultItem.Clr = item.Clr;
        } else {
            resultItem.Fat = (item.KGFat / item.Weight) * 100;
            resultItem.Snf = (item.KGSnf / item.Weight) * 100;
            resultItem.Clr = item.Clr / item.count;
        }
        return resultItem;
    });

    return resultArray;
}

const smsAggregateData = (milkCollectionDetails: any[]) => {
    let aggregatedData: Record<string, {
        MilkType: string;
        CanCount: number;
        Fat: number;
        Snf: number;
        Clr: number;
        Weight: number;
        CollectedAt: Date;
        OrganizationUnitId: Organization;
        MilkCollectionId: MilkCollections;
        KGFat: number;
        KGSnf: number;
        count: number;
    }> = {};

    milkCollectionDetails.forEach((item: MilkCollectionDetails) => {
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
        } else {
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
        const resultItem = {
            ...item,
        };

        if (item.count === 1) {
            resultItem.Fat = item.Fat;
            resultItem.Snf = item.Snf;
            resultItem.Clr = item.Clr;
        } else {
            resultItem.Fat = (item.KGFat / item.Weight) * 100;
            resultItem.Snf = (item.KGSnf / item.Weight) * 100;
            resultItem.Clr = item.Clr / item.count;
        }
        return resultItem;
    });
    return resultArray;
}

export { aggregateData, smsAggregateData }


