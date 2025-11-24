import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { TransporterVehicles } from "./TransporterVehicles";
import { ProductCategory } from "./ProductCategory";
import { RouteMaster } from "./RouteMaster";

@Entity()
export class WeighBridge {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @Column({ name: "weighbridge_no", length: 100 })
  WeighbridgeNo: string;

  @ManyToOne(() => TransporterVehicles, {nullable: true})
  @JoinColumn({ name: "vehicle_no" })
  VehicleNo: TransporterVehicles;

  // @Column({ name: "contractor_code", length: 100 })
  // ContractorCode: string;

  @Column({ name: "contractor_name", length: 100 , default: null})
  ContractorName: string;

  @Column({ name: "challan_no", length: 100, default: null })
  ChallanNo: string;

  // @Column({ name: "driver_name", length: 100 })
  // DriverName: string;

  // @Column({ name: "contact_person", length: 100 })
  // ContactPerson: string;

  @Column({ name: "destination", length: 100, default: null })
  Destination: string;

  @Column({ name: "purpose", length: 100, default: null })
  Purpose: string;

  @Column({ name: "supplier_name", length: 100, default: null })
  SupplierName: string;

  @ManyToOne(() => RouteMaster, {nullable: true})
  @JoinColumn({ name: "route_id" })
  RouteId: RouteMaster;

  @ManyToOne(() => ProductCategory, {nullable: true})
  @JoinColumn({ name: "product_category" })
  ProductCategory: ProductCategory;

  @Column({ name: "product_name", length: 100, default: null })
  ProductName: string;

  @Column({ name: "weight_mode", length: 100, default: null })
  WeightMode: string;

  @Column({ name: "tare_weight", type: "float", default: null })
  TareWeight: number;

  @Column({ name: "tare_date", type: "datetime", default: null })
  TareDate: Date;

  @Column({ name: "gross_weight", type: "float", default: null })
  GrossWeight: number;

  @Column({ name: "gross_date", type: "datetime", default: null })
  GrossDate: Date;

  @Column({ name: "net_weight_kg", type: "float", default: null })
  NetWeightKg: number;

  @Column({ name: "supply_qty", default: null })
  SupplyQty: number;

  @Column({ name: "remarks", length: 100, default: null })
  Remarks: string;

  // @Column({ name: "temperature", type: "float", default: null })
  // Temparature: number;
  
  // @Column({ name: "fat", type: "float", default: null })
  // Fat: number;

  // @Column({ name: "snf", type: "float", default: null })
  // Snf: number;

  // @Column({ name: "acidity", type: "float", default: null })
  // Acidity: number;

  @Column({ name: "is_active", default: true })
  IsActive: boolean;

  @Column({ name: "created_at", type: "datetime" })
  CreatedAt: Date;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "created_by" })
  CreatedBy: User;

  @Column({ name: "modified_at", nullable: true, type: "datetime" })
  ModifiedAt: Date;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "modified_by" })
  ModifiedBy: User;

  @Column({ name: "deleted_at", nullable: true, type: "datetime" })
  DeletedAt: Date;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "deleted_by" })
  DeletedBy: User;
}