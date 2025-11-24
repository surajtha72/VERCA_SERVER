
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { Districts } from "./Districts";
import { States } from "./States";

@Entity()
export class Vct {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => States, { nullable: true })
  @JoinColumn({ name: "state_id" })
  StateId: States;

  @ManyToOne(() => Districts, { nullable: true })
  @JoinColumn({ name: "district_id" })
  DistrictId: Districts;

  @Column({ name: "name", length: 50, default: null })
  Name: string;
  
  @Column({ name: "pincode", length: 15, default: null })
  Pincode: string;

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
