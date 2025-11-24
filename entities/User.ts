import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Roles } from "./Roles";
import { States } from "./States";
import { Districts } from "./Districts";
import { Vct } from "./Vct";
import { OrganizationUnitType } from "./OrganizationUnitType";
import { Organization } from "./Organization";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => OrganizationUnitType, { nullable: true })
  @JoinColumn({ name: "organization_unit_type_id" })
  OrganizationUnitTypeId: OrganizationUnitType;
  
  @ManyToOne(() => Organization, { nullable: true })
  @JoinColumn({ name: "organization_unit_id" })
  OrganizationUnitId: Organization;

  @Column({ name: "name", length: 20, default: null })
  Name: string;

  @Column({ name: "address", length: 200, default: null })
  Address: string;

  @Column({ name: "mobile_no", length: 20, default: null })
  MobileNo: string;

  @Column({ name: "email_id", length: 50, default: null })
  EmailId: string;

  @ManyToOne(() => Roles, { nullable: false })
  @JoinColumn({ name: "role" })
  Role: Roles;

  @ManyToOne(() => States, { nullable: true })
  @JoinColumn({ name: "state" })
  State: States;

  @ManyToOne(() => Districts, { nullable: true })
  @JoinColumn({ name: "district" })
  District: Districts;

  @ManyToOne(() => Vct, { nullable: true })
  @JoinColumn({ name: "taluka" })
  Taluka: Vct;

  @Column({ name: "aadhaar_no", length: 15, default: null })
  AadhaarNo: string;

  @Column({ name: "pan_no", length: 10, default: null })
  PanNo: string;

  @Column({ name: "bank_ac_no", length: 25, default: null })
  BankAcNo: string;

  @Column({ name: "bank_ac_name", length: 50, default: null })
  BankAcName: string;

  @Column({ name: "bank_branch_ifsc", default: null })
  BankBranIfsc: string;

  @Column({ name: "username", length: 25, default: null })
  Username: string;

  @Column({ name: "password", length: 250 })
  Password: string;

  @Column({ name: "is_active", default: true })
  IsActive: boolean;

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