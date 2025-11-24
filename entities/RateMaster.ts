import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Shifts } from "./Shifts";

@Entity()
export class RateMaster {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @Column({ name: "effective_from", type: "datetime", nullable: true })
  EffectiveFrom: Date;

  @Column({ name: "cow_fat_rate", type: "float", default: null })
  CowFatRate: number;

  @Column({name: "seq_no", default: null})
  SeqNo: number;

  @Column({name: "wef", type: "datetime", default: null})
  Wef: Date;

  @Column({ name: "cow_snf_rate", type: "float", default: null })
  CowSnfRate: number;

  @Column({ name: "buff_fat_rate", type: "float", default: null })
  BuffFatRate: number;

  @Column({ name: "buff_snf_rate", type: "float", default: null })
  BuffSnfRate: number;

  @Column({ name: "short_desc", default: null })
  ShortDesc: string;

  @Column({ name: "fat_range_min", type: "float", default: null })
  FatRangeMin: number;

  @Column({ name: "fat_range_max", type: "float", default: null })
  FatRangeMax: number;

  @Column({ name: "cow_min_fat", type: "float", default: null })
  CowMinFat: number;

  @Column({ name: "cow_min_snf", type: "float", default: null })
  CowMinSnf: number;

  @Column({ name: "buff_min_fat", type: "float", default: null })
  BuffMinFat: number;

  @Column({ name: "buff_min_snf", type: "float", default: null })
  BuffMinSnf: number;

  @Column({ name: "snf_range_min", type: "float", default: null })
  SnfRangeMin: number;

  @Column({ name: "snf_range_max", type: "float", default: null })
  SnfRangeMax: number;

  @ManyToOne(() => Shifts, { nullable: true })
  @JoinColumn({ name: "shifts_applicable" })
  ShiftsApplicable: Shifts;

  @Column({ name: "is_active", default: true })
  IsActive: boolean;

  @Column({ name: "created_at", type: "datetime", nullable: true })
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
