
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { Bank } from "./Bank";
import { BankBranch } from "./BankBranch";

@Entity()
export class Transporters {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @Column({ name: "firm_name", length: 200 })
  FirmName: string;

  @Column({ name: "code", length: 200, default: null })
  Code: string;
  
  @Column({ name: "contact_person_name", length: 100, default: null })
  ContactPersonName: string;
  
  @Column({ name: "mobile_no", length: 50, default: null })
  MobileNo: string;

  @Column({ name: "email_id", length: 100, default: null })
  EmailId: string;
  
  @Column({ name: "address_line_1", length: 250, default: null })
  AddressLine1: string;
  
  @Column({ name: "address_line_2", length: 250, default: null })
  AddressLine2: string;
  
  @Column({ name: "state", default: null})
  State: number;
  
  @Column({ name: "district", default: null})
  District: number;
  
  @Column({ name: "vtc",default: null})
  Vtc: number;
  
  @Column({ name: "pincode", length: 20, default: null })
  Pincode: string;
  
  @Column({ name: "geocode", length: 250, default: null })
  Geocode: string;

  @Column({ name: "aadhaar_no", length: 20, default: null })
  AadhaarNo: string;
  
  @Column({ name: "pan_no", length: 20, default: null })
  PanNo: string;
  
  @ManyToOne(()=> Bank, {nullable:true})
  @JoinColumn({name:"bank_id"})
  BankId : Bank;
  
  @Column({ name: "bank_ac_no", length: 50, default: null })
  BankAcNo: string;
  
  @Column({ name: "bank_ac_name", length: 100, default: null })
  BankAcName: string;
  
  @Column({ name: "bank_ifsc_code", length: 100, default: null })
  BankIfscCode: string;

  @Column({ name: "is_active", default: true })
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
