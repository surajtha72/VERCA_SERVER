
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { IncentiveMaster } from "./IncentiveMaster";

@Entity()
export class IncentiveSlabs {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => IncentiveMaster, {nullable: true})
  @JoinColumn({ name: "incentive_id" })
  IncentiveId: IncentiveMaster;

  @Column({ name: "slab_type" })
  SlabType: number;

  @Column({ name: "slab_from", type: "float", default: 0 })
  SlabFrom: number;

  @Column({ name: "slab_to", type: "float", default: 0 })
  SlabTo: number;

  @Column({ name: "sequence_no", default: null})
  SequenceNo: number;
  
  @Column({ name: "incentive_per_kg", type: "float", default: 0 })
  IncentivePerKg: string;

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
