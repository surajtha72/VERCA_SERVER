import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { FinancialYear } from "./FinancialYear";

@Entity()
export class BillingCycleMaster {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => FinancialYear, { nullable: true })
  @JoinColumn({ name: "financial_year_id" })
  FinancialYearId: FinancialYear;

  @Column({ name: "cycle_no", default: null })
  CycleNo: number;

  @Column({ name: "start_date", nullable: true, type: "datetime" })
  StartDate: Date;

  @Column({ name: "end_date", nullable: true, type: "datetime" })
  EndDate: Date;

  @Column({ name: "is_active", default: true })
  IsActive: boolean;

  @Column({ name: "is_frozen", type: "boolean", default: false })
  IsFrozen: boolean;

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
