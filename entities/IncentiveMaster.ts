
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { BillingCycleMaster } from "./BillingCycleMaster";

@Entity()
export class IncentiveMaster {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @Column({ name: "incentive_type" })
  IncentiveType: number;

  @Column({ name: "incentive_name" })
  IncentiveName: string;

  @Column({ name: "effective_from", type: "datetime" })
  EffectiveFrom: Date;

  @ManyToOne(() => BillingCycleMaster, { nullable: true })
  @JoinColumn({ name: "billing_cycle_ref" })
  BillingCycleRef: BillingCycleMaster;

  @Column({ name: "min_fat_limit", type: "float" })
  MinFatLimit: number;

  @Column({ name: "min_snf_limit", type: "float" })
  MinSnfLimit: number;

  @Column({ name: "shifts_applicable" })
  ShiftsApplicable: number;

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
