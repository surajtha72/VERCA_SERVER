import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./User";
import { RouteType } from "./RouteType";
import { Organization } from "./Organization";

@Entity()
export class RouteMaster {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => RouteType, { nullable: true })
  @JoinColumn({ name: "route_type_id" })
  RouteTypeId: RouteType;

  @ManyToOne(() => Organization, { nullable: true} )
  @JoinColumn({ name: "route_owner" })
  RouteOwner: Organization;

  @Column({ name: "route_name", length: 100, default: null })
  RouteName: string;

  @Column({ name: "route_code", length: 200, default: null })
  RouteCode: string;

  @Column({ name: "trip_type", default: null })
  TripType: string;

  @Column({ name: "morning_shift_sch_time", type: "time", nullable: true })
  MorningShiftSchTime: string;

  @Column({ name: "evening_shift_sch_time", type: "time", nullable: true })
  EveningShiftSchTime: string;

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