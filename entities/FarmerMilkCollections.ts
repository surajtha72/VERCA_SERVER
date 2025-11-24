import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { MilkDispatch } from "./MilkDispatch";
import { BillingCycleMaster } from "./BillingCycleMaster";

@Entity()
export class FarmerMilkCollections {
    @PrimaryColumn({ name: "id", type: "uuid" })
    Id: string;

    @Column({ name: "shift", length: 20, nullable: true })
    Shift: string;

    @Column({ name: "status", length: 20, nullable: true })
    Status: string;

    @Column({ name: "collection_date_time", nullable: true, type: 'datetime' })
    CollectionDateTime: Date;

    @Column({ name: "started_at", nullable: true, type: 'datetime' })
    StartedAt: Date;

    @Column({ name: "completed_at", nullable: true, type: 'datetime' })
    CompletedAt: Date;

    @Column({ name: "is_active", default: true })
    IsActive: boolean;

    @Column({ name: "milk_dispatch_id", length: 100, nullable: true })
    MilkDispatchId: string;

    @Column({ name: "dispatched_quantity", type: "float", default: null })
    DispatchedQuantity: number;

    @Column({ name: "remaining_quantity", type: "float", default: null })
    RemainingQuantity: number;

    @Column({ name: "fat", type: "float", default: null })
    Fat: number;

    @Column({ name: "clr", type: "float", default: null })
    Clr: number;

    @Column({ name: "snf", type: "float", default: null })
    Snf: number;

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

    @Column({ name: "is_milk_bill_locked", default: false })
    IsMilkBillLocked: boolean;

    @ManyToOne(() => BillingCycleMaster, { nullable: true })
    @JoinColumn({ name: "billing_cycle" })
    BillingCycle: BillingCycleMaster;
}

