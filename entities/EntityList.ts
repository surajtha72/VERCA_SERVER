import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class EntityList {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @Column({ name: "name", length: 20 })
  Name: string;

  @Column({ name: "app_id", default: null })
  AppId: string;

  @Column({ name: "metadata", length: 250, default: null })
  MetaData: string;

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
