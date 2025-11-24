
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { ProcurementCenterType } from "./ProcurementCenterType";
import { PayrollTypes } from "./PayrollTypes";
import { DefaultCollectionType } from "./DefaultCollectionType";
import { RouteType } from "./RouteType";

@Entity()
export class ProcurementCenterCharacteristics {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => ProcurementCenterType, { nullable: false })
  @JoinColumn({ name: "proc_type" })
  ProcurementTypes: ProcurementCenterType;

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

  @ManyToOne(() => PayrollTypes, { nullable: false })
  @JoinColumn({ name: "payroll_type" })
  PayrollTypes: PayrollTypes;
  
  @Column({ name: "enforce_strict_timing", nullable: true})
  EnforceStrictTiming: boolean;
  
  @Column({ name: "enforce_no_due_collection", nullable: true})
  EnforceNoDueCollection: boolean;

  @ManyToOne(() => RouteType, { nullable: true })
  @JoinColumn({ name: "route_type" })
  RouteType: RouteType;

  @Column({ name: "is_active", default: true })
  IsActive: boolean;

  @Column({ name: "created_at", type: 'datetime', nullable: true })
  CreatedAt: Date;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "created_by" })
  CreatedBy: User | null;

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