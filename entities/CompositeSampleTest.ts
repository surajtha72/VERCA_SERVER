import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { TransporterVehicles } from "./TransporterVehicles";
import { ProductCategory } from "./ProductCategory";
import { RouteMaster } from "./RouteMaster";

@Entity()
export class CompositeSampleTest {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => TransporterVehicles, {nullable: true})
  @JoinColumn({ name: "vehicle_no" })
  VehicleNo: TransporterVehicles;

  @ManyToOne(() => ProductCategory, {nullable: true})
  @JoinColumn({ name: "product_category" })
  ProductCategory: ProductCategory;

  @Column({ name: "product_name", length: 100 })
  ProductName: string;

  @ManyToOne(() => RouteMaster, {nullable: true})
  @JoinColumn({ name: "route_id" })
  RouteId: RouteMaster;

  @Column({ name: "test_date", type: "datetime" })
  TestDate: Date;
  
  @Column({ name: "fat", type: "float", default: null })
  Fat: number;

  @Column({ name: "snf", type: "float", default: null })
  Snf: number;

  @Column({ name: "clr", type: "float", default: null })
  Clr: number;

  @Column({ name: "protein", type: "float", default: null })
  Protein: number;

  @Column({ name: "lactose", type: "float", default: null })
  Lactose: number;

  @Column({ name: "salt", type: "float", default: null })
  Salt: number;

  @Column({ name: "water", type: "float", default: null })
  water: number;

  @Column({ name: "temperature", type: "float", default: null })
  Temperature: number;

  @Column({ name: "analyst", length: 100 })
  Analyst: string;

  // @Column({ name: "sampled_by", length: 100 })
  // SampledBy: string;

  @Column({ name: "status", length: 100 })
  Status: string;
  
  @Column({ name: "remarks", length: 100 })
  Remarks: string;

  @Column({ name: "is_active" })
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