import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { FarmerMilkCollections } from "./FarmerMilkCollections";
import { Organization } from "./Organization";
import { TransporterVehicles } from "./TransporterVehicles";
import { RouteMaster } from "./RouteMaster";

@Entity()
export class FarmerMilkCollectionDetails {
  @PrimaryColumn({ name: "id", type: "uuid" })
  Id: string;

  @ManyToOne(() => FarmerMilkCollections, { nullable: true })
  @JoinColumn({ name: "milk_collection_id" })
  MilkCollectionId: FarmerMilkCollections;

  @Column({ name: "milk_type", length: 200, nullable: true })
  MilkType: string;

  @Column({ name: "collection_operation_type", length: 100, nullable: true })
  CollectionOperationType: string;

  @Column({ name: "testing_operation_type", length: 150, default: null })
  TestingOperationType: string;

  @Column({ name: "fat", type: "float", default: null})
  Fat: number;

  @Column({ name: "snf", type: "float", default: 0 })
  Snf: number;

  @Column({ name: "clr", type: "float", default: 0 })
  Clr: number;

  @Column({name: "protein", type: "float", default: null})
  Protein: number;

  @Column({name: "lactose", type: "float", default: null})
  Lactose: number;

  @Column({name: "salt", type: "float", default: null})
  Salt: number;

  @Column({name: "water", type: "float", default: null})
  Water: number;

  @Column({name: "temperature", type: "float", default: null})
  Temperature: number;

  @Column({name:'sample_number', type:"float", default: null})
  SampleNumber: number;

  @Column({ name: "weight", type: "float", default: null })
  Weight: number;

  @Column({ name: "can_count", default: null })
  CanCount: number;

  @ManyToOne(() => Organization, { nullable: true })
  @JoinColumn({ name: "organization_unit_id" })
  OrganizationUnitId: Organization;

  @ManyToOne(() => TransporterVehicles, { nullable: true })
  @JoinColumn({ name: "transporter_vehicle_id" })
  TransporterVehicleId: TransporterVehicles;

  @ManyToOne(() => RouteMaster, { nullable: true })
  @JoinColumn({ name: "route_id" })
  RouteId: RouteMaster;

  @ManyToOne(()=>User, { nullable: true})
  @JoinColumn({name: "collected_by"})
  CollectedBy: User;

  @Column({ name: "collected_at", nullable: true, type: "datetime" })
  CollectedAt: Date;

  @Column({ name: "tested_at", nullable: true, type: "datetime" })
  TestedAt: Date;

  @Column({ name: "is_active", default: true })
  IsActive: boolean;

  @Column({ name: "created_at", type: "datetime", nullable: true })
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
