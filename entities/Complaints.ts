import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./Organization";
import { BillingCycleMaster } from "./BillingCycleMaster";
import { User } from "./User";

@Entity()
export class Complaints {
    @PrimaryGeneratedColumn({name: "id"})
    Id: number;

    @ManyToOne(()=> Organization, {nullable: true})
    @JoinColumn({name: "agent_id"})
    AgentId: Organization;

    @ManyToOne(()=> BillingCycleMaster, {nullable: true})
    @JoinColumn({name: 'billing_cycle_id'})
    BillingCycleId: BillingCycleMaster;

    @Column({name: "settlement_amount"})
    SettlementAmount: number;

    @Column({name: "complaint", length: 100})
    Complaint: string;

    @Column({ name: "to_be_settled_start_date", type: 'datetime', nullable: true })
    TobeSettledStartDate: Date;

    @Column({ name: "to_be_settled_end_date", type: 'datetime', nullable: true })
    TobeSettledEndDate: Date;

    @Column({ name: "created_at", type: 'datetime', nullable: true })
    CreatedAt: Date;
    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "created_by" })
    CreatedBy: User;
  
    @Column({ name: "modified_at", nullable: true, type: 'datetime'})
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