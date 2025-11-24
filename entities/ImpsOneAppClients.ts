import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";

@Entity()
export class ImpsOneAppClients {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "user_id" })
  UserId: User;

  @Column({ name: "device_id", default: null })
  DeviceId: string;

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