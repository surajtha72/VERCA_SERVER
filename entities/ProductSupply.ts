
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Organization } from "./Organization";

@Entity()
export class ProductSupply {
  @PrimaryColumn({ name: "id" })
  Id: string;

  @Column({ name: "indent_status", default: 0 })
  IndentStatus: number;

  @ManyToOne(() => Organization, {nullable: true})
  @JoinColumn({ name: "indent_raised_by" })
  IndentRaisedBy: Organization;

  @ManyToOne(() => Organization, {nullable: true})
  @JoinColumn({ name: "indent_raised_for"  })
  IndentRaisedFor: Organization;

  @Column({ name: "indent_raised_on_date", type: "datetime"  })
  IndentRaisedOnDate: Date;

  @ManyToOne(() => Organization, {nullable: true})
  @JoinColumn({ name: "indent_approved_by" })
  IndentApprovedBy: Organization;

  @ManyToOne(() => Organization, {nullable: true})
  @JoinColumn({ name: "indent_rejected_by" })
  IndentRejectedBy: Organization;

  @Column({ name: "approved_on_date", type: "datetime", default: null  })
  ApprovedOnDate: Date;

  @ManyToOne(() => User, {nullable: true})
  @JoinColumn({ name: "dispatch_by_employee" })
  DispatchByEmployee: User;

  @Column({ name: "dispatch_date", type: "datetime" ,default: null   })
  DispatchDate: Date;

  @ManyToOne(() => User, {nullable: true})
  @JoinColumn({ name: "received_by_userid" })
  ReceivedByUserId: User;

  @Column({ name: "received_on", type: "datetime" ,default: null  })
  ReceivedOn: Date;

  @Column({name: "dc_number", default: null, length: 30})
  DCNumber: string;
 
  @Column({ name: "reject_reason", length: 200 ,default: null  })
  RejectReason: string;

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
