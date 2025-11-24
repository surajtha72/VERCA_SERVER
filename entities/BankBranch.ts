import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { Bank } from "./Bank";

@Entity()
export class BankBranch {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(()=> Bank,{nullable: true})
  @JoinColumn({ name: "bank_id", })
  BankId: Bank;

  @Column({ name: "branch_name", length: 200 })
  BranchName: string;
 
  @Column({ name: "ifsc_code", length: 50 })
  IfscCode: string;
 
  @Column({ name: "address", length: 250 })
  Address: string;

  @Column({ name: "is_active" })
  IsActive: boolean;

  @Column({ name: "created_at", type: 'datetime' })
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