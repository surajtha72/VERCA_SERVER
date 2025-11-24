import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Organization } from "./Organization";
import { User } from "./User";

@Entity()
export class OrganizationHistory {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => Organization, { nullable: false })
  @JoinColumn({ name: "organization_id" })
  OrganizationId: Organization;

  @Column({ name: "headload", type: "float", nullable: false })
  HeadLoad: number;

  @Column({ name: "account_number", default: null })
  AccountNumber: string;

  @Column(({name:"acc_holder_name", default: null, length: 100}))
  AccHolderName: string;

  @Column({ name: "effective_from", nullable: true, type: "datetime" })
  EffectiveFrom: Date;

  @Column({ name: "created_at", nullable: true, type: "datetime" })
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