import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { EntityList } from "./EntityList";

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @Column({ name: "short_name", length: 20, default: null })
  ShortName: string;

  @Column({ name: "description", length: 200, default: null })
  Description: string;

  @Column({ name: "action", length: 200, default: null })
  Action: string;

  @ManyToOne(() => EntityList, { nullable: true })
  @JoinColumn({ name: "entity_id" })
  EntityList: EntityList;

  @Column({ name: "is_active", default: true })
  IsActive: boolean;

  @Column({ name: "created_at", type: "datetime", nullable: true, })
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
