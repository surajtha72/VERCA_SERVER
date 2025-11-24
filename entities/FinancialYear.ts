
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";

@Entity()
export class FinancialYear {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @Column({ name: "start_date", nullable: true, type: 'datetime' })
  StartDate: Date;
  
  @Column({ name: "end_date", nullable: true, type: 'datetime' })
  EndDate: Date;

  @Column({ name: "is_active", default: true })
  IsActive: boolean;

  @Column({ name: "created_at", nullable: true, type: 'datetime' })
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
