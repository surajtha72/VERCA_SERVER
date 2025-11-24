import { TransporterContracts } from "../entities/TransporterContracts";
import { TransporterVehicles } from "../entities/TransporterVehicles";

export class InwardTransportationModel {
    constructor(data: any){
        this.contract = data.contract;
        this.vehicle = data.vehicle;
        this.milkQuantity = data.milkQuantity;
    }
    public vehicle: TransporterVehicles;
    public contract: TransporterContracts;
    public milkQuantity: number;
}