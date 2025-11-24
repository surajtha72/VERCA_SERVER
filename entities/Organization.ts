
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { ProcurementCenterType } from "./ProcurementCenterType";
import { OrganizationUnitType } from "./OrganizationUnitType";
import { DefaultCollectionType } from "./DefaultCollectionType";
import { PayrollTypes } from "./PayrollTypes";
import { RouteType } from "./RouteType";
import { States } from "./States";
import { Districts } from "./Districts";
import { Vct } from "./Vct";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => OrganizationUnitType, { nullable: true })
  @JoinColumn({ name: "organization_type" })
  OrganizationType: OrganizationUnitType;

  @ManyToOne(() => Organization, { nullable: true })
  @JoinColumn({ name: "parent_id" })
  ParentId: Organization | null;

  @Column({ name: "name", length: 200, default: null })
  Name: string;

  @Column({ name: "business_regn_no", length: 100, default: null })
  BusinessRegnNo: string;

  @Column({ name: "ou_code", length: 100, default: null }) // <--- add this
  OUCode: string;
  // ⬇️ NEW FIELDS
  @Column({ name: "allow_can", type: "boolean", default: false })
  AllowCan: boolean;

  @Column({ name: "milk_collection_uom", length: 10, nullable: true })
  MilkCollectionUom: string;

  @Column({ name: "milk_dispatch_uom", length: 10, nullable: true })
  MilkDispatchUom: string;
  
  @Column({ name: "gst_no", length: 100, default: null })
  GstNo: string;

  @Column({ name: "address_line_1", length: 250, default: null })
  AddressLine1: string;

  @Column({ name: "address_line_2", length: 250, default: null })
  AddressLine2: string;

  @ManyToOne(() => States, { nullable: true })
  @JoinColumn({ name: "state" })
  State: States;

  @ManyToOne(() => Districts, { nullable: true })
  @JoinColumn({ name: "district" })
  District: Districts;

  @ManyToOne(() => Vct, { nullable: true })
  @JoinColumn({ name: "vct_id" })
  VctId: Vct;

  @Column({ name: "geocode", length: 250, default: null })
  Geocode: string;

  @Column({ name: "admin_user_id", default: null })
  AdminUserId: number;

  @Column({ name: "bank_details_id", default: null })
  BankDetailsId: number;

  @Column({ name: "account_number", default: null })
  AccountNumber: string;

  @Column(({name:"acc_holder_name", default: null, length: 100}))
  AccHolderName: string;

  @Column({name: "phone_number", default: null, length: 100})
  PhoneNumber: string;
  
  @Column({name: "ifsc_code", default: null})
  IfscCode: string;

  @Column({ name: "capacity", type: 'bigint', default: null })
  Capacity: number;

  @Column({ name: "morning_shift_start_time", type: "time", default: null })
  MorningShiftStartTime: string;

  @Column({ name: "morning_shift_end_time", type: "time", default: null })
  MorningShiftEndTime: string;

  @Column({ name: "evening_shift_start_time", type: "time", default: null })
  EveningShiftStartTime: string;

  @Column({ name: "evening_shift_end_time", type: "time", default: null })
  EveningShiftEndTime: string;

  @ManyToOne(() => DefaultCollectionType, { nullable: true })
  @JoinColumn({ name: "default_collection_type" })
  DefaultCollectionType: DefaultCollectionType;

  @ManyToOne(() => PayrollTypes, { nullable: true })
  @JoinColumn({ name: "payroll_type" })
  PayrollTypes: PayrollTypes | null;

  @Column({ name: "enforce_strict_timing", nullable: true })
  EnforceStrictTiming: boolean;

  @Column({ name: "enforce_no_due_collection", nullable: true })
  EnforceNoDueCollection: boolean;

  @ManyToOne(() => RouteType, { nullable: true })
  @JoinColumn({ name: "route_type" })
  RouteType: RouteType | null;

  @Column({ name: "headload",  type: 'float',  default: 0 })
  HeadLoad: number;

  @Column({ name: "commission", type: 'float', default: 0 })
  Commission: number;

  @Column({ name: "is_active", default: true })
  IsActive: boolean;

  @Column({ name: "created_at", type: 'datetime', nullable: true })
  CreatedAt: Date;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "created_by" })
  CreatedBy: User;

  @Column({ name: "modified_at", nullable: true, type: 'datetime' })
  ModifiedAt: Date;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "modified_by" })
  ModifiedBy: User;

  @Column({ name: "deleted_at", nullable: true, type: 'datetime' })
  DeletedAt: Date;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "deleted_by" })
  DeletedBy: User;
}