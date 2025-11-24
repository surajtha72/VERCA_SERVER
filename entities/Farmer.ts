
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { ProcurementCenterType } from "./ProcurementCenterType";
import { OrganizationUnitType } from "./OrganizationUnitType";
import { DefaultCollectionType } from "./DefaultCollectionType";
import { PayrollTypes } from "./PayrollTypes";
import { RouteType } from "./RouteType";
import { States } from "./States";
import { Districts } from "./Districts";
import { Vct } from "./Vct";
import { Organization } from "./Organization";

@Entity()
export class Farmer {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => Organization, { nullable: true })
  @JoinColumn({ name: "parent_id" })
  ParentId: Organization | null;

  @Column({ name: "name", length: 200, default: null })
  Name: string;

  @Column({ name: "address_line_1", length: 250, default: null })
  AddressLine1: string;

  @Column({ name: "address_line_2", length: 250, default: null })
  AddressLine2: string;

  @ManyToOne(() => States, { nullable: true })
  @JoinColumn({ name: "state" })
  State: States;

  @ManyToOne(() => Districts, { nullable: true })
  @JoinColumn({ name: "district" })
  District: Districts;

  @ManyToOne(() => Vct, { nullable: true })
  @JoinColumn({ name: "vct_id" })
  VctId: Vct;

  @Column({ name: "account_number", default: null })
  AccountNumber: string;

  @Column(({name:"acc_holder_name", default: null, length: 100}))
  AccHolderName: string;

  @Column({name: "phone_number", default: null, length: 100})
  PhoneNumber: string;
  
  @Column({name: "ifsc_code", default: null})
  IfscCode: string;

  @Column({ name: "aadhar_number", length: 200, default: null })
  AadharNumber: string;

  @Column({ name: "is_current_rate", default: true })
  IsCurrentRate: boolean;

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