
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { OrganizationUnitType } from "./OrganizationUnitType";

@Entity()
export class RouteType {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @Column({ name: "short_description", length: 50, default: null })
  ShortDescription: string;

  @ManyToOne(() => OrganizationUnitType, { nullable: true })
  @JoinColumn({ name: "from_proc_unit_type" })
  FromProcUnitType: OrganizationUnitType;

  @ManyToOne(() => OrganizationUnitType, { nullable: true })
  @JoinColumn({ name: "to_proc-org_unit_type" })
  ToProcOrgUnitType: OrganizationUnitType;

  @Column({ name: "vehicleType", default: null })
  VehicleType: string;

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