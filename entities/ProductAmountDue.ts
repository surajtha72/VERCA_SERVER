
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index } from "typeorm";
import { BillingCycleMaster } from "./BillingCycleMaster";
import { Organization } from "./Organization";

@Entity()
export class ProductAmountDue {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => Organization, { nullable: true })
  @JoinColumn({ name: "agent_id" })
  @Index({ unique: true })
  AgentId: Organization;

  @Column({ name: "cycle_start_date", nullable: true, type: 'datetime' })
  CycleStartDate: Date;

  @Column({ name: "cycle_end_date", nullable: true, type: 'datetime' })
  CycleEndDate: Date;

  @Column({ name: "short_desc", nullable: true })
  ShortDesc: string;

  @Column('float',{ name: "due_amount", default: null ,scale: 2})
  DueAmount: number;

  @Column({ name: "created_at", nullable: true, type: 'datetime'  })
  CreatedAt: Date;

  @Column({ name: "modified_at", nullable: true, type: 'datetime' })
  ModifiedAt: Date;

  @Column({ name: "modified_cycle_start_date", nullable: true, type: 'datetime' })
  ModifiedCycleStartDate: Date;

  @Column({ name: "modified_cycle_end_date", nullable: true, type: 'datetime' })
  ModifiedCycleEndDate: Date;

}
