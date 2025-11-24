
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { RateMaster } from "./RateMaster";

@Entity()
export class RateApplied {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => RateMaster, {nullable: true})
  @JoinColumn({ name: "rate_id" })
  RateId: RateMaster;

  @Column({ name: "applied_to", length: 100 })
  AppliedTo: string;

  @Column({ name: "applied_on", type: "datetime" })
  AppliedOn: Date;

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
